var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllWalkthetalk = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdWalkTheTalk, ProjectCode, BranchCode, Roleplay, Week, Employee, Star, Feedback, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM WalkTheTalk', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllWalkthetalkEmp = function (branchCode, projectCode, done) {
    let values = [branchCode, projectCode];
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT w.*, e.EmployeeName FROM Employee e INNER JOIN WalkTheTalk w ON e.EmployeeCode = w.Employee WHERE w.BranchCode = ? AND w.ProjectCode = ?',values, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllWalkthetalkByCriteria = function (Walkthetalk, done) {
    var wh = db.whereCriteriaGenerator(Walkthetalk);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT KdWalkTheTalk, ProjectCode, BranchCode, Roleplay, Week, Employee, Star, Feedback, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM WalkTheTalk"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertWalkthetalk = function (Walkthetalk, done) {
    var values = [Walkthetalk.ProjectCode, Walkthetalk.BranchCode
                  ,Walkthetalk.Roleplay, Walkthetalk.Week, Walkthetalk.Employee
                  ,Walkthetalk.Star, Walkthetalk.Feedback, Walkthetalk.Username];
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_WalkthetalkGenerator(?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateWalkthetalk = function (key, Walkthetalk, done) {
    var values = [Walkthetalk.ProjectCode, Walkthetalk.BranchCode
                  ,Walkthetalk.Roleplay, Walkthetalk.Week, Walkthetalk.Employee
                  ,Walkthetalk.Star, Walkthetalk.Feedback, Walkthetalk.Username, Walkthetalk.KdWalkTheTalk]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE WalkTheTalk SET ProjectCode=?, BranchCode=?, Roleplay=?, Week =?, Employee=?,Star=?, Feedback=?,LastModifiedBy=? where KdGetHeard=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteWalkthetalk = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM WalkTheTalk where KdWalkTheTalk=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}


//talkthewalk
exports.getAllTalkthewalk = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdTalkTheWalk, ProjectCode, BranchCode, TTWtype, URLpath, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM TalkTheWalk', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllLastestTalkthewalk = function (branchCode, projectCode,type, done) {
    let values = [branchCode, projectCode, type];
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdTalkTheWalk, ProjectCode, BranchCode, TTWtype, URLpath, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM TalkTheWalk WHERE BranchCode = ? AND ProjectCode = ? AND TTWtype= ? ORDER BY CreatedDate DESC LIMIT 1',values, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllTalkthewalkByCriteria = function (Talkthewalk, done) {
    var wh = db.whereCriteriaGenerator(Talkthewalk);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT KdTalkTheWalk, ProjectCode, BranchCode, TTWtype, URLpath, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM TalkTheWalk"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertTalkthewalk = function (Talkthewalk, done) {
    var values = [Talkthewalk.ProjectCode, Talkthewalk.BranchCode
         ,Talkthewalk.TTWtype, Talkthewalk.URLpath, Talkthewalk.Username];
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_TalkthewalkGenerator(?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateTalkthewalk = function (key, Walkthetalk, done) {
    var values = [Talkthewalk.ProjectCode, Talkthewalk.BranchCode
        ,Talkthewalk.TTWtype, Talkthewalk.URLpath, Talkthewalk.Username];
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE TalkTheWalk SET ProjectCode=?, BranchCode=?, TTWtype=?, URLpath =?,LastModifiedDate=?,LastModifiedBy=? where KdTalkTheWalk=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteTalkthewalk = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM TalkTheWalk where KdTalkTheWalk=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}


//teamreward
exports.getAllTeamreward = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdTeamReward, ProjectCode, BranchCode, TRtype, URLpath, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM TeamReward', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllLastestTeamreward = function (branchCode, projectCode,type, done) {
    let values = [branchCode, projectCode, type, type == 1 ? 1 : 8];
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT KdTeamReward, ProjectCode, BranchCode, TRtype, URLpath, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM TeamReward WHERE BranchCode = ? AND ProjectCode = ? AND TRtype= ? ORDER BY CreatedDate DESC LIMIT ?',values, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllTeamrewardByCriteria = function (Teamreward, done) {
    var wh = db.whereCriteriaGenerator(Teamreward);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT KdTeamReward, ProjectCode, BranchCode, TRtype, URLpath, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy FROM TeamReward"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertTeamreward = function (Teamreward, done) {
    var values = [Teamreward.ProjectCode, Teamreward.BranchCode
         ,Teamreward.TRtype, Teamreward.URLpath, Teamreward.Username];
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_TeamrewardGenerator(?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateTeamreward = function (key, Teamreward, done) {
    var values = [Teamreward.ProjectCode, Teamreward.BranchCode
        ,Teamreward.TRtype, Teamreward.URLpath, Teamreward.Username];
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Teamreward SET ProjectCode=?, BranchCode=?, TRtype=?, URLpath =?,LastModifiedDate=?,LastModifiedBy=? where KdTeamReward=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteTeamreward = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM Teamreward where KdTeamReward=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
