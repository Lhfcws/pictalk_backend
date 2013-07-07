/**
 * @descriptioin Picture unit test.
 * @author Lhfcws
 **/

require! [assert, '../bin/core/modules/picture', '../bin/common/helper']
can = it

ptkobject =
  pic-url: '/home/lhfcws/coding/projects/pictalk_backend/picture/test1.png'
  establisher: 'lhfcws@test.com'

ptk = {}

describe 'Picture Unit Test', !->
  describe 'create-a-picture', !->
    can 'should create a picture `test1.png`', !->
      picture.create-a-picture ptkobject, (err) ->
        picture.get-a-picture pikobject, (err, result) ->
          if err
            throw err
          result.mimetype.should.equal 'png'
          ptk := result
          done!

  describe 'get-a-picture', !->
    can 'should return a picture object `test1.png`', !->
      picture.get-a-picture ptkobject, (err, result) ->
        if err
          throw err
        result.mimetype.should.equal 'png'
        done!

  describe 'get-pictures', !->
    can 'should return picture object list [`test1.png`]', !->
      picture.get-a-picture ptkobject, (err, result) ->
        if err
          throw err
        result.length.should.equal 1
        result[0].mimetype.should.equal 'png'
        done!

  describe 'get-id', !->
    can 'should get a picture id', !->
      picture.get-id ptkobject, (err, id) ->
        if err
          throw err
        id.should.equal ptk._id
        done!

  describe 'delete-picture', !->
    can 'should delete picture `test1.png`', !->
      picture.delete-picture {_id: ptk._id}, (err) ->
        if err
          throw err
        done!

