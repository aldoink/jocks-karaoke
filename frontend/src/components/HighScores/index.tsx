import React, { useContext, useEffect, useState } from "react";
import { Song } from "../../models/Song";
import { HighScore } from "../../services/HighScoreService";
import styled from "styled-components";
import { HighScoreTable } from "./HighScoreTable";
import { AddHighScore } from "./AddHighScore";
import { HighScoreContext } from "../../contexts/HighScoreContext";

export interface HighScoreProps {
  readonly song: Song;
}

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
  const { highScores, refreshHighScores, highScoreService, hasError } =
    useContext(HighScoreContext);

  useEffect(() => {
    refreshHighScores(song);
  }, [highScoreService, song]);

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
            <HighScoreTable />
            <AddHighScore song={song} />
          </div>
        </TableContainer>
      )}
    </>
  );
};
