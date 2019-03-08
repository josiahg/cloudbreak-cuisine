var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();



router.route('/login').post((req, res) => {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  
    var request = require("request");

    var options = { method: 'POST',
      url: 'https://'+ req.body.di_url +':7189/api/d6.1/login',
      headers: 
    { 'cache-control': 'no-cache',
      'Content-Type': 'application/json' },
    body: { username: req.body.username, password: req.body.password },
    json: true };
      
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      
      res.json(response.headers["set-cookie"][0]);
    });

    
});


router.route('/list/deployments').post((req, res) => {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  
    var request = require("request");

    request.get({
      url:'https://'+req.body.di_url+':7189/api/d6.1/environments/'+req.body.environment+'/deployments',
      headers: { Cookie: req.body.cookie }
       },function(error, response, body){
      if (error) throw new Error(error);
    

            res.json(JSON.parse(body));
   
    });

    
});


router.route('/list/clusters').post((req, res) => {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  
    var request = require("request");

    request.get({
      url:'https://'+req.body.di_url+':7189/api/d6.1/environments/'+req.body.environment+'/deployments/'+req.body.deployment+'/clusters',
      headers: { Cookie: req.body.cookie }
       },function(error, response, body){
      if (error) throw new Error(error);
    

            res.json(JSON.parse(body));
   
    });

    
});

router.route('/cluster/status').post((req, res) => {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  
    var request = require("request");

    request.get({
      url:'https://'+req.body.di_url+':7189/api/d6.1/environments/'+req.body.environment+'/deployments/'+req.body.deployment+'/clusters/'+req.body.cluster+'/status',
      headers: { Cookie: req.body.cookie }
       },function(error, response, body){
      if (error) throw new Error(error);
    

            res.json(JSON.parse(body));
   
    });

    
});

router.route('/delete/cluster').post((req, res) => {

  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  var request = require("request");


  var options = { method: 'DELETE',
    url: 'https://'+req.body.di_url+':7189/api/d6.1/environments/'+req.body.environment+'/deployments/'+req.body.deployment+'/clusters/'+req.body.cluster,
    headers: { Cookie: req.body.cookie }}


  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    
      res.json(body);


  });

    
});

router.route('/deployment/details').post((req, res) => {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  
    var request = require("request");

    request.get({
      url:'https://'+req.body.di_url+':7189/api/d6.1/environments/'+req.body.environment+'/deployments/'+req.body.deployment,
      headers: { Cookie: req.body.cookie }
       },function(error, response, body){
      if (error) throw new Error(error);
    

            res.json(JSON.parse(body));
   
    });

    
});



module.exports = router;
