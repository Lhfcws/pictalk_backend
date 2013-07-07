/**
 * @description User Controller.
 * @author Lhfcws
 * @file
 **/
var assert, MD5, userModel, errors, format, User;
assert = require('assert');
MD5 = require('MD5');
userModel = require('./user-model');
errors = require('../../conf/errors');
format = function(user){
  if (!user.email || !user.username) {
    throw errors.devError.USER_NCOMPLETE;
  }
  return {
    userId: user.email,
    email: user.email || void 8,
    mobile: user.mobile || void 8,
    avatar: user.avatar || void 8,
    password: MD5(user.password),
    username: user.username,
    sn: void 8
  };
};
/**
 * @description user-model Controller
 * @module
 */
User = {
  login: function(userObj, callback){
    var user;
    user = {};
    user.userId = userObj.userId;
    user.password = userObj.password;
    return userModel.findUser(user, function(err, result){
      if (!result) {
        return callback(new errors(2, 'USER_LOGIN'));
      }
      return callback(null);
    });
  },
  userExist: function(_user, callback){
    var condition;
    if (typeof _user === 'string') {
      condition.userId = _user;
    } else if (typeof _user === 'object') {
      condition = _user;
    }
    return userModel.findUser(condition, function(err, result){
      if (!!result) {
        return callback(null, true);
      }
      return callback(null, false);
    });
  },
  register: function(userObj, callback){
    var user;
    user = format(userObj);
    return User.userExist(user.userId, function(err, exist){
      if (exist) {
        return callback(new errors(2, 'USER_DUPLICATE'));
      }
      return userModel.insertUser(user, function(err){
        return callback(null);
      });
    });
  },
  setAvatar: function(userObj, callback){
    var user;
    assert(!!userObj.avatar);
    user = {
      userId: userObj.userId,
      avatar: userObj.avatar
    };
    User.userExist(user.userId, function(err, exist){
      if (!exist) {
        return callback(new errors(1, 'USER_NEXIST'));
      }
    });
    return userModel.updateUser(user, function(err){
      return callback(null);
    });
  },
  updateUserInfo: function(userObj, callback){
    var user;
    user = format(userObj);
    return User.userExist(user.userId, function(err, exist){
      if (!exist) {
        return callback(new errors(1, 'USER_NEXIST'));
      }
      return userModel.updateUser(user, function(err){
        return callback(null);
      });
    });
  },
  deleteUser: function(userId, callback){
    return userModel.deleteUser({
      userId: userId
    }, function(err){
      return callback(null);
    });
  },
  changePassword: function(userObj, callback){
    var user;
    user = {};
    user.password = MD5(userObj.password);
    user.userId = userObj.userId;
    return userModel.userExist(user, function(err, exist){
      if (!exist) {
        return callback(new errors(1, 'USER_NEXIST'));
      }
      delete user.userId;
      user.password = MD5(userObj.newPassword);
      return userModel.updateUser(user, function(err){
        return callback(null);
      });
    });
  },
  getAUser: function(userObj, callback){
    return userModel.findUser(userObj, function(err, result){
      if (err) {
        throw err;
      }
      if (!result) {
        return callback(new errors(1, 'USER_NEXIST'));
      }
      return callback(null, result);
    });
  },
  getUsers: function(userObj, callback){
    return userModel.selectUser(userObj, function(err, result){
      if (err) {
        throw err;
      }
      if (!result) {
        return callback(new errors(1, 'USER_NEXIST'));
      }
      return callback(null, result);
    });
  }
};
import$(module.exports, User);
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}