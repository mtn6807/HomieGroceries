const config = require('../config');
const dbString = 'mongodb://'+config.dbURI+':'+config.dbPort+'/users';
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

function addUser(username, password, mail){
	MongoClient.connect(dbString, (err, client)=>{
		var db = client.db('homies');
		if(err){throw err};
		var doc = {user: username, pass: password, email: mail};

		db.collection('users').insertOne(doc, (err,res)=>{
			if(err){throw err};
			client.close();
		});
	});
}

// module.export(addUser);

module.exports = {
	"addUser": addUser
};
