import environment from '@src/config/config';
import { createConnection } from 'typeorm';

const ormConn = async function () {
	return await createConnection({
		type: environment.db.type,
		host: environment.db.host,
		port: environment.db.port,
		name: environment.db.name,
		username: environment.db.user,
		password: environment.db.pass,
		database: environment.db.schema,
		entities: ['src/entity/*.ts'],
		logging: false,
		synchronize: true,
	});
};

export default ormConn;
