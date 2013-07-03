/**
 * @description Picture Controller.
 * @author Lhfcws
 * @file
 **/
var fs, datetime, MD5, async, assert, pictureModel, errors, format, basedir, basename, mimetype, objectify, Picture;
fs = require('fs');
datetime = require('datetime');
MD5 = require('MD5');
async = require('async');
assert = require('assert');
pictureModel = require('./picture-model');
errors = require('../../conf/errors');
format = function(ptobject){
  return ptobject;
};
basedir = function(url){
  var a;
  a = url.split('/');
  a[a.length - 1] = '';
  return a.join('/');
};
basename = function(url){
  var a;
  a = url.match(/\/[\w|.]+$/);
  a = a[0].slice(1);
  return a;
};
mimetype = function(url){
  var a;
  a = basename(url);
  a = a.split('.');
  return a[a.length - 1];
};
objectify = function(_picture){
  var picture;
  picture = {};
  if (typeof _picture === 'string') {
    picture.picId = _picture;
  } else {
    picture = _picture;
  }
  return picture;
};
/**
 * @description picture-model Controller
 * @module
 */
Picture = {
  createAPicture: function(_picture, callback){
    var picture;
    picture = {};
    picture.picUrl = _picture.picUrl;
    picture.establisher = _picture.establisher;
    picture.esTime = datetime(new Date(), '%Y-%m-%d-%H-%M-%S');
    picture.mimetype = mimetype(_picture.picUrl);
    picture.picName = basename(_picture.picUrl);
    return fs.readFile(_picture.picUrl, function(err, data){
      picture.picId = MD5(data);
      return pictureModel.insertPicture(picture, function(err){
        return callback(null);
      });
    });
  },
  deleteAPicture: function(_picture, callback){
    var picture;
    picture = objectify(_picture);
    return pictureModel.deletePicture(picture, function(err){
      return callback(null);
    });
  },
  getAPicture: function(_picture, callback){
    var picture;
    picture = objectify(_picture);
    return pictureModel.getAPicture(picture, function(err, result){
      return callback(null, result);
    });
  },
  getPictures: function(picture, callback){
    if (typeof picture !== 'object') {
      return callback('Param error: It should be an object.');
    }
    return pictureModel.getPictures(picture, function(err, result){
      return callback(null, result);
    });
  }
};