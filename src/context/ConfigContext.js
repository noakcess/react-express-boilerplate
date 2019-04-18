import React from 'react';

const Log = window.Log;

const configUpdate = (e) => {
    const { target } = e.nativeEvent;
    const { name, value } = target;
    Log.info({ name, value });
};

export const ConfigOptions = {
    form: {
        name: 'react-express-container-' + Date.now(),
        code: 'false',
        readonly: 'false',
        dateModified: Date.now(),
        services: {
            mysql: {
                active: 'false',
                config: {
                    name: '',
                    host: '',
                    port: '',
                    pass: '',
                    database: ''
                },
                source: 'false',
                backup: 'false'
            
            },
            redis: {
                active: 'false',
                config: {
                    name: '',
                    host: '',
                    port: '',
                    pass: '',
                    database: ''
                },
                source: 'false',
                backup: 'false'
            },
            mongo: {
                active: 'false',
                config: {
                    name: '',
                    host: '',
                    port: '',
                    pass: '',
                    database: ''
                },
                source: 'false',
                backup: 'false'
            },
        }
    },
    configUpdate
};

export const ConfigContext = React.createContext({
    ...ConfigOptions,
    configUpdate
});

/* DO NOT EDIT THIS FILE UNLESS YOU WANT TO CUSTOMIZE CONFIG.
*   This file is for core app configuration and not custom app.
*   AppContext.js should be used to add configuration for custom app.
*/
