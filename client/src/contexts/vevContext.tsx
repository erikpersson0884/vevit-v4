import React, { createContext, useContext, useState, ReactNode } from 'react';
import { fetchVevs as fetchVevApiCall, createVev as createVevApiCall } from '../api/vevApi';
import { useUsersContext } from './usersContext';

interface VevContextProps {
    vevs: IVev[];
    setVevs: React.Dispatch<React.SetStateAction<IVev[]>>;
    filteredVevs: IVev[];
    setFilteredVevs: React.Dispatch<React.SetStateAction<IVev[]>>;
    createVev: (challangedId: string, date: string, reason: string) => Promise<boolean>;
}

const VevContext = createContext<VevContextProps | undefined>(undefined);

export const VevProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [vevs, setVevs] = useState<IVev[]>([]);
    const [filteredVevs, setFilteredVevs] = useState<IVev[]>([]);

    const fetchVevs = async () => {
        try {
            const data: IVev[] = await fetchVevApiCall();
            data.forEach(vev => {
                vev.date = new Date(vev.date);
            });
            setVevs(data);
            
        } catch (error) {
            console.error('Error fetching vevs:', error);
        }
    };

    React.useEffect(() => {
        fetchVevs();
    }, []);

    React.useEffect(() => {
        setFilteredVevs(vevs);
    }, [vevs]);

    const createVev = async (challangedId: string, date: string, reason: string): Promise<boolean> => {
        try {
            await createVevApiCall(challangedId, date, reason)
            fetchVevs();
            return true;
        } catch (error) {
            console.error('Error creating VEV:', error);
            return false;
        }
    };


    return (
        <VevContext.Provider value={{ 
            vevs, 
            setVevs, 
            filteredVevs, 
            setFilteredVevs,
            createVev
        }}>
            {children}
        </VevContext.Provider>
    );
};

export const useVevContext = (): VevContextProps => {
    const context = useContext(VevContext);
    if (!context) {
        throw new Error('useVevContext must be used within a VevProvider');
    }
    return context;
};
