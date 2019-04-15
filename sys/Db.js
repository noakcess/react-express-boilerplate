
var tcpp = require('tcp-ping');

const MYSQL = require('mysql2');
const DISABLED = false;
const CONFIG = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    database: 'noakcess',
    password: 'abc123',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const onError = function (error) {
    return JSON.stringify(error);
};
module.exports = {
    disabled: DISABLED,
    pool: false,
    db: false,
    queues: {},
    connection: false,
    creds: false,
    ping: (callback) => {
        tcpp.probe(CONFIG.host, CONFIG.port, function (err, available) {
            callback(available)
        });
    },
    init: function (reconnectCallback) {
        console.log('[  DB  ] config ', JSON.stringify(_.omit(CONFIG, ['user', 'password'])));
        // console.log('[  DB  ] models', Object.keys(module.exports.models));

        if (DISABLED === false) {
            tcpp.probe(CONFIG.host, CONFIG.port, function (err, available) {
                if (!available) {
                    console.log('[  DB  ] Not available');
                    setTimeout(function () {
                        console.log('   [   DB  ] reconnect');
                        module.exports.init(reconnectCallback);
                    }, 10000);
                } else {
                    try {
                        console.log('[  DB  ] available');
                        module.exports.pool = false;
                        module.exports.pool = MYSQL.createPool(CONFIG);
                        
                        module.exports.pool.on('connection', function (connection) {
                            // console.log('   ( DB ) New Connection established', connection.threadId);
                            module.exports.disabled = false;
                        });
                        module.exports.pool.on('enqueue', function () {
                            console.log('   ( DB ) Waiting for available connection slot');
                        });
                        module.exports.pool.on('release', function (connection) {
                            // console.log('   ( DB ) Connection %d released', connection.threadId);
                            
                        });
                        // module.exports.db.end(function (err) {
                        //     console.log('   ( DB ) End All Pooled Connections');
                        // });
                        if (typeof (reconnectCallback) === 'function') {
                            reconnectCallback();
                        }
                    } catch (err) {
                        if (err) {
                            console.log('   [ DB ] connection error ', JSON.stringify(err));
                        }
                        setTimeout(function () {
                            module.exports.init(reconnectCallback);
                        }, 10000);
                    }
                }
            });
        } else {
            console.log('[ DB ] disabled');
        }
        // connection.end();
    },
    theme: {
        query: function (options, callback) {
            options.query = 'SELECT * FROM `app-themes` WHERE `domain` = ?';
            // console.log('query', options.query);
            module.exports.query(options, function (results) {
                let result = {};
                try {
                    result = _.first(results.results || []);
                    module.exports.templates.query(options, function (templates = []) {
                        result.templates = (templates || []);
                        callback(result);
                    });
                } catch (err) {
                    result = false;
                    callback(result);
                }
                
            });
        },
        set: function (options, callback) {}
    },
    templates: {
        query: function (options, callback) {
            options.query = 'SELECT * FROM `app-templates` WHERE `domain` = ?';
            // console.log('query', options.query);
            module.exports.query(options, function (results) {
                let result = false;
                try {
                    result = results.results;
                } catch (err) {
                    result = false;
                }
                callback(result);
            });
        },
        set: function (options, callback) {}
    },
    system: {
        query: function (options, callback) {
            options.query = 'SELECT * FROM `app-system` WHERE `domain` = ?';
            // console.log('query', options.query);
            module.exports.query(options, function (response) {
                let result = false;
                try {
                    result = _.first(response.results);
                } catch (err) {
                    result = false;
                }
                callback(result);
            });
        },
        set: function (options, callback) {}
    },

    
    /*  OBJECT METHODS  */
    query: function (options, callback) {
        if (options.query.search(/(INSERT|REPLACE)/) !== -1) module.exports.insert(options, callback);
        else {
            module.exports.pool.getConnection(function (err, connection = false) {
                if (err) {
                    if (connection) {
                        connection.release();
                    }
                    console.log('[ DB ] query err', onError(err));
                    setTimeout(function () {
                        module.exports.init(function () {
                            module.exports.query(options, callback);
                        });
                    }, 10000);
                    return;
                }
                const { query = false, params = [] } = options || {};
                const sql = connection.format(query, params);
                console.log('   db query', sql);
                module.exports.execute(connection, options, sql, callback);
            });
        }
    },
    update: (options, callback) => {
        module.exports.pool.getConnection(function (err, connection) {
            if (err) {
                if (connection) {
                    connection.release();
                }
                console.log('[ DB ] update err', onError(err));
                setTimeout(function () {
                    module.exports.init(function () {
                        module.exports.update(options, callback);
                    });
                }, 10000);
                return;
            }
            const { query = false, entries = [] } = options || {};
            const sql = connection.format(query, [ entries ]);
            console.log('   db update', sql);
            module.exports.execute(connection, options, sql, callback);
        });
    },
    insert: function (options, callback) {
        module.exports.pool.getConnection(function (err, connection) {
            if (err) {
                if (connection) {
                    connection.release();
                }
                
                console.log('[ DB ] insert err', onError(err));
                setTimeout(function () {
                    module.exports.init(function () {
                        module.exports.insert(options, callback);
                    });
                }, 10000);
                return;
            }
            const { query = false, entries = [] } = options;
            const sql = connection.format(query, [ entries ]);
            console.log('   inserts', sql);
            module.exports.execute(connection, options, sql, callback);
        });
    },
    delete: function (options, callback) {
        module.exports.pool.getConnection(function (err, connection) {
            if (err) {
                if (connection) {
                    connection.release();
                }
                
                console.log('[ DB ] delete err', onError(err));
                setTimeout(function () {
                    module.exports.init(function () {
                        module.exports.delete(options, callback);
                    });
                }, 10000);
                return;
            }
            var query = options.query || false;
            var params = options.params || false;
            var sql = connection.format(query, params);
            // console.log('   del', sql);
            module.exports.execute(connection, options, sql, callback);
        });
    },
    execute: function (connection, options, sql, callback) {
        // console.log('   execute', sql || 'no sql statement');
        const timing = Date.now();
        if (module.exports.disabled === true) {
            connection.release();
            console.log('[ DB ] execute; disabled;');
            options.message = '[ DB ] not available';
            if (callback && typeof (callback) === 'function') {
                callback(options);
            }
        } else {
            connection.query(sql, function (error, results, fields) {
                if (connection) connection.release();
                /*  stringify then parse to create an object    */
                if (error) {
                    const err = _.first(error.toString().split('at'));
                    console.log('   [ DB ] error', err);
                    results = [];
                }
                options.results = JSON.parse(JSON.stringify(results));
                if (error) options.error = error;
                if (results && results.insertId) options.insertId = results.insertId;
                if (callback && typeof (callback) === 'function') {
                    console.log('[  DB timing   ] ', sql, '( ' + secondsToDuration(timing).s + ' s )');
                    callback(options);
                }
            });
        }
    }
};
