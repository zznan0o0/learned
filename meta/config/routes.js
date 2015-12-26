var ModelUser = require('../model/user.js');
var ModelGoods = require('../model/goods.js');
var ModelMeta = require('../model/meta.js');

module.exports = function(app){
	app.get('/', function(req, res){
		ModelGoods.find({},function(err,data){
			if(err) console.log(err);

			res.render('index',{title:'主页',goods:data})
		})
	});
	app.get('/goods/:id',function(req,res){
		var id = req.params.id
		ModelGoods.findOne({_id:id},function(err,data){
			if(err) console.log(err);
			
			res.render('goods',{
				title:'商品页',
				goods:data
			})
		})
	})

	app.get('/logup',function(req,res){
		res.render('logup',{title:'注册'});
	})

	app.post('/logup',function(req,res){
		var postData = {
			name:req.body.name,
			password:req.body.password
		};

		ModelUser.findOne({name:postData.name},function(err,data){
			if(err) console.log(err);

			if(data){
				res.send('用户已存在');
			}

			if(postData.password == ''){
				res.send('密码为空')
			}

			if(postData.password != ''){
				ModelUser.create(postData,function(err,data){
					if(err) console.log(err);

					req.session.user = data;
					res.redirect('/');
				})
			}
		})
	});

	app.post('/login',function(req,res){
		var postData = {
			name:req.body.name,
			password:req.body.password
		}

		ModelUser.findOne({name:postData.name},function(err,data){
			if(err) console.log(err);

			if(data){
				if(data.password == postData.password){
					req.session.user = data;
					res.redirect('/');
				}
				else{
					res.send('密码错误');
				}
			}
			else{
				res.send('没有此用户');
			}
		})
	});

	app.get('/logout',function(req,res){
		delete req.session.user;
		res.redirect('/');
	})

	app.get('/new',function(req,res){
		res.render('new',{title:'录入页'});
	})

	app.post('/new',function(req,res){
		var postData = {
			name:req.body.name,
			poster:req.body.poster
		};

		ModelGoods.create(postData,function(err){
			if(err) console.log(err);

			res.redirect('/');
		})
	})
	app.get('/time',function(req,res){
		console.log(req.params.data)
	})

	app.get('/test',function(req,res){
		res.render('test',{title:'test'});
	})

	app.get('/test2',function(req,res){
		var postData = {
			userid:req.session.user._id,
			goodsid:req.query.goodsId,
			detailtime:req.query.time
		}

		ModelMeta.create(postData,function(err,data){
			if(err) console.log(err);
			console.log(data);
		})
	})

	app.get('/meta',function(req,res){
		ModelMeta.find({},function(err,meta){
			if(err) console.log(err);

			res.render('meta',{title:'meta',meta:meta});
		});
	});
}