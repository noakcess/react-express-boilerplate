/*eslint no-unused-vars: "off"*/

import { Promise } from './Common';
// import { Log } from 'Service/Common';
import { propertyOf } from 'underscore';

import axiosInternal from './modules/axiosInternal';
import axiosExternal from './modules/axiosExternal';
const Log = window.Log;

const { hostname } = window.location;
const SERVER = `${hostname}:3001`;
const EXPRESS = ('//' + SERVER);

const FormService = {
    init() {
        Log.info('FormService.init', EXPRESS);
    },
    ext: {
        post: (endpoint = '/', data, method = 'POST') => {
            // Log.info("FormService.ext.post", { endpoint, data, method });
            return new Promise((resolve, reject) => {
                axiosExternal({
                    url: endpoint,
                    method: method,
                    data: data,
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch(function (error) {
                        Log.error(`[ Error ] Form.ext.${method}`, error);
                        resolve({ error });
                    });
            });
        },
        put: (endpoint = '/', data) => {
            return FormService.ext.post(endpoint, data, 'PUT');
        },
        del: (endpoint = '/', data) => {
            return FormService.ext.post(endpoint, data, 'DELETE');
        },
        get: (endpoint = '/') => {
            // Log.info("FormService.ext.get", endpoint);
            return new Promise((resolve, reject) => {
                axiosExternal.get(endpoint).then(result => {
                    // Log.info("   get", result);
                    resolve(result.data);
                }).catch(function (error) {
                    Log.error('[ Error ] FormService.ext.get', error);
                    resolve({ error });
                });
            });
        }

    },

    int: {
        post: (endpoint = '/', data, method = 'POST') => {
            Log.info('FormService.int.post', { endpoint, data, method });
            return new Promise((resolve, reject) => {
                axiosInternal({
                    method: method,
                    url: endpoint,
                    data: data
                })
                    .then(result => {
                        // Log.info("   post", result.data);
                        resolve(result.data);
                    })
                    .catch(function (error) {
                        Log.error(`[ Error ] Form.int.${method}`, error);
                    });
            });
        },
        put: (endpoint = '/', data) => {
            return FormService.int.post(endpoint, data, 'PUT');
        },
        del: (endpoint = '/', data) => {
            return FormService.int.post(endpoint, data, 'DELETE');
        },
        get: (endpoint = '/') => {
            // Log.info("FormService.int.get", endpoint);
            return new Promise((resolve, reject) => {
                axiosInternal.get(endpoint).then(result => {
                    // Log.info('   get', result);
                    resolve(result.data);
                }).catch(function (error) {
                    Log.error('[ Error ] FormService.int.get', error);
                    resolve({ error });
                });
            });
        }
    },

    post(endpoint = '/', data) {
        return FormService.int.post(endpoint, data);
    },
    put(endpoint = '/', data) {
        return FormService.int.post(endpoint, data, 'PUT');
    },
    del(endpoint = '/', data) {
        return FormService.int.post(endpoint, data, 'DELETE');
    },
    get(endpoint = '/') {
        return FormService.int.get(endpoint);
    }
};

export default FormService;
