import React, {FormEvent} from 'react';
import logo from './assets/Jock\'s_FC-min.png';
import './App.scss';
import entries from "./assets/entries.json"
import Table from "./Table";

class App extends React.Component<any, any> {
    private searchInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: any) {
        super(props);
        this.state = {
            songList: entries
        }
        this.searchInputRef = React.createRef();
    }

    handleChange = (event: FormEvent<HTMLInputElement>) => {
        const searchTerm = event.currentTarget.value.toLowerCase();
        const songList = entries.filter((entry) => {
            return entry.title.toLowerCase().includes(searchTerm)
                || entry.artist.toLowerCase().includes(searchTerm)
                || entry.location.toLowerCase().includes(searchTerm)
        })
        this.setState({...this.state, songList})
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <input type="text"
                       placeholder="Search"
                       onFocusCapture={this.scrollToTop}
                       onChange={this.handleChange}
                       ref={this.searchInputRef}/>
                <Table songList={this.state.songList}/>
            </div>
        );
    }

    scrollToTop = () => {
        if (this.searchInputRef.current != null){
            const elementPosition = this.searchInputRef.current.offsetTop
            const offsetPosition = elementPosition - 20;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })
        }
    }
}

export default App;
