import {createContext} from "react";
import {HighScoreService} from "../services/HighScoreService";
import {AuthService} from "../services/AuthService";

export interface IServiceContext {
    readonly highScoreService: HighScoreService;
    readonly authService: AuthService;
}

export const ServiceContext = createContext<IServiceContext>(
    {
        highScoreService: {} as HighScoreService,
        authService: {} as AuthService
    }
);

