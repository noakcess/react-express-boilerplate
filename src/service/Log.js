const chalk = require('chalk');
chalk.enabled = true;
chalk.level = 3;

const colors = {trace:'blue',info:'green',warn:'yellow',error: 'red'};



const Caller = () => {
    const stack = new Error().stack;
    const error = stack.split('\n').splice(3, 1).toString().split('\\')[0].toString();
    const start = ( error.search(/src/gi) !== -1 ? error.search(/src/gi) : error.search(/at /gi) + 3);
    const end = ( error.search(/\(/gi) - start) -1;
    const callerName = ( typeof error === 'string' ? error.substr(start, end) : '~' );
    // console.log('CALLER', { error, callerName, start, end });
    // console.log('   stack', stack);
    return callerName;
};
class Log {
    printLog (level, logs = []) {
        logs.map(row => {
            if (row) console.log(chalk[colors[level]]('    [ ' + typeof(row) + ' ]'), row);
            return true;
        });
    }
    
    generateMessage (level, data = [], caller) {
        if (window && window.DEBUG) {
            /* extract Caller if data[0] is a string */
            const _caller = (data && typeof(data[0]) === 'string' ? data.shift() : false);
            console.group(_caller || caller);
            if (data.length > 0) {
                if (window && window.DEBUG) this.printLog(level, data);
            }
            console.groupEnd();
            return true;
        }
    }
    
    trace (...message) {
        return this.generateMessage('trace', message, Caller());
    }
    log (...message) {
        return this.generateMessage('info', message, Caller());
    }
    
    info (...message) {
        return this.generateMessage('info', message, Caller());
    }
    
    warn (...message) {
        return this.generateMessage('warn', message, Caller());
    }
    
    error (...message) {
        return this.generateMessage('error', message, Caller());
    }
}

export default new Log();
