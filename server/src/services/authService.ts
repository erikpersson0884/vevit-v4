// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { IAuthService } from "../models/services/IAuthService";


// class authService implements IAuthService {
//     private readonly JWT_SECRET = process.env.JWT_SECRET || "fallbacksecret";

//     async loginUser(username: string, password: string): Promise<string> {
//         const user = await findUser(username);
//         if (!user) throw new Error("Invalid credentials");

//         const match = await bcrypt.compare(password, user.passwordHash);
//         if (!match) throw new Error("Invalid credentials");

//         return jwt.sign({ username }, this.JWT_SECRET, { expiresIn: "1h" });
//     }
// }

// export function createAuthService(): IAuthService {
//     return new authService();
// }
// export default createAuthService;
