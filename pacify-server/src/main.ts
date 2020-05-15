import ormConn from '@storage/pacify-database';
import * as http from 'http';
import 'reflect-metadata';
import { App } from './app';
import environment from './config/config';
import Logger from './logger';

ormConn().then(() => {
	Logger.info('Database connection successful.');

	const expressApp = new App().app;

	expressApp.set('port', environment.server.port);
	//create a server and pass our Express app to it.
	const server = http.createServer(expressApp);

	server.listen(environment.server.port, environment.server.host);

	server
		.on('error', err => {
			Logger.error(` Server initialization error: ${err}`);
		})
		.on('listening', () => {
			Logger.info(`Server started successfully @ ${environment.server.port}`);
		});
});
