var router = require('express').Router();

router.use('/library', require('./library'));
router.use('/services', require('./services'));

module.exports = router;