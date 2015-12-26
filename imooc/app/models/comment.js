var mongoose=require('mongoose')
var CommentSchema=require('../schemas/comment.js')
//调用生成Movie模型
var Comment=mongoose.model('Comment',CommentSchema)

module.exports=Comment