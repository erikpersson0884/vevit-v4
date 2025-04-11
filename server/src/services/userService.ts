import { IUser } from '../models/IUser';
import { IUserService } from '../models/services/IUserService';
import prisma from "../lib/prisma";
import { UserNotFoundError } from '../errors/UserNotFoundError';
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError';


export class UserService implements IUserService {

    public async checkIfUserExists(username: string): Promise<boolean> {
        let userExists = await prisma.user.findFirst({
            where: { username: username },
        })
        return userExists !== null;
    }

    async getAllUsers(): Promise<IUser[]> {
        const users: IUser[] = await prisma.user.findMany();
        return users;
    }

    async getUserById(userId: string): Promise<IUser | null> {
        const user: IUser | null = await prisma.user.findUnique({
            where: { id: userId },
        });
        return user;
    }

    async getUserByUsername(username: string): Promise<IUser | null> {
        const user = await prisma.user.findUnique({
            where: { username: username },
        });
        return user;
    }

    async createUser(username: string, password: string): Promise<IUser> {
        if (await this.checkIfUserExists(username)) {
            throw new UserAlreadyExistsError(`User with username ${username} already exists`);
        }
        const user: IUser = await prisma.user.create({
            data: {
                username,
                password,
            },
        });
    
        return user;
    }

    async updateUser(id: string, newUsername?: string, newPassword?: string): Promise<IUser> {
        const user: IUser | null = await this.getUserById(id);

        if (user) {
            user.username = newUsername || user.username;
            user.password = newPassword || user.password;
            user.updatedAt = new Date();

            return prisma.user.update({
                where: { id },
                data: {
                    username: user.username,
                    password: user.password,
                    updatedAt: user.updatedAt,
                },
            });
        } else throw new UserNotFoundError(`User with id ${id} not found`);
    }

    async deleteUser(userId: string): Promise<IUser> {
        if (await this.checkIfUserExists(userId)) {
            const user: IUser | null = await this.getUserById(userId);
            if (user) {
                return prisma.user.delete({
                    where: { id: userId },
                });
            } else throw new UserNotFoundError(`User with id ${userId} not found`);
        }
        else throw new UserNotFoundError(`User with id ${userId} not found`);
    }
}

export const createUserService = () => {
    return new UserService();
}
