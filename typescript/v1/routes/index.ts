import testRoute from './test.routes';

export default (app: any) => {
	app.use('/test', testRoute);
};
