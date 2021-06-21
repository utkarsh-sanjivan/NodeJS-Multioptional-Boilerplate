// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, test } from '@jest/globals';
import httpStatus from 'http-status';
import ApiError from '../../../utils/apiError';

describe('API Error Utils Class Test Cases', () => {
	test('should return correct error status and message', () => {
		return new Promise(() => {
			throw new ApiError('Some error message', httpStatus.NOT_FOUND);
		}).catch(err => {
			expect(err.message).toBe('Some error message');
			expect(err.statusCode).toBe(httpStatus.NOT_FOUND);
		});
	});

	test(`should return error status as ${httpStatus.INTERNAL_SERVER_ERROR} when just error message is passed`, () => {
		return new Promise(() => {
			throw new ApiError('Some error message');
		}).catch(err => {
			expect(err.message).toBe('Some error message');
			expect(err.statusCode).toBe(httpStatus.INTERNAL_SERVER_ERROR);
		});
	});

	test('should return the message according to the error status if error message is not provided', () => {
		return new Promise(() => {
			throw new ApiError('', httpStatus.NOT_FOUND);
		}).catch(err => {
			expect(err.message).toBe(httpStatus[`${httpStatus.NOT_FOUND}_NAME`]);
			expect(err.statusCode).toBe(httpStatus.NOT_FOUND);
		});
	});

	test('should convert empty error to error with status 500', () => {
		return new Promise(() => {
			throw new ApiError();
		}).catch(err => {
			expect(err.message).toBe(httpStatus[`${httpStatus.INTERNAL_SERVER_ERROR}_NAME`]);
			expect(err.statusCode).toBe(httpStatus.INTERNAL_SERVER_ERROR);
		});
	});
});
