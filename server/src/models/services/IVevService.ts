import { Vev } from '@prisma/client';

export default interface VevService {
    checkIfUserInVev(userId: string, vevId: string): Promise<boolean>;
    getVevsPaginated(
        skip: number, 
        take: number, 
        orderBy?: { field: "date" | "challengerId" | "challengedId", direction: "asc" | "desc" },  
        filterBy?: { timeFilter: "all" | "future" | "past", userFilter: "all" | "mine", userId: string | undefined }
    ): Promise<Vev[]>;
    getVevById(id: string): Promise<Vev | null>;
    createVev(challengerId: string, challengedId: string, date: Date, reason: string): Promise<Vev>;
    updateVev(id: string, date?: Date, winnerId?: string, reason?: string): Promise<Vev | null>;
    setVevWinner(vevId: string, winnerId: string): Promise<Vev | null>;
    deleteVev(id: string): Promise<Vev | null>;
    getTotalNumberOfVevs(): Promise<number>;
}
