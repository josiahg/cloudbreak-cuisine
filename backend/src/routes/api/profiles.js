var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.profiles')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/whoville').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.whoville_profile')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});


router.route('/tags').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.whoville_profile_tags')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/credentials').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.whoville_profile_credentials')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/nextid').get((req, res) => {
    db.any('select nextval(pg_get_serial_sequence(\'cloudbreak_cuisine.profiles\',\'id\')) as id')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});


router.route('/del/:id').post((req, res) => {


db.any('delete from cloudbreak_cuisine.profiles where id = ' + req.params.id)
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.log('ERROR:', error)
    })
});

router.route('/set').post((req, res) => {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    } 
    if (mm < 10) {
      mm = '0' + mm;
    } 
    var today = yyyy+ '/' + mm + '/' + dd ;

    db.any('insert into cloudbreak_cuisine.profiles (profile_type, name, user_name, base_url, cloud_type, cloud_type_img, profile_file, registered, status) values (\'' + req.body.profileType + '\',\'' + req.body.profileName + '\',\'' + req.body.associatedUser + '\',\'' + req.body.baseURL + '\', \'AWS\', \'../../assets/img/cuisine/aws.png\', \''+ req.body.file +'\', \''+ today +'\',  \''+ req.body.status + '\')')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/:id').get((req, res) => {
    db.one('select * from cloudbreak_cuisine.profiles where id = ' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});


module.exports = router;
