var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllAspek = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdAspek, AspekCode, AspekName, AspekCity, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM Aspek', function (err, rows) {
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
        connection.query("SELECT KdAspek, AspekCode, AspekName, AspekCity, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM Aspek"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertAspek = function (Aspek, done) {
    var values = [Aspek.AspekName, Aspek.AspekCity]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_AspekFisikGenerator(?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateAspek = function (key, Aspek, done) {
    var values = [Aspek.AspekName, Aspek.AspekCity, key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Aspek SET AspekName=?, AspekCity=?, LastModifiedDate=NOW() where AspekCode=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteAspek = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM Aspek where AspekCode=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}