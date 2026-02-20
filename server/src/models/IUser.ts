export interface IUser {
    id: string;
    username: string;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
    role: "admin" | "user";
}

export default IUser;
