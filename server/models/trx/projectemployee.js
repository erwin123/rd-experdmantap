var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllProjectEmployee = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        // connection.query('SELECT Project.ProjectName,Project_ProjectCode, Employee_EmployeeCode, Employee.EmployeeName, Employee.EmployeeNPK FROM ProjectEmployee INNER JOIN Project on ProjectEmployee.Project_ProjectCode = Project.ProjectCode INNER JOIN Employee on ProjectEmployee.Employee_EmployeeCode = Employee.EmployeeCode', function (err, rows) {
            connection.query('SELECT Project_ProjectCode ProjectCode, Employee_EmployeeCode EmployeeCode FROM ProjectEmployee', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getActiveProjectEmployee = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("CALL sp_FetchActiveProject(?)",key, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllProjectEmployeeByCriteria = function (ProjectEmployee, done) {
    var wh = db.whereCriteriaGenerator(ProjectEmployee);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT Project_ProjectCode, Employee_EmployeeCode FROM ProjectEmployee"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertProjectEmployee = function (ProjectEmployee, done) {
    var values = [ProjectEmployee.Project_ProjectCode, ProjectEmployee.Employee_EmployeeCode]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('INSERT INTO ProjectEmployee (Project_ProjectCode, Employee_EmployeeCode) VALUES (?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateProjectEmployee = function (key, ProjectEmployee, done) {
    var values = [ProjectEmployee.Project_ProjectCode, ProjectEmployee.Employee_EmployeeCode]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE ProjectEmployee SET Employee_EmployeeCode=? where Project_ProjectCode=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteProjectEmployee = function (pr,em, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM ProjectEmployee where Project_ProjectCode=? AND Employee_EmployeeCode=?', [pr,em], function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}