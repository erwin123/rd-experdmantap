var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllProject = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT ProjectCode, ProjectName, Start, End, Week, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM Project', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllProjectByCriteria = function (Project, done) {
    var wh = db.whereCriteriaGenerator(Project);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT ProjectCode, ProjectName, Start, End, Week, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM Project"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertProject = function (Project, done) {
    var values = [Project.ProjectName, Project.Start, Project.End, Project.Week]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_ProjectGenerator(?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateProject = function (key, Project, done) {
    var values = [Project.ProjectName, Project.Start, Project.End, Project.Week, key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Project SET ProjectName=?, Start=?, End=?, Week =? where ProjectCode=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteProject = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE Project where ProjectCode=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}