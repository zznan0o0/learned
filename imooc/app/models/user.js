var mongoose=require('mongoose')
var UserSchema=require('../schemas/User.js')
//调用生成Movie模型
var User=mongoose.model('User',UserSchema)

module.exports=User
