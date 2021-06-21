import express from 'express';
import testRoute from './test.routes';

const router = express.Router();

router.use('/test', testRoute);

export default router;
