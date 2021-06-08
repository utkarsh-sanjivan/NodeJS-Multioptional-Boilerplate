const testRoute = require('./test.routes');

module.exports = app => {
	app.use('/test', testRoute);
};
