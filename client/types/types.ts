
declare global {
    interface IVev {
        id: string;
        challengerId: string;
        challengedId: string;
        date: Date;
        reason: string;
    }

    interface IUser {
        id: string;
        username: string;
        password: string;
    }

    interface IFilterOption<T> {
        value: T;
        label: string;
    }
}

export {};
