import React from 'react';
import Table from "./Table";
import {Song} from "../Song";
import renderer from 'react-test-renderer'

const entries = [
    new Song("BP1", "A Title", "A Test Artist"),
    new Song("BP2", "B Title", "B Test Artist"),
    new Song("BP3", "C Title", "C Test Artist"),
]

it('renders table entries', () => {
    const tree = renderer.create(<Table songList={entries}/>).toJSON();
    expect(tree).toMatchSnapshot();
});