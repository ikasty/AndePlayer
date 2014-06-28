
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.doLogin = function(req, res){
  var db = require('./dbModule');

  console.log(req.query);

  db.getPasswordById(req.query.id, function (passInDB){
    if(passInDB == req.query.password){
      res.send("너 이 잉여야");
    }
    else {
      req.send("너 이 패배자야");
    }
  });
}