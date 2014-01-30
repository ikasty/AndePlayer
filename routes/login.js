
/*
 * GET login page.
 */

exports.login = function(req, res){
	// 현재 로그인이 된 상태인지 확인한 후 처리
	if ( true ) // TODO: 로그인 검사 -> 로그인이 필요한 상태
		res.render('login', { });
	else // 로그인이 필요 없으면
		require('.').index();
};