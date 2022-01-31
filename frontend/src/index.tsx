import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {SongService} from "./services/SongService";
import 'typeface-roboto';
import {HighScoreService} from "./services/HighScoreService";
import {ThemeProvider} from "styled-components";
import {ServiceContext} from './contexts/ServiceContext';
import {AuthService} from "./services/AuthService";

const authService = new AuthService();
const highScoreService = new HighScoreService(authService);
const songService = new SongService();

const theme = {
    blue: '#1e359c',
    darkBlue: '#041e42',
    whiteBorder: '1px solid white'
}

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <ServiceContext.Provider value={{
                highScoreService,
                songService
            }}>
                <App/>
            </ServiceContext.Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
