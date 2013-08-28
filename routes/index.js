
/*
 * GET home page.
 */

exports.index = function(req, res){
	//우선 컨테이너만 보여주고, 나머지 부분은 동적 ajax로 처리한다.
	res.render('container', { });
};