var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.services')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/distinctnames').get((req, res) => {
    db.any('select distinct service_description from cloudbreak_cuisine.services where display = 1')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/:id').get((req, res) => {
    db.one('select * from cloudbreak_cuisine.services where id = ' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});


module.exports = router;
