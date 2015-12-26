var fs=require('fs');
var path=require('path')
var ModelUser=require('../model/user.js');
var ModelUpload=require('../model/upload.js');

module.exports=function(app){
	app.use(function(req,res,next){
		var user=req.session.user;
		app.locals.user=user;
		next();
	})

	app.get('/',function(req,res,next){
		ModelUpload.find({},function(err,data){
			res.render('index',{
				title:'首页',
				uploads:data
			})
		})
	});

	app.get('/signup',function(req,res,next){
		res.render('signup',{title:"注册"})
	});

	app.post('/signup',function(req,res,next){
		var postData={
			name:req.body.name,
			password:req.body.password
		};
		ModelUser.findOne({name:req.body.name},function(err,data){
			if(err) console.log(err);
			if(data){
				res.send('用户名重复');
			}
			if(req.body.password == ''){
				res.send('password is null')
			}
			if(req.body.password != ''){
				ModelUser.create(postData,function(err,data){
					if(err) console.log(err);
					req.session.user=data;
					res.redirect('/');
				})
			}
		})
	});
	app.get('/signin',function(req,res){
		res.render('signin',{title:'登录界面'});
	})
	app.post('/signin',function(req,res){
		postData={
			name:req.body.name,
			password:req.body.password
		}
		ModelUser.findOne({name:req.body.name},function(err,data){
			if(err) console.log(err);

			if(data){
				if(data.password==req.body.password){
					req.session.user=data;
					res.redirect('/');
				}
				else{
					res.send('The password in fault');
				}
			}
			else{
				res.send('The user is not exist');
			}
		})
	})

	app.get('/logout',function(req,res){
		delete req.session.user;
		res.redirect('/signin');
	})

	app.get('/upload',function(req,res,next){
		res.render('upload',{title:'文件上传'})
	})

	app.post('/upload',function(req,res,next){
		var name=req.body.name;
		var content=req.files.content;
		var filepath=content.path;
		fs.readFile(filepath,function(err,data){
			if(err) console.log(err);
			var time=Date.now();
			var type=content.type.split('/')[1];
			var conName=time+'.'+type;
			var newPath=path.join(__dirname,'../public/upload/'+conName);

			fs.writeFile(newPath,data,function(err){
				if(err) console.log(err);
			});
			var postData={
				name:conName,
				file:newPath
			}
			ModelUpload.create(postData,function(err,data){
				if(err) console.log(err);
				res.send(data);
			})
		})
	})
};