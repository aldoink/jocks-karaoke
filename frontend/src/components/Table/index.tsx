import React, {useEffect, useState} from "react";
import {Song} from "../../models/Song";
import "./index.scss";
import {Modal} from "../Modal";
import {HighScoreList} from "../HighScoreList";

type TableProps = {
    songList: Song[]
}

export const Table: React.FC<TableProps> = ({songList}) => {
    const [selectedSong, setSelectedSong] = useState<Song | undefined>(undefined);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (selectedSong) {
            setShowModal(true);
        }
    }, [selectedSong])

    return (
        <>
            <div className="table-container">
                <div key="title-header" className="table-cell bold">Song Title</div>
                <div key="artist-header" className="table-cell bold">Artist</div>
                <div key="location-header" className="table-cell bold">Location</div>
                {songList?.map((entry: Song, index) => (
                    <React.Fragment key={`song-${index}`}>
                        <div className="table-cell"
                             onClick={() => setSelectedSong(entry)}>{entry.title}</div>
                        <div className="table-cell"
                             onClick={() => setSelectedSong(entry)}>{entry.artist}</div>
                        <div className="table-cell"
                             onClick={() => setSelectedSong(entry)}>{entry.location}</div>
                    </React.Fragment>
                ))}
            </div>
            <Modal isOpen={showModal} closeFn={() => setShowModal(false)}>
                {selectedSong && <HighScoreList song={selectedSong}/>}
            </Modal>
        </>
    )
}