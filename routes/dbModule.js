/*
	dbModule.js ver.0.11
	2014.02.10 
*/

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/AndePlayer');

var musicSchema = new mongoose.Schema({
	name : String,	
	webPath : String
});
var Music = mongoose.model('Music', musicSchema, 'Music');

var userSchema = new mongoose.Schema({
	id : String,	
	password : String
});
var User = mongoose.model('User', userSchema, 'User');


exports.saveSong = function(songName, path){
	Music.findOne({name: songName}, function(err, doc){
		if(doc){
			return console.log('ERROR : Name of song is duplicate');
		}
		Music.create({
			name 	: songName,
			webPath : path
		}, function(err){
			if(err) console.log('ERROR : ' + err);
		});
	});
}

exports.getAllSongNames = function(callback){
	Music.find({}, 'name', function(err, doc){		
		if(err){
			return console.log('ERROR : ' + err);
		}
		callback(doc);
	});
}

exports.getSongByName = function(name, callback){
	Music.find({name: name}, function(err, doc){
		if(err) return console.log('ERROR : ' + err);
		callback(doc[0]);		
	});
}

exports.saveUser = function(id, password){
	User.findOne({id: id}, function(err, doc){
		if(doc){
			return console.log('ERROR : ID is duplicate');
		} 
		User.create({
			id: id,
			password: password
		}, function(err){
			if(err) console.log('ERROR : ' + err);
			else console.log('유저 '+id+'를 구함');
		});
	});
}

exports.isLogin = function(id, password, callback){
	User.findOne({id:id, password:password}, function(err, doc){
		if(doc)	return callback(true);
		else 	return callback(false); 
	});
}

exports.getPasswordById = function(id, callback){
	User.findOne({id:id}, 'password', function(err, doc){
		if(doc) {
			return callback(doc.password);
		}
		else {
			return callback(false);
		}		
	});
}