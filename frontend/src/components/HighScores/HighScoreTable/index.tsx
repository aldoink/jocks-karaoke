import React from "react";
import {HighScore} from "../../../services/HighScoreService";
import styled from "styled-components";

interface IHighScoreTableProps {
    readonly highScores: HighScore[];
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

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
`

const CenteredColumn = styled.td`
  display: flex;
  justify-content: center;
`

export const HighScoreTable: React.FC<IHighScoreTableProps> = ({highScores}) => {

    return (
        <Table>
            <thead>
            <tr>
                <th className={'name-column'}>Name</th>
                <th className={'score-column'}>Score</th>
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
    )
}
