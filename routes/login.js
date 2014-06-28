
/*
 * 로그인 관련 처리
 * 2014-01-30
 */

// 로그인을 검사해서 리다이렉트 또는 계속진행
exports.check = function(req, res, next) {
	// 현재 로그인이 된 상태인지 확인한 후 처리
	if ( !req.session.islogin ) // TODO: 로그인 검사 -> 로그인이 필요한 상태
		res.redirect('/login');
	else // 로그인이 필요 없으면
		next();
};

exports.loginpage = function(req, res) {
	//로그인 되어있으면 메인 페이지로 이동
	if (!req.session.islogin){
		res.render('login');
	}
	else{
		res.redirect('/');
	}
};

// 로그인 상태인지 확인
exports.islogin = function(req){
	return req.session.islogin;
};

// 로그인 처리
exports.doLogin = function(req, res){
	var db = require('../routes/dbModule');

	// id를 입력했는지 확인
	if (req.query.id == '') return false;
	// pw를 입력했는지 확인
	if (req.query.pw == '') return false;

	db.getPasswordById(req.query.id, function (pwOriginal){
		if (req.query.pw != pwOriginal){
			req.session.islogin = false;			
			res.redirect('/login');
		} 
		else {
			req.session.islogin = true;
			res.redirect('/');
		}
	});
}