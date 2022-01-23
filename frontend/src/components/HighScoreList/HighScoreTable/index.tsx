import React, {useEffect, useState} from "react";
import {HighScore} from "../../../services/HighScoreService";
import {HighScoreTableEntry} from "./HighScoreTableEntry";
import styled from 'styled-components';
import "./index.scss";

interface IHighScoreTableProps {
    readonly highScores: HighScore[];
    readonly songId: number;
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const HighScoreTable: React.FC<IHighScoreTableProps> = ({highScores, songId}) => {

    const [tableEntries, setTableEntries] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setTableEntries(highScores?.map((entry: HighScore, index: number) => (
            <HighScoreTableEntry key={'highScoreTableEntry' + index} entry={entry}/>
        )))
    }, [highScores]);

    const HighScores = () => {
        return <Table id={'high-score-table'}>
            <thead>
            <tr>
                <th className={'name-column'}>Name</th>
                <th className={'score-column'}>Score</th>
            </tr>
            </thead>
            <tbody>{tableEntries}</tbody>
        </Table>
    }

    const addNewHighScore = () => {
        const newTableEntries = [...tableEntries];
        newTableEntries.push(<HighScoreTableEntry key={'highScoreTableEntry' + tableEntries.length}
                                                  entry={{name: '', score: 0, songId: songId}}
                                                  editMode={true}/>)
        setTableEntries(newTableEntries);
    }

    return <div>
        {
            highScores.length > 0
                ? <HighScores/>
                : <h2>Doesn't look like anyone's set a high score yet!</h2>
        }
        <button onClick={addNewHighScore}>Add high score</button>
    </div>
}
