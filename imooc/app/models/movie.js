var mongoose=require('mongoose')
var MovieSchema=require('../schemas/movie.js')
//调用生成Movie模型
var Movie=mongoose.model('Movie',MovieSchema)

module.exports=Movie