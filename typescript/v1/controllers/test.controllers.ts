import service from '../services/test.services';

const testAPI = (req: any, res: any) => {
	try {
		const data = service.test();
		res.status(200).json(data);
	} catch (error) {
		const code = error.code ? error.code : 400;
		res.status(code).json({ message: error.message });
	}
};

export default {
	testAPI,
};
