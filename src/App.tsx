import React, {FormEvent} from 'react';
import bluezer from './The Bluezer.jpeg';
import './App.scss';
import entries from "./assets/entries.json"
import Table from "./Table";

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            songList: entries
        }
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
                    <img src={bluezer} className="App-logo" alt="logo"/>
                </header>
                <input type="text"
                       placeholder="Search"
                       onChange={this.handleChange}/>
                <Table songList={this.state.songList}/>
            </div>
        );
    }
}

export default App;
