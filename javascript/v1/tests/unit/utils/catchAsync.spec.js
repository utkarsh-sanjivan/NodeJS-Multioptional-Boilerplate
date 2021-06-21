// eslint-disable-next-line import/no-extraneous-dependencies
const { describe, expect, test } = require('@jest/globals');
const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const catchAsync = require('../../../utils/catchAsync');
const ApiError = require('../../../utils/apiError');

describe('catchAsync Utils Test Cases', () => {
	test('should return correct error status and message with ApiError class', () => {
		catchAsync(async () => {
			throw new ApiError('Some error message', httpStatus.NOT_FOUND);
		})(httpMocks.createRequest(), httpMocks.createResponse(), err => {
			expect(err.message).toBe('Some error message');
			expect(err.statusCode).toBe(httpStatus.NOT_FOUND);
		});
	});

	test(`should return error status as ${httpStatus.INTERNAL_SERVER_ERROR} when just error message is passed in ApiError class`, () => {
		catchAsync(async () => {
			throw new ApiError('Some error message');
		})(httpMocks.createRequest(), httpMocks.createResponse(), err => {
			expect(err.message).toBe('Some error message');
			expect(err.statusCode).toBe(httpStatus.INTERNAL_SERVER_ERROR);
		});
	});

	test('should return the message according to the error status if error message is not provided in ApiError class', () => {
		catchAsync(async () => {
			throw new ApiError(null, httpStatus.NOT_FOUND);
		})(httpMocks.createRequest(), httpMocks.createResponse(), err => {
			expect(err.message).toBe(httpStatus[`${httpStatus.NOT_FOUND}_NAME`]);
			expect(err.statusCode).toBe(httpStatus.NOT_FOUND);
		});
	});

	test('should convert empty error to error with status 500', () => {
		catchAsync(async () => {
			throw new ApiError();
		})(httpMocks.createRequest(), httpMocks.createResponse(), err => {
			expect(err.message).toBe(httpStatus[`${httpStatus.INTERNAL_SERVER_ERROR}_NAME`]);
			expect(err.statusCode).toBe(httpStatus.INTERNAL_SERVER_ERROR);
		});
	});

	test('should convert normal error with status and message to Api Error', () => {
		catchAsync(async () => {
			const error = new Error();
			error.message = 'Key not defined';
			throw error;
		})(httpMocks.createRequest(), httpMocks.createResponse(), err => {
			expect(err.message).toBe('Key not defined');
		});
	});
});
