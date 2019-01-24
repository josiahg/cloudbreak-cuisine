var router = require('express').Router();

router.use('/library', require('./library'));
router.use('/services', require('./services'));
router.use('/recipes', require('./recipes'));
router.use('/profiles', require('./profiles'));
router.use('/users', require('./users'));
router.use('/whoville', require('./whoville'));
router.use('/clusters', require('./clusters'));
router.use('/dashboard', require('./dashboard'));
router.use('/components', require('./components'));
router.use('/generator', require('./generator'));
router.use('/cloudbreak', require('./cloudbreak'));

module.exports = router;