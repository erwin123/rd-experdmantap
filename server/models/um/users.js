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

function converterDate(input)
{
    return  new Date(input).toISOString().
    replace(/T/, ' ').      // replace T with a space
    replace(/\..+/, '');
}

exports.updateUser = function (uname, User, done) {
    var dateNow = converterDate(new Date());

    var lastLoginDateNew = converterDate(User.LoginDate);

    var values = [User.Username, User.PasswordSalt,
                  User.PasswordHash, dateNow,
                  User.ModifyBy, lastLoginDateNew,
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

exports.loginUser = function (username, password, done) {
    var values = [username, password];
    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_Login(?, ?)',values, function (err, rows) {
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