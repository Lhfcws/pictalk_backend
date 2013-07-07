/**
 * @description Unit test for User module in Core.
 * @author Lhfcws
 * @version 0.1
 */

require! [assert, MD5, '../bin/core/modules/user', '../bin/common/helper']

can = it  # 'it' is a keyword in LiveScript.

testuid = 'lhfcws@test.com'

testpwd = MD5 '123456'

testuser =
  user-id: testuid
  password: testpwd
  username: \lhfcws
  email: testuid


# Unit Test
describe 'User module Unit Test', !->
  describe 'register', !->
    can 'User<lhfcws@test.com> register successfully.', !->
      user.register testuser, (err) !->
        if err
          throw err
        done!

  describe 'login', !->
    can 'User<lhfcws@test.com> login successfully.', !->
      user.login testuser, (err) !->
        if err
          throw err
        done!

  describe 'user-exist', !->
    can 'should exist user<lhfcws@test.com>.', !->
      user.user-exist testuser, !(err, result) ->
        result.should.equal true 
        done!

  describe 'set-avatar', !->
    can 'should change user avatar.', !->
      user-obj = helper.copy testuser
      user-obj.avatar = '/home/lhfcws/avatar/pikachu.png'

      user.set-avatar user-obj, !(err) ->
        if err
          throw err
        user.get-a-user user-obj, !(err, result) ->
          if err
            throw err
          result.avatar.should.equal user-obj.avatar
          done!

  describe 'change-password', !->
    can 'should change user password.', !->
      user-obj = helper.copy testuser
      user-obj.new-password = MD5 '654321'

      user.change-password user-obj, !(err) ->
        if err
          throw err
        user.get-a-user user-obj, !(err, result) ->
          if err
            throw err
          result.password.should.equal MD5 '654321'
          done!

  describe 'get-a-user', !->
    can 'should return a user by condition.', !->
      user-obj = helper.copy testuser
      delete user-obj.password

      user.get-a-user user-obj, !(err, result) ->
        if err
          throw err
        result.user-id.should.equal user-obj.user-id
        done!

  describe 'get-users', !->
    can 'should return users array by condition.', !->
      user-obj = helper.copy testuser
      delete user-obj.password

      user.get-users user-obj, !(err, result) ->
        if err
          throw err
        result.length.should.equal 1
        result[0].user-id.should.equal user-obj.user-id
        done!

  describe 'update-user-info', !->
    can 'should update user information.', !->
      user-obj = helper.copy testuser
      user-obj.username = 'Lhfcws WWJ'
      user-obj.mobile = '10086'

      user.update-user-info user-obj, (err) ->
        if err
          throw err
        user.get-a-user user-obj, !(err, result) ->
          if err
           throw err
          result.username.should.equal user-obj.username
          result.mobile.should.equal user-obj.mobile
          done!


  describe 'delete-user', !->
    can 'should delete user<lhfcws@test.com>.', !->
      user.delete-user {user-id: testuid}, !(err) ->
        if err
          throw err
        user.user-exist {user-id: testuid}, !(err, result) ->
          if err
            throw err
          result.should.equal false
          done!
