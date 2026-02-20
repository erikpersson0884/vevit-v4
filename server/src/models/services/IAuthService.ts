
export interface IAuthService {
    loginUser(username: string, password: string): Promise<string>;
    loginWithGamma(gammaId: string, profile: any): Promise<string>;
}
