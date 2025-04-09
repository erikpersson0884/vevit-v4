import { IVev } from '../models/IVev';
import { v4 as uuidv4 } from 'uuid';
import prisma from "../lib/prisma";
import { createUserService } from './userService';
import { IUserService } from '../models/services/IUserService';
import { UserNotFoundError } from '../errors/UserNotFoundError';


export class VevService {
    private userService: IUserService = createUserService();

    public async getAllVevs(): Promise<IVev[]> {
        return await prisma.vev.findMany();
    }
    public async createVev(challengerId: string, challengedId: string, date: Date, reason: string): Promise<IVev> {
        if (!this.userService.checkIfUserExists(challengerId) || !this.userService.checkIfUserExists(challengedId)) {
            throw new UserNotFoundError("Tried to create vev with non-existing user id, " + challengerId + " or " + challengedId);
        }
        const bookedDate = new Date();

        const newVev = await prisma.vev.create({
            data: {
                id: uuidv4(),
                challengerId,
                challengedId,
                date,
                bookedDate,
                reason
            }
        });
        return newVev;
    }

    public async getVevById(id: string): Promise<IVev | null> {
        return await prisma.vev.findUnique({
            where: { id }
        });
    }

    public async updateVev(
        id: string, 
        challengerId: string, 
        challengedId: string, 
        date: Date
    ): Promise<IVev | null> {
        const updatedVev = await prisma.vev.update({
            where: { id },
            data: {
                challengerId,
                challengedId,
                date
            }
        });
        return updatedVev;
    }

    public async deleteVev(id: string): Promise<IVev | null> {
        const deletedVev = await prisma.vev.delete({
            where: { id }
        });
        return deletedVev;
    }
}

export default VevService;

