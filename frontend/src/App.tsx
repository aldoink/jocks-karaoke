import React, {useContext, useEffect, useRef, useState} from 'react';
import logo from './assets/JocksKaraoke.jpeg';
import './App.scss';
import useDebounce from "./hooks/UseDebounce";
import {SongService} from "./services/SongService";
import {ReactComponent as SearchIcon} from './assets/search-icon.svg'
import {HamburgerMenu} from "./components/HamburgerMenu";
import {Table} from "./components/Table";
import {Song} from "./models/Song";
import {AuthContext} from "./contexts/AuthContext";
import {HighScoreService} from "./services/HighScoreService";
import {ServiceContext} from "./contexts/ServiceContext";

interface AppProps {
    songService: SongService
}

function App({songService}: AppProps) {
    const {authService} = useContext(AuthContext)
    const [songList, setSongList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm: string = useDebounce(searchTerm, 300);
    const searchInputRef: React.RefObject<HTMLInputElement> = useRef(null)

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

    return (
        <ServiceContext.Provider value={{highScoreService: new HighScoreService(authService)}}>
            <div className="app-container">
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
        </ServiceContext.Provider>
    );
}

export default App;
