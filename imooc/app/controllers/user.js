var User=require('../models/user.js')

//signup
//userlist page
exports.showSignup=function(req,res){
	res.render('signup',{
	title:'注册页面',
	}) //传递数据
}
exports.showSignin=function(req,res){
	res.render('signin',{
	title:'登录页面',	
	}) //传递数据
}

exports.signup=function(req,res){
	//var _user=req.param(user)	路由 body  query 取值顺序

	var _user=req.body.user

	User.find({name:_user.name},function(err,user){
		if(err){
			console.log(err)
		}

		if(user.length >0){
			return res.redirect('/signin')
		}
		else{
			var user=new User(_user)
			user.save(function(err,user){
				if(err){
				console.log(err)
			}
			res.redirect('/')
			console.log(user)
			})
		}
	})

	

}

//signin
exports.signin=function(req,res){
	var _user=req.body.user
	var name=_user.name
	var password=_user.password

	User.findOne({name:name},function(err,user){

		if(err){
			console.log(err)
		}

		if(user==null){
			console.log('没有此用户名');
			return res.redirect('/signup')
		}

		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err)
			}

			if(isMatch){
				console.log('密码正确')
				//保持登录 状态存到内存
				req.session.user=user

				return res.redirect('/')
			}
			else{
				console.log('密码错误')
				//console.log(isMatch)
			}
		})
	})
}

//logout
exports.logout=function(req,res){
	delete req.session.user
	//delete app.locals.user
	res.redirect('/')
}
//userlist page
exports.userlist=function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err);
		}

		res.render('userlist',{
		title:'imooc 用户列表页',
		users:users		
		}) //传递数据
	})
}

//midware for user
exports.signinRequired=function(req,res,next){
	var user=req.session.user

	if(!user){
		return res.redirect('/signin')
	}
	
	next()
}


exports.adminRequired=function(req,res,next){
	var user=req.session.user

	if(user.role<0){
		return res.redirect('/signin')
	}
	
	next()
}