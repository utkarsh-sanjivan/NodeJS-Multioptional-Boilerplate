const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const httpStatus = require('http-status');
const xss = require('xss-clean');
const ApiError = require('./utils/apiError');
const { authLimiter } = require('./middlewares/rateLimiter');
const config = require('./config/config');
const { errorConverter, errorHandler } = require('./middlewares/error');
const morgan = require('./config/morgan');
const routes = require('./routes/index');

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
app.options('*', cors());

// Add authentication middleware here
// app.use(Your_Auth_Middleware);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') app.use('/v1', authLimiter);

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => next(new ApiError(httpStatus.NOT_FOUND, 'Not found')));

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
