import { IVev } from './IVev';

export interface ICompletedVev extends IVev {
    winnerId: string;
    loserId: string;
}

export default ICompletedVev;
