var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllRolePlay = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdRoleplay, RoleplayName, RoleplayDesc, CreatedDate, CreateBy, LastModifiedDate, LastModifiedBy FROM Roleplay', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllRolePlayByCriteria = function (RolePlay, done) {
    var wh = db.whereCriteriaGenerator(RolePlay);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT KdRoleplay, RoleplayName, RoleplayDesc, CreatedDate, CreateBy, LastModifiedDate, LastModifiedBy FROM Roleplay"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertRolePlay = function (RolePlay, done) {
    var values = [RolePlay.RoleplayName, RolePlay.RoleplayDesc]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_RolePlayGenerator(?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateRolePlay = function (key, RolePlay, done) {
    var values = [RolePlay.RoleplayName, RolePlay.RoleplayDesc, key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE RolePlay SET RoleplayName=?, RoleplayDesc=? where KdRoleplay=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteRolePlay = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE RolePlay where KdRoleplay=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}