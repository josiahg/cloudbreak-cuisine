var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

var request = require('request');
var encode = require('nodejs-base64-encode');

router.route('/deletestack/:name').get((req, res) => {
    var stackId = 0;

    console.log("STACK ID = " + stackId)
    request('http://whoville:5000/api/whoville/v1/getStacks', function (error, response, body) {
        if (body) {
        var message = JSON.parse(body)
        for(var key in message){
            if (message[key].name.toString() === req.params.name.toString()) {
                stackId = message[key].id;
            }
        }

        console.log("STACK ID = " + stackId)
        request('http://whoville:5000/api/whoville/v1/deleteStack?clusterId='+stackId, function (error, response, body) {
        if (body) {
            res.json("Stack " + stackId + " was deleted!");
        }

        

    })

    } else {
        res.json("No Stack found")
    }
})

    

    
   
      

});



router.route('/refresh').get((req, res) => {
    request('http://whoville:5000/api/whoville/v1/getMenu', function (error, response, body) {
        if(body){
        //console.log('error:', error); // Print the error if one occurre
        var message = JSON.parse(body)
        var keys = Object.keys(message)

        var i = 1;
        var dep_id = 1;
        var content_id = 1;
        keys.forEach((key)=>{
            var r = {};
            r.id = i;
            r.name = key;
            r.description = message[key].desc;
            r.image = '../../assets/img/cuisine/whoville-bundle.png';
            r.type = 'whoville';

            if(message[key].blueprint){
             
              var cbp = {};
              cbp.id = content_id;
              cbp.bundle_id = i;
              cbp.content = "whoville/v1/"+key+"/master/"+message[key].blueprint['name'];
              db.none('insert into cloudbreak_cuisine.whoville_bundles_contents (id, bundle_id, type, content) values($1,$2,$3,$4) on conflict(id) DO UPDATE set id=$1, bundle_id=$2, type=$3, content=$4', [cbp.id, cbp.bundle_id, 'BLUEPRINT',cbp.content])
                .then(() => {
                    // success;
                })
                .catch(error => {
                    console.log("DB Error: ", error);
                });
                content_id++;
            }

            var cy = {};
            cy.id = content_id;
            cy.bundle_id = i;
            cy.content = "whoville/v1/"+key+"/master/"+key+".yaml";
              db.none('insert into cloudbreak_cuisine.whoville_bundles_contents (id, bundle_id, type, content) values($1,$2,$3,$4) on conflict(id) DO UPDATE set id=$1, bundle_id=$2, type=$3, content=$4', [cy.id, cy.bundle_id, 'YAML',cy.content])
                .then(() => {
                    // success;
                })
                .catch(error => {
                    console.log("DB Error: ", error);
                });
            
                content_id++;

            if(message[key].input){
            r.dep_id = dep_id;
            r.input = Buffer.from(JSON.stringify(message[key].input, null, 4)).toString('base64');
            db.none('insert into cloudbreak_cuisine.whoville_bundles_dependencies (id, bundle_id, dep_type, dep_desc) values($1,$2,$3,$4) on conflict(id) DO UPDATE set id=$1, bundle_id=$2, dep_type=$3, dep_desc=$4', [r.dep_id, r.id, 'INPUT',r.input])
                .then(() => {
                    // success;
                })
                .catch(error => {
                    console.log("DB Error: ", error);
                });
                dep_id++;
            } else {
                r.input = null; 
            }
            
            if(message[key].infra){
                r.dep_id = dep_id;
                r.stack = Buffer.from(JSON.stringify(message[key].infra, null, 4)).toString('base64');
                db.none('insert into cloudbreak_cuisine.whoville_bundles_dependencies (id, bundle_id, dep_type, dep_desc) values($1,$2,$3,$4) on conflict(id) DO UPDATE set id=$1, bundle_id=$2, dep_type=$3, dep_desc=$4', [r.dep_id, r.id, 'STACK',r.stack])
                    .then(() => {
                        // success;
                    })
                    .catch(error => {
                        console.log("DB Error: ", error);
                    });

                dep_id++;
                    } else {
                        r.stack = null; 
                    }
                
            
                    if(message[key].recipe) {
                    var recipes = message[key].recipe;
                    for(var j = 0; j < recipes.length; j++)
                    {
                        var d = {};
                        d.dep_id = dep_id;
                        d.id = i;
                        d.value = recipes[j].name + " (" + recipes[j].typ + ")";
                        db.none('insert into cloudbreak_cuisine.whoville_bundles_dependencies (id, bundle_id, dep_type, dep_desc) values($1,$2,$3,$4) on conflict(id) DO UPDATE set id=$1, bundle_id=$2, dep_type=$3, dep_desc=$4', [d.dep_id, d.id, 'RECIPE',d.value])
                        .then(() => {
                            // success;
                        })
                        .catch(error => {
                            console.log("DB Error: ", error);
                        });
                        
                dep_id++;
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

      i++;
        });
        db.any('select * from cloudbreak_cuisine.whoville_bundles')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
    } else {

        res.json("no data");
    }

      });
      
});



router.route('/refreshProfile').get((req, res) => {
    request('http://whoville:5000/api/whoville/v1/getProfile', function (error, response, body) {
        if(body){
            var message = JSON.parse(body);
            var whoville_profile_id = 1;
    request('http://whoville:5000/api/whoville/v1/getCB', function (error2, response2, body2) {
        if(body2){
            // Profile Overview
    
    var profile_id = 1;
    var namespace = message.namespace;
    var user_mode = message.user_mode;
          var  cb_url = JSON.parse(body2)[0];
            
            var default_user = message.username;
            var default_email = message.email;
            var default_pwd = message.password;
        
            db.none('insert into cloudbreak_cuisine.whoville_profile (id, profile_id, namespace, user_mode, cb_url, default_user, default_email, default_pwd) '+
                    'values($1,$2,$3,$4,$5,$6,$7,$8) on conflict(id) DO UPDATE '+
                    'set id=$1, profile_id=$2, namespace=$3, user_mode=$4, cb_url=$5, default_user=$6, default_email=$7, default_pwd=$8', 
                    [whoville_profile_id, profile_id, namespace, user_mode, cb_url, default_user, default_email, default_pwd])
            .then(() => {
                // success;
            })
            .catch(error => {
                console.log("DB Error: ", error);
            });
        }
    });
    

    // Profile Tags
    var tagTable = message['tags'];
    var tag_id = 1;
    for(var key in tagTable){
        db.none('insert into cloudbreak_cuisine.whoville_profile_tags (id, whoville_profile_id, tag_name, tag_value) '+
            'values($1,$2,$3,$4) on conflict(id) DO UPDATE '+
            'set id=$1, whoville_profile_id=$2, tag_name=$3, tag_value=$4', 
            [tag_id, whoville_profile_id, key, tagTable[key]])
        .then(() => {
            // success;
        })
        .catch(error => {
            console.log("DB Error: ", error);
        });
        tag_id++;
    }


    // Profile credentials
    var credential_id = 1;
    var type = 'aws';
    var type_img = '../../assets/img/cuisine/aws.png';
    var provider = message['platform'].provider;
    var region = message['platform'].region;
    var bucket = message.bucket;
    var bucketrole = message.bucketrole;


        db.none('insert into cloudbreak_cuisine.whoville_profile_credentials (id, whoville_profile_id, type, type_img, provider, region, bucket, bucket_role) '+
            'values($1,$2,$3,$4,$5,$6,$7,$8) on conflict(id) DO UPDATE '+
            'set id=$1, whoville_profile_id=$2, type=$3, type_img=$4, provider=$5, region=$6, bucket=$7, bucket_role=$8', 
            [credential_id, whoville_profile_id, type, type_img, provider, region, bucket, bucketrole])
        .then(() => {
            // success;
        })
        .catch(error => {
            console.log("DB Error: ", error);
        });
  
        res.json("refresh successful");
    }else {

        res.json("no data");
    }

      });
    
    

});


router.route('/').get((req, res) => {
        db.any('select * from cloudbreak_cuisine.whoville_bundles order by id asc')
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
    db.one('select name from cloudbreak_cuisine.whoville_bundles where id = ' + req.params.id)
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