var http=require('http');
var express=require('express');
var io=require('socket.io');

app=express();
server=http.createServer(app);
app.use('/',express.static(__dirname+'./views'));
server.listen(3000);

io.on('connection',function(socket){
	socket.on('foo',function(data){
		console.log(data);
	})
})

console.log('server started at localhost:3000');