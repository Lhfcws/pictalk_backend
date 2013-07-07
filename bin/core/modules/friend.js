/**
 * @description Friend Controller.
 * @author Lhfcws
 * @file
 **/
var async, assert, friendModel, errors, reverse_frd, Friend;
async = require('async');
assert = require('assert');
friendModel = require('./friend-model');
errors = require('../../conf/errors');
reverse_frd = function(_frd){
  return {
    userId: _frd.friendId,
    friendId: _frd.userId
  };
};
/**
 * @description friend-model Controller
 * @module
 */
Friend = {
  addFriend: function(_friend, callback){
    var condition, condition1;
    condition = {};
    condition = {
      userId: _friend.userId,
      friendId: _friend.friendId
    };
    condition1 = reverse_frd(condition);
    return friendModel.friendExist(condition, function(err, result){
      if (!!result) {
        return callback('Friend exist');
      }
      condition.friendNickname = _friend.friendName;
      condition1.friendNickname = _friend.userName;
      return async.series([
        function(err, cb1){
          return friendModel.insertFriend(condition, function(err){
            return cb1(null);
          });
        }, function(err, cb2){
          return friendModel.insertFriend(condition1, function(err){
            return cb2(null);
          });
        }
      ], function(err){
        return callback(null);
      });
    });
  },
  friendExist: function(_friend, callback){
    var condition;
    condition = {
      userId: _friend.userId,
      friendId: _friend.friendId
    };
    return friendModel.findFriend(condition, function(err, result){
      if (!result) {
        return callback(null, false);
      }
      return callback(null, true);
    });
  },
  updateFriendNickname: function(_friend, callback){
    var condition;
    condition = {
      userId: _friend.userId,
      friendId: _friend.friendId
    };
    return Friend.friendExist(condition, function(err, exist){
      if (!exist) {
        return callback(new errors(1, 'FRIEND_NEXIST'));
      }
      condition.nickname = _friend.nickname;
      return friendModel.updateFriend(condition, function(err){
        return callback(null);
      });
    });
  },
  getFriendsByUser: function(_condition, callback){
    var condition;
    condition = {
      userId: _condition.userId
    };
    return friendModel.getFriends(condition, function(err, result){
      return callback(null, result);
    });
  },
  deleteFriend: function(_condition, callback){
    var condition, condition1, flag;
    condition = condition1 = {};
    flag = false;
    condition.userId = _condition.userId;
    if (typeof _condition.friendId === 'string') {
      flag = true;
      condition.friendId = _condition.friendId;
      condition1 = reverse_frd(condition);
    }
    return async.series([
      function(err, cb1){
        var iterator;
        if (flag) {
          return friendModel.deleteFriend(condition1, function(err){
            return cb1(null);
          });
        } else {
          iterator = function(frd, cb11){
            var _frd;
            _frd = reverse_frd(frd);
            return friendModel.deleteFriend(_frd, function(err0){
              if (err0) {
                throw err0;
              }
            });
          };
          return friendModel.getFriends(condition, function(err0, result){
            return async.each(result, iterator, function(err1){
              return cb1(null);
            });
          });
        }
      }, function(err, cb2){
        return friendModel.deleteFriend(condition, function(err){
          return cb2(null);
        });
      }
    ], function(err){
      return callback(null);
    });
  }
};
import$(module.exports, Friend);
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}