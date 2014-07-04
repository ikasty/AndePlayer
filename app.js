
/**
 * 필요한 모듈 인클루드
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , less = require('less');

/**
 * 라우트 모듈들
 */
var routes = require('./routes/index')
  , login = require('./routes/login')
  , music = require('./routes/music');

var app = express();

// 실행 환경설정
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

// 개발 모드 설정
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ==============================
// less(css 해석 모듈) 설정
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


// 로그인 검사를 해야 하는 페이지는 login.check을 먼저 한다
// app.get('/', routes.index);

//임시로 대문을 testplay로 한다.
app.get('/', login.check, routes.player);
// app.get('/testPlay', login.check, routes.player);
app.get('/login', login.loginpage);

//로그인 요청을 처리하는 주소
app.get('/dologin', login.doLogin);
app.post('/uploadMusic', music.uploadMusic);
app.get('/getMusic', music.getMusic);

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

// ==============================
http.createServer(app).listen(app.get('port'), function(){
  console.log('AnDePlayer starts on port ' + app.get('port'));
});
