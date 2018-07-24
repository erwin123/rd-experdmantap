var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllFeed = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select KdDocument, ProjectCode, BranchCode, FileName, Descriptions, Notes, DocType, CreatedDate, CreatedBy from FeederView order by CreatedDate Desc', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllFeedByCriteria = function (Feed, done) {
    var wh = db.whereCriteriaGenerator(Feed);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select KdDocument, ProjectCode, BranchCode, FileName, Descriptions, Notes, DocType, CreatedDate, CreatedBy from FeederView "+wh+" order by CreatedDate Desc", function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertFeedback = function (Feed, done) {
    var values = [Feed.KdDocument, Feed.Feedback, Feed.CreatedBy, Feed.EmployeeCode, Feed.BranchCode, Feed.ProjectCode]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_FeedbackGenerator(?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}


exports.deleteFeed = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM Feedback where KdFeedback=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.getAllFeedback = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select KdFeedback, KdDocument, Feedback, CreatedDate, CreatedBy, EmployeeCode, ProjectCode, BranchCode from Feedback order by CreatedDate Desc', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllFeedbackByCriteria = function (Feed, done) {
    var wh = db.whereCriteriaGenerator(Feed);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select KdFeedback, KdDocument, Feedback, CreatedDate, CreatedBy, EmployeeCode, ProjectCode, BranchCode from Feedback "+wh+" order by CreatedDate Desc", function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}