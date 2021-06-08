const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./utils/logger');
const Router = require('./routes/index');
const morganMiddleware = require('./middleware/morganMiddleware');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(morganMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
Router(app);

if (process.env.NODE_ENV !== 'test') {
	app.listen(process.env.PORT, async () => {
		logger.info(`Server started on port ${process.env.PORT}`);
	});
}
module.exports = app;
