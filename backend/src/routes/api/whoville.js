var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

var request = require('request');
var encode = require('nodejs-base64-encode');

router.route('/refresh').get((req, res) => {
    request('http://whoville:5000/api/whoville/v1/getMenu', function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurre
        var message = JSON.parse(body)
        var keys = Object.keys(message)

        var i = 0;
        var dep_id = 0;
        var content_id = 0;
        keys.forEach((key)=>{
            var r = {};
            r.id = i++;
            r.name = key;
            r.description = message[key].desc;
            r.image = '../../assets/img/cuisine/whoville-bundle.png';
            r.type = 'whoville';

            if(message[key].blueprint){
             
              var cbp = {};
              cbp.id = content_id++;
              cbp.bundle_id = i;
              cbp.content = "whoville/v1/"+key+"/master/"+message[key].blueprint['name'];
              db.none('insert into cloudbreak_cuisine.whoville_bundles_contents (id, bundle_id, type, content) values($1,$2,$3,$4) on conflict(id) DO UPDATE set id=$1, bundle_id=$2, type=$3, content=$4', [cbp.id, cbp.bundle_id, 'BLUEPRINT',cbp.content])
                .then(() => {
                    // success;
                })
                .catch(error => {
                    console.log("DB Error: ", error);
                });

            }

            var cy = {};
            cy.id = content_id++;
            cy.bundle_id = i;
            cy.content = "whoville/v1/"+key+"/master/"+key+".yaml";
              db.none('insert into cloudbreak_cuisine.whoville_bundles_contents (id, bundle_id, type, content) values($1,$2,$3,$4) on conflict(id) DO UPDATE set id=$1, bundle_id=$2, type=$3, content=$4', [cy.id, cy.bundle_id, 'YAML',cy.content])
                .then(() => {
                    // success;
                })
                .catch(error => {
                    console.log("DB Error: ", error);
                });
            

            if(message[key].input){
            r.dep_id = dep_id++;
            r.input = Buffer.from(JSON.stringify(message[key].input, null, 4)).toString('base64');
            db.none('insert into cloudbreak_cuisine.whoville_bundles_dependencies (id, bundle_id, dep_type, dep_desc) values($1,$2,$3,$4) on conflict(id) DO UPDATE set id=$1, bundle_id=$2, dep_type=$3, dep_desc=$4', [r.dep_id, r.id, 'INPUT',r.input])
                .then(() => {
                    // success;
                })
                .catch(error => {
                    console.log("DB Error: ", error);
                });
            } else {
                r.input = null; 
            }
            
            if(message[key].infra){
                r.dep_id = dep_id++;
                r.stack = Buffer.from(JSON.stringify(message[key].infra, null, 4)).toString('base64');
                db.none('insert into cloudbreak_cuisine.whoville_bundles_dependencies (id, bundle_id, dep_type, dep_desc) values($1,$2,$3,$4) on conflict(id) DO UPDATE set id=$1, bundle_id=$2, dep_type=$3, dep_desc=$4', [r.dep_id, r.id, 'STACK',r.stack])
                    .then(() => {
                        // success;
                    })
                    .catch(error => {
                        console.log("DB Error: ", error);
                    });
                    } else {
                        r.stack = null; 
                    }
                
            
                    if(message[key].recipe) {
                    var recipes = message[key].recipe;
                    for(var j = 0; j < recipes.length; j++)
                    {
                        var d = {};
                        d.dep_id = dep_id++;
                        d.id = i;
                        d.value = recipes[j].name + " (" + recipes[j].typ + ")";
                        db.none('insert into cloudbreak_cuisine.whoville_bundles_dependencies (id, bundle_id, dep_type, dep_desc) values($1,$2,$3,$4) on conflict(id) DO UPDATE set id=$1, bundle_id=$2, dep_type=$3, dep_desc=$4', [d.dep_id, d.id, 'RECIPE',d.value])
                        .then(() => {
                            // success;
                        })
                        .catch(error => {
                            console.log("DB Error: ", error);
                        });
                        
                    }
                }

            
            db.none('insert into cloudbreak_cuisine.whoville_bundles (id, name, description, image, type) values($1,$2,$3,$4,$5) on conflict(id) DO UPDATE set id=$1, name=$2, description=$3, image=$4, type=$5', [r.id, r.name, r.description,r.image,r.type])
                .then(() => {
                    // success;
                })
                .catch(error => {
                    console.log("DB Error: ", error);
                });
            //results.push(r);
        });
        db.any('select * from cloudbreak_cuisine.whoville_bundles')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
      });
});


router.route('/').get((req, res) => {
        db.any('select * from cloudbreak_cuisine.whoville_bundles')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/item/:id').get((req, res) => {
    db.one('select * from cloudbreak_cuisine.whoville_bundles where id = ' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});


router.route('/item/:id/dependencies/stack').get((req, res) => {
    db.one('select * from cloudbreak_cuisine.whoville_bundles_dependencies where dep_type=\'STACK\' and bundle_id = ' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/item/:id/dependencies/input').get((req, res) => {
    db.one('select * from cloudbreak_cuisine.whoville_bundles_dependencies where dep_type=\'INPUT\' and bundle_id = ' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/item/:id/dependencies/recipes').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.whoville_bundles_dependencies where dep_type=\'RECIPE\' and bundle_id = ' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/item/:id/contents').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.whoville_bundles_contents where bundle_id =' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/deploy/:id').get((req,res) => {
    db.one('select name from cloudbreak_cuisine.whoville where id = ' + req.params.id)
        .then(data => {
            request('http://whoville:5000/api/whoville/v1/deployPackage?clusterType='+data.name, function(error,response,body) {
                res.json(body)
            })
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
})

module.exports = router;