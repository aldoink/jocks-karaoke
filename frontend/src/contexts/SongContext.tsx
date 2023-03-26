import { createContext, Dispatch, SetStateAction } from "react";
import { SongService } from "../services/SongService";
import { Song } from "../models/Song";

export const songService = new SongService();
export interface ISongContext {
  readonly songService: SongService;
  songs: Song[];
  setSongs: Dispatch<SetStateAction<Song[]>>;
}

export const SongContext = createContext<ISongContext>({
  songService,
  songs: [],
  setSongs: () => {},
});
