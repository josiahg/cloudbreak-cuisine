var router = require('express').Router();

router.use('/library', require('./library'));
router.use('/services', require('./services'));
router.use('/recipes', require('./recipes'));

module.exports = router;