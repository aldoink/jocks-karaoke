import axios from "axios";
import jwtDecode, {JwtPayload} from "jwt-decode";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export class AuthService {
    JWT_TOKEN_KEY = "jocks-karaoke-token";

    async login(email: string, password: string): Promise<void> {
        const response = await axios.post(`${BACKEND_URL}/auth/login`, {email, password});
        localStorage.setItem(this.JWT_TOKEN_KEY, response?.data?.token);
    }

    getToken() {
        return localStorage.getItem(this.JWT_TOKEN_KEY);
    }


    isAuthenticated(): boolean {
        const token = localStorage.getItem(this.JWT_TOKEN_KEY)
        if (!token) {
            return false;
        }
        const claims: JwtPayload = jwtDecode(token);
        const expirationTimeInSeconds = claims.exp ? claims.exp * 1000 : 0
        return Date.now() < expirationTimeInSeconds;
    }
}