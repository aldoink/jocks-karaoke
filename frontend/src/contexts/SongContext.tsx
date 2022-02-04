import {createContext, Dispatch, SetStateAction} from "react";
import {SongService} from "../services/SongService";
import {Song} from "../models/Song";

interface ISongContext {
    readonly songService: SongService;
    songs: Song[];
    setSongs: Dispatch<SetStateAction<never[]>>
}

export const SongContext = createContext<ISongContext>(
    {
        songService: {} as SongService,
        songs: [],
        setSongs: () => {}
    }
);