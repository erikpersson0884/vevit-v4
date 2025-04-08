import { IVev } from '../IVev';

export interface IVevService {
    getAllVevs(): Promise<IVev[]>;
    getVevById(id: string): Promise<IVev | null>;
    createVev(challangerId: string, challangedId: string, date: Date): Promise<IVev>;
    updateVev(id: string, challangerId: string, challangedId: string, date: Date): Promise<IVev | null>;
    deleteVev(id: string): Promise<IVev | null>;
}
