var express=require('express');
var app=express();

app.get('/',function(req,res){
	res.send('dadadafa')
})
app.listen(3000);
console.log('____________________');