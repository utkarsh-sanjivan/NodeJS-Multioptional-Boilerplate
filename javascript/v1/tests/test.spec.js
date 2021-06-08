const supertest = require('supertest');
const app = require('../index');

let server = null;
let request = null;

beforeAll(done => {
	server = app.listen(3000);
	request = supertest.agent(server);
	done();
});

afterAll(async () => {
	return new Promise(res => server.close(res));
});

describe('Testing the test API', () => {
	it('tests the test route', async () => {
		const response = await request.get('/test/');
		expect(response.status).toEqual(200);
		expect(response.body.data).toEqual('Test API');
		expect(response.body.message).toEqual('This is a test API.');
	});
});
