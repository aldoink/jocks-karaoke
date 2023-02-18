import React, { useContext, useEffect, useState } from "react";
import { Song } from "../../models/Song";
import { ServiceContext } from "../../contexts/ServiceContext";
import { HighScore } from "../../services/HighScoreService";
import styled from "styled-components";
import { HighScoreTable } from "./HighScoreTable";
import { AddHighScore } from "./AddHighScore";

export interface HighScoreProps {
  readonly song: Song;
}

const CenteredHeader = styled.h3`
  text-align: center;
`;

const TableContainer = styled.div`
  color: ${(props) => props.theme.darkBlue};
`;

const TitleContainer = styled.div`
  border-bottom: 1px solid red;

  h2,
  h3 {
    margin: 0;
  }

  h4 {
    margin-top: 8px;
  }
`;

export const HighScores: React.FC<HighScoreProps> = ({ song }) => {
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const { highScoreService } = useContext(ServiceContext);

  useEffect(() => {
    getHighScores();
  }, [highScoreService, song]);
  const getHighScores = async () => {
    try {
      const highScores: HighScore[] = await highScoreService.findAll(song.id);
      setHighScores(highScores);
    } catch (e) {
      setHasError(true);
    }
  };

  return (
    <>
      {hasError ? (
        <p className="failure">Something went wrong... try again later.</p>
      ) : (
        <TableContainer>
          <TitleContainer>
            <h2>{song?.title}</h2>
            <h3>{song?.artist}</h3>
            <h4>{song?.location}</h4>
          </TitleContainer>
          <div>
            {highScores.length > 0 ? (
              <HighScoreTable highScores={highScores} />
            ) : (
              <CenteredHeader>
                Doesn't look like anyone's set a high score yet!
              </CenteredHeader>
            )}
            <AddHighScore songId={song.id} refreshHighScores={getHighScores} />
          </div>
        </TableContainer>
      )}
    </>
  );
};
