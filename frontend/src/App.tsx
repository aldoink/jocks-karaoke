import React, { useState } from "react";
import { ServiceContext } from "./contexts/ServiceContext";
import styled, { ThemeProvider } from "styled-components";
import { AuthService } from "./services/AuthService";
import { HighScoreService } from "./services/HighScoreService";
import { SongService } from "./services/SongService";
import { SongContext } from "./contexts/SongContext";
import Home from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const theme = {
  blue: "#1e359c",
  darkBlue: "#041e42",
  whiteBorder: "1px solid white",
};

const authService = new AuthService();
const highScoreService = new HighScoreService(authService);
const songService = new SongService();

const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: -80px;
  left: 0;
  right: 0;
  z-index: -100;
  background-image: linear-gradient(${(props) => props.theme.blue}, 90%, black);
`;

const AppContainer = styled.div`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`;

function App() {
  const [songs, setSongs] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <ServiceContext.Provider value={{ highScoreService, authService }}>
        <SongContext.Provider value={{ songService, songs, setSongs }}>
          <Background />
          <AppContainer>
            <BrowserRouter>
              <Routes>
                <Route path={"/"} element={<Home />}></Route>
              </Routes>
            </BrowserRouter>
            <Home />
          </AppContainer>
        </SongContext.Provider>
      </ServiceContext.Provider>
    </ThemeProvider>
  );
}

export default App;
