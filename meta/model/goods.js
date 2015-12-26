var mongoose = require('mongoose');

var goodsSchema = new mongoose.Schema({
	name:String,
	poster:String
});
module.exports = mongoose.model('goods',goodsSchema);