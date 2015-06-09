var request = require('request');
var db = require('../app/config');
var Users = require('../app/collections/users');
var User = require('../app/models/user');
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

  //get users from database
  //find user with username
  //if no user with username, redirect to login
  //else compare passwords
  //if it doesn't match, console.log('incorrect password')
  //else continue to destination
  // Users.query({where: {'username': username}})
  // .fetch().then(function(err, model){
  //   if (err) console.log(err);
  //   console.log(model);

  var username = req.body.username;
  if (!username) {
    res.redirect('login');
  } else {
    var password = req.body.password;

    db.knex('users')
      .where('username', '=', username)
      .then(function(res) {
        if (res[0] && res[0]['username']) {
          var user = res[0]['username'];
        }
    console.log(user);
    // new User({'username': username}).fetch().then(function(model){
    //   console.log(model);
      if (bcrypt.compare(password, user.get('password'))) {
        // request.session.regenerate(function() {
        //   request.session.user = req.body.username;
          console.log("holy shit it works");
          return;
          // response.redirect(path);
        // });
      } else {
        console.log('Incorrect password');
        res.redirect('login');
      }
    });
  }
};

exports.createUser = function(req, res, path) {
  var user = new User({username: req.body.username});
  bcrypt.genSalt(10, function(err, salt){
    if (err) console.log(err);
    bcrypt.hash(req.body.password, salt, null, function(err, hash) {
      console.log(hash);
      if (err) console.log(err);
      user.set('password', hash);
      console.log(user.get('password'));
      Users.add(user);
      console.log(Users.models);
      res.redirect('index');
    });
  });
};

/************************************************************/
// Add additional utility functions below
/************************************************************/


