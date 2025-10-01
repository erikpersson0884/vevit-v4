import IVev from "../IVev.js";

export default interface IVevRepository {
    findById(id: string): Promise<IVev | null>;
    countVevsByUserId(userId: string): Promise<number>;
    countAll(): Promise<number>;
    countVevsByUserId(userId: string): Promise<number>;
    countVevsWonByUserId(userId: string): Promise<number>;
    
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