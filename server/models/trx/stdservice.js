var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });
var async = require("async");

exports.getAllStdservice = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdStdservice, StdServiceDesc, ProjectCode, Roleplay, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM StdService', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllStdserviceByCriteria = function (StdService, done) {
    var wh = db.whereCriteriaGenerator(StdService);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT KdStdservice, StdServiceDesc, ProjectCode, Roleplay, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM StdService" + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllStdserviceVal = function (branchCode, projectCode, done) {
    let values = [branchCode, projectCode];
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT ss.KdStdservice, ss.StdServiceDesc, ss.ProjectCode, ss.Roleplay, ssv.Value, ssv.BranchCode FROM StdService ss INNER JOIN StdServiceValue ssv on ss.KdStdService = ssv.KdStdService WHERE ssv.BranchCode = ? AND ss.ProjectCode = ?", values, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertStdservice = function (StdService, done) {
    var values = [StdService.StdServiceDesc, StdService.ProjectCode, StdService.Roleplay, StdService.Username]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_StdserviceGenerator(?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.insertStdserviceVal = function (StdService, done) {
    var values = [StdService.KdStdservice, StdService.BranchCode, StdService.Value]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_StdServiceValueGenerator(?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.insertStdserviceValBulk = function (StdServices, done) {
    async.everySeries(StdServices, (value, callback) => {
        var values = [value.KdStdservice, value.BranchCode, value.Value];
        db.get(db.trx, function (err, connection) {
            if (err) return done('Database problem')
            connection.query('CALL sp_StdServiceValueGenerator(?,?,?)', values, function (err, result) {
                connection.release();
                if (err) return callback(err,result[0][0]);
                callback(null,result[0][0]);
            });
        });
    }, (err, res) => {
        if (err) console.error(err.message);
        done(null, res);
    });
    
}

exports.updateStdservice = function (key, StdService, done) {
    var values = [StdService.StdServiceDesc, StdService.ProjectCode, StdService.Roleplay, StdService.Username, key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE StdService SET StdServiceDesc = ? ,ProjectCode = ? ,Roleplay = ? ,LastModifiedDate = NOW() ,LastModifiedBy = ? where KdStdService=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteStdservice = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE from StdService where KdStdservice=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}