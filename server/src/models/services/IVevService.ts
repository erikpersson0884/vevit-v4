import { IVev } from '../IVev.js';

export interface IVevService {
    checkIfUserInVev(userId: string, vevId: string): Promise<boolean>;
    getVevsPaginated(skip: number, take: number, orderBy: { field: "date" | "challengerId" | "challengedId", direction: "asc" | "desc" } ): Promise<IVev[]>;
    getVevById(id: string): Promise<IVev | null>;
    createVev(challengerId: string, challengedId: string, date: Date, reason: string): Promise<IVev>;
    updateVev(id: string, date?: Date, winnerId?: string, reason?: string): Promise<IVev | null>;
    setVevWinner(vevId: string, winnerId: string): Promise<IVev | null>;
    deleteVev(id: string): Promise<IVev | null>;
    getTotalNumberOfVevs(): Promise<number>;
}
