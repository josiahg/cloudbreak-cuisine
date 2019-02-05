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



router.route('/item/download/create/folder').post((req, res) => {
    const fs = require('fs');

    const path = require('path');

    if (!fs.existsSync(req.body.folderName)){
        fs.mkdirSync(req.body.folderName);
    } else {
        fs.readdir(req.body.folderName, (err, files) => {
            if (err) throw err;
       
            for (const file of files) {
              fs.unlink(path.join(req.body.folderName, file), err => {
                if (err) throw err;
              });
            }
          });
    }

    res.json("Folder " + req.body.folderName + " prepared")


});


router.route('/item/download/create/file').post((req, res) => {
    const fs = require('fs');

    var file = Buffer.from(req.body.content, 'base64');
    fs.writeFile(req.body.fileName, file, (err) => {  
        if (err) throw err;})
    res.json("File " + req.body.fileName + " created")


});

router.route('/item/download/zip/').get((req, res) => {
    const fs = require('fs');
    const zip = require('express-zip');

    var files = []
    fs.readdir(req.query.folderName, function(err, items) {
        if (err) throw err;
        for (var i=0; i<items.length; i++) {

            files.push({path: req.query.folderName+'/'+items[i], name: items[i]});
            
            console.log(items[i]);
        }

       res.zip(files, req.query.fileName);
    })



});


module.exports = router;
