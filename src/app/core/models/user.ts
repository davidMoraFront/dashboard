export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    jwtToken?: string;
    // refreshTokens?: Array<any>;
}