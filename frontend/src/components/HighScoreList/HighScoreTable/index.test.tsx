import {render, screen} from "@testing-library/react";
import {HighScoreTable} from "./index";
import {HighScore} from "../../../services/HighScoreService";
import userEvent from "@testing-library/user-event";

describe('HighScoreTable', () => {
    const defaultHighScoreList = [
        {name: 'Ally', score: 99, songId: 123} as HighScore,
        {name: 'Johnny', score: 98, songId: 123} as HighScore,
        {name: 'Jenny', score: 97, songId: 123} as HighScore
    ]

    it(`displays a feedback message when there are no high scores for the current song`, () => {
        //given & when
        render(<HighScoreTable highScores={[]} songId={123}/>);

        //then
        expect(screen.getByText(`Doesn't look like anyone's set a high score yet!`)).toBeInTheDocument();
    });

    it('adds an empty entry to the list when the Add High Score button is clicked', () => {
        //given
        render(<HighScoreTable highScores={defaultHighScoreList} songId={123} />);
        expect(screen.queryByTestId('name-input')).not.toBeInTheDocument();
        expect(screen.queryByTestId('score-input')).not.toBeInTheDocument();

        //when
        userEvent.click(screen.getByText('Add high score'));

        //then
        expect(screen.getByTestId('name-input')).toBeInTheDocument();
        expect(screen.getByTestId('score-input')).toBeInTheDocument();
    });
});