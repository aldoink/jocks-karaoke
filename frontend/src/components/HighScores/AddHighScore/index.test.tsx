import {AddHighScore} from "./index";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {IServiceContext, ServiceContext} from "../../../contexts/ServiceContext";
import {HighScore, HighScoreService} from "../../../services/HighScoreService";

describe('AddHighScore', () => {
    const addButtonText = 'Add new High Score';
    const defaultSongId = 1;
    const mockedHighScoreService = {} as HighScoreService

    function renderAddHighScore(songId: number = defaultSongId) {
        return render(
            <ServiceContext.Provider value={{highScoreService: mockedHighScoreService} as IServiceContext}>
                <AddHighScore songId={songId}/>
            </ServiceContext.Provider>
        );
    }

    beforeEach(() => {
        mockedHighScoreService.save = jest.fn();
    });

    it("shows a button to add high score when editMode is false", () => {
        //given & when
        renderAddHighScore();

        //then
        expect(screen.getByText(addButtonText)).toBeInTheDocument();
        expect(screen.queryByText('Save')).not.toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Name')).not.toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Score')).not.toBeInTheDocument();
    });

    it('hides Add button and shows Inputs and Save button when add button is clicked', () => {
        //given
        renderAddHighScore()

        //when
        userEvent.click(screen.getByText(addButtonText));

        //then
        expect(screen.queryByText(addButtonText)).not.toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Score')).toBeInTheDocument();
    });

    it('saves high score when save button is clicked', () => {
        //given
        const expectedHighScore = {name: 'Johnny', score: 99, songId: 123} as HighScore;
        renderAddHighScore(123);

        //when
        userEvent.click(screen.getByText(addButtonText));
        userEvent.type(screen.getByPlaceholderText('Name'), 'Johnny');
        userEvent.type(screen.getByPlaceholderText('Score'), '99');
        userEvent.click(screen.getByText('Save'));

        //then
        expect(mockedHighScoreService.save).toHaveBeenCalledWith(expectedHighScore);
    });
});