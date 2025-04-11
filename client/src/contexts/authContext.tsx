import React, { createContext, useContext, useState, ReactNode } from 'react';
import authApi from '../api/authApi';
import userApi from '../api/userApi';
import { setAuthToken } from '../api/axiosInstance';

interface AuthContextType {
    currentUser: IUser | null;
    login: (username: string, password: string) => void;
    logout: () => void;

    showLoginPopup: boolean;
    setShowLoginPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState<IUser | null>(null);
    const [ showLoginPopup, setShowLoginPopup ] = React.useState(false);

    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await userApi.getCurrentUser();
                setCurrentUser(user);
            } catch (error) {
                
                console.error('Failed to fetch current user', error);
            }
        };
        if (localStorage.getItem('token')) {
            fetchUser();
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const token: string = await authApi.login(username, password);
            if (token) {
                setAuthToken(token); // Set the token in axios instance
                const user = await userApi.getCurrentUser(); // Fetch the current user after login
                setCurrentUser(user);
                console.log('Login successful', user);
            } else {
                console.error('Login failed: No token received');
            }
        } catch (error: unknown) {
            console.error('Login failed', error);
        }
    };

    const logout = () => {
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, showLoginPopup, setShowLoginPopup }}>
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