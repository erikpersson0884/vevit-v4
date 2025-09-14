import React, { createContext, useEffect, useContext, useState, ReactNode } from 'react';
import authApi from '../api/authApi';
import userApi from '../api/userApi';
import { setAuthToken } from '../api/axiosInstance';

interface AuthContextType {
    currentUser: IUser | null;
    isLoggedIn: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;

    showAuthPopup: boolean;
    setShowAuthPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState<IUser | null>(null);
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(!!currentUser);
    const [ showAuthPopup, setShowAuthPopup ] = React.useState(false);

    useEffect(() => {
        setIsLoggedIn(!!currentUser);
    }, [currentUser]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await userApi.getCurrentUser();
                setCurrentUser(user);
            } catch (error) {
                
                console.error('Failed to fetch current user', error);
            }
        };
        if (localStorage.getItem('authToken')) {
            fetchUser();
        }
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const token: string = await authApi.login(username, password);
            if (token) {
                setAuthToken(token); // Set the token in axios instance
                const user = await userApi.getCurrentUser(); // Fetch the current user after login
                setCurrentUser(user);
                return true;
            }
        } catch (error: unknown) {
            console.error('Login failed', error);
        }
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('authToken'); 
    };

    return (
        <AuthContext.Provider value={{ currentUser, isLoggedIn, login, logout, showAuthPopup, setShowAuthPopup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};