const config = require('../config');
const dbString = 'mongodb://'+config.dbURI+':'+config.dbPort+'/users';
const mongodb = require('mongodb');
const { verify } = require('jsonwebtoken');
const MongoClient = mongodb.MongoClient;

const jwtKey = "testingKey"; //move to vault and finalize key
const jwtExpirySeconds = 300;

function issueToken(username){
    return token = jwt.sign({ username }, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds,
	})
}

function verifyToken(token){
	try{
		jwt.verify(token,jwtKey)
		return true
	}catch{
		return false
	}
}

module.exports = {
	"issueToken": issueToken,
	"verifyToken": verifyToken
};