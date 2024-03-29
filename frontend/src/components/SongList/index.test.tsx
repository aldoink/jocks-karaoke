import React from "react";
import { Song } from "../../models/Song";
import { SongList } from "./index";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ISongContext, SongContext } from "contexts/SongContext";

jest.mock("../HighScores", () => ({
  HighScores: (props: any) => (
    <div data-testid={"HighScores"}>{JSON.stringify(props)}</div>
  ),
}));

const entries = [
  new Song(0, "BP1", "A Title", "A Test Artist"),
  new Song(1, "BP2", "B Title", "B Test Artist"),
  new Song(2, "BP3", "C Title", "C Test Artist"),
];

describe("SongList", () => {
  const renderSongList = () =>
    render(
      <SongContext.Provider value={{ songs: entries } as ISongContext}>
        <SongList />
      </SongContext.Provider>
    );

  it("renders table entries", () => {
    expect(renderSongList().asFragment()).toMatchSnapshot();
  });

  it("clicking on a song opens the high scores", async () => {
    //given
    renderSongList();

    //when
    userEvent.click(screen.getByText(entries[0].title));

    //then
    expect(await screen.findByTestId("HighScores")).toBeInTheDocument();
    expect(screen.getByTestId("HighScores")).toHaveTextContent(
      JSON.stringify({ song: entries[0] })
    );
  });

  it("closes and reopens the modal", async () => {
    //given
    renderSongList();

    //when
    userEvent.click(screen.getByText(entries[0].title));

    //then
    expect(await screen.findByTestId("HighScores")).toBeInTheDocument();

    //when(2)
    userEvent.click(screen.getByTitle("close-icon"));

    //then(2)
    expect(screen.queryByTestId("HighScores")).not.toBeInTheDocument();

    //when(3)
    userEvent.click(screen.getByText(entries[0].title));

    //then(3)
    expect(await screen.findByTestId("HighScores")).toBeInTheDocument();
  });
});
