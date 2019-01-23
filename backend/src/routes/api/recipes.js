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

router.route('/checkcompatibility').post((req2, res) => {
   console.log('select s.id as serviceid, c.id as clusterid from cloudbreak_cuisine.clusters c, cloudbreak_cuisine.services s '+
   'where c.cluster_type = \''+req2.body.cluster_type +'\' '+
   'and c.version = \''+req2.body.cluster_version +'\' '+
   'and s.service_description = \''+req2.body.service_description +'\' '+
   'and s.cluster_id = c.id');
    db.one('select s.id as serviceid, c.id as clusterid from cloudbreak_cuisine.clusters c, cloudbreak_cuisine.services s '+
           'where c.cluster_type = \''+req2.body.cluster_type +'\' '+
           'and c.version = \''+req2.body.cluster_version +'\' '+
           'and s.service_description = \''+req2.body.service_description +'\' '+
           'and s.cluster_id = c.id') 
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
    db.one('select cloudbreak_cuisine.recipes.*, cloudbreak_cuisine.services.service_description, cloudbreak_cuisine.clusters.cluster_type, cloudbreak_cuisine.clusters.version '+
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
