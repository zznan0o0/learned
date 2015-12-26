var mongoose = require('mongoose');
var Schema=mongoose.Schema
var ObjectId=Schema.Types.ObjectId

var metaSchema = new mongoose.Schema({
	userid:{type:ObjectId,ref:'user'},
	goodsid:{type:ObjectId,ref:'goods'},
	detailtime:String
});
module.exports = mongoose.model('meta',metaSchema);