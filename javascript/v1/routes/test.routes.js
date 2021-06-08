const express = require('express');
const controller = require('../controllers/test.controllers');

const router = express.Router();

router.get('/', controller.testAPI);

module.exports = router;
