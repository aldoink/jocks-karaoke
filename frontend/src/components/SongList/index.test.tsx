import React from 'react';
import {Song} from "../../models/Song";
import {SongList} from "./index";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {HighScoreList} from "../HighScoreList";

jest.mock("../HighScoreList", () => ({
    HighScoreList: (props: any) => <div data-testid={'HighScoreList'}>{JSON.stringify(props)}</div>
}))

const entries = [
    new Song(0, "BP1", "A Title", "A Test Artist"),
    new Song(1, "BP2", "B Title", "B Test Artist"),
    new Song(2, "BP3", "C Title", "C Test Artist"),
]

describe('SongList', () => {

    const renderSongList = () => render(<SongList songList={entries}/>);

    it('renders table entries', () => {
        expect(renderSongList().asFragment()).toMatchSnapshot();
    });

    it('clicking on a song opens the high scores', async () => {
        //given
        renderSongList();

        //when
        userEvent.click(screen.getByText(entries[0].title));

        //then
        expect(await screen.findByTestId('HighScoreList')).toBeInTheDocument();
        expect(screen.getByTestId('HighScoreList')).toHaveTextContent(JSON.stringify(entries[0]));
    });
});

