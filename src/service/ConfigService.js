/*eslint no-unused-vars: "off"*/

import { FormService } from './Common';

const Log = window.Log;
class ConfigService {
    constructor() {
        this.config = false;
    }
    load() {
        return new Promise((resolve, reject) => {
            FormService.GET('/config').then(config => resolve(config));
        });
    }
    save(data) {
        return new Promise((resolve, reject) => {
            FormService.POST('/config/update', data)
                .then(response => {
                    resolve(response);
                });
        });
        
    }
}

export default new ConfigService();
