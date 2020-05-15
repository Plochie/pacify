import { ConfigInterface } from './config';

const configDev: ConfigInterface = {
	server: {
		host: 'localhost',
		port: 3001,
	},
	db: {
		type: 'mysql',
		name: 'pacify',
		host: 'localhost',
		port: 3306,
		user: 'pacify',
		pass: 'pacify',
		schema: 'pacify',
	},
};

export default configDev;
