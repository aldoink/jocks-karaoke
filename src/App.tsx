import React, {FormEvent} from 'react';
import bluezer from './The Bluezer.jpeg';
import './App.css';
import entries from "./assets/entries.json"
import Table from "./Table";

class App extends React.Component<any, any>{

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        alert("Test")
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={bluezer} className="App-logo" alt="logo"/>
                </header>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Search"/>
                    <input type="submit" value="Go!"/>
                </form>
                <Table></Table>
            </div>
        );
    }
}

export default App;
