// src/services/vevService.ts
import { Vev } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { createUserService } from "./userService.js";
import { IUserService } from "../models/services/IUserService.js";
import { PrismaClient } from "@prisma/client";
import prismaClient from "../lib/prisma.js";
import { UserNotFoundError } from "../errors/UserNotFoundError.js";
import { VevNotFoundError } from "../errors/VevNotFoundError.js";
import { NotAllowedToUpdateError } from "../errors/NotAllowedToUpdateError.js";
import { UpdateFailedError } from "../errors/UpdateFailedError.js";
import VevRepository from "../repositories/vevRepository.js";
import AchievementService from "./achievementService.js";

export default class VevService implements VevService {
    private vevRepo: VevRepository;
    private userService: IUserService = createUserService();
    private achievementService: AchievementService = new AchievementService();

    constructor(prisma: PrismaClient = prismaClient, achievementService?: AchievementService) {
        this.vevRepo = new VevRepository(prisma);
        if (achievementService) {
            this.achievementService = achievementService;
        }
    }

    public async checkIfUserInVev(userId: string, vevId: string): Promise<boolean> {
        const vev = await this.vevRepo.findById(vevId);
        const userIsInVev = vev?.challengerId === userId || vev?.challengedId === userId;
        if (!userIsInVev) throw new VevNotFoundError(`Vev with id ${vevId} not found`);
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
    ): Promise<Vev[]> {
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
    ): Promise<Vev> {
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

        if (this.achievementService) {
            await this.achievementService.checkAndAwardAchievements(challengerId);
            await this.achievementService.checkAndAwardAchievements(challengedId);
        }

        return newVev;
    }

    public async getVevById(id: string): Promise<Vev | null> {
        return this.vevRepo.findById(id);
    }

    public async updateVev(
        id: string,
        date?: Date,
        winnerId?: string,
        reason?: string
    ): Promise<Vev | null> {
        return this.vevRepo.update(id, { date, winnerId, reason });
    }

    public async setVevWinner(id: string, winnerId: string | null): Promise<Vev | null> {
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

    public async deleteVev(id: string): Promise<Vev | null> {
        return this.vevRepo.delete(id);
    }
}
