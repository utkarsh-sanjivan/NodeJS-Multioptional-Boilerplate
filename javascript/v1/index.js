const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

const server = app.listen(config.port, async () => {
	logger.info(`Server started on port ${config.port}`);
});

const exitHandler = () => {
	server.close(() => {
		logger.info('Server closed');
		process.exit(1);
	});
};

const unexpectedErrorHandler = error => {
	logger.error(error);
	exitHandler();
};

const sigtermHandler = () => {
	logger.info('SIGTERM received');
	server.close();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => sigtermHandler);
