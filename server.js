process.stdout.write('\033c');

_ = require('underscore');
async = require('async');
path = require('path');
fs = require('fs');
require('./sys/Utility.js');
Util = require('./sys/Utility');
Config = require('./sys/Config');
Socket = require('./sys/Socket');
DB = require('./sys/Db');

const ROUTES = require('./sys/Routes');
const { exec } = require('child_process');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const express = require('express');
const server = express();
let configs = Config.data;
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

setInterval(() => {
    if (compare(configs, Config.data, false)) {
        configs = Config.data;
        Config.process(server);
    }
}, 5000);


