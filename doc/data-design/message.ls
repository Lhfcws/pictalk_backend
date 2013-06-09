# Message Object, including soung, text and maybe img later.
message =
	pt-id: '' # Belonging to which PTObject
	msg-id: \picid+msg-index # picture id ++ msg-index
	msg-index: 1 	# count from 1
	msg-body: # only one kind, 2 examples ->
	*	type: \text
		content: 'Hello, World!'
		url: ''		# Needed for resources or longtext maybe.
	*	type: \sound
		content: ''		# Binary text maybe?
		url: '/home/sdcard/pictalk/message/20130328/{#picid}/sounds/54e2d3as.ogg'
	*	type: \image
		content: ''		# Binary text maybe?
		url: '/home/sdcard/pictalk/message/20130328/{#picid}/images/94s32sas.png'
	
	creator: \lhfcws@gmail.com	# user id
	time:	'2013-03-28-09-50-43'	# Any time format is ok. If better to be easy to read and parse.
	anchor:	# An anchor object. We use a point to be the center point of the square. The size of square will be defined in #Config.
	*	center-x: 100 # px
		center-y: 100 # px
	
