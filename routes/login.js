
/*
 * 로그인 관련 처리
 * 2014-01-30
 */

// 로그인을 검사해서 리다이렉트 또는 계속진행
exports.check = function(req, res, next) {
	// 현재 로그인이 된 상태인지 확인한 후 처리
	console.log("login test");
	if ( false ) // TODO: 로그인 검사 -> 로그인이 필요한 상태
		res.redirect('/login');
	else // 로그인이 필요 없으면
		next();
};

exports.loginpage = function(req, res) {
	res.render('loginpage');
}

// 로그인 상태인지 확인
exports.islogin = function(req){
	return req.session.islogin;
}

// 로그인 처리
function doLogin(req){
	// id를 입력했는지 확인
	if (req.body.id == '') return false;
	// pw를 입력했는지 확인
	if (req.body.pw == '') return false;

	// 입력한 id값에 대한 pw 변조값을 받아옴
	var pwOriginal = '' // TODO: db 모듈에서 pw 변조값 받아오기

	if (req.body.pw != pwOriginal) return false;
	else return true;
}