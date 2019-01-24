var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.clusters')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/distincttypes').get((req, res) => {
    db.any('select distinct cluster_type from cloudbreak_cuisine.clusters')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/distinctversions').get((req, res) => {
    db.any('select distinct version from cloudbreak_cuisine.clusters')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/:id').get((req, res) => {
    db.one('select * from cloudbreak_cuisine.clusters where id = ' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});



module.exports = router;
