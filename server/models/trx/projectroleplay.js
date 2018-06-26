var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllProjectRolePlay = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT Project_ProjectCode, Roleplay_KdRoleplay FROM ProjectRolePlay', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllProjectRolePlayByCriteria = function (ProjectRolePlay, done) {
    var wh = db.whereCriteriaGenerator(ProjectRolePlay);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT Project_ProjectCode, Roleplay_KdRoleplay FROM ProjectRolePlay"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertProjectRolePlay = function (ProjectRolePlay, done) {
    var values = [ProjectRolePlay.Project_ProjectCode, ProjectRolePlay.Roleplay_KdRoleplay]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('INSERT INTO ProjectRolePlay (Project_ProjectCode, Roleplay_KdRoleplay) VALUES (?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateProjectRolePlay = function (key, ProjectRolePlay, done) {
    var values = [ProjectRolePlay.Project_ProjectCode, ProjectRolePlay.Roleplay_KdRoleplay]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE ProjectRolePlay SET Roleplay_KdRoleplay=? where Project_ProjectCode=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteProjectRolePlay = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE ProjectRolePlay where Project_ProjectCode=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}