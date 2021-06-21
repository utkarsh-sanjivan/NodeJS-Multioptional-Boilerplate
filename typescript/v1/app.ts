import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import xss from 'xss-clean';
import ApiError from './utils/apiError';
import authLimiter from './middlewares/rateLimiter';
import config from './config/config';
import { errorConverter, errorHandler } from './middlewares/error';
import morgan from './config/morgan';
import routes from './routes/index';

const app = express();

// morgan to log requests
if (config.env !== 'test') app.use(morgan);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// set security HTTP headers
app.use(helmet());

// sanitize request data
app.use(xss());

// enable cors
app.use(cors());
// app.options('*', cors());

// Add authentication middleware here
// app.use(Your_Auth_Middleware);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') app.use('/v1', authLimiter);

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => next(new ApiError('Not Found', httpStatus.NOT_FOUND)));

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
