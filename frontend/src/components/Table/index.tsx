import React from "react";
import {Song} from "../../Song";
import "./index.scss";

type TableProps = {
    songList: Song[]
}

export const Table: React.FC<TableProps> = ({songList}) => {
    return (
        <div className="table-container">
            <div key="title-header" className="table-cell bold">Song Title</div>
            <div key="artist-header" className="table-cell bold">Artist</div>
            <div key="location-header" className="table-cell bold">Location</div>
            {songList?.map((entry: Song, index) => (
                <React.Fragment key={`song-${index}`}>
                    <div className="table-cell">{entry.title}</div>
                    <div className="table-cell">{entry.artist}</div>
                    <div className="table-cell">{entry.location}</div>
                </React.Fragment>
            ))}
        </div>
    )
}