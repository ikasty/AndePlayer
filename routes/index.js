
/*
 * GET home page.
 */

exports.index = function(req, res){
	//우선 컨테이너만 보여주고, 나머지 부분은 동적 ajax로 처리한다.
	res.render('container', { });
	var db = require('../modules/dbModule');

	db.saveUser('admin', '0000');
	db.isLogin('admin', '0000', function(ret){ console.log("0000: "+ret); });
	db.isLogin('admin', '0001', function(ret){ console.log("0001: "+ret); });
	db.isLogin('admin', '0001', function(ret){ console.log("0001: "+ret); });
	db.getAllSongNames(function(ret){ console.log(ret) });
	db.getPasswordById('admin', function(password){ console.log("이거시 나의 패스워드: ", password)})
};