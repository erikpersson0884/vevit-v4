// src/repositories/UserRepository.ts
import { PrismaClient, User } from "@prisma/client";
import IUserRepository from "../models/repositories/IUserRepository.js";

export default class UserRepository implements IUserRepository {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient = new PrismaClient()) {
        this.prisma = prismaClient;
    }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async getUserById(userId: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id: userId },
        });
    }

    async getUserByUsername(username: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { username: username },
        });
    }

    async createUser(username: string, password: string): Promise<User> {
        return this.prisma.user.create({
            data: {
                username,
                password,
            },
        });
    }

    async updateUser(userId: string, username?: string, password?: string): Promise<User> {
        const user = await this.getUserById(userId);
        if (user) {
            return this.prisma.user.update({
                where: { id: userId },
                data: {
                    username: username ?? user.username,
                    password: password ?? user.password,
                },
            });
        }
        else throw new Error(`User with id ${userId} not found`);
    }
    
    async deleteUser(userId: string): Promise<User> {
        const user = await this.getUserById(userId);
        if (user) {
            return this.prisma.user.delete({
                where: { id: userId },
            });
        }
        else throw new Error(`User with id ${userId} not found`);
    }

    async doesUserExistWithId(userId: string): Promise<boolean> {
        const user = await this.prisma.user.findFirst({
            where: { id: userId },
        });
        return user !== null;
    }

    async doesUserExistWithUsername(username: string): Promise<boolean> {
        const user = await this.prisma.user.findFirst({
            where: { username: username },
        });
        return user !== null;
    }   

    async getUserCount(): Promise<number> {
        return this.prisma.user.count();
    }
}