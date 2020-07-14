const config = require('../config');
const dbString = 'mongodb://'+config.dbURI+':'+config.dbPort+'users';
const MongoClient = require('mongodb.MongoClient');

function addUser(username, password){
	MongoClient.connect(dbString, (err, db)=>{
		if(err){throw err};
		var doc = {user: username, pass: password};

		db.collection("users").insertOne(doc, (err,res)=>{
			if(err){throw err};
			db.close();
		});
	});
}

// module.export(addUser);

module.exports = {
	"addUser": addUser
};
