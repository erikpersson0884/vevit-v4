
declare global {
    interface IVev {
        id: string;
        challengerId: string;
        challengedId: string;
        date: Date;
        reason: string;
        winner: string | null;
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
}

export {};
