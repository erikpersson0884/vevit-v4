import { Vev } from '@prisma/client';

// export interface IVev {
//     id: string;
//     challengerId: string;
//     challengedId: string;
//     date: Date;
//     bookedDate: Date;
//     reason: string;
//     winnerId: string | null;
// }

export interface IVev extends Vev {}

export default IVev;
