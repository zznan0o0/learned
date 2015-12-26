var ModelUser=require('../model/user.js')
var ModelBlog=require('../model/blog.js')

module.exports=function(app){

	app.use(function(req,res,next){
		var user=req.session.user
		if(user){
			app.locals.user=user
		}
		else{
			app.locals.user=user
		}

		next()
	})

	app.get('/',function(req,res,next){
		res.render('index',{title:'首页'})
	})

	app.get('/reg',function(req,res,next){
		res.render('reg',{title:'注册'})
	})

	app.post('/reg',function(req,res,next){
		
		var postData={
			name:req.body.name,
			password:req.body.password
		}

		ModelUser.findOne({name:req.body.name},function(err,data){
			if(err){
				console.log(err)
			}

			if(data){
				res.send('This user already exists')
			}
			else{
				ModelUser.create(postData,function(err,data){
					if(err){
						console.log(err)
					}
					req.session.user=data
					res.send('success')
				})
			}

		})
	})

	app.get('/login',function(req,res,next){
		res.render('login',{title:'登录'})
	})

	app.post('/login',function(req,res,next){
		var postData={
			name:req.body.name
		}

		ModelUser.findOne(postData,function(err,data){
			if(err){
				console.log(err)
			}

			if(data){
				if(data.password==req.body.password){
					req.session.user=data
					res.send('success')
				}
				else{
					res.send('Your password is fault')
				}
			}
			else{
				res.send('This user is not be found')
			}
		})

	})

	app.get('/logout',function(req,res,next){
		delete req.session.user
		res.redirect('/login')
	})

	app.get('/user/:_id',function(req,res,next){
		var _id=req.param('_id')
		if(_id){
			ModelUser.findById(_id,function(err,data){
				if(err){
					console.log(err)
				}
				if(data){
					res.render('user',{
						title:data.name+'这个人的资料',
						name:data.name,
						password:data.password
					})
				}
				else{
					res.send('没有此用户')
				}
			})
		}
		else{
			redirect('/')
		}
	})

	//blog
	app.get('/blog/add',function(req,res,next){
		res.render('add',{
			title:'博客发表'
		})
	})

	//发表
	app.post('/blog/add',function(req,res,next){
		postData={
			title:req.body.blogName,
			content:req.body.blogContent,
			author:req.session.user._id
		}
		

		ModelBlog.create(postData,function(err,data){
			if(err){
				console.log(err)
			}
			if(data){
				res.redirect('/blog/'+data._id)
			}
		})
	})
	//blog list
	app.get('/bloglist',function(req,res,next){
		ModelBlog.find({},function(err,data){
				if(err) console.log(err)

				console.log(data);
				res.render('bloglist',{
					title:'博客列表',
					list:data
				})	
			}
		)
	})
	//blog
	app.get('/blog/:_id',function(req,res,next){
		var getData={
			_id:req.param('_id')
		}

		ModelBlog.findOne(getData,function(err,data){
			if(err){
				console.log(err)
			}
			if(data){
				res.render('blog',{
					title:data.title,
					blog:data
				})
			}
			else{
				res.send('没有此文章')
			}
		})
	})
}


