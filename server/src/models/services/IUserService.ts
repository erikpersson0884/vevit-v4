import { User } from "@prisma/client";

export interface IUserService {
    doesUserExistWithId(id: string): Promise<boolean>;
    doesUserExistWithUsername(username: string): Promise<boolean>;

    getAllUsers(): Promise<User[]>;
    getUserByUsername(username: string): Promise<User | null>;

    createUser(name: string, password: string): Promise<User>;
    getUserById(id: string): Promise<User | null>;
    updateUser(id: string, newUsername?: string, newPassword?: string): Promise<User>;
    deleteUser(id: string): Promise<User>;
}

export default IUserService;