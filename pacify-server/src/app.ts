import SchemaGraphQl from '@src/api/schema';
import Logger from '@src/logger';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as GraphHTTP from 'express-graphql';

// Creates and configures an ExpressJS web server.
export class App {
	// ref to Express instance
	public readonly app: express.Application;

	//Run configuration methods on the Express instance.
	constructor() {
		this.app = express();
		this.middleware();
		this.routes();
	}
	// Configure Express middleware.
	private middleware(): void {
		this.app.use(bodyParser.json({ type: 'application/json' }));
		this.app.use(cors());

		// this.app.use(function (req, res, next) {
		// 	res.header('Access-Control-Allow-Origin', '*');
		// 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		// 	next();
		// });

		// static folder
		this.app.use('/static/assets', express.static('assets'));
		Logger.info('Middleware initiated');
	}

	// Configure API endpoints.
	private routes(): void {
		// CHECKBACK: for type-graphql (removed because does not able to determine how to use array in mutation)
		SchemaGraphQl.then(schema => {
			this.app.use(
				'/graphql',
				GraphHTTP({
					schema,
					pretty: true,
					graphiql: true,
				}),
			);
		});

		// this.app.use(
		// 	'/graphql',
		// 	GraphHTTP({
		// 		schema: SchemaGraphQl,
		// 		pretty: true,
		// 		graphiql: true,
		// 	}),
		// );

		// this.app.use('/api/', new RootController().router);
		// this.app.use('/api/graph', new GraphController().router);
		// this.app.use('/api', new CategoryController().router);
	}
}
