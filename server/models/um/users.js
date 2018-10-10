var db = require('../../connection/dbconnection');
db.connect(db.um,(done)=>{});

exports.getAllUser = function (done) {
    db.get(db.um, function (err, connection) {
        if (err) {console.log(err);return done('Database problem')}
        connection.query('SELECT Username, PasswordHash, PasswordSalt, IsActive, LoginDate, CreatedTime, CreatedBy FROM Users', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllUserByUsername = function (uname, done) {
    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT Username, PasswordHash, PasswordSalt, IsActive, LoginDate ,CreatedTime, CreatedBy FROM Users WHERE Username = ?', uname, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertUser = function (User, done) {
    var values = [User.Username, User.PasswordHash,
                  User.PasswordSalt, User.IsActive,
                  User.LoginDate , new Date().toISOString(),
                  User.CreatedBy]

    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('Insert into Users values(?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.updateUser = function (uname, User, done) {
    var dateNow = converterDate(new Date());

    var lastLoginDateNew = converterDate(User.LoginDate);

    var values = [User.Username, User.PasswordSalt,
                  User.PasswordHash, lastLoginDateNew,
                  User.IsActive, uname]

    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Users set Username=?,PasswordSalt=?,PasswordHash=?, LoginDate=?, IsActive=? where Username=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

//user detail

exports.getAllUserDetail = function (done) {
    db.get(db.um, function (err, connection) {
        if (err) {console.log(err);return done('Database problem')}
        connection.query('SELECT Username, FirstName, LastName, Phone, Gender, Email, DATE_FORMAT(BornDate, "%Y-%m-%d") BornDate FROM UserDetail', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllUserDetailUsername = function (uname, done) {
    db.get(db.um, function (err, connection) {
        if (err) {console.log(err);return done('Database problem')}
        connection.query('SELECT Username, FirstName, LastName, Phone, Gender, Email, DATE_FORMAT(BornDate, "%Y-%m-%d") BornDate FROM UserDetail WHERE Username = ?',uname, function (err, rows) {
            connection.release();
            console.log(rows);
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertUserDetail = function (User, done) {

    var values = [User.Username, User.FirstName,
                  User.LastName, User.Phone,
                  User.Gender , User.Email,
                  User.BornDate]

    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('call sp_UserDetailIn(?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.updateUserDetail = function (uname, User, done) {
    var values = [User.FirstName,
        User.LastName, User.Phone,
        User.Gender , User.Email,
        User.BornDate, User.Username]

    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE UserDetail set FirstName=?,LastName=?,Phone=?, Gender=?, Email=?, BornDate=? where Username=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.deleteUser = function (uname, done) {

    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('call sp_deleteUser(?)',uname, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

function converterDate(input)
{
    return  new Date(input).toISOString().
    replace(/T/, ' ').      // replace T with a space
    replace(/\..+/, '');
}




//auth

exports.loginUser = function (username, password, appcode, done) {
    var values = [username, password, appcode];
    db.get(db.um, function (err, connection) {
        if (err) {
            return done('Database problem');
        }
        connection.query('CALL sp_Login(?, ?, ?)',values, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.registerUser = function (username, password, done) {
    var values = [username, password];
    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_AccountGenerator(?, ?)',values, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.changePasswordUser = function (username, password, done) {
    var values = [username, password];
    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_AccountUpdate(?, ?)',values, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}