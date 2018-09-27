var branch = require('../models/trx/branch');
var emp = require('../models/trx/employee');
var prj = require('../models/trx/project');
var prj_br = require('../models/trx/projectbranch');
var prj_em = require('../models/trx/projectemployee');
var prj_rl = require('../models/trx/projectroleplay');
var roleplay = require('../models/trx/roleplay');
var internship = require('../models/trx/internship');
var wkcall = require('../models/trx/wakeupcall');
var stdservice = require('../models/trx/stdservice');
var getheard = require('../models/trx/getheard');
var wtt = require('../models/trx/walkthetalk');
var st = require('../models/trx/staytune');
var fb = require('../models/trx/feed');
var af = require('../models/trx/aspek');
var rpt = require('../models/trx/report');
const config = require('../../server/config');
var express = require('express');
var router = express.Router();
var nodeExcel = require('excel-export');


//region branch
router.get('/branch', function (req, res, next) {
    branch.getAllBranch(function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});

router.post('/branch/cr/', function (req, res, next) {
    if (req.body) {
        branch.getAllBranchByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/branch/', function (req, res, next) {
    branch.insertBranch(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/branch/:key', function (req, res, next) {
    branch.updateBranch(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/branch/:key', function (req, res, next) {
    branch.deleteBranch(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//employee
router.get('/employee', function (req, res, next) {
    emp.getAllEmployee(function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});

router.post('/employee/cr/', function (req, res, next) {
    if (req.body) {
        emp.getAllEmployeeByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/employee/', function (req, res, next) {
    emp.insertEmployee(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/employee/:key', function (req, res, next) {
    emp.updateEmployee(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/employee/:key', function (req, res, next) {
    emp.deleteEmployee(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//project
router.get('/project', function (req, res, next) {
    prj.getAllProject(function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});

router.get('/project_active', function (req, res, next) {
    if (req.query.emp) {
        prj_em.getActiveProjectEmployee(req.query.emp, function (err, rows) {
            if (err) { res.json(err); }
            else {
                res.json(rows);
            }
        });
    } else {
        return res.status(404).send({ auth: false, message: 'No Found.' });
    }
});

router.get('/project_roleplay_active', function (req, res, next) {
    if (req.query.prj) {
        prj_rl.getActiveProjectRolePlay(req.query.prj, function (err, rows) {
            if (err) { res.json(err); }
            else {
                res.json(rows);
            }
        });
    } else {
        return res.status(404).send({ auth: false, message: 'No Found.' });
    }
});

router.post('/project/cr/', function (req, res, next) {
    if (req.body) {
        prj.getAllProjectByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/project/', function (req, res, next) {
    prj.insertProject(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/project/:key', function (req, res, next) {
    prj.updateProject(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/project/:key', function (req, res, next) {
    prj.deleteProject(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//project_branch
router.get('/project_branch', function (req, res, next) {
    prj_br.getAllProjectBranch(function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});

router.post('/project_branch/cr/', function (req, res, next) {
    if (req.body) {
        prj_br.getAllProjectBranchByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/project_branch/', function (req, res, next) {
    prj_br.insertProjectBranch(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/project_branch/:key', function (req, res, next) {
    prj_br.updateProjectBranch(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/project_branch/:key', function (req, res, next) {
    prj_br.deleteProjectBranch(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//project_employee
router.get('/project_employee', function (req, res, next) {
    prj_em.getAllProjectEmployee(function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});

router.post('/project_employee/cr/', function (req, res, next) {
    if (req.body) {
        prj_em.getAllProjectEmployeeByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/project_employee/', function (req, res, next) {
    prj_em.insertProjectEmployee(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/project_employee/:key', function (req, res, next) {
    prj_em.updateProjectEmployee(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/project_employee/:pr/:em', function (req, res, next) {
    prj_em.deleteProjectEmployee(req.params.pr, req.params.em, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//project_roleplay
router.get('/project_roleplay', function (req, res, next) {
    prj_rl.getAllProjectRolePlay(function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});

router.post('/project_roleplay/cr/', function (req, res, next) {
    if (req.body) {
        prj_rl.getAllProjectRolePlayByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/project_roleplay/', function (req, res, next) {
    prj_rl.insertProjectRolePlay(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/project_roleplay/:key', function (req, res, next) {
    prj_rl.updateProjectRolePlay(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/project_roleplay/:key', function (req, res, next) {
    prj_rl.deleteProjectRolePlay(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//roleplay
router.get('/roleplay', function (req, res, next) {
    roleplay.getAllRolePlay(function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});

router.post('/roleplay/cr/', function (req, res, next) {
    if (req.body) {
        roleplay.getAllRolePlayByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/roleplay/', function (req, res, next) {
    roleplay.insertRolePlay(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/roleplay/:key', function (req, res, next) {
    roleplay.updateRolePlay(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/roleplay/:key', function (req, res, next) {
    roleplay.deleteRolePlay(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});


//internship
router.get('/internship', function (req, res, next) {
    internship.getAllInternship(function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});

router.get('/internship/last', function (req, res, next) {
    if (req.query.br && req.query.prj) {
        internship.getLastInternship(req.query.br, req.query.prj, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    } else {
        return res.status(404).send({ auth: false, message: 'No Found.' });
    }
});

router.get('/internship/lastrole', function (req, res, next) {
    if (req.query.br && req.query.prj && req.query.rl) {
        internship.getLastInternshipRole(req.query.br, req.query.prj, req.query.rl, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    } else {
        return res.status(404).send({ auth: false, message: 'No Found.' });
    }
});

router.post('/internship/cr/', function (req, res, next) {
    if (req.body) {
        internship.getAllInternshipByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/internship/', function (req, res, next) {
    internship.insertInternship(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else {
            var email = require("emailjs");
            var server = email.server.connect({
                user: "erwin.ant@experd.com",
                password: "Gondar@001",
                host: "smtp.gmail.com",
                ssl: true,
                tls: false
            });

            // send the message and get a callback with an error or details of the message that was sent
            server.send({
                text: resultInsert[0].CreatedBy + " baru saja upload internship, ayo cek di https://adm-experdserve.experd.com",
                from: "Serve - Notification <serve@experd.com>",
                to: "emil@experd.com, ranggih@experd.com, vera@experd.com, fitria@experd.com, erwin.ant@experd.com",
                subject: "Ada Internship baru diupload",
                attachment:
                    [
                        { data: "<html> <b>" + resultInsert[0].CreatedBy + "</b> baru saja upload internship, ayo cek di <a href='https://adm-experdserve.experd.com'>serve administration</a></html>", alternative: true }
                    ]
            }, function (err, message) { console.log(err || message); });
            res.json(resultInsert);
        }
    });
});

router.put('/internship/:key', function (req, res, next) {
    internship.updateInternship(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/internship/:key', function (req, res, next) {
    internship.deleteInternship(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/internship/upload', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let internshipFile = req.files.internshipFile;
    const uuidv1 = require('uuid/v1');
    let ftype = internshipFile.mimetype.split('/')[1];
    internshipFile.name = uuidv1() + "." + ftype;

    let storage = config.vidPathIs;

    internshipFile.mv(storage + internshipFile.name, function (err) {
        if (err)
            return res.status(500).send(err);
        res.status(200).send({ "filename": internshipFile.name });
    });
});

//wakeupcall
router.get('/wakeupcall', function (req, res, next) {
    wkcall.getAllWakeupcall(function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});

router.get('/wakeupcall/last', function (req, res, next) {
    if (req.query.br && req.query.prj) {
        wkcall.getLastWakeupcall(req.query.br, req.query.prj, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    } else {
        return res.status(404).send({ auth: false, message: 'No Found.' });
    }
});

router.post('/wakeupcall/cr/', function (req, res, next) {
    if (req.body) {
        wkcall.getAllWakeupcallByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/wakeupcall/', function (req, res, next) {
    wkcall.insertWakeupcall(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else {
            var email = require("emailjs");
            var server = email.server.connect({
                user: "erwin.ant@experd.com",
                password: "Gondar@001",
                host: "smtp.gmail.com",
                ssl: true,
                tls: false
            });

            // send the message and get a callback with an error or details of the message that was sent
            server.send({
                text: resultInsert[0].CreatedBy + " baru saja upload Wakeup call, ayo cek di https://adm-experdserve.experd.com",
                from: "Serve - Notification <serve@experd.com>",
                to: "emil@experd.com, ranggih@experd.com, vera@experd.com, fitria@experd.com, erwin.ant@experd.com",
                subject: "Ada Wakeup call baru diupload",
                attachment:
                    [
                        { data: "<html> <b>" + resultInsert[0].CreatedBy + "</b> baru saja upload Wakeup call, ayo cek di <a href='https://adm-experdserve.experd.com'>serve administration</a></html>", alternative: true }
                    ]
            }, function (err, message) { console.log(err || message); });
            res.json(resultInsert);
        }
    });
});

router.put('/wakeupcall/:key', function (req, res, next) {
    wkcall.updateWakeupcall(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/wakeupcall/:key', function (req, res, next) {
    wkcall.deleteWakeupcall(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/wakeupcall/upload', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let wkcallFile = req.files.wkcallFile;
    const uuidv1 = require('uuid/v1');
    let ftype = wkcallFile.mimetype.split('/')[1];
    wkcallFile.name = uuidv1() + "." + ftype;

    let storage = config.vidPathWk;

    wkcallFile.mv(storage + wkcallFile.name, function (err) {
        if (err)
            return res.status(500).send(err);
        res.status(200).send({ "filename": wkcallFile.name });
    });
});

//region stdservice
router.get('/stdservice', function (req, res, next) {
    stdservice.getAllStdservice(function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});

router.post('/stdservice/cr/', function (req, res, next) {
    if (req.body) {
        stdservice.getAllStdserviceByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/stdservice/', function (req, res, next) {
    stdservice.insertStdservice(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/stdservice/:key', function (req, res, next) {
    stdservice.updateStdservice(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/stdservice/:key', function (req, res, next) {
    stdservice.deleteStdservice(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.get('/stdserviceval', function (req, res, next) {
    if (req.query.br && req.query.prj) {
        stdservice.getAllStdserviceVal(req.query.br, req.query.prj, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    } else {
        return res.status(404).send({ auth: false, message: 'No Found.' });
    }
});

router.post('/stdserviceval/', function (req, res, next) {
    stdservice.insertStdserviceVal(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.post('/stdservicevalbulk/', function (req, res, next) {
    stdservice.insertStdserviceValBulk(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});


//OH StdVal
router.get('/stdservicevaloh', function (req, res, next) {
    if (req.query.br && req.query.prj) {
        stdservice.getAllStdserviceValOH(req.query.br, req.query.prj, req.query.em, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    } else {
        return res.status(404).send({ auth: false, message: 'No Found.' });
    }
});

router.post('/stdservicevaloh/', function (req, res, next) {
    stdservice.insertStdserviceValOH(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.post('/stdservicevalbulkoh/', function (req, res, next) {
    stdservice.insertStdserviceValBulkOH(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

//aspek fisik

router.get('/aspekfisik', function (req, res, next) {
    af.getAllAspek(function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});

router.post('/aspekfisik/cr/', function (req, res, next) {
    if (req.body) {
        af.getAllAspekByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/aspekfisik/', function (req, res, next) {
    af.insertAspek(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/aspekfisik/:key', function (req, res, next) {
    af.updateAspek(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/aspekfisik/:key', function (req, res, next) {
    af.deleteAspek(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.get('/aspekfisikval', function (req, res, next) {
    if (req.query.br && req.query.prj) {
        af.getAllAspekVal(req.query.br, req.query.prj, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    } else {
        return res.status(404).send({ auth: false, message: 'No Found.' });
    }
});

router.post('/aspekfisikval/', function (req, res, next) {
    af.insertAspekValue(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.post('/aspekfisikvalbulk/', function (req, res, next) {
    af.insertAspekValBulk(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

//OH aspek
router.get('/aspekfisikvaloh', function (req, res, next) {
    if (req.query.br && req.query.prj) {
        af.getAllAspekValOH(req.query.br, req.query.prj, req.query.em, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    } else {
        return res.status(404).send({ auth: false, message: 'No Found.' });
    }
});

router.post('/aspekfisikvaloh/', function (req, res, next) {
    af.insertAspekValueOH(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.post('/aspekfisikvalbulkoh/', function (req, res, next) {
    af.insertAspekValBulkOH(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

//get heard
router.get('/getheard', function (req, res, next) {
    getheard.getAllGetheard(function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});

router.post('/getheard/cr/', function (req, res, next) {
    if (req.body) {
        getheard.getAllGetheardByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/getheard/', function (req, res, next) {
    getheard.insertGetheard(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/getheard/:key', function (req, res, next) {
    getheard.updateGetheard(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/getheard/:key', function (req, res, next) {
    getheard.deleteGetheard(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//get walkthetalk
router.get('/wtt', function (req, res, next) {
    wtt.getAllWalkthetalk(function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});

router.get('/wttemp', function (req, res, next) {
    if (req.query.br && req.query.prj) {
        wtt.getAllWalkthetalkEmp(req.query.br, req.query.prj, function (err, rows) {
            if (err) { res.json(err); }
            else {
                res.json(rows);
            }
        });
    } else {
        return res.status(404).send({ auth: false, message: 'No Found.' });
    }
});

router.post('/wtt/cr/', function (req, res, next) {
    if (req.body) {
        wtt.getAllWalkthetalkByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/wtt/', function (req, res, next) {
    wtt.insertWalkthetalk(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/wtt/:key', function (req, res, next) {
    wtt.updateWalkthetalk(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/wtt/:key', function (req, res, next) {
    wtt.deleteWalkthetalk(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//get talkthewalk
router.get('/ttw', function (req, res, next) {
    wtt.getAllTalkthewalk(function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});

router.get('/ttwlast', function (req, res, next) {
    if (req.query.br && req.query.prj && req.query.typ) {
        wtt.getAllLastestTalkthewalk(req.query.br, req.query.prj, req.query.typ, function (err, rows) {
            if (err) { res.json(err); }
            else {
                res.json(rows);
            }
        });
    } else {
        return res.status(404).send({ auth: false, message: 'No Found.' });
    }
});

router.post('/ttw/cr/', function (req, res, next) {
    if (req.body) {
        wtt.getAllTalkthewalkByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/ttw/', function (req, res, next) {
    wtt.insertTalkthewalk(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/ttw/:key', function (req, res, next) {
    wtt.updateTalkthewalk(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/ttw/:key', function (req, res, next) {
    wtt.deleteTalkthewalk(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});


router.post('/ttw/upload', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let ttwFile = req.files.ttwFile;
    const uuidv1 = require('uuid/v1');
    let ftype = ttwFile.mimetype.split('/')[1];
    ttwFile.name = uuidv1() + "." + ftype;

    let storage = config.pdfppt;

    ttwFile.mv(storage + ttwFile.name, function (err) {
        if (err)
            return res.status(500).send(err);
        res.status(200).send({ "filename": ttwFile.name });
    });
});


//get teamreward
router.get('/tr', function (req, res, next) {
    wtt.getAllTeamreward(function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});

router.get('/trlast', function (req, res, next) {
    if (req.query.br && req.query.prj && req.query.typ) {
        wtt.getAllLastestTeamreward(req.query.br, req.query.prj, req.query.typ, function (err, rows) {
            if (err) { res.json(err); }
            else {
                res.json(rows);
            }
        });
    } else {
        return res.status(404).send({ auth: false, message: 'No Found.' });
    }
});

router.post('/tr/cr/', function (req, res, next) {
    if (req.body) {
        wtt.getAllTeamrewardByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/tr/', function (req, res, next) {
    wtt.insertTeamreward(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/tr/:key', function (req, res, next) {
    wtt.updateTeamreward(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/tr/:key', function (req, res, next) {
    wtt.deleteTeamreward(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});


router.post('/tr/upload', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let trFile = req.files.trFile;
    const uuidv1 = require('uuid/v1');
    let ftype = trFile.mimetype.split('/')[1];
    trFile.name = uuidv1() + "." + ftype;

    let storage = config.photoDoc;

    trFile.mv(storage + trFile.name, function (err) {
        if (err)
            return res.status(500).send(err);
        res.status(200).send({ "filename": trFile.name });
    });
});

router.get('/stlast', function (req, res, next) {
    if (req.query.br && req.query.prj && req.query.ig) {
        st.getAllLastestStayTuned(req.query.br, req.query.prj, req.query.ig, function (err, rows) {
            if (err) { res.json(err); }
            else {
                res.json(rows);
            }
        });
    } else {
        return res.status(404).send({ auth: false, message: 'No Found.' });
    }
});

router.post('/stlast/', function (req, res, next) {
    if (req.body) {
        st.insertStaytune(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});


//region feed
router.get('/feed', function (req, res, next) {
    fb.getAllFeed(function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});

router.post('/feed/cr/', function (req, res, next) {
    if (req.body) {
        fb.getAllFeedByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/feedback/', function (req, res, next) {
    fb.insertFeedback(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.delete('/feed/:key', function (req, res, next) {
    fb.deleteFeed(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.get('/feedback', function (req, res, next) {
    fb.getAllFeedback(function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});

router.post('/feedback/cr/', function (req, res, next) {
    if (req.body) {
        fb.getAllFeedbackByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/reportAspek/', function (req, res, next) {
    rpt.reportAspek(req.body, function (err, rows) {
        if (err) { res.json(err); }
        else {
            var conf = {};
            conf.stylesXmlFile = "styles.xml";
            conf.name = "mysheet";
            conf.cols = [{
                caption: 'Project',
                type: 'string',
                width: 100
            },{
                caption: 'Kode Cabang',
                type: 'string',
                width: 100
            },{
                caption: 'Cabang',
                type: 'string',
                width: 100
            }, {
                caption: 'Deskripsi',
                type: 'string',
                width: 100
            }, {
                caption: 'Nilai',
                type: 'number'
            }];
            let arrOfVals = [];
            for(let i =0 ; i< rows.length; i++) {
                arrOfVals.push([rows[i].ProjectCode, rows[i].BranchCode,rows[i].BranchName,rows[i].Description,rows[i].Mark]);
            }
            conf.rows = arrOfVals;
            var result = nodeExcel.execute(conf);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
            res.end(result, 'binary');
        }
    });

});

router.post('/reportStdService/', function (req, res, next) {
    rpt.reportStdService(req.body, function (err, rows) {
        if (err) { res.json(err); }
        else {
            var conf = {};
            conf.stylesXmlFile = "styles.xml";
            conf.name = "mysheet";
            conf.cols = [{
                caption: 'Project',
                type: 'string',
                width: 100
            },{
                caption: 'Kode Cabang',
                type: 'string',
                width: 100
            },{
                caption: 'Cabang',
                type: 'string',
                width: 100
            }, {
                caption: 'Peran',
                type: 'string',
                width: 100
            },{
                caption: 'Deskripsi',
                type: 'string',
                width: 100
            }, {
                caption: 'Nilai',
                type: 'number'
            }];
            let arrOfVals = [];
            for(let i =0 ; i< rows.length; i++) {
                arrOfVals.push([rows[i].ProjectCode, rows[i].BranchCode,rows[i].BranchName,rows[i].RoleplayName,rows[i].StdServiceDesc,rows[i].Value]);
            }
            conf.rows = arrOfVals;
            var result = nodeExcel.execute(conf);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
            res.end(result, 'binary');
        }
    });

});

router.post('/reportActivity/', function (req, res, next) {
    rpt.reportActivity(req.body.ProjectCode, function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows[0]);
        }
    });
});


module.exports = router;