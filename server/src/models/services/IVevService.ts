import { IVev } from '../IVev';

export interface IVevService {
    getAllVevs(): Promise<IVev[]>;
    getVevById(id: string): Promise<IVev | null>;
    createVev(challengerId: string, challengedId: string, date: Date): Promise<IVev>;
    updateVev(id: string, challengerId: string, challengedId: string, date: Date): Promise<IVev | null>;
    deleteVev(id: string): Promise<IVev | null>;
}
