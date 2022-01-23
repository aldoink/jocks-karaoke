import React, {useContext, useEffect, useState} from "react";
import {Song} from "../../models/Song";
import {ServiceContext} from "../../contexts/ServiceContext";
import {HighScore} from "../../services/HighScoreService";
import "./index.scss";
import {HighScoreTable} from "./HighScoreTable";

export interface HighScoreProps {
    readonly song: Song;
}

export const HighScoreList: React.FC<HighScoreProps> = ({song}) => {
    const [highScores, setHighScores] = useState<HighScore[]>([]);
    const [hasError, setHasError] = useState<boolean>(false);
    const {highScoreService} = useContext(ServiceContext);

    useEffect(() => {
        const getHighScores = async () => {
            try {
                const highScores: HighScore[] = await highScoreService.findAll(song.id);
                setHighScores(highScores);
            } catch (e) {
                setHasError(true);
            }
        }
        getHighScores();
    }, [highScoreService, song])

    return <>{
        hasError
            ? <p className="failure">Something went wrong... try again later.</p>
            : <div id="high-score-list">
                <div className="title-container">
                    <h2>{song?.title}</h2>
                    <h3>{song?.artist}</h3>
                    <h4>{song?.location}</h4>
                </div>
                <HighScoreTable songId={song.id} highScores={highScores}/>
            </div>
    }</>
}