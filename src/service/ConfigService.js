/*eslint no-unused-vars: "off"*/

import { FormService } from './Common';

const Log = window.Log;

const ConfigService = {
    init: () => {
        FormService.get('/config').then(response => {
            Log.info({ response });
        });
        
    }
};
export default ConfigService;
