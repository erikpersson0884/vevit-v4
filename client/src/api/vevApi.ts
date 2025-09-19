import api from './axiosInstance';

const DEFAULT_PAGE = 0;
const DEFAULT_LIMIT = 25;

export const vevApi = {
    fetchVevs: async (
        page: number = DEFAULT_PAGE, 
        limit: number = DEFAULT_LIMIT
    ): Promise<FetchVevsResponse> => {
        const params = {
            page: page.toString(),
            limit: limit.toString(),
        }

        try {
            const response = await api.get('/vev', { params });
            const apiResponse = {
                vevs: response.data.vevs,
                total: response.data.total,
                page: response.data.page,
                limit: response.data.limit,
            }
            return apiResponse;
        } catch (error) {
            console.error('Error fetching vevs:', error);
            throw error;
        }
    },

    fetchVevById: async (id: string) => {
        try {
            const response = await api.get(`/vev/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching vev with id ${id}:`, error);
            throw error;
        }
    },

    createVev: async (challengedId: string, date: string, reason: string) => {
        try {
            const body = {
                challengedId,
                date,
                reason
            };
            const response = await api.post('/vev', body);
            return response.data;
        } catch (error) {
            console.error('Error creating vev:', error);
            throw error;
        }
    },

    updateVev: async (
        vevId: string, 
        {date, winnerId, reason}: UpdateVevOptions,
    ): Promise<boolean> => {
        try {
            const body: Record<string, string | null> = {};
            if (date) body.date = date.toISOString();
            if (winnerId) body.winnerId = winnerId;
            if (reason) body.reason = reason;

            const response = await api.patch(`/vev/${vevId}`, body);
            return response.status === 200;
        } catch (error) {
            console.error(`Error updating vev with id ${vevId}:`, error);
            throw error;
        }
    },

    updateWinner: async (
        vevId: string,
        winnerId: string | null
    ) : Promise<boolean> => {
        try {
            const body = {
                winnerId
            }
            const response = await api.patch(`/vev/winner/${vevId}`, body);
            return response.data;
        } catch (error) {
            console.error(`Error updating vev with id ${vevId}:`, error);
            throw error;
        }
    },

    deleteVev: async (vevId: string) => {
        try {
            const response = await api.delete(`/vev/${vevId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting vev with id ${vevId}:`, error);
            throw error;
        }
    }
};

export default vevApi;
