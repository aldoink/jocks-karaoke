import {HighScoreList} from "./index";
import {Song} from "../../models/Song";
import {render, screen} from "@testing-library/react";
import {IServiceContext, ServiceContext} from "../../contexts/ServiceContext";
import {HighScore, HighScoreService} from "../../services/HighScoreService";
import React from "react";

describe('HighScoreList', () => {
    const defaultSong = new Song(1, "BP-0001", "Title", "Artist");
    const mockedHighScoreService = {} as HighScoreService;

    function renderHighScoreList(song: Song = defaultSong) {
        return render(
            <ServiceContext.Provider value={{highScoreService: mockedHighScoreService} as IServiceContext}>
                <HighScoreList song={song}/>
            </ServiceContext.Provider>
        )
    }

    it('loads the high scores for the selected song', async () => {
        //given
        mockedHighScoreService.findAll = jest.fn().mockResolvedValue([
            {name: 'Ally', score: 99, songId: 1} as HighScore,
            {name: 'Jenny', score: 98, songId: 1} as HighScore,
            {name: 'Johnny', score: 97, songId: 1} as HighScore,
            {name: 'Gemma', score: 96, songId: 1} as HighScore
        ]);

        const {asFragment} = renderHighScoreList();

        //then
        expect(mockedHighScoreService.findAll).toHaveBeenCalledWith(defaultSong.id);
        expect(await screen.findByText('Ally')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    it("shows an error message when high scores couldn't be loaded", async () => {
        //given
        mockedHighScoreService.findAll = jest.fn().mockRejectedValue(new Error("Oops!"));
        renderHighScoreList();

        //then
        expect(await screen.findByText("Something went wrong... try again later.")).toBeInTheDocument();
    });

    it('shows a message when no high scores are found', async () => {
        //given
        mockedHighScoreService.findAll = jest.fn().mockResolvedValue([]);
        renderHighScoreList();

        //then
        expect(await screen.findByText("Doesn't look like anyone's set a high score yet!")).toBeInTheDocument();
    });
});