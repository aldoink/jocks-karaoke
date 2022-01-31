import {createContext} from "react";
import {HighScoreService} from "../services/HighScoreService";
import {SongService} from "../services/SongService";

export interface IServiceContext {
    readonly highScoreService: HighScoreService
    readonly songService: SongService
}

export const ServiceContext = createContext<IServiceContext>(
    {
        highScoreService: {} as HighScoreService,
        songService: {} as SongService
    }
);

