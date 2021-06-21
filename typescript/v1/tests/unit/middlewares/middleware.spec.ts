// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, test } from '@jest/globals';
import app from '../../../app';

let server: any = null;

function isMiddlewareSet(appInstance: any, middlewareName: any) {
	let _return = false;
	appInstance._router.stack.forEach(function (layer: any) {
		if (layer.handle.name === middlewareName) {
			_return = true;
		}
	});
	return _return;
}

describe('Middlewares Test Cases', () => {
	beforeAll((done: any) => {
		server = app.listen(3000);
		done();
	});

	afterAll(() => {
		return new Promise(res => server.close(res));
	});

	test('should have Express Middleware', async () => {
		expect(isMiddlewareSet(app, 'expressInit')).toEqual(true);
	});

	test('should have Express JSON Parser Middleware', async () => {
		expect(isMiddlewareSet(app, 'jsonParser')).toEqual(true);
	});

	test('should have Express URL Encoded Parser Middleware', async () => {
		expect(isMiddlewareSet(app, 'urlencodedParser')).toEqual(true);
	});

	test('should have Helmet Middleware', async () => {
		expect(isMiddlewareSet(app, 'helmetMiddleware')).toEqual(true);
	});

	test('should have CORS Middleware', async () => {
		expect(isMiddlewareSet(app, 'corsMiddleware')).toEqual(true);
	});

	test('should have Router Middleware', async () => {
		expect(isMiddlewareSet(app, 'router')).toEqual(true);
	});

	test('should have Error Converter Middleware', async () => {
		expect(isMiddlewareSet(app, 'errorConverter')).toEqual(true);
	});

	test('should have Error Handler Middleware', async () => {
		expect(isMiddlewareSet(app, 'errorHandler')).toEqual(true);
	});

	test('should not have Morgan Middleware', async () => {
		expect(isMiddlewareSet(app, 'logger')).toEqual(false);
	});
});
