var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.recipes')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/:id').get((req, res) => {
    db.one('select * from cloudbreak_cuisine.recipes where id = ' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});
router.route('/:id/details').get((req, res) => {
    db.any('select cloudbreak_cuisine.recipes.*, cloudbreak_cuisine.services.service_description, cloudbreak_cuisine.clusters.cluster_type, cloudbreak_cuisine.clusters.version '+
           'from cloudbreak_cuisine.recipes, cloudbreak_cuisine.services, cloudbreak_cuisine.clusters '+ 
           'where cloudbreak_cuisine.recipes.serviceid = cloudbreak_cuisine.services.id '+
           'and cloudbreak_cuisine.services.cluster_id = cloudbreak_cuisine.clusters.id '+
           'and cloudbreak_cuisine.recipes.id = ' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

module.exports = router;
