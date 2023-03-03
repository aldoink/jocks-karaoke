import { NavBar } from "../components/AppBar";
import logo from "../assets/JocksKaraoke.jpeg";
import { SongList } from "../components/SongList";
import React from "react";
import { SongContext } from "../contexts/SongContext";
import styled from "styled-components";

function Home() {
  return (
    <SongContext.Consumer>
      {({ songs }) => (
        <>
          <NavBar />
          <Body>
            <Logo>
              <img src={logo} className="logo" alt="logo" />
            </Logo>
            <SongList songList={songs} />
          </Body>
        </>
      )}
    </SongContext.Consumer>
  );
}

const Body = styled.div`
  padding: 0 0.5rem;

  @media screen and (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;

  img {
    height: 30vmin;
    pointer-events: none;
    justify-self: end;
  }
`;

export default Home;
