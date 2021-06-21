import app from './app';
import config from './config/config';
import logger from './config/logger';

const server = app.listen(config.port, async () => {
	logger.info(`Server started on port ${config.port}`);
});

const exitHandler = () => {
	server.close(() => {
		logger.info('Server closed');
		process.exit(1);
	});
};

const unexpectedErrorHandler = (error: any) => {
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
