import httpStatus from 'http-status';
import service from '../services/test.services';
import ApiError from '../utils/apiError';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';

/**
 * Controller for Test API that provided test data.
 * @param req - {Object} request object
 * @param res - {Object} response object
 */
const testAPI = catchAsync(async (req: any, res: any) => {
	const info = pick(req.query, ['name', 'address']);
	if (!info.name) throw new ApiError('Missing Name', httpStatus.BAD_REQUEST);
	if (!info.address) throw new ApiError('Missing Address', httpStatus.BAD_REQUEST);
	const result = await service.test(info);
	res.status(httpStatus.OK).json(result);
});

export default {
	testAPI,
};
