var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
exports.reportAspek = function (Crit, done) {
    var wh = "";
    if(!isEmptyObject(Crit)){
        wh = db.whereCriteriaGenerator(Crit);
    }
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT ProjectCode, BranchCode, BranchName, Description, Mark FROM RptAspekFisik" + wh+" order by BranchCode", function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.reportStdService = function (Crit, done) {
    var wh = "";
    if(!isEmptyObject(Crit)){
        wh = db.whereCriteriaGenerator(Crit);
    }
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT ProjectCode, BranchCode, BranchName,RoleplayName, StdServiceDesc, Value FROM RptStdService" + wh +" order by BranchCode, RoleplayName", function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.reportActivity = function (projectCode, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("CALL rpt_activity(?)", projectCode, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

