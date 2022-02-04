import {useSongSearch} from "./useSongSearch";
import {SongContext} from "../contexts/SongContext";
import {SongService} from "../services/SongService";
import {act, renderHook} from "@testing-library/react-hooks";
import {Song} from "../models/Song";
import {waitFor} from "@testing-library/react";

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
            jest.useFakeTimers();
            mockedSongService.search = jest.fn().mockResolvedValue(songs);
        });

        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        });

        it('calls the songService after a given debounce time and updates the song list in context with the result', async () => {
            //given
            const {result} = renderUseSongSearch();

            //when
            await act(async () => {await result.current.search('test')});

            //then
            expect(mockedSongService.search).not.toHaveBeenCalled();

            //when (2)
            await act(async () => {jest.advanceTimersByTime(301)});

            //then (2)
            await waitFor(() => expect(setSongs).toHaveBeenCalledWith(songs));
            expect(mockedSongService.search).toHaveBeenCalledTimes(1);
            expect(mockedSongService.search).toHaveBeenCalledWith('test');
        });

        it('debounces successive searches', async () => {
            //given
            const {result} = renderUseSongSearch();

            //when
            act(() => {
                result.current.search('t');
                result.current.search('te');
                result.current.search('tes');
                result.current.search('test');
            });

            //then
            expect(mockedSongService.search).not.toHaveBeenCalled();

            //when (2)
            act(() => {jest.advanceTimersByTime(300)});

            //then (2)
            expect(mockedSongService.search).toHaveBeenCalledTimes(1);
            expect(mockedSongService.search).toHaveBeenCalledWith('test');
            await waitFor(() => expect(setSongs).toHaveBeenCalledWith(songs));
        });

        it('keeps the old song list when songService throws an error', () => {
            //given
            mockedSongService.search = jest.fn().mockRejectedValue(new Error('failed'));
            const {result} = renderUseSongSearch();

            //when
            act(() => result.current.search('test'));
            act(() => {jest.advanceTimersByTime(300)});

            //then
            expect(setSongs).not.toHaveBeenCalled();
        });

        it('submits an empty string search', async () => {
            //given
            const {result} = renderUseSongSearch();

            //when
            act(() => {
                result.current.search('');
            });

            //then
            expect(mockedSongService.search).not.toHaveBeenCalled();

            //when (2)
            act(() => {jest.advanceTimersByTime(300)});

            //then (2)
            expect(mockedSongService.search).toHaveBeenCalledTimes(1);
            expect(mockedSongService.search).toHaveBeenCalledWith('');
            await waitFor(() => expect(setSongs).toHaveBeenCalledWith(songs));
        });
    });

    describe('searchWithoutDebounce', () => {
        it('calls songService with no debounce', async () => {
            //given
            mockedSongService.search = jest.fn().mockResolvedValue(songs);
            const {result} = renderUseSongSearch();

            //when
            await result.current.searchWithoutDebounce('test');

            //then
            await waitFor(() => expect(mockedSongService.search).toHaveBeenCalledWith('test'));
            expect(setSongs).toHaveBeenCalledTimes(1);
        });
    });
});