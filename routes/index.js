
/*
 * GET home page.
 */

exports.index = function(req, res){
	//이 시점에서 로그인되어 있다면 메인 페이지를, 아니라면 로그인 페이지를 보여줌

	//로그인 페이지
	res.render('dologin', { });
};