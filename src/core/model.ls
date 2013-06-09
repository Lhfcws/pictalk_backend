/**
 * @description Simple SQL operation wrapper for mongoskin.
 * @author Lhfcws
 * @file
 **/

require! [async, './database', '../conf/errors']

db = Database.sync-db!

/**
 * @description Simple SQL operation wrapper for mongoskin.
 * @module
 **/
model =
	count: !(collection, condition={}, callback) ->
		coll = db.collection collection
		coll.count condition, !(err,count) ->
			if err
				throw err
			callback null, count

	select: !(collection, condition={}, callback) ->
		coll = db.collection collection
		coll.find condition .toArray !(err, result) ->
			if err
				throw err
			else
				callback null, result

	find: !(collection, condition={}, callback) ->
		coll = db.collection collection
		coll.findOne condition,!(err, result) ->
			if err
				throw err
			callback null, result

	insert: !(collection, data={}, callback) ->
		if data == {}
			callback errors
		else
			db.collection collection .insert data, !(err)->
				if err
					throw err
				callback null

	delete: !(collection, condition={}, callback) ->
		coll = db.collection collection
		coll.remove condition, !(err, result) ->
			if err
				throw err
			callback null

module.exports <<< model
