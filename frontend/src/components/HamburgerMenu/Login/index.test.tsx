import {Login} from "./index";
import {act, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {AuthService} from "../../../services/AuthService";
import {AuthContext} from "../../../contexts/AuthContext";
import {flushPromises} from "../../../testUtils";


describe('Login', () => {
    let mockedAuthService = {} as AuthService;
    beforeEach(() => {
        mockedAuthService.login = jest.fn();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('opens the login pop-up when the button is clicked', () => {
        //given
        render(<Login/>);

        //then (1)
        expect(screen.queryByTestId("login-modal")).not.toBeInTheDocument();

        //when (1)
        userEvent.click(screen.getByText("Login"));

        //then (2)
        expect(screen.getByTestId("login-modal")).toBeInTheDocument();
    });

    it('calls the auth service when the submit button is clicked', async () => {
        //given
        mockedAuthService.login = jest.fn().mockResolvedValue(undefined);
        const email = "some@email.com";
        const password = "password";
        render(
            <AuthContext.Provider value={{authService: mockedAuthService}}>
                <Login/>
            </AuthContext.Provider>
        );
        userEvent.click(screen.getByText("Login"));

        //when
        userEvent.type(screen.getByTestId("email-input"), email);
        userEvent.type(screen.getByTestId('password-input'), password);
        userEvent.click(screen.getByText('Submit'));

        //then
        await act(async () => {
            await flushPromises()
        });
        expect(mockedAuthService.login).toHaveBeenCalledWith(email, password);
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        expect(screen.getByTestId("success-checkmark")).toBeInTheDocument();
    });
});