const express = require('express');
const router = express.Router();
const { predictComment } = require('../controller/predictController');

router.post('/', predictComment);

module.exports = router;
