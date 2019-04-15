const execSync = require('child_process').execSync;
const { exec } = require('child_process');
const npmRunScript = require('npm-run-script');
const cookie = require('cookie');
const md5Dir = require('md5-dir');
const cwd = process.cwd();
const moment = require('moment');

/*  https://jrgraphix.net/r/Unicode/    */



now = () => {
    return moment().format('YYYY-MM-DD h:mm:ss a');
};

encodeURL = function (url) {
    var encoded = encodeURI(url);
    return encoded.replace(/'/g, '%27');
};

String.prototype.ucwords = function () {
    str = this.toLowerCase();
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
        function ($1) {
            return $1.toUpperCase();
        });
};

stackError = function () {
    var stack = new Error().stack;
    // console.log('###################[ STACK ]###################', stack);
    var error = stack.split('\n').splice(2, 1).toString().split('\\');
    var string = 'Error: ' + error.splice(error.length - 2, 2).join('/');
    return string;
};

parseError = function (err) {
    return _.first(err.toString().split('at '));
};

secondsToDuration = function (start) {
    var now = Date.now().toString();
    var _start = start.toString();
    var mili = Math.abs(now.substring(10, 13) - _start.substring(10, 13));
    var startTime = moment.unix(now.substring(0, 10), 'DD/MM/YYYY HH:mm:ss');
    var endTime = moment.unix(_start.substring(0, 10), 'DD/MM/YYYY HH:mm:ss');
    var duration = moment.duration(startTime.diff(endTime));
    // console.log('times', {now: now, start: _start, startTime: startTime, endtime: endTime});
    // console.log('secondsToDuration', start, duration.asMinutes() + ' m ' +  duration.asSeconds() + ' s');
    var temp = {};
    
    temp.d = Math.round(duration.asDays());
    temp.h = Math.round(duration.asHours());
    temp.m = duration.asMinutes();
    temp.s = duration.asSeconds() + '.' + mili;
    return temp;
};

getSessionCookies = (text = '') => {
    var cookies = cookie.parse(text);
    // console.log('cookies', cookies);
    return {
        showId: (cookies['Router.showId'] || false),
        episodeId: (cookies['Router.episodeId'] || false)
    };
};

getRequire = (filepath) => {
    let resolve = path.resolve(cwd).replace(/\\/g, '/') + filepath;
    // console.log('[ getRequire ]', resolve);
    let temp = false;
    try {
        temp = require(resolve);
    } catch (err) {
        console.log('[ ERROR ] getRequire error', { resolve, err });
        temp = false;
    }
    return temp;
};

finished = (text, callback) => {
    if (text) console.log(text);
    if(typeof(callback) === 'function') callback();
};

module.exports = {};
