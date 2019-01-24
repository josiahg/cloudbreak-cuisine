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


router.route('/item/:id/download').get((req, res) => {

    // Writing all the files
  const fs = require('fs');
  const zip = require('express-zip');

  var files = [];


   var bpStrFile = '/bundle'+req.params.id+'/blueprint-bundle'+req.params.id+'.json';
   var ymlStrFile = '/bundle'+req.params.id+'/yaml-bundle'+req.params.id+'.yaml';
   if (!fs.existsSync('/bundle'+req.params.id)){
    fs.mkdirSync('/bundle'+req.params.id);
}
   // 1. Writing Blueprint 
    db.one('select content from cloudbreak_cuisine.bundles_contents where type=\'BLUEPRINT\' and bundle_id =' + req.params.id)
        .then(bpData => {
            var bp = Buffer.from(bpData.content, 'base64');
            fs.writeFile(bpStrFile, bp, (err) => {  
                if (err) throw err;})
            }).then(
                 // 2. Writing yaml
                db.one('select content from cloudbreak_cuisine.bundles_contents where type=\'YAML\' and bundle_id =' + req.params.id)
                .then(ymlData => {
                    var yml = Buffer.from(ymlData.content, 'base64');
                    fs.writeFile(ymlStrFile, yml, (err) => {  
                        if (err) throw err;})
                    })
            ).then(
                // 3. Writing recipes
                db.any('select cloudbreak_cuisine.recipes.* from cloudbreak_cuisine.bundles_dependencies, cloudbreak_cuisine.recipes ' +
                'where cloudbreak_cuisine.bundles_dependencies.dep_id = cloudbreak_cuisine.recipes.id ' +
                'and dep_type = \'RECIPES\' ' +
                'and bundle_id =' + req.params.id)
             .then(recipeData => {

                
                 for(var key in recipeData){
                     var filename ='/bundle'+req.params.id+'/';
                     var filecontent = Buffer.from(recipeData[key].content, 'base64');
                    if(recipeData[key].recipe_type === 'Pre Ambari Start'){
                        filename = filename + 'pras-'
                    } else if(recipeData[key].recipe_type === 'Post Cluster Install'){
                        filename = filename + 'poci-'
                    } else if(recipeData[key].recipe_type === 'Post Ambari Start'){
                        filename = filename + 'poas-'
                    } else if(recipeData[key].recipe_type === 'On Termination'){
                        filename = filename + 'onte-'
                    }
                    filename = filename + 'bundle' +req.params.id+ '-recipe' + recipeData[key].id + '.sh'
                    //console.log(filename);
                    fs.writeFile(filename, filecontent, (err) => {  
                        if (err) throw err;})
                    }
                    })
         
           
           ).then(
            fs.readdir('/bundle'+req.params.id+'/', function(err, items) {
                // 4. Zipping
                if (err) throw err;
                for (var i=0; i<items.length; i++) {

                    files.push({path: '/bundle'+req.params.id+'/'+items[i], name: items[i]});
                    
                   // console.log(items[i]);
                }
                res.zip(files, 'cuisine-bundle'+req.params.id+'.zip');
            }))
        .catch(error => {
            console.log('ERROR:', error)
        })
  


});

module.exports = router;
