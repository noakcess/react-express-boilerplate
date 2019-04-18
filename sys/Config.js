const fs = require('fs');

class Config {
    constructor() {
        this.filename = './config.json';
    }
    get() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filename, 'utf8', (err, config) => {
                resolve(JSON.parse(config));
            });
        });
        
    }
    update(data) {
        return new Promise((resolve, reject) => {
            fs.writeFileSync(this.filename, JSON.stringify(data.body));
            resolve(data);
        });
    }
}
module.exports = new Config();
