var router = require('express').Router();

router.use('/library', require('./library'));
router.use('/services', require('./services'));
router.use('/recipes', require('./recipes'));
router.use('/profiles', require('./profiles'));
router.use('/users', require('./users'));
router.use('/whoville', require('./whoville'));

module.exports = router;