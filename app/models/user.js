var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: false,
  username: null,
  password: null,

  initialize: function() {
    // this.get('username');
    // this.get('password');

  }
});

module.exports = User;
