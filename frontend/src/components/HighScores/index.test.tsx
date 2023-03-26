import "jest-styled-components";
import { HighScores } from "./index";
import { Song } from "../../models/Song";
import { render, screen } from "@testing-library/react";
import { HighScore, HighScoreService } from "../../services/HighScoreService";
import React from "react";
import { AuthService } from "../../services/AuthService";
import {
  HighScoreContext,
  IHighScoreContext,
} from "../../contexts/HighScoreContext";
import { AuthContext, IAuthContext } from "../../contexts/AuthContext";

describe("HighScoreList", () => {
  const defaultSong = new Song(1, "BP-0001", "Title", "Artist");
  const mockedHighScoreService = {
    findAll: jest.fn(),
  } as unknown as HighScoreService;
  const mockedAuthService = {} as AuthService;
  const refreshHighScores = jest.fn();
  const mockHighScoreList = [
    { name: "Ally", score: "99", songId: 1 } as HighScore,
    { name: "Jenny", score: "98", songId: 1 } as HighScore,
    { name: "Johnny", score: "97", songId: 1 } as HighScore,
    { name: "Gemma", score: "96", songId: 1 } as HighScore,
  ];

  function renderHighScoreList(contextValues?: Partial<IHighScoreContext>) {
    return render(
      <AuthContext.Provider
        value={{ authService: mockedAuthService } as IAuthContext}
      >
        <HighScoreContext.Provider
          value={
            {
              highScoreService: mockedHighScoreService,
              highScores: mockHighScoreList,
              refreshHighScores,
              hasError: false,
              ...contextValues,
            } as IHighScoreContext
          }
        >
          <HighScores song={defaultSong} />
        </HighScoreContext.Provider>
      </AuthContext.Provider>
    );
  }

  beforeEach(() => {
    mockedAuthService.isAuthenticated = jest.fn().mockReturnValue(true);
  });

  it("loads the high scores for the selected song", async () => {
    //given
    mockedHighScoreService.findAll = jest
      .fn()
      .mockResolvedValue(mockHighScoreList);

    const { asFragment } = renderHighScoreList();

    //then
    expect(refreshHighScores).toHaveBeenCalledWith(defaultSong);
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows an error message when high score context hasError", async () => {
    //given
    renderHighScoreList({ hasError: true });
    //then
    expect(
      await screen.findByText("Something went wrong... try again later.")
    ).toBeInTheDocument();
  });

  it("shows a message when no high scores are found", async () => {
    //given
    renderHighScoreList({ highScores: [] });

    //then
    expect(
      await screen.findByText(
        "Doesn't look like anyone's set a high score yet!"
      )
    ).toBeInTheDocument();
  });
});
