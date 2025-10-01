// src/services/vevService.ts
import { IVev } from "../models/IVev.js";
import { v4 as uuidv4 } from "uuid";
import { createUserService } from "./userService.js";
import { IUserService } from "../models/services/IUserService.js";
import { VevRepository } from "../repositories/vevRepository.js";
import { PrismaClient } from "@prisma/client";
import prismaClient from "../lib/prisma.js";
import { UserNotFoundError } from "../errors/UserNotFoundError.js";
import { VevNotFoundError } from "../errors/VevNotFoundError.js";
import { NotAllowedToUpdateError } from "../errors/NotAllowedToUpdateError.js";
import { UpdateFailedError } from "../errors/UpdateFailedError.js";
import { IVevService } from "../models/services/IVevService.js";

export class VevService implements IVevService {
    private vevRepo: VevRepository;
    private userService: IUserService = createUserService();

    constructor(prisma: PrismaClient = prismaClient) {
        this.vevRepo = new VevRepository(prisma);
    }

    public async checkIfUserInVev(userId: string, vevId: string): Promise<boolean> {
        const vev = await this.vevRepo.findByIdWithUsers(vevId);
        if (!vev) throw new VevNotFoundError(`Vev with id ${vevId} not found`);
        return vev.challengerId === userId || vev.challengedId === userId;
    }

    public async getVevsPaginated(
        skip = 0,
        take = 20,
        orderBy?: { field: "date" | "challengerId" | "challengedId"; direction: "asc" | "desc" },
        filterBy: {
            timeFilter: "all" | "future" | "past";
            userFilter: "all" | "mine";
            userId?: string;
        } = { timeFilter: "all", userFilter: "all" }
    ): Promise<IVev[]> {
        if (filterBy.userFilter === "mine" && !filterBy.userId) {
            throw new Error("userId must be provided when filterUser is 'mine'");
        }

        return this.vevRepo.findManyPaginated(skip, take, orderBy, filterBy);
    }


    public async getTotalNumberOfVevs(): Promise<number> {
        return this.vevRepo.countAll();
    }

    public async createVev(
        challengerId: string,
        challengedId: string,
        date: Date,
        reason: string
    ): Promise<IVev> {
        const challangerExists = await this.userService.doesUserExistWithId(challengerId);
        const challengedExists = await this.userService.doesUserExistWithId(challengedId);

        if (!challangerExists) throw new UserNotFoundError(`Challenger with id ${challengerId} not found`);
        if (!challengedExists) throw new UserNotFoundError(`Challenged with id ${challengedId} not found`);

        const newVev = await this.vevRepo.create({
        id: uuidv4(),
        challengerId,
        challengedId,
        date,
        bookedDate: new Date(),
        reason,
        });

        return newVev;
    }

    public async getVevById(id: string): Promise<IVev | null> {
        return this.vevRepo.findById(id);
    }

    public async updateVev(
        id: string,
        date?: Date,
        winnerId?: string,
        reason?: string
    ): Promise<IVev | null> {
        return this.vevRepo.update(id, { date, winnerId, reason });
    }

    public async setVevWinner(id: string, winnerId: string | null): Promise<IVev | null> {
        const vev = await this.vevRepo.findById(id);
        if (!vev) throw new VevNotFoundError(`Vev with id ${id} not found`);
        if (vev.date > new Date()) {
        throw new NotAllowedToUpdateError(`Vev with id ${id} is in the future and cannot have a winner yet`);
        }

        if (winnerId !== null) {
        if (!(await this.userService.doesUserExistWithId(winnerId))) {
            throw new UserNotFoundError(`User with id ${winnerId} not found`);
        }
        if (!(await this.checkIfUserInVev(winnerId, id))) {
            throw new NotAllowedToUpdateError(`User ${winnerId} is not part of Vev ${id}`);
        }
        }

        const updated = await this.vevRepo.update(id, { winnerId });
        if (updated.winnerId !== winnerId) {
        throw new UpdateFailedError(`Failed to update winner for Vev ${id}`);
        }
        return updated;
    }

    public async deleteVev(id: string): Promise<IVev | null> {
        return this.vevRepo.delete(id);
    }
}
