var http=require('http');
var url='http://localhost:2015/blibli/';
var html='';

http.get(url,function(res){
	res.on('data',function(data){
		html+=data;
	})

	res.on('end',function(){
		console.log(html);
	})
}).on('erro',function(){
	console.log('erro');
})
