process.stdout.write('\033c');

_ = require('underscore');
async = require('async');
path = require('path');
fs = require('fs');
require('./sys/Utility.js');

DB = require('./sys/Db.js');

const ROUTES = require('./sys/Routes');

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

_.mapObject(ROUTES.list, (routes, method) => {
    // console.log({ method, routes });
    server[method.toLowerCase()](routes, (req, res, next) => {
        const { query, body } = req;
        const { pathname } = req._parsedUrl;
        console.log(method);
        if (typeof(ROUTES[method][pathname]) === 'function')  {
            ROUTES[method][pathname](req, { query, body })
                .then(response => res.json(response));
        } else {
            res.json({ [method]: 'worked' });
        }
    });
});
// console.log('Get', Get);
//
// server.get(Get, (req, res, next) => {
//     console.log('Get');
//     res.json({ get: 'worked' });
// });
//
// console.log('Post', Post);
// server.post(Post, (req, res, next) => {
//     const { pathname } = req._parsedUrl;
//     console.log('Post');
//     res.json({ post: 'worked', pathname });
// });
//
// console.log('Put', Put);
// server.put(Put, (req, res, next) => {
//     console.log('Put');
//     res.json({ put: 'worked' });
// });
//
// console.log('Delete', Delete);
// server.delete(Delete, (req, res, next) => {
//     console.log('Delete');
//     res.json({ delete: 'worked' });
// });
// console.log('DB.models', Object.keys(DB.models).join('; '));

// server.post('*', (req, res, next) => {
//     const { query, params, body } = req;
//     const { pathname } = req._parsedUrl;
//     const finished = (result = {}) => {
//         res.json({ query, params, body, result });
//     };
//
//     if (DB.models[ pathname ]) {
//         DB.models[ pathname ](body, params)
//             .then(response => {
//                 finished(response);
//             });
//     } else finished(false);
//
// });
server.listen(3001, function () {
    console.log('listening on 3001');
});

