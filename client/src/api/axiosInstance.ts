import axios from 'axios';


const isTokenValid = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp && payload.exp > currentTime;
    } catch (err) {
        console.error('Error parsing token:', err);
        return false;
    }
}

const api = axios.create({
    // baseURL: "http://192.168.50.128:3001/api",
    baseURL: "http://192.168.50.128:3001/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = (newToken: string): void => {
    if (isTokenValid(newToken)) {
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        localStorage.setItem('authToken', newToken);
    } else {
        console.warn('Provided token is invalid.');
    }
};

const token: string | null = localStorage.getItem('authToken');

// Set the Authorization header if the token exists and is valid
if (token && isTokenValid(token)) {
    setAuthToken(token);
} else {
    // localStorage.removeItem('authToken');
}

export default api;
