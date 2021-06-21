const httpStatus = require('http-status');
const service = require('../services/test.services');
const ApiError = require('../utils/apiError');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');

/**
 * Controller for Test API that provided test data.
 * @param req - {Object} request object
 * @param res - {Object} response object
 */
const testAPI = catchAsync(async (req, res) => {
	const info = pick(req.query, ['name', 'address']);
	if (!info.name) throw new ApiError('Missing Name', httpStatus.BAD_REQUEST);
	if (!info.address) throw new ApiError('Missing Address', httpStatus.BAD_REQUEST);
	const result = await service.test(info);
	res.status(httpStatus.OK).json(result);
});

module.exports = {
	testAPI,
};
