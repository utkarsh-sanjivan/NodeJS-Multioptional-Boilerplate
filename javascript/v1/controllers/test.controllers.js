const service = require('../services/test.services');

const testAPI = (req, res) => {
	try {
		const token = service.test(req, res);
		res.status(200).json(token);
	} catch (error) {
		const code = error.code ? error.code : 400;
		res.status(code).json({ message: error.message });
	}
};

module.exports = {
	testAPI,
};
