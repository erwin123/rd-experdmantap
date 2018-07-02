var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllLastestStayTuned = function (branchCode, projectCode, done) {
    let values = [branchCode, projectCode];
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdStayTune, ProjectCode, BranchCode, BranchFeedback, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM StayTune WHERE BranchCode = ? AND ProjectCode = ? ORDER BY CreatedDate DESC LIMIT 1',values, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}