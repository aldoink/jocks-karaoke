import axios, {AxiosRequestConfig} from "axios";
import {AuthService, BACKEND_URL} from "./AuthService";

export interface HighScore {
    [index: string]: string | number | undefined;

    name?: string;
    score?: string;
    songId: number;
}

export class HighScoreService {
    constructor(private authService: AuthService) {
    }

    public async findAll(songId: number): Promise<HighScore[]> {
        const response = await axios.get(`${BACKEND_URL}/highscores/${songId}`, this.getAxiosConfig());
        return response?.data;
    }

    public async save(entry: HighScore) {
        return await axios.put(
            `${BACKEND_URL}/highscores`,
            entry,
            this.getAxiosConfig()
        )
    }

    private getAxiosConfig(): AxiosRequestConfig {
        return {headers: {Authorization: "Bearer " + this.authService.getToken()}};
    }
}