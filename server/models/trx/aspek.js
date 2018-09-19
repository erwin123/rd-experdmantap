var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});
var async = require("async");

exports.getAllAspek = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdAspekFisik, ProjectCode, Description, NWeight, YWeight, CreatedDate, CreatedBy, ParentCode, FlagCard FROM AspekFisik', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllAspekVal = function (branchCode, projectCode, done) {
    let values = [branchCode, projectCode];
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT ss.KdAspekFisik, ss.Description, ss.ProjectCode, ss.ParentCode, ss.FlagCard, ssv.Value, ssv.BranchCode FROM AspekFisik ss INNER JOIN AspekFisikValue ssv on ss.KdAspekFisik = ssv.KdAspekFisik WHERE ssv.BranchCode = ? AND ss.ProjectCode = ?", values, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllAspekByCriteria = function (Aspek, done) {
    var wh = db.whereCriteriaGenerator(Aspek);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT KdAspekFisik, ProjectCode, Description, NWeight, YWeight, CreatedDate, CreatedBy, ParentCode, FlagCard FROM AspekFisik"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertAspek = function (Aspek, done) {
    var values = [Aspek.ProjecCode, Aspek.Description,Aspek.NWeight,Aspek.YWeight,Aspek.CreatedBy,Aspek.ParentCode,Aspek.FlagCard]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_AspekFisikGenerator(?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.insertAspekValue = function (Aspek, done) {
    var values = [Aspek.KdAspekFisik, Aspek.Value,  Aspek.BranchCode]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_AspekFisikValueGenerator(?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.insertAspekValBulk = function (Aspeks, done) {
    async.everySeries(Aspeks, (value, callback) => {
        var values = [value.KdAspekFisik, value.Value,  value.BranchCode];
        db.get(db.trx, function (err, connection) {
            if (err) return done('Database problem')
            connection.query('CALL sp_AspekFisikValueGenerator(?,?,?)', values, function (err, result) {
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

exports.updateAspek = function (key, Aspek, done) {
    var values = [Aspek.Description, Aspek.ProjectCode, Aspek.YWeight, Aspek.NWeight, Aspek.ParentCode, Aspek.FlagCard, key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE AspekFisik SET Description = ? ,ProjectCode = ? ,YWeight = ? ,NWeight=?,ParentCode=?,FlagCard=? where KdAspekFisik=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteAspek = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM AspekFisik where KdAspekFisik=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}




//OH

exports.getAllAspekValOH = function (branchCode, projectCode,employeeCode, done) {
    let values = [branchCode, projectCode, employeeCode];
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT ss.KdAspekFisik, ss.Description, ss.ProjectCode, ss.ParentCode, ss.FlagCard, ssv.Value, ssv.BranchCode, ssv.EmployeeCode FROM AspekFisik ss INNER JOIN AspekFisikValueOH ssv on ss.KdAspekFisik = ssv.KdAspekFisik WHERE ssv.BranchCode = ? AND ss.ProjectCode = ? AND ssv.EmployeeCode = ?", values, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}


exports.insertAspekValueOH = function (Aspek, done) {
    var values = [Aspek.KdAspekFisik, Aspek.Value, Aspek.BranchCode, Aspek.EmployeeCode]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_AspekFisikValueOHGenerator(?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.insertAspekValBulkOH = function (Aspeks, done) {
    async.everySeries(Aspeks, (value, callback) => {
        var values = [value.KdAspekFisik, value.Value, value.BranchCode, value.EmployeeCode];
        db.get(db.trx, function (err, connection) {
            if (err) return done('Database problem')
            connection.query('CALL sp_AspekFisikValueOHGenerator(?,?,?,?)', values, function (err, result) {
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