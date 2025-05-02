import React, { createContext, useContext, useState, ReactNode } from 'react';
import vevApi from '../api/vevApi';

interface VevContextProps {
    vevs: IVev[];
    setVevs: React.Dispatch<React.SetStateAction<IVev[]>>;
    filteredVevs: IVev[];
    setFilteredVevs: React.Dispatch<React.SetStateAction<IVev[]>>;
    createVev: (challangedId: string, date: string, reason: string) => Promise<boolean>;
    updateVev: (vevId: string, date: Date, winnerId: string | null, reason: string | null) => Promise<boolean>;
    updateVevWinner: (vevId: string, winnerId: string | null) => Promise<boolean>;
    deleteVev: (vevId: string) => Promise<boolean>;

    selectedVevToUpdate: IVev | null;
    setSelectedVevToUpdate: React.Dispatch<React.SetStateAction<IVev | null>>;
}

const VevContext = createContext<VevContextProps | undefined>(undefined);

export const VevProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [vevs, setVevs] = useState<IVev[]>([]);
    const [filteredVevs, setFilteredVevs] = useState<IVev[]>([]);
    const [ selectedVevToUpdate, setSelectedVevToUpdate ] = useState<IVev | null>(null);

    const fetchVevs = async () => {
        try {
            const data: IVev[] = await vevApi.fetchVevs();
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

    const getVevById = (id: string): IVev | undefined => {
        return vevs.find(vev => vev.id == id)
    }

    const createVev = async (challangedId: string, date: string, reason: string): Promise<boolean> => {
        try {
            await vevApi.createVev(challangedId, date, reason)
            fetchVevs();
            return true;
        } catch (error) {
            console.error('Error creating VEV:', error);
            return false;
        }
    };

    const updateVev = async (
        vevId: string, 
        date: Date, 
        winnerId: string | null, 
        reason: string | null
    ) => {
        try {
            const vevToUpdate = getVevById(vevId);
            if (!vevToUpdate) throw new Error("Tried to update a vev that did not exist")
            
            const success = await vevApi.updateVev(vevId, date, winnerId, reason);
            fetchVevs();
            return success;
        }
        catch (error) {
            console.error('Error updating VEV:', error);
            return false;
        }
    };

    const updateVevWinner = async (
        vevId: string,
        winnerId: string | null
    ) => {
        try {
            await vevApi.updateWinner(vevId, winnerId)
            return true;
        }
        catch (error) {
            console.error('Error updating vev winner', error)
            return false;
        }
    }

    const deleteVev = async (vevId: string) => {
        try {
            const success = await vevApi.deleteVev(vevId);
            fetchVevs();
            return success;
        } catch (error) {
            console.error('Error deleting VEV:', error);
            return false;
        }
    };


    return (
        <VevContext.Provider value={{ 
            vevs, 
            setVevs, 
            filteredVevs, 
            setFilteredVevs,
            createVev,
            updateVev,
            updateVevWinner,
            deleteVev,
            selectedVevToUpdate,
            setSelectedVevToUpdate
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
