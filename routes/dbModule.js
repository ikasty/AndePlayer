var musicDb = require('mongoose');
musicDb.connect('mongodb://localhost/music');
var musicSchema = musicDb.Schema({
	name : String,
	album : String,
	number : Number,
	year : Number,
	artist : String,
	genre : String,
	preference : Number,
	localPath : String,
	webPath : String
});
var musicModel = musicDb.model('Music', musicSchema);

var playListSchema = musicDb.Schema({
	name : String,
	ids : [musicDb.Schema.Types.ObjectId],
	musicNames : [String]
});
var playListModel = musicDb.model('PlayList', playListSchema);

// var memberDb = require('mongoose');
// memberDb.connect('mongodb://localhost/member');
// var memberSchema = memberDb.Schema({
// 	id : String,
// 	password : String
// });
// var memberModel = memberDb.model('Member', memberSchema);

exports.isLogin = function(member){
	if(!member.id || !member.pass) return false;
	memberModel.findOne({id : member.id, password : member.password}, 
		function(err, foundMember){
			if(err) return false;
			if(foundMember)	return true;
			else 			return false;
	});
};

exports.getPlayList = function(playList){
	if(!playList) return false;
	playListModel.findOne({name:playList}, 
		function(err, foundList){
			if(err) return false;
			if(foundList) 	return foundList;
			else 			return false;
	});
}

exports.getLibrary = function(){
	musicModel.find({}, 'name _id', function(err, library){
		if(err) return false;
		return library;
	});
}

exports.getMusicinfo = function(id){
	musicModel.findById(id,function(err, music){
		if(err) return false;
		return music;
	})
}

exports.addMusic = function(music){
	musicModel.findById(music._id ,function(err, foundMusic){
		if(err) return false;
		if(foundMusic) return false;
		music.save();
	})
}