import api from './axiosInstance';

export const fetchVevs = async () => {
    try {
        const response = await api.get('/vev');
        return response.data;
    } catch (error) {
        console.error('Error fetching vevs:', error);
        throw error;
    }
}

export const fetchVevById = async (id: string) => {
    try {
        const response = await api.get(`/vev/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching vev with id ${id}:`, error);
        throw error;
    }
}

export const createVev = async (challengedId: string, reason: string) => {
    try {
        const body = {
            challengedId,
            reason
        };
        const response = await api.post('/vev', body);
        return response.data;
    } catch (error) {
        console.error('Error creating vev:', error);
        throw error;
    }
}
