var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

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

router.route('/push/bundle').post((req2, res) => {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    var request = require("request");



    var options = { method: 'POST',
      url: 'https://'+ req2.body.cb_url +'/cb/api/v1/blueprints/user',
      headers: 
       { 
        Authorization: 'Bearer ' + req2.body.token,
        'Content-Type': 'application/json' },
      body: 
        {
            ambariBlueprint: req2.body.blueprint,
            description: req2.body.description,
            inputs: [],
            tags: {},
            name: req2.body.name,
            hostGroupCount: 1,
            status: 'USER_MANAGED',
            public: true
        },
    json: true };
  
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      
        res.json(body);


    });

    
});


router.route('/delete/recipe').post((req2, res) => {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    var request = require("request");


    var options = { method: 'DELETE',
      url: 'https://'+ req2.body.cb_url +'/cb/api/v1/recipes/user/' + req2.body.name,
      headers: 
       { 
        Authorization: 'Bearer ' + req2.body.token,
        'Content-Type': 'application/json' }};
  

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      
        res.json(body);


    });

    
});

router.route('/push/recipe').post((req2, res) => {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    var request = require("request");


    var options = { method: 'POST',
      url: 'https://'+ req2.body.cb_url +'/cb/api/v1/recipes/user',
      headers: 
       { 
        Authorization: 'Bearer ' + req2.body.token,
        'Content-Type': 'application/json' },
      body: 
        {
            name: req2.body.name,
            content: req2.body.content,
            description: req2.body.description,
            recipeType: req2.body.recipeType
        },
    json: true };
  

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      
        res.json(body);


    });

    
});



module.exports = router;
