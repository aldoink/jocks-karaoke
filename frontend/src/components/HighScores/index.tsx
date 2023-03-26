import React, { useContext, useEffect, useState } from "react";
import { Song } from "../../models/Song";
import styled from "styled-components";
import { HighScoreTable } from "./HighScoreTable";
import { AddHighScore } from "./AddHighScore";
import { HighScoreContext } from "../../contexts/HighScoreContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../shared/Button";
import { ButtonLayout } from "../shared/styledComponents";

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
  const { refreshHighScores, highScoreService, hasError } =
    useContext(HighScoreContext);
  const [addMode, setAddMode] = useState(false);
  const { authService } = useContext(AuthContext);

  useEffect(() => {
    refreshHighScores(song);
  }, [highScoreService, song]);

  function handleAddClicked() {
    setAddMode(true);
  }

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
            <ButtonLayout>
              {authService.isAuthenticated() && !addMode && (
                <Button onClick={handleAddClicked}>Add new High Score</Button>
              )}
              {addMode && (
                <AddHighScore song={song} closeFn={() => setAddMode(false)} />
              )}
            </ButtonLayout>
          </div>
        </TableContainer>
      )}
    </>
  );
};
