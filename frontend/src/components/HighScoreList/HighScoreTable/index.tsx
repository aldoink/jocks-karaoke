import React, {useEffect, useState} from "react";
import {HighScore} from "../../../services/HighScoreService";
import {HighScoreTableEntry} from "./HighScoreTableEntry";

interface IHighScoreTableProps {
    readonly highScores: HighScore[];
    readonly songId: number;
}

export const HighScoreTable: React.FC<IHighScoreTableProps> = ({highScores, songId}) => {

    const [tableEntries, setTableEntries] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setTableEntries(highScores?.map((entry: HighScore, index: number) => (
            <HighScoreTableEntry index={index} entry={entry}/>
        )))
    }, [highScores]);

    const HighScores = () => {
        return <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody>{tableEntries}</tbody>
        </table>
    }

    const addNewHighScore = () => {
        const newTableEntries = [...tableEntries];
        newTableEntries.push(<HighScoreTableEntry index={highScores.length}
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
