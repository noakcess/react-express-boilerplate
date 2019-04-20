const fs = require('fs');

class Config {
    constructor() {
        this.env = './.env.local';
        this.filename = './config.json';
        this.get().then(config => this.data = config);
    }
    get() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filename, 'utf8', (err, config) => {
                // console.log('config', config);
                resolve(JSON.parse(config || {}));
            });
        });
        
    }
    update(data) {
        return new Promise((resolve, reject) => {
            
            fs.writeFileSync(this.filename, JSON.stringify(data.body));
            fs.writeFileSync(this.env, `REACT_APP_SERVER=${data.body.port}`);
            resolve({ success: true });
        });
    }
    process(server) {
        const { port = 3001 } = this.data;
        console.log('Config.process', port);
        
        server.listen(port, function () {
            console.log(`listening on ${port}`);
        });
    }
}
module.exports = new Config();
