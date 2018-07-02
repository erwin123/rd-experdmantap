var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllGetheard = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdGetHeard, ProjectCode, BranchCode, Roleplay, Type, DetailDesc, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM GetHeard', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllGetheardByCriteria = function (Getheard, done) {
    var wh = db.whereCriteriaGenerator(Getheard);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT KdGetHeard, ProjectCode, BranchCode, Roleplay, Type, DetailDesc, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM GetHeard"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertGetheard = function (Getheard, done) {
    var values = [Getheard.ProjectCode, Getheard.BranchCode, Getheard.Roleplay, Getheard.Type, Getheard.DetailDesc, Getheard.Username];
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_GetHeardGenerator(?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateGetheard = function (key, Getheard, done) {
    var values = [Getheard.ProjectCode, Getheard.BranchCode, Getheard.Roleplay, Getheard.Type, Getheard.DetailDesc, Getheard.Username]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Getheard SET ProjectCode=?, BranchCode=?, Roleplay=?, Type =?, DetailDesc=?, LastModifiedBy=? where KdGetHeard=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteGetheard = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM GetHeard where KdGetHeard=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}