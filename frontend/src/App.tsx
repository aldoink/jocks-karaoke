import React, {useEffect, useRef, useState} from 'react';
import logo from './assets/JocksKaraoke.jpeg';
import './App.scss';
import useDebounce from "./UseDebounce";
import {SongService} from "./services/SongService";
import {ReactComponent as SearchIcon} from './assets/search-icon.svg'
import {HamburgerMenu} from "./components/HamburgerMenu";
import {Table} from "./components/Table";

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

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event?.currentTarget?.value.toLowerCase())

    return (<div className="app-container">
            <div id="nav">
                <div className="search-field-container">
                    <div className="search-field">
                        <input type="text"
                               placeholder="Search"
                               onChange={handleSearch}
                               ref={searchInputRef}/>
                        <SearchIcon/>
                    </div>
                </div>
                <HamburgerMenu/>
            </div>
            <div className="content-container">
                <header className="logo-container">
                    <img src={logo} className="logo" alt="logo"/>
                </header>
                <Table songList={songList}/>
            </div>
        </div>
    );

}

export default App;
