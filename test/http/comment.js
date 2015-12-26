var http=require('http');
var querystring=require('querystring'); //对象序列化
var postData=querystring.stringify({
	'content':'我又来了啦啦啦',
	'aid':'2634430'
});

var options={
	hostname:'interface.bilibili.com',
	port:80,
	path:'/course/document',
	method:'post',
	headers:{
		'Accept':'*/*',
		'Accept-Encoding':'gzip,deflate,sdch',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Cookie':'pgv_pvi=3096504320; sid=65kpw4ix; fts=1438358863; PLHistory=c542%7Co3.hL; DedeUserID=3632178; DedeUserID__ckMd5=b5bec7abc09408ae; SESSDATA=ac0a61a8%2C1442567539%2Cc09826eb; LIVE_LOGIN_DATA=9369a30cf203b9d1059ab7a7c7ca54faadf4ac7b; LIVE_LOGIN_DATA__ckMd5=26d526856837baa7; LIVE_BUVID=ed2851534b9b5d93f3543f1e44e4a9d4; LIVE_BUVID__ckMd5=fcdfaf498d3d12e3; _cnt_dyn=0; _cnt_pm=0; _cnt_notify=0; uTZ=-480; pgv_si=s1177351168; _dfcaptcha=4a8920e4602ce9f8d36fd038b1a24de8; DedeID=2634430',
		'Host':'interface.bilibili.com',
		'Referer':'http://www.bilibili.com/video/av2634430/',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36'
	}	
};

var req=http.request(options,function(res){
	console.log('Status:'+res.statusCode);
	console.log('headers:'+JSON.stringify(res.headers));
	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	})

	res.on('end',function(){
		console.log('评论完毕');
	})
});

req.on('erro',function(){
	console.log('Error:'+e.message);
});

req.write(postData);
req.end;