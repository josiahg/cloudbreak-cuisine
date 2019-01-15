var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

var request = require('request');

router.route('/').get((req, res) => {
    request('http://whoville:5000/api/whoville/v1/getMenu', function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurre
        var message = JSON.parse(body)
        var keys = Object.keys(message)
        var results = [];
        var i = 1000;
        keys.forEach((key)=>{
            var r = {};
            r.id = i++;
            r.name = key;
            r.version = 'Whoville';
            r.description = message[key].desc;
            r.image = '../../assets/img/cuisine/whoville-bundle.png';
            r.download_url = '';
            db.none('insert into cloudbreak_cuisine.whoville values($1,$2,$3,$4,$5,$6) on conflict(id) do nothing', [r.id, r.name, r.version,r.description,r.image,r.download_url])
                .then(() => {
                    // success;
                })
                .catch(error => {
                    console.log("DB Error: ", error);
                });
            results.push(r);
        });
        res.json(results);
      });
});

router.route('/item/:id').get((req, res) => {
    db.one('select * from cloudbreak_cuisine.whoville where id = ' + req.params.id)
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