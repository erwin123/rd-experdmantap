var db = require('../../connection/dbconnection');
db.connect(db.um,(done)=>{});

exports.getAllApps = function (done) {
    db.get(db.um, function (err, connection) {
        if (err) {console.log(err);return done('Database problem')}
        connection.query('SELECT AppCode, AppName, AppDesc FROM Applications', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllAppsByCode = function (code, done) {
    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT AppCode, AppName, AppDesc FROM Applications WHERE AppCode = ?', code, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertApps = function (App, done) {
    var values = [App.AppName, App.AppDesc]
    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('call sp_ApplicationIn(?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.updateApps = function (appCode, App, done) {
    var values = [App.AppName, App.AppDesc, appCode]

    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Applications set AppName=?, AppDesc=? where AppCode=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.deleteApps = function (appCode, done) {
    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM Applications where AppCode=?',appCode, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.affectedId)
        })
    })
}