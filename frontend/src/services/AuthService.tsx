import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export class AuthService {
    async login (email: string, password: string): Promise<void> {
        const response = await axios.post(`${BACKEND_URL}/auth/login`, {email, password});
        localStorage.setItem("token", response?.data?.token);
    }

    getToken() {
        return localStorage.getItem("token")
    }
}