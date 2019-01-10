var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/').get((req, res) => {
    db.any('select *  from cloudbreak_cuisine.users')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/nextid').get((req, res) => {
    db.any('select nextval(pg_get_serial_sequence(\'cloudbreak_cuisine.users\',\'id\')) as id')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/del/:id').post((req, res) => {


    db.any('delete from cloudbreak_cuisine.users where id = ' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
    });

router.route('/:id').get((req, res) => {
    db.one('select * from cloudbreak_cuisine.users where id = ' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});


module.exports = router;
