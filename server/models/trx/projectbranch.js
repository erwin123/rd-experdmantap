var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllProjectBranch = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT Project_ProjectCode, Branch_KdBranch FROM ProjectBranch', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllProjectBranchByCriteria = function (ProjectBranch, done) {
    var wh = db.whereCriteriaGenerator(ProjectBranch);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT Project_ProjectCode, Branch_KdBranch FROM ProjectBranch"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertProjectBranch = function (ProjectBranch, done) {
    var values = [ProjectBranch.Project_ProjectCode, ProjectBranch.Branch_KdBranch]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('INSERT INTO ProjectBranch (Project_ProjectCode, Branch_KdBranch) VALUES (?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateProjectBranch = function (key, ProjectBranch, done) {
    var values = [ProjectBranch.Project_ProjectCode, ProjectBranch.Branch_KdBranch]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE ProjectBranch SET Branch_KdBranch=? where Project_ProjectCode=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteProjectBranch = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE ProjectBranch where Project_ProjectCode=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}