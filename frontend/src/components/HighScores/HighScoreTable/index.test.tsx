import "jest-styled-components";
import { render } from "@testing-library/react";
import { HighScoreTable } from "./index";
import { HighScore } from "../../../services/HighScoreService";
import {
  HighScoreContext,
  IHighScoreContext,
} from "../../../contexts/HighScoreContext";

describe("HighScoreTable", () => {
  it("renders correctly", () => {
    const highScores = [
      { name: "Ally", score: "99", songId: 123 } as HighScore,
      { name: "Johnny", score: "98", songId: 123 } as HighScore,
      { name: "Jenny", score: "97", songId: 123 } as HighScore,
    ];

    expect(
      render(
        <HighScoreContext.Provider
          value={{ highScores } as unknown as IHighScoreContext}
        >
          {" "}
          <HighScoreTable />
        </HighScoreContext.Provider>
      ).asFragment()
    ).toMatchSnapshot();
  });
});
