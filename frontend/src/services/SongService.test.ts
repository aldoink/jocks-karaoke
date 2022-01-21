import {SongService} from "./SongService";
import axios from "axios";

jest.mock("axios")

describe('SongService', () => {
    it('searches for songs with the given search term', () => {
        //given
        const songService = new SongService()
        const searchTerm = 'Some song title'
        const expectedUrl = `${process.env.REACT_APP_BACKEND_URL}/songs?searchTerm=${searchTerm}`

        //when
        songService.search(searchTerm)

        //then
        expect(axios.get).toHaveBeenCalledWith(expectedUrl)
    });

    it('does not append search term when empty string provided', () => {
        //given
        const songService = new SongService()
        const expectedUrl = `${process.env.REACT_APP_BACKEND_URL}/songs`

        //when
        songService.search('')

        //then
        expect(axios.get).toHaveBeenCalledWith(expectedUrl)
    });
});