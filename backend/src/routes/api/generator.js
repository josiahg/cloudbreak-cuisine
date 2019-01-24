var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();




router.route('/getserviceconfig/:id').get((req, res) => {
    db.any('select config from cloudbreak_cuisine.components_blueprints where service_id=$1 and config != \'\' and config is not null', req.params.id)
    .then(data => res.json(data))
    .catch(error => {

        res.json("")
        console.log('ERROR:', error)
    });
        
            
});


router.route('/mastercomponents/:id').get((req, res) => {
    db.any('select master_blueprint from cloudbreak_cuisine.components_blueprints where service_id=$1 and master_blueprint != \'\' and master_blueprint is not null', req.params.id)
    .then(data => res.json(data))
    .catch(error => {

        res.json("")
        console.log('ERROR:', error)
    });
        
            
});

router.route('/workercomponents/:id').get((req, res) => {
    db.any('select worker_blueprint from cloudbreak_cuisine.components_blueprints where service_id=$1 and worker_blueprint != \'\' and worker_blueprint is not null', req.params.id)
    .then(data => res.json(data))
    .catch(error => {

        res.json("")
        console.log('ERROR:', error)
    });
        
            
});

router.route('/computecomponents/:id').get((req, res) => {
    db.any('select compute_blueprint from cloudbreak_cuisine.components_blueprints where service_id=$1 and compute_blueprint != \'\' and compute_blueprint is not null', req.params.id)
    .then(data => res.json(data))
    .catch(error => {

        res.json("")
        console.log('ERROR:', error)
    });
        
            
});

router.route('/nextid').get((req, res) => {
    db.one('select nextval(pg_get_serial_sequence(\'cloudbreak_cuisine.bundles\',\'id\')) as id')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/maxid').get((req, res) => {
    db.one('select max(id) as id from cloudbreak_cuisine.bundles' )
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});
router.route('/insert/dependency').post((req, res) => {

    db.none('insert into cloudbreak_cuisine.bundles_dependencies (bundle_id, dep_type, dep_id) values($1,$2,$3)', [req.body.bundle_id, req.body.dep_type, req.body.dep_id])
    .then(data => res.json("insert successful"))
    .catch(error => {

        res.json("insert not successful")
        console.log('ERROR:', error)
    });
        
            
});

router.route('/insert/bundle').post((req, res) => {

    db.none('insert into cloudbreak_cuisine.bundles (name, description, image, type) values($1,$2,$3, $4)', [req.body.name, req.body.description, 'image../../assets/img/cuisine/local-bundle.png', 'local'])
    .then(data => res.json("insert successful"))
    .catch(error => {

        res.json("insert not successful")
        console.log('ERROR:', error)
    });
        
            
});

router.route('/insert/content').post((req, res) => {

    db.none('insert into cloudbreak_cuisine.bundles_contents (bundle_id, type, content) values($1,$2,$3)', [req.body.bundle_id, req.body.type, req.body.content])
    .then(data => res.json("insert successful"))
    .catch(error => {

        res.json("insert not successful")
        console.log('ERROR:', error)
    });
        
            
});



router.route('/delete/bundle_contents/:id').get((req, res) => {

    db.none('delete from cloudbreak_cuisine.bundles_contents where bundle_id = $1', req.params.id)
    .then(res.json("delete successful"))
    .catch(error => {
        res.json("delete not successful")
        console.log('ERROR:', error)
    });
        
            
});


router.route('/delete/bundle_dependencies/:id').get((req, res) => {

    db.none('delete from cloudbreak_cuisine.bundles_dependencies where bundle_id = $1', req.params.id)
    .then(res.json("delete successful"))
    .catch(error => {
        res.json("delete not successful")
        console.log('ERROR:', error)
    });
        
            
});


router.route('/delete/bundle/:id').get((req, res) => {

    db.none('delete from cloudbreak_cuisine.bundles where id = $1', req.params.id)
    .then(res.json("delete successful"))
    .catch(error => {
        res.json("delete not successful")
        console.log('ERROR:', error)
    });
        
            
});



module.exports = router;
