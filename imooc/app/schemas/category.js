var mongoose=require('mongoose')
var Schema=mongoose.Schema
var ObjectId=Schema.Types.ObjectId
var CategorySchema=new mongoose.Schema({
	name:String,
	movies:[{type:ObjectId,ref:'Movie'}],
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
CategorySchema.pre('save',function(next){
	if(this.isNew){
		this.meta.creatAt=this.meta.updateAt=Date.now()
	}
	else{
		this.meta.updateAt=Date.now()
	}

	next() //进入下个流程
})
//静态方法不与数据库直接交互只有经过model能有这个方法
CategorySchema.statics={
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

module.exports=CategorySchema

