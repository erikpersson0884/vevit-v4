declare global {
    // dto types
    interface IVevDTO {
        id: string;
        challengerId: string;
        challengedId: string;
        date: Date;
        reason: string;
    }

    // API types

    interface FetchVevsResponse {
        vevs: IVev[]; 
        total: number;
        page: number;
        limit: number;
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
        role: Role;
        isAdmin: boolean;
    }

    type Role = 'user' | 'admin';

    interface IFilterLabelOption<T> {
        value: T;
        label: string;
    }

    interface IFilterOptions {
        timeFilter: "all" | "future" | "past";
        userFilter: "all" | "mine";
    }

    type sortingKeys = "challenger" | "challenged" | "time";
    interface sortOptions {
        key: sortingKeys;
        order: "asc" | "desc";
    }

    type UpdateVevOptions = {
        date?: Date;
        winnerId?: string | null;
        reason?: string | null;
    };
}

export {};
