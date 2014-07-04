
/*
 * 음악 관련 처리
 * 2014-06-29
 */

exports.uploadMusic = function (req, res) {
  var fs = require('fs');
  var db = require('./dbModule');

  fs.readFile(req.files.musicFile.path, function (err, data) {
    var musicFileName, localPath, webPath;
    
    musicFileName = req.files.musicFile.name;
    localPath = './public/mp3/' + musicFileName;
    webPath = '/mp3/' + musicFileName;

    fs.writeFile(localPath, data, function (err) {
      if(!err) {
        req.session.newMusicName = musicFileName;
        req.session.newMusicPath = webPath;
        db.saveSong(musicFileName, webPath);
      }
      res.redirect("/");      
    });
  });
}

exports.getMusic = function (req, res) {
  var data, db = require('./dbModule');

  console.log(req.query);
  db.getSongByName(req.query.name, function (music) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(music);
    res.send(music);
  });
}