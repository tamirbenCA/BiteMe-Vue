// Minimal Simple REST API Handler (With MongoDB and Socket.io)
// Plus support for simple login and session
// Plus support for file upload
// Author: Yaron Biton misterBIT.co.il

'use strict';

var cl = console.log;

const express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	mongodb = require('mongodb'),
	utilsService = require('./services/utilsService');

const clientSessions = require('client-sessions');
const upload = require('./uploads');
const app = express();

const addRoutes = require('./routes');
// addRoutes(app);

var corsOptions = {
	origin: /http:\/\/localhost:\d+/,
	credentials: true
};

const serverRoot = 'mongodb://tamirben:tamirben@ds133127.mlab.com:33127/byte-me';
const baseUrl = serverRoot + 'data';

// app.use(express.static('uploads'));
app.use(express.static('dist'));

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(clientSessions({
	cookieName: 'session',
	secret: 'C0d1ng 1s fun 1f y0u kn0w h0w', // set this to a long random string!
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));

const http = require('http').Server(app);
const io = require('socket.io')(http);


function dbConnect() {

	return new Promise((resolve, reject) => {
		// Connection URL
		var url = 'mongodb://tamirben:tamirben@ds133127.mlab.com:33127/byte-me';
		// Use connect method to connect to the Server
		mongodb.MongoClient.connect(url, function (err, db) {
			if (err) {
				cl('Cannot connect to DB', err)
				reject(err);
			}
			else {
				cl('Connected to DB');
				resolve(db);
			}
		});
	});
}

var objTypeRequiresUser = {
	todo: true
}
// This function is called by all REST end-points to take care
// setting the basic mongo query:
// 1. _id if needed
// 2. userId when needed
function getBasicQueryObj(req) {
	const objType = req.params.objType;
	const objId = req.params.id;
	var query = {};

	if (objId) {
		try { query._id = new mongodb.ObjectID(objId); }
		catch (e) { return query }
	}
	if (!objTypeRequiresUser[objType]) return query;
	query.userId = null;
	if (req.session.user) query.userId = req.session.user._id
	return query;
}

app.get('/data/tags', function (req, res) {
	// console.log('inside tags')
	var tags = utilsService.getTags();
	res.json(tags)
})

app.get('/data/items', function (req, res) {
	console.log("itemsssss")
	const objType = 'item';
	const tag = req.query.tag;
	const term = req.query.term;

	var queryName = {}
	var queryDesc = {}

	if (tag) {
		queryName.tags = tag;
		queryDesc.tags = tag;
	}

	if (term) {
		queryName.name = { $regex: term }
		queryDesc.desc = { $regex: term }
	}
	// cl('********', queryDesc , '*********')

	dbConnect().then(db => {
		const collection = db.collection(objType);

		collection.find({ $or: [queryName, queryDesc], isActive:true }).toArray((err, objs) => {
			if (err) {
				cl('Cannot get you a list of ', err)
				res.json(404, { error: 'not found' })
			} else {
				cl('##################')
				cl('Objecets:', objs)
				cl('Returning list of ' + objs.length + ' ' + objType + 's, tag:' + tag);
				cl('##################')
				var sortedObjs = utilsService.sortByRank(objs);
				// console.log(sortedObjs);
				res.json(sortedObjs);
			}
			db.close();
		});
	});
});

// app.get('/data/items/:tag', function (req, res) {
// 	const objType = 'item';
// 	const tag = req.params.tag;

// 	dbConnect().then(db => {
// 		const collection = db.collection(objType);

// 		collection.find({ tags: tag } ).toArray((err, objs) => {
// 			if (err) {
// 				cl('Cannot get you a list of ', err)
// 				res.json(404, { error: 'not found' })
// 			} else {
// 				cl('Objecets:', objs)
// 				cl('Returning list of ' + objs.length + ' ' + objType + 's, tag:' + tag );
// 				var sortedObjs = utilsService.sortByRank(objs);
// 				// console.log(sortedObjs);
// 				res.json(sortedObjs);
// 			}
// 			db.close();
// 		});
// 	});
// });

// Get Orders as Seller:
app.get('/data/user/:id/orders/asseller', function (req, res) {
	const objType = 'order';
	const id = req.params.id;

	dbConnect().then(db => {
		const collection = db.collection(objType);

	// console.log('userid: ' , id)
	// console.log('sellers: ' , collection)
	collection.find({ 'sellers.sellerId': id}).toArray((err, orders) => {
			console.log('*****', orders, '******')
			if (err) {
				cl('Cannot get you a list of ', err)
				res.json(404, { error: 'not found' })
			} else {
				cl('Returning list of ' + orders.length + ' ' + objType + 's');
				// console.log(orders);
				res.json(orders);
			}
			db.close();
		});
	});
});

// Get Orders as Buyer:
app.get('/data/user/:id/orders/asbuyer', function (req, res) {
	const objType = 'order';
	const id = req.params.id;

	dbConnect().then(db => {
		const collection = db.collection(objType);
		
	// console.log('userid: ' , id)
	collection.find({ 'buyer.buyerId': id}).toArray((err, orders) => {
			// console.log('*****', orders, '******')
			if (err) {
				cl('Cannot get you a list of ', err)
				res.json(404, { error: 'not found' })
			} else {
				cl('Returning list of ' + orders.length + ' ' + objType + 's');
				// console.log(orders);
				res.json(orders);
			}
			db.close();
		});
	});
});

//get top meals for first page
app.get('/data/item/topMeals', function (req, res) {
	// console.log('queryqueryqueryhiiiiiiiiiiiiiiiiiiii', req.query )
	const ids = req.query.mealsIds.map((meallId) => new mongodb.ObjectID(meallId))
	console.log(ids)

	dbConnect().then(db => {
		const collection = db.collection('item');
		collection.find( { _id : { $in : ids } }).toArray((err, objs) => {
		
			if (err) {
				cl('Cannot get you a list of ', err)
				res.json(404, { error: 'not found' })
			} else {
				cl('objsobjsobjsobjs',objs.length);
				res.json(objs);
			}
			db.close();
		});
	});
});

// GETs a list
app.get('/data/:objType', function (req, res) {
	const objType = req.params.objType;
	var query = getBasicQueryObj(req);
	console.log('2323232323232',query)
	dbConnect().then(db => {
		const collection = db.collection(objType);

		// collection.find(query).toArray((err, objs) => {
			collection.find({isActive:true}).toArray((err, objs) => {
			if (err) {
				cl('Cannot get you a list of ', err)
				res.json(404, { error: 'not found' })
			} else {
				cl('******************');
				cl('Returning list of ' + objs.length + ' ' + objType + 's');
				cl('******************');
				// var sortedObjs = utilsService.sortByRank(objs);
				// console.log(sortedObjs);
				// res.json(sortedObjs);
				res.json(objs);
			}
			db.close();
		});
	});
});


//get sellers only
app.get('/data/:user/seller', function (req, res) {
	console.log('queryqueryqueryhiiiiiiiiiiiiiiiiiiii')
	// var query = getBasicQueryObj(req);
	dbConnect().then(db => {
		const collection = db.collection('user');
		collection.find(  {itemsForSale : {$exists:true}, $where:'this.itemsForSale.length>1'}).toArray((err, objs) => {
		// collection.find( { itemsForSale: {$ne:undefined} } ).toArray((err, objs) => {
			if (err) {
				cl('Cannot get you a list of ', err)
				res.json(404, { error: 'not found' })
			} else {
				cl('objsobjsobjsobjs',objs);
				res.json(objs);
			}
			db.close();
		});
	});
});




// GETs a single
app.get('/data/:objType/:id', function (req, res) {
	const objType = req.params.objType;
	const objId = req.params.id;
	cl(`Getting you an ${objType} with id: ${objId}`);
	var query = getBasicQueryObj(req)
	dbConnect()
		.then(db => {
			const collection = db.collection(objType);

			return collection.findOne(query)
				.then(obj => {
					cl('Returning a single ' + objType);
					res.json(obj);
					db.close();
				})
				.catch(err => {
					cl('Cannot get you that ', err)
					res.json(404, { error: 'not found' })
					db.close();
				})

		});
});

// DELETE
app.delete('/data/:objType/:id', function (req, res) {
	const objType = req.params.objType;
	const objId = req.params.id;
	cl(`Requested to DELETE the ${objType} with id: ${objId}`);
	var query = getBasicQueryObj(req);

	dbConnect().then((db) => {
		const collection = db.collection(objType);
		collection.deleteOne(query, (err, result) => {
			if (err) {
				cl('Cannot Delete', err)
				res.json(500, { error: 'Delete failed' })
			} else {
				if (result.deletedCount) res.json({});
				else res.json(403, { error: 'Cannot delete' })
			}
			db.close();
		});

	});
});

//deleteAll
app.delete('/data/:objType/:mealsForSaleIds', function (req, res) {
	const objType = req.params.objType;
	const objIds = req.params.mealsForSaleIds;
	cl(`Requested to DELETE the ${objType} with id: ${objIds}`);

	dbConnect().then((db) => {
		const collection = db.collection(objType);
		collection.deleteMany({ "_id" : "objIds" }, (err, result) => {
			if (err) {
				cl('Cannot Delete', err)
				res.json(500, { error: 'Delete failed' })
			} else {
				if (result.deletedCount) res.json({});
				else res.json(403, { error: 'Cannot delete' })
			}
			db.close();
		});

	});
});

// POST - adds 
app.post('/data/:objType', upload.single('file'), function (req, res) {
	//console.log('req.file', req.file);
	console.log('req.body320320320320', req.body);

	const objType = req.params.objType;
	cl('POST for ' + objType);

	const obj = req.body;
	delete obj._id;
	if (objTypeRequiresUser[objType]) {
		if (req.session.user) {
			obj.userId = req.session.user._id;
		} else {
			res.json(403, { error: 'Please Login first' })
			return;
		}
	}
	// If there is a file upload, add the url to the obj
	// if (req.file) {
	// 	obj.imgUrl = serverRoot + req.file.filename;
	// }



	dbConnect().then((db) => {
		const collection = db.collection(objType);

		collection.insert(obj, (err, result) => {
			if (err) {
				cl(`Couldnt insert a new ${objType}`, err)
				res.json(500, { error: 'Failed to add' })
			} else {
				cl(objType + ' added');
				res.json(obj);
			}
			db.close();
		});
	});

});

// PUT - updates
app.put('/data/:objType/:id', function (req, res) {
	console.log('hiiiiiiiii',req.body)
	const objType = req.params.objType;
	const objId = req.params.id;
	const newObj = req.body;
	const idHolder = newObj._id
	delete newObj._id;
	var query = getBasicQueryObj(req)

	cl('~~~~~~~~~~~~~~~')
	cl(`Requested to UPDATE the ${objType} with id: ${objId}`);	
	cl('query:', query)
	cl('newObj:', newObj)
	cl('~~~~~~~~~~~~~~~')
	
	dbConnect().then((db) => {
		const collection = db.collection(objType);
		collection.updateOne(query, newObj,
			(err, result) => {
				if (err) {
					cl('Cannot Update', err)
					res.json(500, { error: 'Update failed' })
				} else {
					console.log('err',err)					
					if (result.modifiedCount) {
						newObj._id = idHolder
						res.json(newObj);
					}
					else res.json(403, { error: 'Cannot update' })
				}
				db.close();
			});
	});
});


app.put('/data/:objType/:id', function (req, res) {
	
	const objType = req.params.objType;
	const objId = req.params.id;
	const newObj = req.body;
	const idHolder = newObj._id
	delete newObj._id;
	var query = getBasicQueryObj(req)

	cl('~~~~~~~~~~~~~~~')
	cl(`Requested to UPDATE the ${objType} with id: ${objId}`);	
	cl('query:', query)
	cl('newObj:', newObj)
	cl('~~~~~~~~~~~~~~~')
	
	dbConnect().then((db) => {
		const collection = db.collection(objType);
		collection.updateOne(query, newObj,
			(err, result) => {
				if (err) {
					cl('Cannot Update', err)
					res.json(500, { error: 'Update failed' })
				} else {
					console.log('err',err)					
					if (result.modifiedCount) {
						newObj._id = idHolder
						console.log('hiiiiiiiii',newObj)
						res.json(newObj);
					}
					else res.json(403, { error: 'Cannot update' })
				}
				db.close();
			});
	});
});


// Basic Login/Logout/Protected assets
app.post('/login', function (req, res) {
	dbConnect().then((db) => {
		db.collection('user').findOne({ email: req.body.email, password: req.body.password,isActive:true }, function (err, user) {
			if (user) {

				cl('Login Succesful',user);
				delete user.pass;
				req.session.user = user;
				res.json({ token: 'Beareloginr: puk115th@b@5t', user });
			} else {
				cl('Login NOT Succesful');
				req.session.user = null;
				res.json(403, { error: 'Login failed' })
			}
		});
	});
});

app.get('/logout', function (req, res) {
	req.session.reset();
	res.end('Loggedout');
});

function requireLogin(req, res, next) {
	if (!req.session.user) {
		cl('Login Required');
		res.json(403, { error: 'Please Login' })
	} else {
		next();
	}
}

app.get('/protected', requireLogin, function (req, res) {
	res.end('User is loggedin, return some data');
});


// Kickup our server 
// Note: app.listen will not work with cors and the socket
// app.listen(3003, function () {
http.listen(process.env.PORT|| 3003, function () {
	console.log(`misterREST server is ready at ${baseUrl}`);
	console.log(`GET (list): \t\t ${baseUrl}/{entity}`);
	console.log(`GET (single): \t\t ${baseUrl}/{entity}/{id}`);
	console.log(`DELETE: \t\t ${baseUrl}/{entity}/{id}`);
	console.log(`PUT (update): \t\t ${baseUrl}/{entity}/{id}`);
	console.log(`POST (add): \t\t ${baseUrl}/{entity}`);

});


io.on('connection', function (socket) {
	console.log('a user connected');
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
	socket.on('chat msg', function (msg) {
		// console.log('message: ' + msg);
		io.emit('chat newMsg', msg);
	});
});

cl('WebSocket is Ready');
