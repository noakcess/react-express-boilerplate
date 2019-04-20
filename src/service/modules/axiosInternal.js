import axios from 'axios';
const { Log } = window;
const { hostname = '' } = window.location;
const { REACT_APP_SERVER } = process.env;

const SERVER = `${hostname}:${REACT_APP_SERVER}`;
const EXPRESS = ('//' + SERVER);

Log.info({ REACT_APP_SERVER, EXPRESS });

axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Access-Control-Allow-Origin'] = EXPRESS;
axios.defaults.headers['Access-Control-Allow-Credential'] = true;
axios.defaults.headers['crossDomain'] = true;
axios.defaults.baseURL = EXPRESS;

export default axios;
