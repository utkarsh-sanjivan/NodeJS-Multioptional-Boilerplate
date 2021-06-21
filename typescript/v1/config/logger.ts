import winston from 'winston';
import moment from 'moment';
import config from './config';

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

const level = () => {
	const env = config.env || 'development';
	const isDevelopment = env === 'development';
	return isDevelopment ? 'debug' : 'warn';
};

const colorizer = winston.format.colorize({ all: true });

const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'cyan',
	http: 'magenta',
	debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }));

const transports = [
	new winston.transports.Console({
		format: winston.format.combine(
			format,
			winston.format.printf((info: any) =>
				colorizer.colorize(info.level, `${info.timestamp} | ${info.level.toUpperCase()}: ${info.message}`)
			)
		),
		level: 'debug',
	}),
	new winston.transports.File({
		format: winston.format.combine(
			format,
			winston.format.printf((info: any) => `${info.timestamp} | ${info.level.toUpperCase()}: ${info.message}`)
		),
		filename: `logs/access-log-${moment().format('YYYY-MM-DD')}-log-file.log`,
		level: 'debug',
	}),
];

export default winston.createLogger({
	level: level(),
	levels,
	format,
	transports,
});
