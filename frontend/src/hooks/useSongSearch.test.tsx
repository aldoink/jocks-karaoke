import {useSongSearch} from "./useSongSearch";
import {SongContext} from "../contexts/SongContext";
import {SongService} from "../services/SongService";
import {act, renderHook} from "@testing-library/react-hooks";
import {Song} from "../models/Song";

describe('useSongSearch', () => {
    const mockedSongService = {} as SongService;
    const setSongs = jest.fn();
    const songs = [
        {location: 'GP001', artist: 'Led Zeppelin', title: 'Immigrant Song'} as Song,
        {location: 'GP002', artist: 'Queen', title: `Don't stop me now`} as Song,
        {location: 'GP003', artist: 'Geto Boys', title: 'Damn it feels good to be a gangster'} as Song
    ];

    const renderUseSongSearch = () => {
        const wrapper = (props: { children: any }) => (
            <SongContext.Provider value={{songs: [], songService: mockedSongService, setSongs}}>
                {props.children}
            </SongContext.Provider>
        )
        return renderHook(() => useSongSearch(), {wrapper});
    }

    describe('search', () => {
        beforeEach(() => {
            mockedSongService.search = jest.fn().mockResolvedValue(songs);
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        });

        it('calls the songService after a given debounce time and updates the song list in context with the result', async () => {
            //given
            const {result} = renderUseSongSearch();

            //when
            act(() => result.current('test'));

            //then
            expect(mockedSongService.search).not.toHaveBeenCalled();

            //when (2)
            await act(async () => {jest.advanceTimersByTime(501)});

            //then (2)
            expect(mockedSongService.search).toHaveBeenCalledTimes(1);
            expect(mockedSongService.search).toHaveBeenCalledWith('test');
            expect(setSongs).toHaveBeenCalledWith(songs);
        });

        it('debounces successive searches', async () => {
            //given
            const {result} = renderUseSongSearch();

            //when
            act(() => {
                result.current('t');
                result.current('te');
                result.current('tes');
                result.current('test');
            });

            //then
            expect(mockedSongService.search).not.toHaveBeenCalled();

            //when (2)
            await act(async () => {jest.advanceTimersByTime(500)});

            //then (2)
            expect(mockedSongService.search).toHaveBeenCalledTimes(1);
            expect(mockedSongService.search).toHaveBeenCalledWith('test');
            expect(setSongs).toHaveBeenCalledWith(songs);
        });

        it('keeps the old song list when songService throws an error', async () => {
            //given
            mockedSongService.search = jest.fn().mockRejectedValue(new Error('failed'));
            const {result} = renderUseSongSearch();

            //when
            act(() => {result.current('test')});
            await act(async () => {jest.advanceTimersByTime(500)});

            //then
            expect(setSongs).not.toHaveBeenCalled();
        });

        it('submits an empty string search', async () => {
            //given
            const {result} = renderUseSongSearch();

            //when
            act(() => {result.current('')});

            //then
            expect(mockedSongService.search).not.toHaveBeenCalled();

            //when (2)
            await act(async () => {jest.advanceTimersByTime(500)});

            //then (2)
            expect(mockedSongService.search).toHaveBeenCalledTimes(1);
            expect(mockedSongService.search).toHaveBeenCalledWith('');
            expect(setSongs).toHaveBeenCalledWith(songs);
        });
    });
});