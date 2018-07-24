var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllInternship = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdInternship, ProjectCode, BranchCode, Roleplay, UrlVideo, HighlightDesc, Active, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy, FeedBack,FeedBackBy FROM Internship', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getLastInternship = function (branchCode, projectCode, done) {
    var values = [branchCode, projectCode]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdInternship, ProjectCode, BranchCode, Roleplay, UrlVideo, HighlightDesc, Active, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy, FeedBack,FeedBackBy FROM Internship where BranchCode = ? and ProjectCode = ? and Active = 1 ORDER BY CreatedDate DESC  LIMIT 1', values,function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getLastInternshipRole = function (branchCode, projectCode,role,  done) {
    var values = [branchCode, projectCode, role]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdInternship, ProjectCode, BranchCode, Roleplay, UrlVideo, HighlightDesc, Active, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy, FeedBack,FeedBackBy FROM Internship where BranchCode = ? and ProjectCode = ? and Active = 1 and Roleplay =? ORDER BY CreatedDate DESC  LIMIT 1', values,function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllInternshipByCriteria = function (Internship, done) {
    var wh = db.whereCriteriaGenerator(Internship);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT KdInternship, ProjectCode, BranchCode, Roleplay, UrlVideo, HighlightDesc, Active, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy, FeedBack,FeedBackBy FROM Internship"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertInternship = function (Internship, done) {
    var values = [Internship.ProjectCode, Internship.BranchCode, Internship.Roleplay, Internship.UrlVideo, Internship.HighlightDesc, Internship.Username ]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_InternshipGenerator(?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateInternship = function (key, Internship, done) {
    var values = [Internship.ProjectCode, Internship.BranchCode, Internship.RolePlay, Internship.UrlVideo, Internship.HighlightDesc,Internship.FeedBack,Internship.FeedBackBy, Internship.Username ]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("UPDATE Internship SET ProjectCode=?, BranchCode=?, Roleplay=?, UrlVideo=?, HighlightDesc=?, Active=?, LastModifiedDate=NOW(), LastModifiedBy=? FeedBack=?, FeedBackBy=? where KdInternship=?", values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteInternship = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM Internship where KdInternship=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}