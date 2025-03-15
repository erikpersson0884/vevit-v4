export interface IUser {
    id: number;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserService {
    getAllUsers(): IUser[];
    createUser(name: string, email: string, password: string): IUser;
    getUserById(id: number): IUser | undefined;
    updateUser(id: number, name: string, email: string, password: string): IUser | undefined;
    deleteUser(id: number): IUser | undefined;
}

