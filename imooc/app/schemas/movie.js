var mongoose=require('mongoose')
var Schema=mongoose.Schema
var ObjectId=Schema.Types.ObjectId

var MovieSchema=new mongoose.Schema({
	doctor:String,
	title:String,
	language:String,
	country:String,
	summary:String,
	flash:String,
	poster:String,
	year:Number,
	category:{
		type:ObjectId,
		ref:'Catetory'
	},
	pv:{
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
MovieSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.creatAt=this.meta.updateAt=Date.now()
	}
	else{
		this.meta.updateAt=Date.now()
	}

	next() //进入下个流程
})
//静态方法不与数据库直接交互只有经过model能有这个方法
MovieSchema.statics={
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

module.exports=MovieSchema

