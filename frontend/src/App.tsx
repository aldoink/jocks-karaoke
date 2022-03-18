import React, {useState} from 'react';
import logo from './assets/JocksKaraoke.jpeg';
import {SongList} from "./components/SongList";
import {ServiceContext} from "./contexts/ServiceContext";
import styled, {ThemeProvider} from "styled-components";
import {NavBar} from "./components/AppBar";
import {AuthService} from "./services/AuthService";
import {HighScoreService} from "./services/HighScoreService";
import {SongService} from "./services/SongService";
import {SongContext} from './contexts/SongContext';

const theme = {
    blue: '#1e359c',
    darkBlue: '#041e42',
    whiteBorder: '1px solid white'
}

const authService = new AuthService();
const highScoreService = new HighScoreService(authService);
const songService = new SongService();

const AppContainer = styled.div`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`

const Body = styled.div`
  padding: 0 0.5rem;

  @media screen and (min-width: 768px) {
    padding: 0 2rem;
  }
`

const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;

  img {
    height: 30vmin;
    pointer-events: none;
    justify-self: end;
  }
`

function App() {
    const [songs, setSongs] = useState([]);

    return (
        <ThemeProvider theme={theme}>
            <ServiceContext.Provider value={{highScoreService, authService}}>
                <SongContext.Provider value={{songService, songs, setSongs}}>
                    <AppContainer>
                        <NavBar/>
                        <Body>
                            <Logo><img src={logo} className="logo" alt="logo"/></Logo>
                            <SongList songList={songs}/>
                        </Body>
                    </AppContainer>
                </SongContext.Provider>
            </ServiceContext.Provider>
        </ThemeProvider>
    );
}

export default App;
