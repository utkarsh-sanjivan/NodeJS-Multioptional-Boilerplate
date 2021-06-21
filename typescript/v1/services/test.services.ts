/**
 * Service for Test API that provided test data.
 * @param info - {Object} info object that is to be returned
 * @returns {Object} test data object
 */
const test = (info: any) => {
	return {
		data: 'Test API',
		description: 'This is a test API.',
		name: info.name,
		adress: info.address,
	};
};

export default {
	test,
};
