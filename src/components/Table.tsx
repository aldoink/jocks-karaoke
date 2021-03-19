import React from "react";
import {Entry} from "../Entry";

type TableProps = {
    songList: Entry[]
}

export default function Table({songList}: TableProps) {
    return (<div className="table-container">
        <table>
            <thead>
            <tr>
                <th>Song Title</th>
                <th>Artist</th>
                <th>Location</th>
            </tr>
            </thead>
            <tbody>
            {songList?.map((entry: Entry, index) => (
                <tr key={index}>
                    <td>{entry.title}</td>
                    <td>{entry.artist}</td>
                    <td>{entry.location}</td>
                </tr>))}
            </tbody>
        </table>
    </div>)
}