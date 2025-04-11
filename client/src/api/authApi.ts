import { AxiosResponse } from 'axios';
import api from './axiosInstance';

const authApi = {
    login: async (username: string, password: string) => {
        const response = await api.post('/auth/login', { username, password });
        return response.data.token;
    },
    register: async (username: string, password: string): Promise<string> => {
        const response: AxiosResponse = await api.post('/auth/register', { username, password });
        return response.data;
    },
};

export default authApi;
