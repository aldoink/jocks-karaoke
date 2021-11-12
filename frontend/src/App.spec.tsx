import {render, screen, waitFor} from "@testing-library/react";
import App from "./App";
import {SongService} from "./services/SongService";
import {Song} from "./Song";

describe('App', () => {

    const mockedSongService = {} as any as SongService

    beforeEach(() => {
        mockedSongService.search = jest.fn();
    });

    it('loads songs and displays them in the table', async () => {
        //given
        let songs = [
            {location: 'GP001', artist: 'Led Zeppelin', title: 'Immigrant Song'} as Song,
            {location: 'GP002', artist: 'Queen', title: `Don't stop me now`} as Song,
            {location: 'GP003', artist: 'Geto Boys', title: 'Damn it feels good to be a gangster'} as Song
        ];
        mockedSongService.search = jest.fn().mockResolvedValue(songs)

        //when
        const {asFragment} = render(<App songService={mockedSongService}/>)

        //then
        await waitFor(() => expect(screen.getByText(songs[0].title)).toBeInTheDocument())
        expect(asFragment()).toMatchSnapshot();
        expect(mockedSongService.search).toHaveBeenCalledTimes(1);
        expect(mockedSongService.search).toHaveBeenCalledWith("");
    });
});
