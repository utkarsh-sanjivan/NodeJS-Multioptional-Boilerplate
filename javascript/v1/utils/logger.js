const winston = require('winston');
const dateFormatters = require('./dateFormatters');
// import winston from 'winston';
// import dateFormatters from './dateFormatters';
require('dotenv').config();

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

const level = () => {
	const env = process.env.NODE_ENV || 'development';
	const isDevelopment = env === 'development';
	return isDevelopment ? 'debug' : 'warn';
};

const colorizer = winston.format.colorize({ all: true });

const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }));

const transports = [
	new winston.transports.Console({
		format: winston.format.combine(
			format,
			winston.format.printf(info =>
				colorizer.colorize(info.level, `${info.timestamp} | ${info.level.toUpperCase()}: ${info.message}`)
			)
		),
		level: 'debug',
	}),
	new winston.transports.File({
		format: winston.format.combine(
			format,
			winston.format.printf(info => `${info.timestamp} | ${info.level.toUpperCase()}: ${info.message}`)
		),
		filename: `logs/access-log-${dateFormatters.getDateString()}-log-file.log`,
		level: 'debug',
		silent: process.env.NODE_ENV !== 'development',
	}),
];

module.exports = winston.createLogger({
	level: level(),
	levels,
	format,
	transports,
});
