var express = require('express');
var router = express.Router();

var controllers = require('./controllers');

router.get('/', controllers.get);

router.use(controllers.catch.notFound);
router.use(controllers.catch.errResponse);

module.exports = router;
