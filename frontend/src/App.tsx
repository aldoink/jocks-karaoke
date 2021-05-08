import React, {FormEvent, useEffect, useRef, useState} from 'react';
import logo from './assets/JocksKaraoke.jpeg';
import './App.scss';
import entries from "./assets/entries.json"
import Table from "./components/Table";
import useDebounce from "./hooks";

function App() {
    const searchInputRef: React.RefObject<HTMLInputElement> = useRef(null)

    const [songList, setSongList] = useState(entries);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        const songList = entries.filter((entry) => {
            return entry.title.toLowerCase().includes(debouncedSearchTerm)
                || entry.artist.toLowerCase().includes(debouncedSearchTerm)
                || entry.location.toLowerCase().includes(debouncedSearchTerm)
        })
        setSongList(songList);
    }, [debouncedSearchTerm])


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
