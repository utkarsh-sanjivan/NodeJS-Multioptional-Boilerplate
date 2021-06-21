const httpStatus = require('http-status');
const logger = require('../config/logger');
const config = require('../config/config');
const ApiError = require('../utils/apiError');

/**
 * Converts normal error object to ApiError object.
 * @param err - {Object} error object that is to be converted
 * @param req - {Object} request object
 * @param res - {Object} response object
 * @param next - {Function} next middleware function
 */
const errorConverter = (err, req, res, next) => {
	let error = err;
	if (!(error instanceof ApiError)) {
		const statusCode = error.statusCode ? error.statusCode : httpStatus.INTERNAL_SERVER_ERROR;
		const message = error.message || httpStatus[`${statusCode}_NAME`];
		error = new ApiError(message, statusCode, false);
	}
	next(error);
};

/**
 * Handles the error occured during processing.
 * @param err - {Object} error object that is to be converted
 * @param req - {Object} request object
 * @param res - {Object} response object
 * @param next - {Function} next middleware function
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
	const { statusCode, message } = err;

	res.locals.errorMessage = err.message;

	const response = {
		code: statusCode,
		message,
		...(config.env === 'development' && { stack: err.stack }),
	};

	if (config.env === 'development') logger.error(message);

	res.status(statusCode).send(response);
};

module.exports = {
	errorConverter,
	errorHandler,
};
