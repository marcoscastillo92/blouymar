const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const sendEmail = require('./send-mail');

const app = express();

app.use(bodyParser.text());
app.use(cors());

app.post('/', async (req, res) => {
	const data = req.body;
	try {
		await sendEmail(data);
	} catch (error) {
		res.status(500).json({ status: 500, msg: error.message });
		return;
	}
	res.status(200).json({ status: 200, msg: 'Email sent' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

module.exports = app;
