import supertest from 'supertest';
import app from '../index';

let server: any = null;
let request: any = null;

beforeAll((done: any) => {
	server = app.listen(done);
	request = supertest.agent(server);
});

afterAll(async () => {
	return new Promise(res => server.close(res));
});

describe('Testing the test API', () => {
	it('tests the test route', async (done: any) => {
		const response = await request.get('/test/');
		expect(response.status).toEqual(200);
		expect(response.body.data).toEqual('Test API');
		expect(response.body.message).toEqual('This is a test API.');
		done();
	});
});
