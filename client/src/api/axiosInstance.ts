import axios from 'axios';

const api = axios.create({
    baseURL: "http://192.168.50.128:3001/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
