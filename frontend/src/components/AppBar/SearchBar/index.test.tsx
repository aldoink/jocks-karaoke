import {render, screen} from "@testing-library/react";
import {SearchBar} from "./index";
import {useSongSearch} from "../../../hooks/useSongSearch";
import userEvent from "@testing-library/user-event";

jest.mock("../../../hooks/useSongSearch");

describe('SearchBar', () => {

    const mockedSearchFn = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useSongSearch as any).mockReturnValue(mockedSearchFn);
    });

    it('renders correctly', () => {
        expect(render(<SearchBar/>).asFragment()).toMatchSnapshot();
    });

    it('calls the useSongSearch hook search function when user types in input', () => {
        //given
        render(<SearchBar/>);

        //when
        userEvent.type(screen.getByPlaceholderText('Search'), 'test');

        //then
        expect(mockedSearchFn).toHaveBeenCalledWith('t');
        expect(mockedSearchFn).toHaveBeenCalledWith('te');
        expect(mockedSearchFn).toHaveBeenCalledWith('tes');
        expect(mockedSearchFn).toHaveBeenCalledWith('test');
    });

    it('loads all songs on first load', () => {
        //given
        const mockedSearchFn = jest.fn();
        (useSongSearch as any).mockReturnValue(mockedSearchFn);
        render(<SearchBar/>);

        //then
        expect(mockedSearchFn).toHaveBeenCalledTimes(1);
        expect(mockedSearchFn).toHaveBeenCalledWith('');
    });
});