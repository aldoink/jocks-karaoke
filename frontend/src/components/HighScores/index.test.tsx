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

  it('shows an "Add High Score" button when the user is authenticated', () => {
    //given
    mockedAuthService.isAuthenticated = jest.fn().mockReturnValue(true);
    renderHighScoreList();

    //then
    expect(screen.getByText("Add new High Score")).toBeInTheDocument();
  });

  it('does not show an "Add High Score" button when the user is not authenticated', () => {
    //given
    mockedAuthService.isAuthenticated = jest.fn().mockReturnValue(false);
    renderHighScoreList();

    //then
    expect(screen.queryByText("Add new High Score")).not.toBeInTheDocument();
  });

  it('hides the "Add new High Score" button when addMode is enabled', () => {
    //given
    mockedAuthService.isAuthenticated = jest.fn().mockReturnValue(true);
    renderHighScoreList();

    ///when
    screen.getByText("Add new High Score").click();

    //then
    expect(screen.queryByText("Add new High Score")).not.toBeInTheDocument();
  });

  it("shows the AddHighScore component when the Add High Score button is clicked", () => {
    //given
    mockedAuthService.isAuthenticated = jest.fn().mockReturnValue(true);
    renderHighScoreList();

    //when
    screen.getByText("Add new High Score").click();

    //then
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Score")).toBeInTheDocument();
  });

  it('does not show the AddHighScore component before the user clicks on the "Add new High Score" button', () => {
    //given
    mockedAuthService.isAuthenticated = jest.fn().mockReturnValue(true);
    renderHighScoreList();

    //then
    expect(screen.queryByPlaceholderText("Name")).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Score")).not.toBeInTheDocument();
  });

  it("hides the AddHighScore component when the user clicks on the 'Cancel' button", () => {
    //given
    mockedAuthService.isAuthenticated = jest.fn().mockReturnValue(true);
    renderHighScoreList();

    //when
    screen.getByText("Add new High Score").click();
    screen.getByText("Cancel").click();

    //then
    expect(screen.queryByPlaceholderText("Name")).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Score")).not.toBeInTheDocument();
  });
});
