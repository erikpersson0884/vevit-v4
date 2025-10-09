import type { User } from "@prisma/client";

export default interface IUserRepository {
    getAllUsers(): Promise<User[]>;
    getUserById(userId: string): Promise<User | null>;
    getUserByUsername(username: string): Promise<User | null>;
    getUserCount(): Promise<number>;

    createUser(username: string, password: string): Promise<User>;
    updateUser(id: string, newUsername?: string, newPassword?: string): Promise<User>;
    deleteUser(id: string): Promise<User>;

    doesUserExistWithId(id: string): Promise<boolean>;
    doesUserExistWithUsername(username: string): Promise<boolean>;
}