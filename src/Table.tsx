import entries from "./assets/entries.json";
import React from "react";

export default function Table() {
    return (<table>
        <thead>
        <tr>
            <th>Song Title</th>
            <th>Artist</th>
            <th>Code</th>
        </tr>
        </thead>
        <tbody>
        {entries.map((entry) => (<tr key={entry.id}>
            <td>{entry.title}</td>
            <td>{entry.artist}</td>
            <td>{entry.code}</td>
        </tr>))}
        </tbody>
    </table>)
}