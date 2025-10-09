import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IAuthService } from "../models/services/IAuthService.js";
import UserService from "./userService.js";
import { UserNotFoundError } from "../errors/UserNotFoundError.js";
import IUserService from "../models/services/IUserService.js";

class authService implements IAuthService {
    private readonly JWT_SECRET = process.env.JWT_SECRET || "fallbacksecret";

    userService: IUserService = new UserService();

    async loginUser(username: string, password: string): Promise<string> {
        const user = await this.userService.getUserByUsername(username);
        if (!user) throw new UserNotFoundError(`User with username ${username} not found`);

        // const match = await bcrypt.compare(password, user.password);
        const match = password === user.password;
        if (!match) throw new Error("Invalid credentials");
        const userId = user.id;
        
        return jwt.sign({ userId }, this.JWT_SECRET, { expiresIn: "1h" });
    }
}

export function createAuthService(): IAuthService {
    return new authService();
}
export default createAuthService;
