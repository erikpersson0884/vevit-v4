import { Request, Response } from "express";
import { createAuthService } from "../services/authService.js";
import IAuthController from "../models/controllers/IAuthController.js";
import { IAuthService } from "../models/services/IAuthService.js";
import { AuthorizationCode } from "gammait";


const defualtAuthService: IAuthService = createAuthService();




export const createAuthController = (authService: IAuthService = defualtAuthService): IAuthController => {
    if (!process.env.GAMMA_CLIENT_ID || !process.env.GAMMA_CLIENT_SECRET || !process.env.GAMMA_REDIRECT_URI) { //TODO: Add more specific error handling for missing environment variables
        throw new Error("Gamma OAuth configuration is missing. Please set GAMMA_CLIENT_ID, GAMMA_CLIENT_SECRET, and GAMMA_REDIRECT_URI in your environment variables.");
    }
    
    const authorizedClient = new AuthorizationCode({
        clientId: process.env.GAMMA_CLIENT_ID,
        clientSecret: process.env.GAMMA_CLIENT_SECRET,
        redirectUri: process.env.GAMMA_REDIRECT_URI,
        scope: ["openid", "profile"],
    });


    const login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            const token: string = await authService.loginUser(username, password);
            res.json({token});
        } catch (err: any) {
            res.status(401).json({ error: err.message });
        }
    };

    const startGammaLogin = async (req: Request, res: Response) => {
        const url = authorizedClient.authorizeUrl();
        res.redirect(url);
    };

    const handleGammaCallback = async (req: Request, res: Response) => {
        const code = req.query.code;

        if (!code) {
            throw new Error("Authorization code is missing from the callback request."); // TODO: Add more specific error handling for missing authorization code
        }

        await authorizedClient.generateToken(code.toString());
        const profile = await authorizedClient.userInfo();
        const gammaId = profile.sub;

        // pass to service layer
        const token: string = await authService.loginWithGamma(gammaId, profile);

        const frontendUrl = process.env.frontend_url + `/oauth/callback?token=${token}`; //TODO: Move frontend URL to environment variable and add error handling for missing environment variable
        return res.redirect(frontendUrl); 
    };

    return {
        login,
        startGammaLogin,
        handleGammaCallback
    };
};