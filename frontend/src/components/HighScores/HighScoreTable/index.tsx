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
                    <td>{entry.score}</td>
                </Row>
            ))}
            </tbody>
        </Table>
    )
}
