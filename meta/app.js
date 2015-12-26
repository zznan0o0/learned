var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./config/routes.js');
var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var multiparty = require('connect-multiparty');
var app = express();
var Url = 'mongodb://localhost/meta'
//connect mongodb
mongoose.connect(Url);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multiparty());
app.use(session({
  secret:'meta',
  store:new mongoStore({
    url:Url,
    collection:'session'
  }),
  resave:false,
  saveUninitialized:true
}));
app.use(function(req,res,next){
	var user = req.session.user;
	app.locals.user = user;
	next();
});
app.use(express.static(path.join(__dirname,'views')));

routes(app);
module.exports = app;
