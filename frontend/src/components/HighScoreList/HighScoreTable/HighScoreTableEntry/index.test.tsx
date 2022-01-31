import {HighScoreTableEntry} from "./index";
import {HighScore, HighScoreService} from "../../../../services/HighScoreService";
import {render} from "@testing-library/react";
import {screen} from "@testing-library/dom";
import {IServiceContext, ServiceContext} from "../../../../contexts/ServiceContext";
import userEvent from "@testing-library/user-event";

describe('HighScoreTableEntry', () => {
    const defaultHighScore: HighScore = {name: 'Test', score: 99, songId: 123};
    const mockedHighScoreService = {} as HighScoreService;

    const renderHighScoreTableEntry = (entry: HighScore = defaultHighScore, editMode: boolean = false) => render(
        <ServiceContext.Provider value={{highScoreService: mockedHighScoreService} as IServiceContext}>
            <table>
                <tbody>
                <HighScoreTableEntry entry={entry} editMode={editMode}/>
                </tbody>
            </table>
        </ServiceContext.Provider>
    )

    function saveButton() {
        return screen.getByText('Save');
    }

    beforeEach(() => {
        mockedHighScoreService.save = jest.fn();
    });

    it('renders correctly when editMode = false', () => {
        expect(renderHighScoreTableEntry().asFragment())
            .toMatchSnapshot();
        expect(screen.queryByTestId('name-input')).not.toBeInTheDocument();
        expect(screen.queryByTestId('score-input')).not.toBeInTheDocument();
        expect(screen.getByText(defaultHighScore.name)).toBeInTheDocument();
        expect(screen.getByText(defaultHighScore.score)).toBeInTheDocument();
    });

    function nameInputField() {
        return screen.getByTestId('name-input');
    }

    function scoreInputField() {
        return screen.getByTestId('score-input');
    }

    it('renders correctly when editMode = true', () => {
        //given
        expect(renderHighScoreTableEntry(defaultHighScore, true).asFragment())
            .toMatchSnapshot();

        //then
        expect(nameInputField()).toBeInTheDocument();
        expect(scoreInputField()).toBeInTheDocument();
        expect(screen.queryByText(defaultHighScore.name)).not.toBeInTheDocument();
        expect(screen.queryByText(defaultHighScore.score)).not.toBeInTheDocument();
        expect(saveButton()).toBeInTheDocument();
    });

    it('saves the high score when save button is clicked', () => {
        //given
        renderHighScoreTableEntry(defaultHighScore, true);

        //when
        userEvent.click(saveButton());

        //then
        expect(mockedHighScoreService.save).toHaveBeenCalledWith(defaultHighScore);
    });

    it('saves changes to the current entry when save button is clicked', async () => {
        //given
        renderHighScoreTableEntry(defaultHighScore, true);
        const name = 'Someone new';
        const score = '88';
        const expectedHighScore: HighScore = {name, score: 88, songId: defaultHighScore.songId};

        //when
        await userEvent.clear(nameInputField());
        userEvent.type(nameInputField(), name);
        await userEvent.clear(scoreInputField());
        userEvent.type(scoreInputField(), score);

        userEvent.click(saveButton())

        //then
        expect(mockedHighScoreService.save).toHaveBeenCalledWith(expectedHighScore);
    });
});