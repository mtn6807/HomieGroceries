const config = require('../config');
const dbString = 'mongodb://'+config.dbURI+':'+config.dbPort+'/users';
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const bcrypt = require('bcrypt');
const saltRounds = 3;

function userExists(username){
	return new Promise((resolve, reject)=>{
		MongoClient.connect(dbString, (err, client)=>{
			if(err){throw err;}
			let foundOurBoy = false;
			const db = client.db('homies');
			db.collection('users').find({user:{$exists:true,$in:[username]}}).forEach(result=>{
				foundOurBoy = true;
			}).then(()=>{resolve(foundOurBoy)});
		});
	});
}

function emailExists(email){
	return new Promise((resolve, reject)=>{
		MongoClient.connect(dbString, (err, client)=>{
			if(err){throw err;}
			let foundOurBoy = false;
			const db = client.db('homies');
			db.collection('users').find({email:{$exists:true,$in:[email]}}).forEach(result=>{
				foundOurBoy = true;
			}).then(()=>{resolve(foundOurBoy)});
		});
	});
}

async function addUser(username, password, mail){
	return new Promise((resolve,reject)=>{
		MongoClient.connect(dbString, async(err, client)=>{
			var db = client.db('homies');
			if(err){throw err};

			let userexisting = await userExists(username)
			if(userexisting){resolve(1);client.close();return;}

			let emailexisting = await emailExists(mail)
			if(emailexisting){resolve(2);client.close();return;}

			bcrypt.genSalt(saltRounds, (err, salt)=>{
				bcrypt.hash(password, salt, (err, hash)=>{
					var doc = {user: username, pass: hash, email: mail};
					db.collection('users').insertOne(doc, (err,res)=>{
						if(err){throw err};
						client.close();
						resolve(0);
					});
				});
			});
		})
	});
}



// module.export(addUser);

module.exports = {
	"addUser": addUser
};
