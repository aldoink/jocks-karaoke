import React, {useContext, useEffect, useState} from "react";
import {Song} from "../../models/Song";
import {ServiceContext} from "../../contexts/ServiceContext";
import {HighScore} from "../../services/HighScoreService";
import "./index.scss";

export interface HighScoreProps {
    readonly song?: Song;
}

export const HighScoreList: React.FC<HighScoreProps> = ({song}) => {
    const [highScores, setHighScores] = useState<HighScore[] | undefined>(undefined);
    const [hasError, setHasError] = useState<boolean>(false);
    const {highScoreService} = useContext(ServiceContext);

    useEffect(() => {
        const getHighScores = async () => {
            try {
                const highScores: HighScore[] = await highScoreService.getHighScores(song!.id);
                setHighScores(highScores);
            } catch (e) {
                setHasError(true);
            }
        }
        getHighScores();
    }, [highScoreService, song])

    const HighScoreTable = () => <>{highScores!.map((entry: HighScore, index: number) => (
        <React.Fragment key={`highScore-${index}`}>
            <div className="table-cell">{entry.name}</div>
            <div className="table-cell">{entry.score}</div>
        </React.Fragment>
    ))
    }</>

    return (
        <>
            {hasError && <p className="failure">Something went wrong... try again later.</p>}
            {!hasError && <div id="high-score-list">
                <div className="title-container">
                    <h2>{song?.title}</h2>
                    <h3>{song?.artist}</h3>
                    <h4>{song?.location}</h4>
                </div>
                {highScores && highScores.length > 0
                    ? <HighScoreTable/>
                    : <h2>Doesn't look like anyone's set a high score yet!</h2>}
            </div>}
        </>
    )
}