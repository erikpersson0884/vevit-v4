import { IVev } from '../models/IVev';
import { v4 as uuidv4 } from 'uuid';


export class VevService {
    private allVevs: IVev[] = [];

    public getAllVevs(): IVev[] {
        return this.allVevs;
    }

    public createVev(challangerId: string, challangedId: string, date: Date): IVev {
        const bookedDate = new Date();
        const newVev: IVev = { id: uuidv4(), challangerId, challangedId, date, bookedDate };
        this.allVevs.push(newVev);
        return newVev;
    }

    public getVevById(id: string): IVev | undefined {
        return this.allVevs.find(vev => vev.id === id);
    }

    public updateVev(
        id: string, 
        challangerId: string, 
        challangedId: string, 
        date: Date
    ): IVev | undefined {

        const vevIndex = this.allVevs.findIndex(vev => vev.id === id);
        if (vevIndex === -1) return undefined;

        const updatedVev: IVev = { id, challangerId, challangedId, date, bookedDate: this.allVevs[vevIndex].bookedDate };
        this.allVevs[vevIndex] = updatedVev;
        return updatedVev;
    }

    public deleteVev(id: string): IVev | undefined {
        const vevIndex = this.allVevs.findIndex(vev => vev.id === id);
        if (vevIndex === -1) return undefined;

        const deletedVev = this.allVevs[vevIndex];
        this.allVevs.splice(vevIndex, 1);
        return deletedVev;
    }
}

export default VevService;

