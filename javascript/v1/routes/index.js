const express = require('express');
const testRoute = require('./test.routes');

const router = express.Router();

router.use('/test', testRoute);

module.exports = router;
