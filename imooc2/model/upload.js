var mongoose=require('mongoose');

var uploadSchema=new mongoose.Schema({
	name:String,
	file:String
});
module.exports=mongoose.model('upload',uploadSchema);
