process.stdout.write('\033c');

_ = require('underscore');
async = require('async');
path = require('path');
fs = require('fs');
require('./sys/Utility.js');

DB = require('./sys/Db.js');
DB.init();
MODELS = require('./sys/Models');
ROUTES = MODELS.Routes;

const { exec } = require('child_process');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const express = require('express');
const server = express();
server.use(
    cors({
        credentials: true,
        origin: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
    })
);
const sessionOptions = {
    name: 'noakcess-server',
    keys: ['noakcess-server'],
    rolling: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: false
};
server.use(cookieSession(sessionOptions));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cookieParser());


server.get(ROUTES.Get ,(req, res, next) => {
    console.log('Get');
    res.json({ get: 'worked' });
});
server.post(ROUTES.Post ,(req, res, next) => {
    console.log('Post');
    res.json({ post: 'worked' });
});
server.put(ROUTES.Put,(req, res, next) => {
    console.log('Put');
    res.json({ put: 'worked' });
});
server.delete(ROUTES.Delete ,(req, res, next) => {
    console.log('Delete');
    res.json({ delete: 'worked' });
});
// console.log('DB.models', Object.keys(DB.models).join('; '));

server.post('*', (req, res, next) => {
    const { query, params, body } = req;
    const { pathname } = req._parsedUrl;
    const finished = (result = {}) => {
        res.json({ query, params, body, result });
    };
    
    if (DB.models[ pathname ]) {
        DB.models[ pathname ](body, params)
            .then(response => {
                finished(response);
            });
    } else finished(false);
    
});
server.listen(3001, function () {
    console.log('listening on 3001');
});

