const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.get('/toke', (req, res) => {
	res.send("Nice");
});

app.post('/toke', (req, res) => {
	console.log(req.body);
	res.send({response: "Nice"});
});

app.listen(8080);
