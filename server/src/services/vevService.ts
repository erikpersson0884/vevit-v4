import { IVev } from '../models/IVev.js';
import { v4 as uuidv4 } from 'uuid';
import prismaClient from "../lib/prisma.js";
import { createUserService } from './userService.js';
import { IUserService } from '../models/services/IUserService.js';
import { PrismaClient, Vev } from '@prisma/client';
import { UserNotFoundError } from '../errors/UserNotFoundError.js';
import { NotAllowedToUpdateError } from '../errors/NotAllowedToUpdateError.js';
import { IVevService } from '../models/services/IVevService.js';
import { VevNotFoundError } from '../errors/VevNotFoundError.js';
import { UpdateFailedError } from '../errors/UpdateFailedError.js';


export class VevService implements IVevService {
    private prisma: PrismaClient;
    private userService: IUserService = createUserService();

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    public async checkIfUserInVev(userId: string, vevId: string): Promise<boolean> {
        const vev = await this.prisma.vev.findUnique({
            where: { id: vevId },
            include: { challenger: true, challenged: true }
        });
        if (!vev) {
            throw new VevNotFoundError(`Vev with id ${vevId} not found`);
        }
        return vev.challengerId === userId || vev.challengedId === userId;
    }


    public async getVevsPaginated(
        skip: number = 0, 
        take: number = 20, // default page size
        orderBy: { field: "date" | "challengerId" | "challengedId", direction: "asc" | "desc" } = { field: "date", direction: "desc" },
        filterBy: { timeFilter: "all" | "future" | "past", userFilter: "all" | "mine", userId: string | undefined } = { timeFilter: "all", userFilter: "all", userId: undefined }
    ): Promise<IVev[]> {
        if (filterBy.userFilter === "mine" && !filterBy.userId) throw new Error("userId must be provided when filterUser is 'mine'");

        return await this.prisma.vev.findMany({
            skip,
            take,
            orderBy: {
                [orderBy.field]: orderBy.direction
            },
            where: {
                AND: [
                    filterBy.timeFilter === "future" ? { date: { gte: new Date() } } : {},
                    filterBy.timeFilter === "past" ? { date: { lt: new Date() } } : {},
                    filterBy.userFilter === "mine" && filterBy.userId ? {
                        OR: [
                            { challengerId: filterBy.userId },
                            { challengedId: filterBy.userId }
                        ]
                    } : {}
                ]
            }
        });
    }

    public async getTotalNumberOfVevs(): Promise<number> {
        return await this.prisma.vev.count();
    }

    public async createVev(
        challengerId: string, 
        challengedId: string, 
        date: Date, 
        reason: string
    ): Promise<IVev> {

        if (
            !this.userService.checkIfUserExists(challengerId) || 
            !this.userService.checkIfUserExists(challengedId)
        ) {
            throw new UserNotFoundError("Tried to create vev with non-existing user id, " + challengerId + " or " + challengedId);
        }

        const bookedDate = new Date();

        const newVev = await this.prisma.vev.create({
            data: {
                id: uuidv4(),
                challengerId,
                challengedId,
                date,
                bookedDate,
                reason
            }
        });
        return newVev;
    }

    public async getVevById(id: string): Promise<IVev | null> {
        return await this.prisma.vev.findUnique({
            where: { id }
        });
    }

    public async updateVev(
        id: string, 
        date?: Date,
        winnerId?: string,
        reason?: string
    ): Promise<IVev | null> 
    {
        const updatedVev = await this.prisma.vev.update({
            where: { id },
            data: {
                date,
                winnerId,
                reason
            }
        });
    
        return updatedVev;
    }

    public async setVevWinner(id: string, winnerId: string | null): Promise<IVev | null> {
        const vev = await this.getVevById(id);
        if (!vev) {
            throw new VevNotFoundError(`Vev with id ${id} not found`);
        }
        if (vev.date > new Date()) {
            throw new NotAllowedToUpdateError(`Vev with id ${id} is in the future and cannot have a winner yet`);
        }
        if (winnerId !== null){ // if winnerId is null, we don't need to check if the user exists or if they are in the Vev
            if (!this.userService.checkIfUserExists(winnerId)) {
                throw new UserNotFoundError(`User with id ${winnerId} not found`);
            }
            if (!this.checkIfUserInVev(winnerId, id)) {
                throw new NotAllowedToUpdateError(`User with id ${winnerId} is not part of the Vev with id ${id} and therefore cannot be set as winner`);
            }
        }


        const updatedVev = await this.prisma.vev.update({
            where: { id },
            data: {
                winnerId
            }
        });
        if (updatedVev.winnerId !== winnerId) {
            throw new UpdateFailedError(`Failed to update Vev with id ${id} to set winnerId to ${winnerId}`);
        }
        return updatedVev;
    }


    public async deleteVev(id: string): Promise<IVev | null> {
        const deletedVev = await this.prisma.vev.delete({
            where: { id }
        });
        return deletedVev;
    }
}

export const createVevService = (prisma: PrismaClient = prismaClient): IVevService => {
    return new VevService(prisma);
}

