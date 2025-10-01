// src/repositories/vevRepository.ts
import { PrismaClient, Vev } from "@prisma/client";
import prisma from "../lib/prisma.js";
import IVevRepository from "../models/repositories/IVevRepository.js";

export class VevRepository implements IVevRepository {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient = prisma) {
        this.prisma = prismaClient;
    }

    async countVevsCreatedByUserId(userId: string): Promise<number> {
        return this.prisma.vev.count({ where: { challengerId: userId } });
    }

    async countVevsChallengedToUserId(userId: string): Promise<number> {
        return this.prisma.vev.count({ where: { challengedId: userId } });
    }

    async countVevsLostByUserId(userId: string): Promise<number> {
        // Assuming "winnerId" is a field in Vev
        return this.prisma.vev.count({
            where: {
                AND: [
                    { winnerId: { not: null } },
                    { NOT: { winnerId: userId } },
                    { OR: [{ challengerId: userId }, { challengedId: userId }] },
                ],
            },
        });
    }

    async findById(id: string): Promise<Vev | null> {
        return this.prisma.vev.findUnique({ where: { id } });
    }

    async findAllByUserId(userId: string): Promise<Vev[]> {
        return this.prisma.vev.findMany({
            where: { OR: [{ challengerId: userId }, { challengedId: userId }] },
        });
    }

    async findAllWhereUserIsChallenger(userId: string): Promise<Vev[]> {
        return this.prisma.vev.findMany({ where: { challengerId: userId } });
    }

    async findAllWhereUserIsChallenged(userId: string): Promise<Vev[]> {
        return this.prisma.vev.findMany({ where: { challengedId: userId } });
    }

    async findAllPastVevs(): Promise<Vev[]> {
        return this.prisma.vev.findMany({ where: { date: { lt: new Date() } } });
    }

    async findAllFutureVevs(): Promise<Vev[]> {
        return this.prisma.vev.findMany({ where: { date: { gte: new Date() } } });
    }

    async findAllPastVevsByUserId(userId: string): Promise<Vev[]> {
        return this.prisma.vev.findMany({
        where: {
            AND: [
            { date: { lt: new Date() } },
            { OR: [{ challengerId: userId }, { challengedId: userId }] },
            ],
        },
        });
    }

    async findAllFutureVevsByUserId(userId: string): Promise<Vev[]> {
        return this.prisma.vev.findMany({
        where: {
            AND: [
            { date: { gte: new Date() } },
            { OR: [{ challengerId: userId }, { challengedId: userId }] },
            ],
        },
        });
    }

    async findManyPaginated(
        skip: number,
        take: number,
        orderBy?: { field: "date" | "challengerId" | "challengedId"; direction: "asc" | "desc" },
        filterBy?: {
        timeFilter: "all" | "future" | "past";
        userFilter: "all" | "mine";
        userId?: string;
        }
    ): Promise<Vev[]> {
        return this.prisma.vev.findMany({
        skip,
        take,
        ...(orderBy ? { orderBy: { [orderBy.field]: orderBy.direction } } : {}),
        where: {
            AND: [
            filterBy?.timeFilter === "future" ? { date: { gte: new Date() } } : {},
            filterBy?.timeFilter === "past" ? { date: { lt: new Date() } } : {},
            filterBy?.userFilter === "mine" && filterBy?.userId
                ? {
                    OR: [
                    { challengerId: filterBy.userId },
                    { challengedId: filterBy.userId },
                    ],
                }
                : {},
            ],
        },
        });
    }

    async countAll(): Promise<number> {
        return this.prisma.vev.count();
    }

    async countVevsByUserId(userId: string): Promise<number> {
        return this.prisma.vev.count({
            where: {
                OR: [{ challengerId: userId }, { challengedId: userId }],
            },
        });
    }

    async create(data: {
        id: string;
        challengerId: string;
        challengedId: string;
        date: Date;
        bookedDate: Date;
        reason: string;
    }): Promise<Vev> {
        return this.prisma.vev.create({ data });
    }

    async update(
        id: string,
        data: { date?: Date; winnerId?: string | null; reason?: string }
    ): Promise<Vev> {
        return this.prisma.vev.update({ where: { id }, data });
    }

    async delete(id: string): Promise<Vev> {
        return this.prisma.vev.delete({ where: { id } });
    }

    async countVevsWonByUserId(userId: string): Promise<number> {
        // Assuming "winnerId" is a field in Vev
        return this.prisma.vev.count({
            where: { winnerId: userId }
        });
    }
}
