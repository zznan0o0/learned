var mongoose=require('mongoose')
var bcrypt=require('bcrypt-nodejs')//密码存储计算模块
var SALT_WORK_FACTOR=10

var UserSchema=new mongoose.Schema({
	name:{
		unique:true,//唯一
		type:String
	},
	password:String,
	//0: nomal user
	//1: verified user
	//2: professonal user
	role:{
		type:Number,
		default:0
	},
	//记录
	meta:{
		creatAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})
//模式方法 .pre('save',function)--每次存储前调用方法
UserSchema.pre('save',function(next){
	var user=this

	if(this.isNew){
		this.meta.creatAt=this.meta.updateAt=Date.now()
	}
	else{
		this.meta.updateAt=Date.now()
	}

	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
		if(err) return next(err)

		bcrypt.hash(user.password,salt,null,function(err,hash){
		if(err){
			console.log(err)
			return next(err)
		}
		
		user.password=hash
		next()
	})

	})

	//next() //进入下个流程
})

//实例方法
UserSchema.methods={
	comparePassword:function(_password,cb){
		bcrypt.compare(_password,this.password,function(err,isMatch){
			if(err) return cb(err)

			cb(null,isMatch)
		})
	}
}

//静态方法模型里可以调不与数据库直接交互只有经过model能有这个方法
UserSchema.statics={
	//fetch取出所以数据
	fetch:function(cb){
		return this
			.find({})
			.sort('meta.updateAt')//按照更新日期排序
			.exec(cb)//执行回调方法
	},  //查找单条数据
	findById:function(id,cb){
		return this
			.findOne({_id:id})
			.exec(cb)//执行回调方法
	}
}
//导出模式

module.exports=UserSchema

