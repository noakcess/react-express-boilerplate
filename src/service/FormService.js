/*eslint no-unused-vars: "off"*/

import { Promise } from 'es6-promise-promise';
// import { Log } from 'Service/Common';
import { propertyOf } from 'underscore';

import axiosInternal from './modules/axiosInternal';
import axiosExternal from './modules/axiosExternal';
const Log = window.Log;

const { hostname } = window.location;
const SERVER = `${hostname}:3001`;
const EXPRESS = ('//' + SERVER);

class FormService {
    
    extPOST (endpoint = '/', data, method = 'POST') {
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
    }
    extPUT (endpoint = '/', data) {
        return FormService.ext.post(endpoint, data, 'PUT');
    }
    
    extDELETE (endpoint = '/', data) {
        return FormService.ext.post(endpoint, data, 'DELETE');
    }
    extGET (endpoint = '/') {
        Log.info({ endpoint });
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
    
    POST (endpoint = '/', data, method = 'POST') {
        Log.info({ endpoint, data, method });
        return new Promise((resolve, reject) => {
            axiosInternal({ method, url: EXPRESS + endpoint, data })
                .then(result => {
                    Log.info("   post", result.data);
                    resolve(result.data);
                })
                .catch(function (error) {
                    Log.error({ error });
                });
        });
    }
    PUT (endpoint = '/', data) {
        return FormService.int.post(endpoint, data, 'PUT');
    }
    DELETE (endpoint = '/', data) {
        return FormService.int.post(endpoint, data, 'DELETE');
    }
    GET (endpoint = '/') {
        
        return new Promise((resolve, reject) => {
            axiosInternal.get(endpoint).then(response => {
                Log.info({ endpoint, response });
                resolve(response.data);
            }).catch(function (error) {
                Log.error({ endpoint, error });
                resolve({ error });
            });
        });
    }

}

export default new FormService();
