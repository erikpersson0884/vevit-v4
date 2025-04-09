
declare global {
    interface IVevDTO {
        id: string;
        challengerId: string;
        challengedId: string;
        date: Date;
        reason: string;
    }
}

export {};
