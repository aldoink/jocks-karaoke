import { AddHighScore } from "./index";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  HighScore,
  HighScoreService,
} from "../../../services/HighScoreService";
import { AuthService } from "../../../services/AuthService";
import { AuthContext, IAuthContext } from "../../../contexts/AuthContext";
import {
  HighScoreContext,
  IHighScoreContext,
} from "../../../contexts/HighScoreContext";
import { Song } from "../../../models/Song";

describe("AddHighScore", () => {
  const addButtonText = "Add new High Score";
  const defaultSong = {
    id: 123,
    artist: "Blur",
    title: "Song 2",
    location: "location",
  } as Song;
  const mockedHighScoreService = {} as HighScoreService;
  const mockedAuthService = {} as AuthService;
  const refreshHighScores = jest.fn();

  function renderAddHighScore(song: Song = defaultSong) {
    return render(
      <AuthContext.Provider
        value={{ authService: mockedAuthService } as IAuthContext}
      >
        <HighScoreContext.Provider
          value={
            {
              highScoreService: mockedHighScoreService,
              refreshHighScores,
            } as unknown as IHighScoreContext
          }
        >
          <AddHighScore song={song} />
        </HighScoreContext.Provider>
      </AuthContext.Provider>
    );
  }

  beforeEach(() => {
    mockedHighScoreService.save = jest.fn();
    mockedAuthService.isAuthenticated = jest.fn();
  });

  describe("user is authenticated", () => {
    beforeEach(() => {
      mockedAuthService.isAuthenticated = jest.fn().mockReturnValue(true);
    });

    it("shows a button to add high score when editMode is false", () => {
      //given & when
      renderAddHighScore();

      //then
      expect(screen.getByText(addButtonText)).toBeInTheDocument();
      expect(screen.queryByText("Save")).not.toBeInTheDocument();
      expect(screen.queryByPlaceholderText("Name")).not.toBeInTheDocument();
      expect(screen.queryByPlaceholderText("Score")).not.toBeInTheDocument();
    });

    const getScoreInput = () => screen.getByPlaceholderText("Score");

    it("hides Add button and shows Inputs and Save button when add button is clicked", () => {
      //given
      renderAddHighScore();

      //when
      userEvent.click(screen.getByText(addButtonText));

      //then
      expect(screen.queryByText(addButtonText)).not.toBeInTheDocument();
      expect(screen.getByText("Save")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
      expect(getScoreInput()).toBeInTheDocument();
    });

    it("saves high score and refreshes when save button is clicked", async () => {
      //given
      const expectedHighScore = {
        name: "Johnny",
        score: "99",
        songId: 123,
      } as HighScore;
      renderAddHighScore();

      //when
      userEvent.click(screen.getByText(addButtonText));
      userEvent.type(screen.getByPlaceholderText("Name"), "Johnny");
      userEvent.type(getScoreInput(), "99");
      userEvent.click(screen.getByText("Save"));

      //then
      expect(mockedHighScoreService.save).toHaveBeenCalledWith(
        expectedHighScore
      );
      await waitFor(() =>
        expect(screen.getByText(addButtonText)).toBeInTheDocument()
      );
      expect(screen.queryByPlaceholderText("Name")).not.toBeInTheDocument();
      expect(screen.queryByPlaceholderText("Score")).not.toBeInTheDocument();
      expect(refreshHighScores).toHaveBeenCalledWith(defaultSong);
    });

    it.each([
      ["9test9", "99"],
      ["test12", "12"],
      ["12test", "12"],
      ["te12st", "12"],
    ])(
      "only allows numbers to be entered into the score field",
      (input, expected) => {
        //given
        renderAddHighScore();

        //when
        userEvent.click(screen.getByText(addButtonText));
        userEvent.type(getScoreInput(), "test");

        //then
        expect(getScoreInput()).toHaveValue("");

        //when
        userEvent.type(getScoreInput(), input);

        //then
        expect(getScoreInput()).toHaveValue(expected);
      }
    );

    it.each([
      ["999", "99"],
      ["123", "12"],
      ["1234567", "12"],
      ["test123test", "12"],
    ])(
      "allows a maxium of 2 numbers to be entered into the score field",
      (input, expected) => {
        //given
        renderAddHighScore();

        //when
        userEvent.click(screen.getByText(addButtonText));
        userEvent.type(getScoreInput(), "test");

        //then
        expect(getScoreInput()).toHaveValue("");

        //when
        userEvent.type(getScoreInput(), input);

        //then
        expect(getScoreInput()).toHaveValue(expected);
      }
    );
  });

  it("hides the Add button when the user is not authenticated", () => {
    //given
    mockedAuthService.isAuthenticated = jest.fn().mockReturnValue(false);

    //when
    renderAddHighScore();

    //then
    expect(screen.queryByText(addButtonText)).not.toBeInTheDocument();
    expect(screen.queryByText("Save")).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Name")).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Score")).not.toBeInTheDocument();
  });
});
