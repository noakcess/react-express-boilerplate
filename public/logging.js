
const Colors = {
    trace:'color:Black;background:#b2d9ea',
    info:'color:Black;background:#d7e7a9',
    warn:'color:Black;background:#f2cf59',
    error: 'color:White;background:#e69288'
};
const callerRegex = new RegExp('(eval|Object.)', 'gi');
const Caller = () => {
    const parse = (label, string, index, regex) => {
        const list = string.split('\n');
        let filter = false;
        list.map((str, index ) => { if(str.search(regex) !== -1) filter = list[index + 1]; return false; });
        const start = filter.search(/at /gi) +3;
        const end = (filter.search(/\(/gi) - start) -1;
        let callerName = ( typeof filter === 'string' ? filter.substr(start, end) : filter ) || false;
        if (callerName.search(callerRegex) !== -1) callerName = filter.replace('at ', '').replace(callerRegex, '');
        // console.log(`parse ${label}`, { string: string.split('\n'), filter, index, regex, start, end, callerName });
        return callerName.trim();
    };
    const stack = new Error().stack;
    const callerName = parse('A', stack, 3, new RegExp('Log.', 'gi'));
    // console.log('   CALLER', { error, callerName, start, end });
    return callerName;
};

class Log {
    _printLog = (level, logs = []) => {
        logs.map(row => {
            if (row) console.log(` ( ${typeof (row)} ) `, row);
            return true;
        });
    };
    
    _generateMessage = (level, data = [], caller) => {
        if (window && window.DEBUG) {
            /* extract Caller if data[0] is a string */
            // const _caller = (data && typeof (data[0]) === 'string' ? data.shift() : false);
            console.group(`%c ${caller} `, Colors[level]);
            if (data.length > 0) {
                if (window && window.DEBUG) this._printLog(level, data);
            }
            console.groupEnd();
            return true;
        }
    };
    
    trace = (...message) => {
        return this._generateMessage('trace', message, Caller());
    };
    
    log = (...message) => {
        return this._generateMessage('info', message, Caller());
    };
    
    info = (...message) => {
        return this._generateMessage('info', message, Caller());
    };
    
    warn = (...message) => {
        return this._generateMessage('warn', message, Caller());
    };
    
    error = (...message) => {
        return this._generateMessage('error', message, Caller());
    };
}
window.Log = new Log();
