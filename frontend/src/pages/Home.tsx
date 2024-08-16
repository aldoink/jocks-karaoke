import { NavBar } from "../components/AppBar";
import celticLogo from "../assets/Shona's Celtic FC Logo.png";
import { SongList } from "../components/SongList";
import React, { useState } from "react";
import { SongContext, songService } from "../contexts/SongContext";
import styled from "styled-components";
import { Song } from "../models/Song";

function Home() {
  const [songs, setSongs] = useState<Song[]>([]);

  return (
    <>
      <SongContext.Provider value={{ songService, songs, setSongs }}>
        <NavBar />
        <Body>
          <Logo>
            <img src={celticLogo} className="logo" alt="logo" />
          </Logo>
          <SongList />
        </Body>
      </SongContext.Provider>
    </>
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
