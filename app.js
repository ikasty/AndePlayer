
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , login = require('./routes/login')
  , http = require('http')
  , path = require('path');

// less render
var fs = require('fs')
  , less = require('less');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.session( { secret: "andeplayer_sessionkey" } ));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//rendering less css
app.get('*.less', function(req, res){
	fs.readFile(__dirname + req.url, "utf8", function(err, data){
		if (err) throw err;
		less.render(data, function(err, css){
			if (err) throw err;
			res.header("Content-type", "text/css");
			res.send(css);
		});
	});
});

// ==============================
app.get('/', routes.index);
app.get('/login', login.index);
app.get('/testPlay', routes.testPlay);

// ==============================
http.createServer(app).listen(app.get('port'), function(){
  console.log('AnDePlayer starts on port ' + app.get('port'));
});
