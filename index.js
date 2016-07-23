const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan("dev"));
app.use(express.bodyParser())

app.get('/toke', (req, res) => {
	res.send("Nice");
});

app.post('/toke', (req, res) => {
	console.log(req.body);
	res.send({response: "Nice"});
});

app.listen(8080);
