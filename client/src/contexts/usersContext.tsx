import { createContext, useContext, useState, ReactNode } from 'react';
import userApi from '../api/userApi';
import { useEffect } from 'react';

interface UsersContextType {
    loadingUsers: boolean;
    users: IUser[];
    getUserById: (id: string) => IUser;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
    const [ users, setUsers ] = useState<IUser[]>([]);
    const [ loadingUsers, setLoadingUsers ] = useState<boolean>(true);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const fetchedUsers = await userApi.fetchUsers();
                setUsers(fetchedUsers);
                setLoadingUsers(false);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        loadUsers();
    }, []);

    const getUserById = (id: string) => {
        const user = users.find(user => user.id === id);
        if (user) return user;
        else throw new Error(`User with id ${id} not found`);
    }

    return (
        <UsersContext.Provider value={{ loadingUsers, users, getUserById}}>
            {children}
        </UsersContext.Provider>
    );
};

export const useUsersContext = (): UsersContextType => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};