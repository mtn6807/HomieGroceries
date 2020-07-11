const express = require('express');
const port = 8080;
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.route('/test')
	.get((req,res)=>{
		res.send('get')
	})
	.post((req,res)=>{
		res.send('post')
	})

const server = app.listen(port, (error) => {
	if (error){return console.log(`Error: ${error}`)};
});
