const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan("dev"));
app.get('/toke', (req, res) => {
	res.send("Nice");
});

app.listen(8080);
