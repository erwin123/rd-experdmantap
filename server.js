const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const http = require('http');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./server/config');
// API file for interacting with api route
const api_um = require('./server/routes/api_um');
const api_trx = require('./server/routes/api_trx');

//fileupload
app.use(fileUpload());

//Cors
app.use(cors());
app.options('*', cors());

// Parsers
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

//secure the api with auth
var auth = function (req, res, next) {
    if (req.originalUrl === '/api/um/users/login' || req.originalUrl === '/api/um/users/register')
        next();
    else {
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            next();
        });
    }
}
app.use(auth);

// API location route
app.use('/api/um', api_um);
app.use('/api/trx', api_trx);


// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});



// app.post('/internship/upload', function (req, res) {
//     if (!req.files)
//         return res.status(400).send('No files were uploaded.');

//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     let internshipFile = req.files.internshipFile;

//     // Use the mv() method to place the file somewhere on your server
//     internshipFile.mv('./src/assets/vid/filename.jpg', function (err) {
//         if (err)
//             return res.status(500).send(err);

//         res.send('File uploaded!');
//     });
// });

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);
http.globalAgent.maxSockets = Infinity;
const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));