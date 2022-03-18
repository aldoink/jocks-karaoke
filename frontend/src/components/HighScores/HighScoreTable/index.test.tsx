import 'jest-styled-components';
import {render} from "@testing-library/react";
import {HighScoreTable} from "./index";
import {HighScore} from "../../../services/HighScoreService";

describe('HighScoreTable', () => {
    it('renders correctly', () => {
        const highScores = [
            {name: 'Ally', score: 99, songId: 123} as HighScore,
            {name: 'Johnny', score: 98, songId: 123} as HighScore,
            {name: 'Jenny', score: 97, songId: 123} as HighScore
        ]

        expect(render(<HighScoreTable highScores={highScores}/>).asFragment()).toMatchSnapshot();
    });
});