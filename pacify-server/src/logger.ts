import { createLogger, transports, format } from 'winston';

const LOG_FILE_PATH = `./logs/app.log`;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 5;

// Define your custom format with printf.
const customFormat = format.printf(info => {
	return `${info.timestamp} ${info.level}: ${info.message ? info.message : JSON.stringify(info, null, 2)}`
});


// define the custom settings for each transport (file, console)
const options: {
	file: transports.FileTransportOptions,
	console: transports.ConsoleTransportOptions
} = {
	file: {
		filename: LOG_FILE_PATH,
		handleExceptions: true,
		format: format.combine(
			format.timestamp(),
			customFormat
		),
		maxsize: MAX_FILE_SIZE,
		maxFiles: MAX_FILES
	},
	console: {
		handleExceptions: true,
		format: format.combine(
			format.timestamp({format: 'HH:MM:SS'}),
			format.colorize(),
			customFormat
		)
	},
};

// instantiate a new Winston Logger with the settings defined above
const Logger = createLogger({
	transports: [
		new transports.File(options.file),
		new transports.Console(options.console),
	],
	exitOnError: false, // do not exit on handled exceptions
});

export default Logger;
