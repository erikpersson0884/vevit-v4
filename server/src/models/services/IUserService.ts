import IUser from '../IUser';

export interface IUserService {
    getAllUsers(): IUser[];
    createUser(name: string, password: string): IUser;
    getUserById(id: number): IUser | null;
    updateUser(id: number, newUsername?: string, newPassword?: string): IUser | null;
    deleteUser(id: number): IUser | null;
}

export default IUserService;