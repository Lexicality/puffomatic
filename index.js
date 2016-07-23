const express = require('express');

const app = express();

app.get('/toke', (req, res) => {
	res.send("Nice");
});

app.listen(8080);
