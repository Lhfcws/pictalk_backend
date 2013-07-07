/**
 * @description Message unit test.
 * @author Lhfcws
 * @version 0.1
 */

require! [assert, '../bin/common/helper', '../bin/core/modules/message']

can = it

testuid = 'lhfcws@test.com'
testrecv = \chenxj@test.com
testmsg =
  pt-id: 'Object_id'
  msg-body:
    type: \text
    content: 'Hello World!'
    url: ''
  sender: testuid
  receiver: testrecv
  time: '2013-07-07-22-10-10'
  anchor:
    center-x: 100
    center-y: 100


descibe 'Message Unit Test', !->
  describe 'create-a-message', !->
    can 'should create a fake message `Hello World!`.', !->
      message.create-a-message testmsg, (err) ->
        message.get-message-list-by-user testuid, (err, result) ->
          result.length.should.equal 1
          result[0].msg-body.content.should.equal 'Hello World!'
          done!

  describe 'get-message-list-by-user', !->
    can 'should return message list by user `lhfcws@test.com`', !->
      message.get-message-list-by-user testuid, (err, result) ->
        result.length.should.equal 1
        done!

  describe 'get-mesage-list-by-picture', !->
    can 'should return message list by picture', !->
      message.get-message-list-bu-picture testmsg.pt-id, (err, result) ->
        result.length.should.equal 1
        result[0].pt-id.should.equal testmsg.pt-id
        done!

