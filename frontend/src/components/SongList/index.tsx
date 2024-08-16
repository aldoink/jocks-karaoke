import React, { useContext, useEffect, useState } from "react";
import { Song } from "../../models/Song";
import { Modal } from "../Modal";
import styled from "styled-components";
import { SongContext } from "../../contexts/SongContext";
import { HighScoreContext, highScoreService } from "contexts/HighScoreContext";
import { HighScores } from "../HighScores";
import { HighScore } from "../../services/HighScoreService";

export const SongList: React.FC = () => {
  const { songs } = useContext(SongContext);
  const [selectedSong, setSelectedSong] = useState<Song | undefined>(undefined);
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedSong) {
      setShowModal(true);
    }
  }, [selectedSong]);

  const onModalClosed = () => {
    setShowModal(false);
    setSelectedSong(undefined);
  };

  const refreshHighScores = async (song: Song) => {
    try {
      const highScores: HighScore[] = await highScoreService.findAll(song.id);
      setHighScores(highScores);
    } catch (e) {
      setHasError(true);
    }
  };

  return (
    <>
      <div className="table-container">
        {songs.map((song) => (
          <SongContainer
            key={`song${song.id}`}
            onClick={() => setSelectedSong(song)}
          >
            <TitleArtistContainer>
              <h3>{song.title}</h3>
              <h4>{song.artist}</h4>
            </TitleArtistContainer>
            <LocationContainer>
              <h4>{song.location}</h4>
            </LocationContainer>
          </SongContainer>
        ))}
      </div>
      <Modal isOpen={showModal} closeFn={onModalClosed}>
        {selectedSong && (
          <HighScoreContext.Provider
            value={{
              highScoreService,
              highScores,
              refreshHighScores,
              hasError,
            }}
          >
            <HighScores song={selectedSong} />
          </HighScoreContext.Provider>
        )}
      </Modal>
    </>
  );
};

const SongContainer = styled.div`
  display: flex;
  padding: 0.75rem 1rem;
`;

const TitleArtistContainer = styled.div`
  width: 75%;
  padding-right: 1rem;

  h3 {
    color: white;
    margin: 0;
  }

  h4 {
    color: gold;
    margin: 0;
  }
`;

const LocationContainer = styled.div`
  width: 25%;

  h4 {
    color: white;
    margin: 0;
  }
`;
