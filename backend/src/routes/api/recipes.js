var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.recipes order by id')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});
router.route('/nextid').get((req, res) => {
    db.any('select nextval(pg_get_serial_sequence(\'cloudbreak_cuisine.recipes\',\'id\')) as id')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/delete/:id').get((req, res) => {
    db.none('delete from cloudbreak_cuisine.recipes where id =' + req.params.id)
        .then(data => {
            res.json("Delete Successful!");
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});


router.route('/checkcompatibility').post((req2, res) => {
    

    db.one('select s.id as serviceid, c.id as clusterid from cloudbreak_cuisine.clusters c, cloudbreak_cuisine.services s '+
           'where c.cluster_type = \''+req2.body.cluster_type +'\' '+
           'and c.version = \''+req2.body.cluster_version +'\' '+
           'and s.service_description = \''+req2.body.service_description +'\' '+
           'and s.cluster_id = c.id') 
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        res.json("no data");
        console.log('ERROR:', error)
    })

    
});


router.route('/update_recipe').post((req2, res) => {
    
     db.none('update cloudbreak_cuisine.recipes set serviceid=$1, recipename=$2, recipedescription=$3, addon_type=$4, recipe_type=$5, mandatory=$6, display=$7, content=$8' +
            'where id = $9', [req2.body.serviceid, req2.body.recipename, req2.body.recipedescription, req2.body.addon_type, req2.body.recipe_type, req2.body.mandatory, req2.body.display, req2.body.content, req2.body.id]) 
     .then(() => {
       
         res.json("Update Sucessful!");
     })
     .catch(error => {
         res.json("Update failed!");
         console.log('ERROR:', error)
     })
 
     
 });

 router.route('/insert_recipe').post((req2, res) => {
    
    db.none('insert into cloudbreak_cuisine.recipes (id, serviceid, recipename, recipedescription, addon_type, recipe_type, mandatory, display, content)  values ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
    [req2.body.id, req2.body.serviceid, req2.body.recipename, req2.body.recipedescription, req2.body.addon_type, req2.body.recipe_type, req2.body.mandatory, req2.body.display, req2.body.content]) 
    .then(() => {
      
        res.json("Update Sucessful!");
    })
    .catch(error => {
        res.json("Update failed!");
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
