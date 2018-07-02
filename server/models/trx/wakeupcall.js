var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllWakeupcall = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdWakeUpCall, ProjectCode, BranchCode, UrlVideo, HighlightDesc, Active, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM WakeUpCall', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getLastWakeupcall = function (branchCode, projectCode, done) {
    var values = [branchCode, projectCode]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdWakeUpCall, ProjectCode, BranchCode, UrlVideo, HighlightDesc, Active, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM WakeUpCall where BranchCode = ? and ProjectCode = ? and Active = 1 ORDER BY CreatedDate DESC LIMIT 1', values,function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllWakeupcallByCriteria = function (Wakeupcall, done) {
    var wh = db.whereCriteriaGenerator(Wakeupcall);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT KdWakeUpCall, ProjectCode, BranchCode, UrlVideo, HighlightDesc, Active, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM WakeUpCall"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertWakeupcall = function (Wakeupcall, done) {
    var values = [Wakeupcall.ProjectCode, Wakeupcall.BranchCode, Wakeupcall.UrlVideo, Wakeupcall.HighlightDesc, Wakeupcall.Username ]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_WakeUpCallGenerator(?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateWakeupcall = function (key, Wakeupcall, done) {
    var values = [Wakeupcall.ProjectCode, Wakeupcall.BranchCode, Wakeupcall.UrlVideo, Wakeupcall.HighlightDesc, Wakeupcall.Username ]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("UPDATE WakeUpCall SET ProjectCode=?, BranchCode=?, UrlVideo=?, HighlightDesc=?, Active=?, LastModifiedDate=NOW(), LastModifiedBy=? where KdWakeUpCall=?", values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteWakeupcall = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM WakeUpCall where KdWakeUpCall=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}