/**
 * @description Friend unit test.
 * @author Lhfcws
 * @version 0.1
 **/
var assert, user, friend, friendModel, helper, can, testfrd, testfrd_;
assert = require('assert');
user = require('../bin/core/modules/user');
friend = require('../bin/core/modules/friend');
friendModel = require('../bin/core/modules/friend-model');
helper = require('../bin/common/helper');
can = it;
testfrd = {
  userId: 'zhaojian@test.com',
  friendId: 'chenxuejia@test.com',
  nickname: 'aligod'
};
testfrd_ = {
  userId: 'chenxuejia@test.com',
  friendId: 'zhaojian@test.com',
  nickname: 'tencentgod'
};
describe('Friend Unit Test', function(){
  describe('add-friend', function(){
    can('should add a new friend pair <`zhaojian`, `chenxuejia`>', function(){
      friend.addFriend(testfrd, function(err){
        if (err) {
          throw err;
        }
        return done();
      });
    });
  });
  describe('friend-exist', function(){
    can('should exist friend pair <`zhaojian`, `chenxuejia`>', function(){
      friend.friendExist(testfrd, function(err, result){
        if (err) {
          throw err;
        }
        result.should.equal(true);
        return done();
      });
    });
  });
  describe('update-friend-nickname', function(){
    can('should update chenxuejia nickname into `aligod`', function(){
      friend.updateFriendNickname(testfrd, function(err){
        if (err) {
          throw err;
        }
        return friendModel.findFriend(testfrd, function(err, result){
          if (err) {
            throw err;
          }
          result.nickname.should.equal(testfrd.nickname);
          return done();
        });
      });
    });
  });
  describe('get-friends-by-user', function(){
    can('should return a friend list/array by user', function(){
      friend.getFriendsByUser({
        userId: testfrd.userId
      }, function(err, result){
        result.length.should.equal(1);
        result[0].friendId.should.equal('chenxuejia@test.com');
        return done();
      });
    });
  });
  describe('delete-friend', function(){
    can('should delete friend pair <`zhaojian`, `chenxuejia`>', function(){
      friend.deleteFriend(testfrd, function(err){
        if (err) {
          throw err;
        }
        return friend.friendExist(testfrd, function(err, result){
          if (err) {
            throw err;
          }
          result.should.equal(false);
          return done();
        });
      });
    });
  });
});