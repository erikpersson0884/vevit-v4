import { IVev } from './IVev.js';

export interface ICompletedVev extends IVev {
    winnerId: string;
    loserId: string;
}

export default ICompletedVev;
