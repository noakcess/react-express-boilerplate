const Config = require('./Config');
const makeDbPromise = (payload) => {
    return new Promise((resolve, reject) => {
        DB.query(payload, resolve);
    });
};
const makePromise = (payload) => {
    return new Promise((resolve, reject) => {
        resolve({ status: true, payload, modified: Date.now() });
    });
};
// const Words = {
//     '/words/query': () => {
//         let payload = {
//             query: 'SELECT * FROM `dictionary` WHERE `word` IS NOT NULL'
//         };
//         return makeDbPromise(payload);
//     },
//     '/words/insert': (entries = [], params) => {
//         let payload = {
//             query: 'REPLACE INTO `dictionary` (word, value) VALUES ?',
//             entries
//         };
//         return makeDbPromise(payload);
//     }
// };

const GET = {
    '/': () => {
        return makePromise({ status: 'working' });
    },
    '/config': () => {
        return Config.get();
    }
};
const POST = {
    '/config/update': (req, data) => {
        return Config.update(data);
    }
};
const PUT = {

};
const DELETE = {

};

const Routes = {
    GET: Object.keys(GET),
    POST: Object.keys(POST),
    PUT: Object.keys(PUT),
    DELETE: Object.keys(DELETE)
};

console.log('[ Routes ]', JSON.stringify(Routes));
module.exports = { list: Routes, GET, POST, PUT, DELETE };
