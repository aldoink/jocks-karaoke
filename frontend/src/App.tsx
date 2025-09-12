/**
 * App root component that sets up global theme and client-side routing.
 *
 * Changes made:
 * - Switched ThemeProvider to Rangers theme (blue) from Celtic (green).
 *
 * @LLM_USAGE Reverted styling to Rangers blue and updated theme provider.
 */
import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const rangersTheme = {
  main: "#1e359c",
  mainDark: "#041e42",
  whiteBorder: "1px solid white",
};
const celticTheme = {
  main: "#009850",
  mainDark: "#005b24",
  whiteBorder: "1px solid white",
};

const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: -80px;
  left: 0;
  right: 0;
  z-index: -100;
  background-image: linear-gradient(${(props) => props.theme.main}, 90%, black);
`;

const AppContainer = styled.div`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`;

function App() {
  return (
    <ThemeProvider theme={rangersTheme}>
      <Background />
      <AppContainer>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
