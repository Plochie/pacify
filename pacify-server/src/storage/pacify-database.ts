import environment from '@src/config/config';
import { createConnections } from 'typeorm';

const ormConn = async function () {
	return await createConnections([
		{
			type: environment.db.static.type,
			host: environment.db.static.host,
			port: environment.db.static.port,
			name: environment.db.static.name,
			username: environment.db.static.user,
			password: environment.db.static.pass,
			database: environment.db.static.schema,
			entities: ['src/entity/pacify-static/*.ts'],
			logging: false,
			synchronize: true,
		},
	]);
};

export default ormConn;
