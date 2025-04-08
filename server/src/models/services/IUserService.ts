import IUser from './IUser';

export interface IUserService {
    getAllUsers(): IUser[];
    createUser(name: string, email: string, password: string): IUser;
    getUserById(id: number): IUser | undefined;
    updateUser(id: number, name: string, email: string, password: string): IUser | undefined;
    deleteUser(id: number): IUser | undefined;
}

export default IUserService;