var mysql = require('mysql')

var um = 'extappum'

var state = {
  pool: null,
  mode: null,
}

exports.connect = function (mode, done) {
  state.pool = mysql.createPoolCluster();
  state.pool.add('um', {
    host: '192.168.100.210',
    user: 'root',
    password: 'experdpwd',
    database: um
  });
  state.mode = mode;
  done();
}

exports.um = 'um'

exports.get = function (type, done) {
  var pool = state.pool

  if (!pool) return done(new Error('Missing database connection.'));
  switch (type) {
    case exports.um:
      state.pool.getConnection('um', function (err, connection) {
        if (err) return done(err)
        done(null, connection)
      })
      break;
    default:
      state.pool.getConnection('um', function (err, connection) {
        if (err) return done(err)
        done(null, connection)
      })
  }
}


exports.whereCriteriaGenerator = function (object) {
  var where = " where ";
  for (var propertyName in object) {
    where += propertyName + " = '" + object[propertyName] + "' and ";
  }
  where = where.substring(0, where.length - 4);
  return where;
}