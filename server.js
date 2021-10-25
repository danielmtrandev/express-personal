const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
// const { ObjectId } = require('bson');
const ObjectId = require('mongodb').ObjectID;

var db;

const url = 'mongodb+srv://Daniel:SzHInKisNNrW1sfq@cluster0.bbitw.mongodb.net/rapper?retryWrites=true&w=majority'
const dbName = 'rapper';

app.listen(3000, () => {
	MongoClient.connect(
		url,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		(error, client) => {
			if (error) {
				throw error;
			}
			db = client.db(dbName);
			console.log({db})
			console.log('Connected to `' + dbName + '`!');
		}
	);
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
	
	db.collection('verses')
		.find() 
		.toArray((err, result) => {
			if (err) return console.log(err); 
			res.render('index.ejs', { verses: result });
		});

});

app.get('/search', (req, res) => {
	
	db.collection('verses')
		.find({"vrs" : {$regex : req.query.search, $options:"i"}}) 
		.toArray((err, result) => {
			if (err) return console.log(err); 
			res.render('index.ejs', { verses: result });
		});

});



app.post('/verses', (req, res) => {
	db.collection('verses').save(
		{

			vrs: req.body.vrs,
			count: 0,
			fav: false
	
		},
		(err, result) => {
			if (err) return console.log(err);
			console.log('saved to database');
			res.redirect('/');
		}
	);
});

// triggered by client-side javascript, event listeners
app.put('/verses', (req, res) => {
	db.collection('verses').findOneAndUpdate(
		{ 
			vrs: req.body.vrs
		},
		{
			$set: {
				count: req.body.count 
			},
		},
		{
			sort: { _id: -1 },
			upsert: true,
		},
		(err, result) => {
			if (err) return res.send(err);
			res.send(result);
		}
	);
});

// app.put('/unlike', (req, res) => {
// 	db.collection('verses').findOneAndUpdate(
// 		{ 
// 			vrs: req.body.vrs
// 		},
// 		{
// 			$set: {
// 				count: req.body.count - 1,
// 			},
// 		},
// 		{
// 			sort: { _id: -1 },
// 			upsert: true,
// 		},
// 		(err, result) => {
// 			if (err) return res.send(err);
// 			res.send(result);
// 		}
// 	);
// });

app.put('/favorite', (req, res) => {
	db.collection('verses').findOneAndUpdate(
		{ 
			_id: ObjectId(req.body.docId)
			// vrs: req.body.vrs
		},
		{
			$set: {
				fav: true
			},
		},
		{
			sort: { _id: -1 },
			upsert: true,
		},
		(err, result) => {
			if (err) return res.send(err);
			res.send(result);
		}
	);
});

// triggered by client-side javascript, event listeners
app.delete('/verses', (req, res) => {
	db.collection('verses').findOneAndDelete(
		{ 
			vrs: req.body.vrs 
		},
		(err, result) => {
			if (err) return res.send(500, err);
			res.send('Message deleted!');
		}
	);
});
