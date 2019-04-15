import axios from 'axios';
const { hostname = '' } = window.location;

const SERVER = `${hostname}:3001`;
const EXPRESS = ('//' + SERVER);
console.log({ EXPRESS });
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Access-Control-Allow-Origin'] = EXPRESS;
axios.defaults.headers['Access-Control-Allow-Credential'] = true;
axios.defaults.headers['crossDomain'] = true;
axios.defaults.baseURL = EXPRESS;

export default axios;
