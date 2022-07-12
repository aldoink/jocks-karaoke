import {render, screen} from "@testing-library/react";
import {Login} from "./index";
import userEvent from "@testing-library/user-event";
import {AuthService} from "../../../../services/AuthService";
import {IServiceContext, ServiceContext} from "../../../../contexts/ServiceContext";

describe('Login', () => {
    let mockedAuthService = {} as AuthService;

    beforeEach(() => {
        mockedAuthService.login = jest.fn().mockResolvedValue(undefined);
    });

    it('calls the AuthService login function with the correct params', async () => {
        //given
        const email = 'test@user.com';
        const password = 'password';
        render(
            <ServiceContext.Provider value={{authService: mockedAuthService} as IServiceContext}>
                <Login/>
            </ServiceContext.Provider>
        )

        //when
        userEvent.click(screen.getByText('Login'))
        userEvent.type(screen.getByTestId('email-input'), email)
        userEvent.type(screen.getByTestId('password-input'), password)
        userEvent.click(screen.getByText('Submit'))

        //then
        expect(await screen.findByTestId('success-checkmark')).toBeInTheDocument();
        expect(mockedAuthService.login).toHaveBeenCalledWith(email, password);
    });
});