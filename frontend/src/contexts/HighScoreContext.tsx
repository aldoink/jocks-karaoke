import { createContext } from "react";
import { HighScore, HighScoreService } from "../services/HighScoreService";
import { authService } from "./AuthContext";
import { Song } from "../models/Song";

export const highScoreService = new HighScoreService(authService);

export interface IHighScoreContext {
  highScoreService: HighScoreService;
  highScores: HighScore[];
  refreshHighScores: (song: Song) => void;
  hasError: boolean;
}

export const HighScoreContext = createContext<IHighScoreContext>({
  highScoreService,
  highScores: [],
  refreshHighScores: () => {},
  hasError: false,
});
