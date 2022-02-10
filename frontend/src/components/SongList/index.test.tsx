import React from 'react';
import renderer from 'react-test-renderer'
import {Song} from "../../models/Song";
import {SongList} from "./index";

const entries = [
    new Song(0, "BP1", "A Title", "A Test Artist"),
    new Song(1, "BP2", "B Title", "B Test Artist"),
    new Song(2, "BP3", "C Title", "C Test Artist"),
]

describe('SongList', () => {
    it('renders table entries', () => {
        const tree = renderer.create(<SongList songList={entries}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

