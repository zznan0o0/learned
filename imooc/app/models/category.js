var mongoose=require('mongoose')
var CategorySchema=require('../schemas/category.js')
//调用生成Movie模型
var Category=mongoose.model('Category',CategorySchema)

module.exports=Category
