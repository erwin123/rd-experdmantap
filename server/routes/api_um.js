var users = require('../models/um/users');
var apps = require('../models/um/apps');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

//region users
router.get('/users/:uname?', function (req, res, next) {
    if (req.params.uname) {
        users.getAllUserByUsername(req.params.uname, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        users.getAllUser(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/users/', function (req, res, next) {
    users.insertUser(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.put('/users/:uname', function (req, res, next) {
    users.updateUser(req.params.uname, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/users/:uname', function (req, res, next) {
    users.deleteUser(req.params.uname, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//region userdetail
router.get('/userd/:uname?', function (req, res, next) {
    if (req.params.uname) {
        users.getAllUserDetailUsername(req.params.uname, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        users.getAllUserDetail(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/userd/', function (req, res, next) {
    users.insertUserDetail(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.put('/userd/:uname', function (req, res, next) {
    users.updateUserDetail(req.params.uname, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//region account
router.post('/users/login', function (req, res, next) {
    if (req.body) {
        users.loginUser(req.body.username, req.body.password, req.body.appcode, function (err, rows, fields) {
            if (err) { res.status(500); res.send('Internal Server Error'); }
            else {
                if (rows[0][0]) {
                    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
                    // create a token
                    let token = jwt.sign({ username: req.body.username }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    let result = rows[0][0];

                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send({ auth: true, token: token, username: req.body.username, appcode: result.AppCode, ic: result.IsConsultant });
                }
                else {
                    res.status(401);
                    res.send('Sorry, access not passed');
                }
            }

        });
    }
});

router.post('/users/register', function (req, res, next) {
    if (req.body) {
        users.registerUser(req.body.username, req.body.password, function (err, rows, fields) {
            if (err) {
                if (err.errno === 1062) {
                    res.status(200);
                    res.setHeader('Content-Type', 'application/json');
                    res.send({ "message": "Username already exist" });
                }
            }
            else {
                if (rows[0][0]) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(rows[0]));
                }
                else {
                    res.status(401);
                    res.send('Sorry, access not passed');
                }
            }

        });
    }
});

router.post('/users/changepwd', function (req, res, next) {
    if (req.body) {
        users.changePasswordUser(req.body.username, req.body.password, function (err, rows, fields) {
            if (err) {
                res.status(500);
                res.setHeader('Content-Type', 'application/json');
                res.send({ "message": "Somethin Error" });
            }
            else {
                if (rows[0][0]) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(rows[0]));
                }
                else {
                    res.status(401);
                    res.send('Sorry, access not passed');
                }
            }

        });
    }
});



//region apps
router.get('/apps/:appcode?', function (req, res, next) {
    if (req.params.appcode) {
        apps.getAllAppsByCode(req.params.appcode, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        apps.getAllApps(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/apps/', function (req, res, next) {
    apps.insertApps(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.put('/apps/:appcode', function (req, res, next) {
    apps.updateApps(req.params.appcode, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/apps/:appcode', function (req, res, next) {
    apps.deleteApps(req.params.appcode, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

module.exports = router;