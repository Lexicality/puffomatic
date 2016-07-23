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
	console.log(req.get('Content-Type'), req.body);
	if (Math.random() > 0.5) {
		res.send("nice");
	} else {
		res.send("blaze it");
	}
});

app.listen(8080);
