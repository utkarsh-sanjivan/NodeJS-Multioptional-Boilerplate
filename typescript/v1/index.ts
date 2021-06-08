import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './utils/logger';
import Router from './routes/index';
import morganMiddleware from './middleware/morganMiddleware';

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
export default app;
