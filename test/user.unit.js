/**
 * @description Unit test for User module in Core.
 * @author Lhfcws
 * @version 0.1
 */
var assert, MD5, user, helper, can, testuid, testpwd, testuser;
assert = require('assert');
MD5 = require('MD5');
user = require('../bin/core/modules/user');
helper = require('../bin/common/helper');
can = it;
testuid = 'lhfcws@test.com';
testpwd = MD5('123456');
testuser = {
  userId: testuid,
  password: testpwd,
  username: 'lhfcws',
  email: testuid
};
describe('User module Unit Test', function(){
  describe('register', function(){
    can('User<lhfcws@test.com> register successfully.', function(){
      user.register(testuser, err(function(){
        if (err) {
          throw err;
        }
        done();
      }));
    });
  });
  describe('login', function(){
    can('User<lhfcws@test.com> login successfully.', function(){
      user.login(testuser, err(function(){
        if (err) {
          throw err;
        }
        done();
      }));
    });
  });
  describe('user-exist', function(){
    can('should exist user<lhfcws@test.com>.', function(){
      user.userExist(testuser, function(err, result){
        result.should.equal(true);
        done();
      });
    });
  });
  describe('set-avatar', function(){
    can('should change user avatar.', function(){
      var userObj;
      userObj = helper.copy(testuser);
      userObj.avatar = '/home/lhfcws/avatar/pikachu.png';
      user.setAvatar(userObj, function(err){
        if (err) {
          throw err;
        }
        user.getAUser(userObj, function(err, result){
          if (err) {
            throw err;
          }
          result.avatar.should.equal(userObj.avatar);
          done();
        });
      });
    });
  });
  describe('change-password', function(){
    can('should change user password.', function(){
      var userObj;
      userObj = helper.copy(testuser);
      userObj.newPassword = MD5('654321');
      user.changePassword(userObj, function(err){
        if (err) {
          throw err;
        }
        user.getAUser(userObj, function(err, result){
          if (err) {
            throw err;
          }
          result.password.should.equal(MD5('654321'));
          done();
        });
      });
    });
  });
  describe('get-a-user', function(){
    can('should return a user by condition.', function(){
      var userObj;
      userObj = helper.copy(testuser);
      delete userObj.password;
      user.getAUser(userObj, function(err, result){
        if (err) {
          throw err;
        }
        result.userId.should.equal(userObj.userId);
        done();
      });
    });
  });
  describe('get-users', function(){
    can('should return users array by condition.', function(){
      var userObj;
      userObj = helper.copy(testuser);
      delete userObj.password;
      user.getUsers(userObj, function(err, result){
        if (err) {
          throw err;
        }
        result.length.should.equal(1);
        result[0].userId.should.equal(userObj.userId);
        done();
      });
    });
  });
  describe('update-user-info', function(){
    can('should update user information.', function(){
      var userObj;
      userObj = helper.copy(testuser);
      userObj.username = 'Lhfcws WWJ';
      userObj.mobile = '10086';
      user.updateUserInfo(userObj, function(err){
        if (err) {
          throw err;
        }
        return user.getAUser(userObj, function(err, result){
          if (err) {
            throw err;
          }
          result.username.should.equal(userObj.username);
          result.mobile.should.equal(userObj.mobile);
          done();
        });
      });
    });
  });
  describe('delete-user', function(){
    can('should delete user<lhfcws@test.com>.', function(){
      user.deleteUser({
        userId: testuid
      }, function(err){
        if (err) {
          throw err;
        }
        user.userExist({
          userId: testuid
        }, function(err, result){
          if (err) {
            throw err;
          }
          result.should.equal(false);
          done();
        });
      });
    });
  });
});