/**
 * Catches the errors for async function.
 * @param fn - {Function} error message
 */
const catchAsync = (fn: any) => (req: any, res: any, next: any) => {
	Promise.resolve(fn(req, res, next)).catch(err => next(err));
};

export default catchAsync;
