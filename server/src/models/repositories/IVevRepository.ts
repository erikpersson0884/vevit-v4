import { Vev } from "@prisma/client";

export default interface VevRepository {
    findById(id: string): Promise<Vev | null>;
    countVevsByUserId(userId: string): Promise<number>;
    countAll(): Promise<number>;
    countVevsWonByUserId(userId: string): Promise<number>;
    countVevsLostByUserId(userId: string): Promise<number>;
    countVevsCreatedByUserId(userId: string): Promise<number>;
    countVevsChallengedToUserId(userId: string): Promise<number>;
    
    findAllByUserId(userId: string): Promise<Vev[]>;
    findAllWhereUserIsChallenger(userId: string): Promise<Vev[]>;
    findAllWhereUserIsChallenged(userId: string): Promise<Vev[]>;
    findAllPastVevs(): Promise<Vev[]>;
    findAllFutureVevs(): Promise<Vev[]>;
    findAllPastVevsByUserId(userId: string): Promise<Vev[]>;
    findAllFutureVevsByUserId(userId: string): Promise<Vev[]>;

    create(data: {
        id: string;
        challengerId: string;
        challengedId: string;
        date: Date;
        bookedDate: Date;
        reason: string;
    }): Promise<Vev>;

    update(id: string,
        data: { 
            date?: Date; 
            winnerId?: string | null; 
            reason?: string 
    }): Promise<Vev>;
    delete(id: string): Promise<Vev>;
    findManyPaginated(skip: number, take: number, orderBy?: { field: "date" | "challengerId" | "challengedId"; direction: "asc" | "desc" }, filterBy?: { timeFilter: "all" | "future" | "past"; userFilter: "all" | "mine"; userId?: string }): Promise<Vev[]>;
}