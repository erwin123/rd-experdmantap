var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllBranch = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdBranch, BranchCode, BranchName, BranchCity, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM Branch', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllBranchByCriteria = function (Branch, done) {
    var wh = db.whereCriteriaGenerator(Branch);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT KdBranch, BranchCode, BranchName, BranchCity, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM Branch"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertBranch = function (Branch, done) {
    var values = [Branch.BranchName, Branch.BranchCity]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_BranchGenerator(?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateBranch = function (key, Branch, done) {
    var values = [Branch.BranchName, Branch.BranchCity, key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Branch SET BranchName=?, BranchCity=?, LastModifiedDate=NOW() where BranchCode=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteBranch = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM Branch where BranchCode=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}