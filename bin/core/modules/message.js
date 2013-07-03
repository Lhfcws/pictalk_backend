/**
 * @description Message Controller.
 * @author Lhfcws
 * @file
 **/
var assert, messageModel, errors, objectify, Message;
assert = require('assert');
messageModel = require('./message-model');
errors = require('../../conf/errors');
objectify = function(attr, _obj){
  var condition;
  condition = {};
  if (typeof _obj === 'string') {
    condition[attr] = _picture;
  } else if (_obj[attr] !== 'undefined') {
    condition = _obj;
  } else if (_obj.userId !== 'undefined' && attr === 'sender') {
    condition.sender = _obj.userId;
  } else {
    condition = false;
  }
  return condition;
};
/**
 * @description message-model Controller
 * @module
 */
Message = {
  createAMessage: function(message, callback){},
  getMessageListBySender: function(_user, callback){
    var condition;
    condition = objectify('sender', _user);
    return Message.getMessageListByUser(condition, function(err, result){
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  },
  getMessageListByReceiver: function(_user, callback){
    var condition;
    condition = objectify('receiver', _user);
    return Message.__getMessageListByUser(condition, function(err, result){
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  },
  __getMessageListByUser: function(condition, callback){
    if (!condition) {
      return callback('Param Error.');
    }
    return messageModel.getMessages(condition, function(err, result){
      return callback(null, result);
    });
  },
  getMessageListByPicture: function(_picture, callback){
    var condition;
    if (!_picture) {
      return callback('Param Error');
    }
    condition = objectify('pt-id', _picture);
    if (condition.ptId.length === '32') {
      condition.picId = condition.ptId;
      delete condition.ptId;
    }
    return messageModel.getMessages(condition, function(err, result){
      return callback(null, result);
    });
  }
};