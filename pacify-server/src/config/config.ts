import configDev from './config.development';

export interface ConfigInterface {
	server: {
		host: string;
		port: number;
	};
	db: {
		static: {
			type: 'mysql';
			name: string;
			host: string;
			port: number;
			user: string;
			pass: string;
			schema: string;
		};
	};
}

const environment: ConfigInterface = configDev;

export default environment;
