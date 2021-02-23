import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-9e475-default-rtdb.firebaseio.com/'
});

/* instance.defaults.headers.common['Accept'] = 'application/json';
instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
instance.defaults.headers.common['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS';
instance.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-Requested-With,content-type';

instance.interceptors.response.use(response => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    // Here allow all the HTTP methods you want
    response.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,HEAD,PUT,OPTIONS');
    // Here you allow the headers for the HTTP requests to your server
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    return response;
}, error => {
    return Promise.reject(error);
}); */

export default instance;