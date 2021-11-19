import React from "react";
import {Song} from "../../Song";
import "./index.scss";

type TableProps = {
    songList: Song[]
}

export const Table: React.FC<TableProps> = ({songList}) => {
    return (
        <div className="table-container">
            <div className="table-cell bold">Song Title</div>
            <div className="table-cell bold">Artist</div>
            <div className="table-cell bold">Location</div>
            {songList?.map((entry: Song, index) => (
                <>
                    <div className="table-cell">{entry.title}</div>
                    <div className="table-cell">{entry.artist}</div>
                    <div className="table-cell">{entry.location}</div>
                </>
            ))}
        </div>
    )
}