var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllEmployee = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT EmployeeCode, BranchCode, EmployeeNPK, EmployeeName, RolePlay, Username, RoleUMname, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM Employee', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllEmployeeByCriteria = function (Emp, done) {
    var wh = db.whereCriteriaGenerator(Emp);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT EmployeeCode, BranchCode, EmployeeNPK, EmployeeName, RolePlay, Username, RoleUMname, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM Employee"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertEmployee = function (Emp, done) {
    var values = [Emp.BranchCode, Emp.EmployeeNPK, Emp.EmployeeName, Emp.RolePlay, Emp.Username, Emp.RoleUMname]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_EmployeeGenerator(?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateEmployee = function (key, Branch, done) {
    var values = [Emp.BranchCode, Emp.EmployeeNPK, Emp.EmployeeName, Emp.RolePlay, Emp.RoleUMname, key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Employee SET BranchCode =?, EmployeeNPK =?, EmployeeName =?, RolePlay =?,RoleUMname =? where Username=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteEmployee = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE Employee where Username=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}