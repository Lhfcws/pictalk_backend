/**
 * @description Friend unit test.
 * @author Lhfcws
 * @version 0.1
 **/

require! [assert, '../bin/core/modules/user', '../bin/core/modules/friend', '../bin/core/modules/friend-model', '../bin/common/helper']

can = it

testfrd =
  user-id: \zhaojian@test.com
  friend-id: \chenxuejia@test.com
  nickname: \aligod

testfrd_ =
  user-id: \chenxuejia@test.com
  friend-id: \zhaojian@test.com
  nickname: \tencentgod
  
describe 'Friend Unit Test', !->
  describe 'add-friend', !->
    can 'should add a new friend pair <`zhaojian`, `chenxuejia`>', !->
      friend.add-friend testfrd, (err) ->
        if err
          throw err

        done!

  describe 'friend-exist', !->
    can 'should exist friend pair <`zhaojian`, `chenxuejia`>', !->
      friend.friend-exist testfrd, (err, result) ->
        if err
          throw err
        result.should.equal true
        done!

  describe 'update-friend-nickname', !->
    can 'should update chenxuejia nickname into `aligod`', !->
      friend.update-friend-nickname testfrd, (err) ->
        if err
          throw err
        
        friend-model.find-friend testfrd, (err, result) ->
          if err
            throw err
          result.nickname.should.equal testfrd.nickname
          done!

  describe 'get-friends-by-user', !->
    can 'should return a friend list/array by user', !->
      friend.get-friends-by-user {user-id: testfrd.user-id}, (err, result) ->
        result.length.should.equal 1
        result[0].friend-id.should.equal 'chenxuejia@test.com'
        done!

  describe 'delete-friend', !->
    can 'should delete friend pair <`zhaojian`, `chenxuejia`>', !->
      friend.delete-friend testfrd, (err) ->
        if err
          throw err
        friend.friend-exist testfrd, (err, result) ->
          if err
            throw err
          result.should.equal false
          done!

