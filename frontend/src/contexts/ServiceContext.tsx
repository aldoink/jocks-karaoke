import {createContext} from "react";
import {HighScoreService} from "../services/HighScoreService";

export interface IServiceContext {
    readonly highScoreService: HighScoreService
}

export const ServiceContext = createContext<IServiceContext>(
    {
        highScoreService: {} as HighScoreService
    }
);

