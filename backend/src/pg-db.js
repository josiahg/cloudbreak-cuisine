const assert = require('assert');
//const config = require("../config");

const pgp = require('pg-promise')({});

let _db;

module.exports = {
    getDb,
    initDb
};

function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }
    _db = pgp('postgres://postgres:pg_pass123!@db:5432/postgres');

    /*client.connect(config.db.connectionString, config.db.connectionOptions, connected);
    function connected(err, db) {
        if (err) {
            return callback(err);
        }
        console.log("DB initialized - connected to: " + config.db.connectionString.split("@")[1]);
        _db = db;
        return callback(null, _db);
    }*/

}

function getDb() {
    assert.ok(_db, "Db has not been initialized. Please call init first.");
    return _db;
}