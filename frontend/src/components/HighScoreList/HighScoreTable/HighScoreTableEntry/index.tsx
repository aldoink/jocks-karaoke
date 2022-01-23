import React, {useContext, useState} from "react";
import {HighScore} from "../../../../services/HighScoreService";
import {ServiceContext} from "../../../../contexts/ServiceContext";

interface IHighScoreTableEntryProps {
    readonly entry: HighScore;
    readonly editMode?: boolean;
}

export const HighScoreTableEntry: React.FC<IHighScoreTableEntryProps> = ({entry, editMode = false}) => {
    const {highScoreService} = useContext(ServiceContext);
    const [newName, setNewName] = useState(entry.name);
    const [newScore, setNewScore] = useState(entry.score.toString());

    const saveHighScore = () => highScoreService.save(
        {score: parseInt(newScore), name: newName, songId: entry.songId}
    );
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewName(event?.currentTarget?.value)
    const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.currentTarget?.value) {
            setNewScore(event.currentTarget.value)
        } else {
            setNewScore('');
        }
    }

    const name = editMode
        ? <input data-testid={'name-input'}
                 type="text"
                 value={newName}
                 onChange={handleNameChange}/>
        : <>{entry.name}</>;

    const score = editMode
        ? <input data-testid={'score-input'}
                 type="number"
                 value={newScore}
                 onChange={handleScoreChange}/>
        : <>{entry.score}</>

    return <>
        <tr>
            <td className="table-cell name-column">{name}</td>
            <td className="table-cell score-column">{score}</td>
        </tr>
        {editMode && <tr>
            <td>
                <button onClick={saveHighScore}>Save</button>
            </td>
        </tr>}
    </>
}
