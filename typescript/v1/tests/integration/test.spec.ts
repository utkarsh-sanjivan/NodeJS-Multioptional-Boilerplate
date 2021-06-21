// eslint-disable-next-line import/no-extraneous-dependencies
import { beforeAll, afterAll, describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import httpStatus from 'http-status';
import app from '../../app';

let server: any = null;
let request: any = null;

describe('Test Routes Test Cases', () => {
	beforeAll((done: any) => {
		server = app.listen(3000);
		request = supertest.agent(server);
		done();
	});

	afterAll(() => {
		return new Promise(res => server.close(res));
	});

	test('should return 200 and successfully with user info', async () => {
		const res = await request.get('/v1/test/?name=Test Name&address=Test Address').expect(httpStatus.OK);

		expect(res.body).toEqual({
			data: 'Test API',
			description: 'This is a test API.',
			name: 'Test Name',
			adress: 'Test Address',
		});
	});

	test(`should return ${httpStatus.BAD_REQUEST} and with message Missing Name`, async () => {
		const res = await request.get('/v1/test/?address=Test Address').expect(httpStatus.BAD_REQUEST);
		expect(res.body.message).toEqual('Missing Name');
	});

	test(`should return ${httpStatus.BAD_REQUEST} and with message Missing Address`, async () => {
		const res = await request.get('/v1/test/?name=Test Name').expect(httpStatus.BAD_REQUEST);
		expect(res.body.message).toEqual('Missing Address');
	});
});
