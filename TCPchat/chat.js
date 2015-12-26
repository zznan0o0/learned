var net=require('net');
var chatServer=net.createServer();
var clientList=[];

chatServer.on('connection',function(client){
	client.write('Hi\n');

	clientList.push(client);

	client.on('data',function(data){
		for(var i=0;i<clientList.length;i+=1){
			clientList[i].write(data);
		};
	});
});

chatServer.listen(3000);

console.log('server start in 3000');