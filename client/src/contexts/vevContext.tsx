import React, { createContext, useContext, useState, ReactNode } from 'react';
import { fetchVevs } from '../api/vevApi';
import { useUsersContext } from './usersContext';

interface VevContextProps {
    vevs: IVev[];
    setVevs: React.Dispatch<React.SetStateAction<IVev[]>>;
    filteredVevs: IVev[];
    setFilteredVevs: React.Dispatch<React.SetStateAction<IVev[]>>;
}

const VevContext = createContext<VevContextProps | undefined>(undefined);

export const VevProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { getUserById } = useUsersContext();

    const [vevs, setVevs] = useState<IVev[]>([]);
    const [filteredVevs, setFilteredVevs] = useState<IVev[]>([]);


    React.useEffect(() => {
        const fetchVevsData = async () => {
            try {
                // const data: IVevDTO[] = await fetchVevs();
                // const transformedData: IVev[] = data.map((vev) => {
                //     const challenger: IUser = getUserById(vev.challengerId);
                //     const challenged: IUser = getUserById(vev.challengedId);
                //     return { ...vev, challenger, challenged };
                // });
                // setVevs(transformedData);
                // setFilteredVevs(transformedData);

                const data: IVev[] = await fetchVevs();
                setVevs(data);
                
            } catch (error) {
                console.error('Error fetching vevs:', error);
            }
        };
        fetchVevsData();
    }, []);

    React.useEffect(() => {
        setFilteredVevs(vevs);
    }, [vevs]);


    return (
        <VevContext.Provider value={{ vevs, setVevs, filteredVevs, setFilteredVevs }}>
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
