const router = require('express').Router();
const miscController = require('../controllers/misc.controller');

router.get('/', miscController.index);

module.exports = router;