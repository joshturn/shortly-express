var request = require('request');
var bcrypt = require('bcrypt-nodejs');

exports.getUrlTitle = function(url, cb) {
  request(url, function(err, res, html) {
    if (err) {
      console.log('Error reading url heading: ', err);
      return cb(err);
    } else {
      var tag = /<title>(.*)<\/title>/;
      var match = html.match(tag);
      var title = match ? match[1] : url;
      return cb(err, title);
    }
  });
};

var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};



exports.checkUser = function(req, res, path) {
  var username = req.body.username;
  if (!username) {
    res.redirect('signup');
  } else {
    var password = req.body.password;
    var hash; //get username and password from database
    if (bcrypt.compare(password, hash)) {
      request.session.regenerate(function() {
        request.session.user = userObj.username;
        response.redirect(path);
      });
    } else {
      res.redirect('login')
    }
  }
};

exports.createUser = function(req, res, path) {

  var salt = bcrypt.genSalt(10, function(err, salt){
    bcrypt.hashSync(req.body.password, salt, function(err, hash){
      if (err) console.log(err);

  // var newUser = new User({username: req.body.username, password: hash});
    });
  });
  console.log(salt);
  var hash = bcrypt.hashSync(req.body.password, salt);
  console.log(hash);
};

/************************************************************/
// Add additional utility functions below
/************************************************************/


