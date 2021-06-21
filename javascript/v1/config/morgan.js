const morgan = require('morgan');
const Logger = require('./logger');

const stream = {
	write: message => Logger.http(message.substring(0, message.lastIndexOf('\n'))),
};

const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', { stream });

module.exports = morganMiddleware;
