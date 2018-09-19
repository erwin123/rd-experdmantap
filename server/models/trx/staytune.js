var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllLastestStayTuned = function (branchCode, projectCode, isGetHeard, done) {
    let values = [branchCode, projectCode, isGetHeard];
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdStayTune, ProjectCode, BranchCode, BranchFeedback, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM StayTune WHERE BranchCode = ? AND ProjectCode = ? AND IsGetHeard=? ORDER BY CreatedDate DESC LIMIT 1',values, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertStaytune = function (StayTune, done) {
    var values = [StayTune.BranchCode, StayTune.ProjectCode, StayTune.BranchFeedback, StayTune.CreatedBy, StayTune.IsGetHeard]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_StaytuneGenerator(?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}