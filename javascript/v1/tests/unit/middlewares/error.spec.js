// eslint-disable-next-line import/no-extraneous-dependencies
const { describe, expect, test } = require('@jest/globals');
const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const { errorConverter } = require('../../../middlewares/error');
const ApiError = require('../../../utils/apiError');

describe('Error Middleware Test Cases', () => {
	test('should convert normal error with message to Api Error', () => {
		const error = new Error('Key not defined');
		const next = jest.fn(err => {
			expect(err.message).toBe('Key not defined');
			expect(err.statusCode).toBe(httpStatus.INTERNAL_SERVER_ERROR);
		});

		errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);

		expect(next).toHaveBeenCalledWith(expect.any(ApiError));
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('should convert normal error without status and message to Api Error', () => {
		const error = new Error();
		const next = jest.fn(err => {
			expect(err.message).toBe(httpStatus[`${httpStatus.INTERNAL_SERVER_ERROR}_NAME`]);
			expect(err.statusCode).toBe(httpStatus.INTERNAL_SERVER_ERROR);
		});

		errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);

		expect(next).toHaveBeenCalledWith(expect.any(ApiError));
		expect(next).toHaveBeenCalledTimes(1);
	});
});
