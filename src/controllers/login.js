const config = require('../config');
const dbString = 'mongodb://'+config.dbURI+':'+config.dbPort+'/users';
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const bcrypt = require('bcrypt');
const saltRounds = 3;

function validateUser(username, password){
    return new Promise((resolve, reject)=>{
        MongoClient.connect(dbString, (err, client)=>{
            if(err){throw err;}
            let valid = false;
            const db = client.db('homies');
            let curruser = db.collections("users").find({user:username})
            bcrypt.compare(password, curruser.pass, function(err, result) {
                valid = true;
            }).then(()=>{resolve(valid)});
        });
    });
}

module.exports = {
	"validateUser": validateUser
};
