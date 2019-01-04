var router = require('express').Router();

router.use('/library', require('./library'));

module.exports = router;