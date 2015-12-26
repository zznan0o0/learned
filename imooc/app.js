var express=require('express')
var path=require('path')
var mongoose=require('mongoose')
var cookieParser=require('cookie-parser')
var session=require('express-session')
var mongoStore=require('connect-mongo')(session)
var bodyParser=require('body-parser')
var morgan=require('morgan')
var port=process.env.PORT||3000  //设置端口
var app=express()  //设置外部服务器
var multipart=require('connect-multiparty')
//connect传人本地数据库
var dbUrl='mongodb://localhost/imooc'
mongoose.connect(dbUrl)

//models loading
var models_path=__dirname+'/app/models'
/*var walk=function(path){

	fs.readdirSync(path)
	fs.forEach(function(file){
		var newPath=path+'/'+file
		var stat=fs.statSync(newPath)

		if(sta.isFile()){
			if(/(.*)\.(js|coffee)/.test(file)){
				require(newPath)
			}
		}
		else if(stat.isDirectory()){
			walk(newPath)
		}
	})
}
walk(models_path)*/

app.set('views','./app/views/pages');  //设置视图根目录
app.set('view engine','jade');  //模板引擎
//表单数据格式化

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())
//mulitpart
app.use(multipart())
//cook中间介
app.use(session({
	secret:'imooc',
	store:new mongoStore({
		url:dbUrl,
		collection:'sessions'//存到db字段名
	}),

	resave:false,
	saveUninitialized:true
}))

if('development'==app.get('env')){
	app.set('showStackError',true)
	app.use(morgan(':method :url :status'))//请求类型路径状态
	app.locals.pretty=true //格式化html
	mongoose.set('debug',true)
}

require('./config/routes.js')(app)//传人app

app.use(express.static(path.join(__dirname,'public')))//设置js，css引用路径
app.locals.moment=require('moment')
app.listen(port);  //监听端口
console.log('imooc started on port :'+port); //打印行日志
