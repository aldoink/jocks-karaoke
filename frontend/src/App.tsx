import React, {useEffect, useRef, useState} from 'react';
import logo from './assets/JocksKaraoke.jpeg';
import './App.scss';
import Table from "./components/Table";
import useDebounce from "./UseDebounce";
import {SongService} from "./services/SongService";

interface Song {
    artist: string,
    location: string,
    title: string
}

interface AppProps {
    songService: SongService
}

function App({songService}: AppProps) {
    const searchInputRef: React.RefObject<HTMLInputElement> = useRef(null)

    const [songList, setSongList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm: string = useDebounce(searchTerm, 300);

    useEffect(() => {
        const search = async () => {
            const songList = await songService.search(debouncedSearchTerm);
            setSongList(songList?.filter((entry: Song) => {
                return entry.title.toLowerCase().includes(debouncedSearchTerm)
                    || entry.artist.toLowerCase().includes(debouncedSearchTerm)
                    || entry.location.toLowerCase().includes(debouncedSearchTerm)
            }))
        }
        search();
    }, [debouncedSearchTerm, songService]);


    const scrollToTop = () => {
        if (searchInputRef.current != null) {
            const elementPosition = searchInputRef.current.offsetTop
            const offsetPosition = elementPosition - 20;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })
        }
    }

    return (
        <div className="App">
            <header className="logo-container">
                <img src={logo} className="logo" alt="logo"/>
            </header>
            <input type="text"
                   placeholder="Search"
                   onFocusCapture={scrollToTop}
                   onChange={event => setSearchTerm(event?.currentTarget?.value.toLowerCase())}
                   ref={searchInputRef}/>
            <Table songList={songList}/>
        </div>
    );

}

export default App;
