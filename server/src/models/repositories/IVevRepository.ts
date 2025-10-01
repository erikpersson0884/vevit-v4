import IVev from "../IVev.js";

export default interface IVevRepository {
    findById(id: string): Promise<IVev | null>;
    countVevsByUserId(userId: string): Promise<number>;
    countAll(): Promise<number>;
    countVevsWonByUserId(userId: string): Promise<number>;
    countVevsLostByUserId(userId: string): Promise<number>;
    countVevsCreatedByUserId(userId: string): Promise<number>;
    countVevsChallengedToUserId(userId: string): Promise<number>;
    
    findAllByUserId(userId: string): Promise<IVev[]>;
    findAllWhereUserIsChallenger(userId: string): Promise<IVev[]>;
    findAllWhereUserIsChallenged(userId: string): Promise<IVev[]>;
    findAllPastVevs(): Promise<IVev[]>;
    findAllFutureVevs(): Promise<IVev[]>;
    findAllPastVevsByUserId(userId: string): Promise<IVev[]>;
    findAllFutureVevsByUserId(userId: string): Promise<IVev[]>;

    create(data: {
        id: string;
        challengerId: string;
        challengedId: string;
        date: Date;
        bookedDate: Date;
        reason: string;
    }): Promise<IVev>;

    update(id: string,
        data: { 
            date?: Date; 
            winnerId?: string | null; 
            reason?: string 
    }): Promise<IVev>;
    delete(id: string): Promise<IVev>;
    findManyPaginated(skip: number, take: number, orderBy?: { field: "date" | "challengerId" | "challengedId"; direction: "asc" | "desc" }, filterBy?: { timeFilter: "all" | "future" | "past"; userFilter: "all" | "mine"; userId?: string }): Promise<IVev[]>;
}