declare global {
    // dto types
    interface IVevDTO {
        id: string;
        challengerId: string;
        challengedId: string;
        date: Date;
        reason: string;
    }

    // types for frontend

    interface IVev {
        id: string;
        challengerId: string;
        challengedId: string;
        date: Date;
        reason: string;
        winnerId: string | null;
    }

    interface IUser {
        id: string;
        username: string;
        createdAt: Date;
        updatedAt: Date;
    }

    interface IFilterOption<T> {
        value: T;
        label: string;
    }

    type UpdateVevOptions = {
        date?: Date;
        winnerId?: string | null;
        reason?: string | null;
    };
}

export {};
