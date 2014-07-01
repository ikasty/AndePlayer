/*
 * GET home page.
 */

exports.index = function(req, res){
	/**
	 * 대문 페이지
	 * 페이지 구성을 어떻게 할까요
	 */
	res.render('container');
};

exports.player = function(req, res){
	// 음악 플레이어를 출력하는 모듈
  var data = null;

  if(req.session.newMusicPath){
    data = {
      musicPath: req.session.newMusicPath,
      musicName: req.session.newMusicName
    };

    console.log(data);
  }
	res.render('testplay', data);
};