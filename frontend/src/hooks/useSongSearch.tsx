import {useContext, useEffect, useState} from "react";
import {SongContext} from "../contexts/SongContext";
import useDebounce from "./useDebounce";

export const useSongSearch = () => {
    const {setSongs, songService} = useContext(SongContext);
    const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
    const debouncedSearchTerm: string | undefined = useDebounce(searchTerm, 300);

    useEffect(() => {
        async function callSongService() {
            if (debouncedSearchTerm || debouncedSearchTerm === '') {
                try {
                    const songList = await songService.search(debouncedSearchTerm);
                    setSongs(songList);
                } catch (e) {
                    //DO NOTHING
                }
            }
        }

        callSongService();
    }, [debouncedSearchTerm, setSongs, songService]);

    const search = (searchTerm: string) => setSearchTerm(searchTerm);

    const searchWithoutDebounce = async (searchTerm: string) => {
        try {
            const songList = await songService.search(searchTerm);
            setSongs(songList);
        } catch (e) {
            //DO NOTHING
        }
    }

    return {search, searchWithoutDebounce}
}