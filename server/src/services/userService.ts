import { IUser, IUserService } from '../models/IUser';

export class UserService {
    private users: IUser[] = [];
    private nextId = this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1;


    getAllUsers(): IUser[] {
        return this.users;
    }

    getUserById(id: number): IUser | undefined {
        return this.users.find(user => user.id === id);
    }

    createUser(username: string, password: string): IUser {
        const newUser: IUser = { 
            id: this.nextId++, 
            username: username,
            password: password,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: number, newUsername?: string, newPassword?: string): IUser | null {
        const user = this.getUserById(id);

        if (user) {
            user.username = newUsername || user.username;
            user.password = newPassword || user.password;
            user.updatedAt = new Date();
            return user;
        }
        return null;
    }

    deleteUser(id: number): boolean {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }
}
