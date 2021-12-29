import {createContext} from "react";
import {HighScoreService} from "../services/HighScoreService";

interface DefaultServiceContext {
    readonly highScoreService: HighScoreService
}

export const ServiceContext = createContext<DefaultServiceContext>({highScoreService: {} as HighScoreService});

