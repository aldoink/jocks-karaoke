import {HighScoreList} from "./index";
import {Song} from "../../models/Song";
import {render, screen} from "@testing-library/react";
import {ServiceContext} from "../../contexts/ServiceContext";
import {HighScore, HighScoreService} from "../../services/HighScoreService";
import {waitFor} from "@testing-library/dom";
import React from "react";
import {flushPromises} from "../../testUtils";
import userEvent from "@testing-library/user-event";

describe('HighScoreList', () => {
    const defaultSong = new Song(1, "BP-0001", "Title", "Artist");
    let mockedHighScoreService: HighScoreService;

    function renderHighScoreList(song: Song = defaultSong) {
        return render(
            <ServiceContext.Provider value={{highScoreService: mockedHighScoreService}}>
                <HighScoreList song={song}></HighScoreList>
            </ServiceContext.Provider>
        )
    }

    beforeEach(() => {
        mockedHighScoreService = {} as HighScoreService;
    });

    it('loads the high scores for the selected song', async () => {
        //given
        mockedHighScoreService.findAll = jest.fn().mockResolvedValue([
            {name: 'Ally', score: 99, songId: 1} as HighScore,
            {name: 'Jenny', score: 98, songId: 1} as HighScore,
            {name: 'Johnny', score: 97, songId: 1} as HighScore,
            {name: 'Gemma', score: 96, songId: 1} as HighScore
        ]);
        const component = renderHighScoreList();

        //then
        await waitFor(() => expect(mockedHighScoreService.findAll).toHaveBeenCalledTimes(1))
        expect(mockedHighScoreService.findAll).toHaveBeenCalledWith(defaultSong.id);
        expect(component.asFragment()).toMatchSnapshot();
    });

    it("shows an error message when high scores couldn't be loaded", async () => {
        //given
        mockedHighScoreService.findAll = jest.fn().mockRejectedValue(new Error("Oops!"));
        renderHighScoreList();

        //then
        await flushPromises();
        expect(screen.getByText("Something went wrong... try again later.")).toBeInTheDocument();
    });

    it('shows a message when no high scores are found', () => {
        //given
        mockedHighScoreService.findAll = jest.fn().mockResolvedValue([]);
        renderHighScoreList();

        //then
        expect(screen.getByText("Doesn't look like anyone's set a high score yet!")).toBeInTheDocument();
    });
});