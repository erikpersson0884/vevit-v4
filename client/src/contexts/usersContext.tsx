import { createContext, useContext, useState, ReactNode } from 'react';
import userApi from '../api/userApi';
import { useEffect } from 'react';
import { useAuthContext } from './authContext';

interface UsersContextType {
    loadingUsers: boolean;
    users: IUser[];
    getUserById: (id: string) => IUser;
    createUser: (username: string, password: string) => Promise<boolean>;
    updateUser: (userId: string, username: string, password: string) => Promise<boolean>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
    const { login } = useAuthContext();
    const [ users, setUsers ] = useState<IUser[]>([]);
    const [ loadingUsers, setLoadingUsers ] = useState<boolean>(true);

    const fetchUsers = async () => {
        try {
            const fetchedUsers = await userApi.fetchUsers();
            setUsers(fetchedUsers);
            setLoadingUsers(false);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const getUserById = (id: string) => {
        const user = users.find(user => user.id === id);
        if (user) return user;
        else throw new Error(`User with id ${id} not found`);
    }

    const createUser = async (username: string, password: string): Promise<boolean> => {
        try {
            await userApi.createUser(username, password);
            fetchUsers(); // Refresh the users list after creating a new user
            const loginSuccessful = await login(username, password);
            if (loginSuccessful) return true;
            else {
                console.error('Login failed after user creation');
                return false;
            }
        } catch (error) {
            console.error('Failed to create user:', error);
            return false;
        }
    }

    const updateUser = async (userId: string, username: string, password: string): Promise<boolean> => {
        try {
            await userApi.updateUser(userId, username, password);
            fetchUsers(); // Refresh the users list after updating
            return true;
        } catch (error) {
            console.error('Failed to update user:', error);
            return false;
        }
    }


    return (
        <UsersContext.Provider value={{ loadingUsers, users, getUserById, createUser, updateUser }}>
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