var http = require('http');
http.createServer(function (req,res) {
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end('Hellow World\n');	
}).listen(8081,'127.0.0.1');
console.log('服务启动在http://127.0.0.1:8081');