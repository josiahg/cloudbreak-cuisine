var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.bundles')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/item/:id').get((req, res) => {
    db.one('select * from cloudbreak_cuisine.bundles where id=' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/item/:id/dependencies/cluster').get((req, res) => {
    db.any('select cloudbreak_cuisine.clusters.* from cloudbreak_cuisine.bundles_dependencies, cloudbreak_cuisine.clusters ' +
           'where cloudbreak_cuisine.bundles_dependencies.dep_id = cloudbreak_cuisine.clusters.id ' +
           'and dep_type = \'CLUSTER\' ' +
           'and bundle_id =' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/item/:id/dependencies/services').get((req, res) => {
    db.any('select cloudbreak_cuisine.services.* from cloudbreak_cuisine.bundles_dependencies, cloudbreak_cuisine.services ' +
           'where cloudbreak_cuisine.bundles_dependencies.dep_id = cloudbreak_cuisine.services.id ' +
           'and dep_type = \'SERVICES\' ' +
           'and bundle_id =' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/item/:id/dependencies/recipes').get((req, res) => {
    db.any('select cloudbreak_cuisine.recipes.* from cloudbreak_cuisine.bundles_dependencies, cloudbreak_cuisine.recipes ' +
           'where cloudbreak_cuisine.bundles_dependencies.dep_id = cloudbreak_cuisine.recipes.id ' +
           'and dep_type = \'RECIPES\' ' +
           'and bundle_id =' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/item/:id/contents').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.bundles_contents where bundle_id =' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

module.exports = router;
