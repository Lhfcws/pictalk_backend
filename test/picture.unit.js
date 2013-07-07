/**
 * @descriptioin Picture unit test.
 * @author Lhfcws
 **/
var assert, picture, helper, can, ptkobject, ptk;
assert = require('assert');
picture = require('../bin/core/modules/picture');
helper = require('../bin/common/helper');
can = it;
ptkobject = {
  picUrl: '/home/lhfcws/coding/projects/pictalk_backend/picture/test1.png',
  establisher: 'lhfcws@test.com'
};
ptk = {};
describe('Picture Unit Test', function(){
  describe('create-a-picture', function(){
    can('should create a picture `test1.png`', function(){
      picture.createAPicture(ptkobject, function(err){
        return picture.getAPicture(pikobject, function(err, result){
          if (err) {
            throw err;
          }
          result.mimetype.should.equal('png');
          ptk = result;
          return done();
        });
      });
    });
  });
  describe('get-a-picture', function(){
    can('should return a picture object `test1.png`', function(){
      picture.getAPicture(ptkobject, function(err, result){
        if (err) {
          throw err;
        }
        result.mimetype.should.equal('png');
        return done();
      });
    });
  });
  describe('get-pictures', function(){
    can('should return picture object list [`test1.png`]', function(){
      picture.getAPicture(ptkobject, function(err, result){
        if (err) {
          throw err;
        }
        result.length.should.equal(1);
        result[0].mimetype.should.equal('png');
        return done();
      });
    });
  });
  describe('get-id', function(){
    can('should get a picture id', function(){
      picture.getId(ptkobject, function(err, id){
        if (err) {
          throw err;
        }
        id.should.equal(ptk._id);
        return done();
      });
    });
  });
  describe('delete-picture', function(){
    can('should delete picture `test1.png`', function(){
      picture.deletePicture({
        _id: ptk._id
      }, function(err){
        if (err) {
          throw err;
        }
        return done();
      });
    });
  });
});