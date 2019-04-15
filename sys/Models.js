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

const Get = {
    '/': () => {
        return makePromise({worked: true})
    },
    '/config': () => {
        return makePromise({worked: true});
    }
};
const Post = {
    '/config': () => {
        return makePromise({worked: true});
    }
};
const Put = {

};
const Delete = {

};
const Routes = {
    Get: Object.keys(Get),
    Post: Object.keys(Post),
    Put: Object.keys(Put),
    Delete: Object.keys(Delete)
};

console.log('[ Routes ]', JSON.stringify(Routes));
module.exports = { Routes, Get, Post, Put, Delete };
