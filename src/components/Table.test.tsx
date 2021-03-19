import React from 'react';
import Table from "./Table";
import {Entry} from "../Entry";
import renderer from 'react-test-renderer'

const entries = [
    new Entry("BP1", "A Title", "A Test Artist"),
    new Entry("BP2", "B Title", "B Test Artist"),
    new Entry("BP3", "C Title", "C Test Artist"),
]

it('renders table entries', () => {
    const tree = renderer.create(<Table songList={entries}/>).toJSON();
    expect(tree).toMatchSnapshot();
});