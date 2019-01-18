var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/:id').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.components_blueprints where id = '+ req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/service/:id').get((req, res) => {
    db.one('select * from cloudbreak_cuisine.services where service_id = ' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});


module.exports = router;
