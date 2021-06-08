import express from 'express';
import controller from '../controllers/test.controllers';

const router = express.Router();

router.get('/', controller.testAPI);

export default router;
