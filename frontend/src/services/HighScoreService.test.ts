import axios from "axios";
import {HighScore, HighScoreService} from "./HighScoreService";
import {AuthService} from "./AuthService";
import {waitFor} from "@testing-library/react";

jest.mock("axios")

describe('HighScoreService', () => {

    const mockedAuthService = {} as AuthService
    const highScoreService = new HighScoreService(mockedAuthService);
    const mockToken = 'validToken';
    const expectedHeaders = {
        headers: {
            "Authorization":
                `Bearer ${mockToken}`
        }
    }

    beforeEach(() => {
        mockedAuthService.getToken = jest.fn().mockReturnValue(mockToken);
    });

    it('gets high scores for the given songId', async () => {
        //given
        const songId = 123
        const expectedUrl = `${process.env.REACT_APP_BACKEND_URL}/highscores/${songId}`

        //when
        highScoreService.findAll(songId)

        //then
        expect(axios.get).toHaveBeenCalledWith(expectedUrl, expectedHeaders);
    });

    it('saves a new high score', () => {
        //given
        const highScore: HighScore = {score: 99, songId: 100, name: 'Ally'}
        const expectedUrl = `${process.env.REACT_APP_BACKEND_URL}/highscores`;

        //when
        highScoreService.save(highScore);

        //then
        expect(axios.put).toHaveBeenCalledWith(expectedUrl, highScore, expectedHeaders);
    });

});