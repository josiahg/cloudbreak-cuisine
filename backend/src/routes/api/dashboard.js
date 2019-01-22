var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/getCB').get((req2, res) => {
   
    var request = require("request");

    var options = { method: 'GET',
      url: 'http://whoville:5000/api/whoville/v1/getCB'
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      //console.log(JSON.parse(body)[0]);
        res.json(JSON.parse(body)[0]);


    });

    
});

router.route('/gettoken').post((req2, res) => {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    var request = require("request");

    var options = { method: 'POST',
      url: 'https://'+ req2.body.cb_url +'/identity/oauth/authorize',
      qs: 
       { response_type: 'token',
         client_id: 'cloudbreak_shell',
         'scope.0': 'openid',
         source: 'login',
         redirect_uri: 'http://cloudbreak.shell'},
      headers: 
       { 'Content-Type': 'application/x-www-form-urlencoded',
         accept: 'application/x-www-form-urlencoded' },
         body: 'credentials={"username":"'+ req2.body.user +'","password":"'+ req2.body.password +'"}' };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const querystring = require('querystring');
      res.json(querystring.parse(response.headers['location'])['access_token']);

    });

    
});

router.route('/getbundleid').post((req2, res) => {
   
    db.one('select id from cloudbreak_cuisine.whoville_bundles where name like \'%' + req2.body.name +'%\' limit 1') 
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.log('ERROR:', error)
    })

    
});


router.route('/getclusters').post((req2, res) => {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    var request = require("request");

    var options = { method: 'GET',
      url: 'https://'+ req2.body.cb_url +'/cb/api/v1/stacks/account',
      headers: 
       { 
        Authorization: 'Bearer ' + req2.body.token,
        'Content-Type': 'application/json' }
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      
        res.json(JSON.parse(body));


    });

    
});



module.exports = router;
