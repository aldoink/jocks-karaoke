import axios, {AxiosRequestConfig} from "axios";
import {AuthService, BACKEND_URL} from "./AuthService";

export interface HighScore {
    readonly name: string;
    readonly score: number;
    readonly songId: number;
}

export class HighScoreService {
    constructor(private authService: AuthService) {
    }

    public async getHighScores(songId: number): Promise<HighScore[]> {
        const response = await axios.get(`${BACKEND_URL}/highscores/${songId}`, this.getAxiosConfig());
        return response?.data;
    }

    private getAxiosConfig(): AxiosRequestConfig {
        return {
            headers: {Authorization: "Bearer " + this.authService.getToken()}
        }
    }
}