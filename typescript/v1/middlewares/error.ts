import httpStatus from 'http-status';
import logger from '../config/logger';
import config from '../config/config';
import ApiError from '../utils/apiError';

/**
 * Converts normal error object to ApiError object.
 * @param err - {Object} error object that is to be converted
 * @param req - {Object} request object
 * @param res - {Object} response object
 * @param next - {Function} next middleware function
 */
const errorConverter = (err: any, req: any, res: any, next: any) => {
	let error = err;
	if (!(error instanceof ApiError)) {
		const statusCode = error.statusCode ? error.statusCode : httpStatus.INTERNAL_SERVER_ERROR;
		const message = error.message || httpStatus[`${statusCode}_NAME`];
		error = new ApiError(message, statusCode);
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
const errorHandler = (err: any, req: any, res: any, next: any) => {
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

export { errorConverter, errorHandler };
