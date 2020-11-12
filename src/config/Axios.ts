import Axios from 'axios';

Axios.defaults.headers['Authorization'] = `Client-ID ${process.env.VUE_APP_CLIENT_ID}`;
