import { useContext, useEffect, useState } from "react";
import { SongContext } from "../contexts/SongContext";
import useDebounce from "./useDebounce";

export const useSongSearch = () => {
  const { setSongs, songService } = useContext(SongContext);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string | undefined = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function callSongService() {
      if (debouncedSearchTerm || debouncedSearchTerm === "") {
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

  return (searchTerm: string) => setSearchTerm(searchTerm);
};
