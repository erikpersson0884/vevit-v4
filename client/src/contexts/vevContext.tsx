import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import vevApi from '../api/vevApi';

import { useAuthContext } from './authContext';
import { useUsersContext } from './usersContext';

interface filterOptions {
    timeFilter: "all" | "future" | "past" | null;
    userFilter: "all" | "mine" | null;
}

type sortingKeys = "challenger" | "challenged" | "time";
interface sortOptions {
    key: sortingKeys;
    order: "asc" | "desc";
}

interface VevContextProps {
    vevs: IVev[];
    filteredVevs: IVev[];
    createVev: (challangedId: string, date: string, reason: string) => Promise<boolean>;
    updateVev: (vevId: string, options: UpdateVevOptions) => Promise<boolean>;
    updateVevWinner: (vevId: string, winnerId: string | null) => Promise<boolean>;
    deleteVev: (vevId: string) => Promise<boolean>;

    selectedVev: IVev | null;
    setSelectedVev: React.Dispatch<React.SetStateAction<IVev | null>>;

    setFilters: React.Dispatch<React.SetStateAction<{
        timeFilter: "all" | "future" | "past" | null;
        userFilter: "all" | "mine" | null;
    }>>;
    setSortConfig: React.Dispatch<React.SetStateAction<sortOptions>>;
    toggleSort: (key: sortingKeys) => void;
}

const VevContext = createContext<VevContextProps | undefined>(undefined);

export const VevProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { currentUser } = useAuthContext();
    const { getUserById } = useUsersContext();
    
    const [ vevs, setVevs ] = useState<IVev[]>([]);
    const [ filteredVevs, setFilteredVevs ] = useState<IVev[]>([]);
    const [ selectedVev, setSelectedVev ] = useState<IVev | null>(null);

    const [filters, setFilters] = useState<filterOptions>({
        timeFilter: null,
        userFilter: null,
    });
    const [sortConfig, setSortConfig] = useState<sortOptions>({key: "time", order: "asc"});
    

    const sortVevs = (
        vevsToBeSorted: IVev[],
        config: sortOptions
    ): IVev[] => {
        return [...vevsToBeSorted].sort((a, b) => {
            if (config.key === "time") {
                const diff = a.date.getTime() - b.date.getTime();
                return config.order === "asc" ? diff : -diff;
            }

            let nameA = "";
            let nameB = "";

            if (config.key === "challenger") {
                const userA = getUserById(a.challengerId);
                const userB = getUserById(b.challengerId);
                nameA = userA.username;
                nameB = userB.username;
            } else if (config.key === "challenged") {
                const userA = getUserById(a.challengedId);
                const userB = getUserById(b.challengedId);
                nameA = userA.username;
                nameB = userB.username;
            }

            const cmp = nameA.localeCompare(nameB, undefined, { sensitivity: "base" });
            return config.order === "asc" ? cmp : -cmp;
        });
    };

    const toggleSort = (key: sortingKeys) => {
        setSortConfig(prev => {
            if (prev.key === key) {
                // Same key → flip order
                return { key, order: prev.order === "asc" ? "desc" : "asc" };
            }
            // New key → start ascending
            return { key, order: "asc" };
        });
    };

    const filterVevs = (): void => {
        let filtered = [...vevs];
        const now = new Date();

        if (filters.timeFilter === "past") {
            filtered = filtered.filter(vev => vev.date < now);
        } else if (filters.timeFilter === "future") {
            filtered = filtered.filter(vev => vev.date >= now);
        }

        if (filters.userFilter === "mine") {
            filtered = filtered.filter(vev => vev.challengerId === currentUser?.id || vev.challengedId === currentUser?.id);
        }

        filtered = sortVevs(filtered, sortConfig);
        setFilteredVevs(filtered);
    };
    
    useEffect(() => {
        filterVevs();
    }, [filters, sortConfig, vevs, currentUser]);

    useEffect(() => { // also update selectedVev when all vevs change
        if (selectedVev) {
            const updatedSelectedVev = vevs.find(vev => vev.id === selectedVev.id) || null;
            setSelectedVev(updatedSelectedVev);
        }
    }, [vevs]);


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

    const updateVev = async (vevId: string, options: UpdateVevOptions): Promise<boolean> => {
        try {
            const vevToUpdate = getVevById(vevId);
            if (!vevToUpdate) throw new Error("Tried to update a vev that did not exist");

            const success = await vevApi.updateVev(vevId, options);
            fetchVevs();
            return success;
        } catch (error) {
            console.error("Error updating VEV:", error);
            return false;
        }
    };

    const updateVevWinner = async (
        vevId: string,
        winnerId: string | null
    ): Promise<boolean> => {
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
            filteredVevs, 
            createVev,
            updateVev,
            updateVevWinner,
            deleteVev,
            selectedVev,
            setSelectedVev,
            setFilters,
            setSortConfig,
            toggleSort,
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
