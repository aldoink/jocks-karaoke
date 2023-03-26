import React, { useContext } from "react";
import { HighScore } from "../../../services/HighScoreService";
import styled from "styled-components";
import { HighScoreContext } from "../../../contexts/HighScoreContext";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const CenteredColumn = styled.td`
  display: flex;
  justify-content: center;
`;

const Row = styled.tr`
  td {
    &:first-child {
      width: 75%;
      margin-right: 1rem;
    }

    CenteredColumn {
      width: 25%;
    }
  }
`;

const CenteredHeader = styled.h3`
  text-align: center;
`;

export const HighScoreTable: React.FC = () => {
  const { highScores } = useContext(HighScoreContext);

  return highScores.length > 0 ? (
    <Table>
      <thead>
        <tr>
          <th className={"name-column"}>Name</th>
          <th className={"score-column"}>Score</th>
        </tr>
      </thead>
      <tbody>
        {highScores?.map((entry: HighScore, index: number) => (
          <Row key={`high-score-${index}`}>
            <td>{entry.name}</td>
            <CenteredColumn>{entry.score}</CenteredColumn>
          </Row>
        ))}
      </tbody>
    </Table>
  ) : (
    <CenteredHeader>
      Doesn't look like anyone's set a high score yet!
    </CenteredHeader>
  );
};
