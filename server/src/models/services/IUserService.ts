import IUser from '../IUser.js';
import { AuthProvider } from '../../../prisma/generated/prisma/client.js';

export interface IUserService {
    checkIfUserIdExists(id: string): Promise<boolean>;
    checkIfUsernameExists(username: string): Promise<boolean>;
    
    getAllUsers(): Promise<IUser[]>;
    getUserByUsername(username: string): Promise<IUser | null>;
    createUser(name: string, password: string): Promise<IUser>;
    getUserById(id: string): Promise<IUser | null>;
    updateUser(id: string, newUsername?: string, newPassword?: string): Promise<IUser | null>;
    deleteUser(id: string): Promise<IUser | null>;
    getUserByExternalAccount(provider: AuthProvider, providerId: string): Promise<IUser | null>;
    linkExternalAccount(userId: string, provider: AuthProvider, providerId: string): Promise<void>;
    createUserWithExternalAccount(provider: AuthProvider, providerId: string, username?: string): Promise<IUser>;
}

export default IUserService;