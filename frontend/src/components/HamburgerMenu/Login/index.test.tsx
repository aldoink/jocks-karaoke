import {Login} from "./index";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";


describe('Login', () => {
    it('opens the login pop-up when the button is clicked', () => {
        //given
        render(<Login/>)

        //then (1)
        expect(screen.queryByTestId("login-modal")).toBeNull()

        //when (1)
        userEvent.click(screen.getByText("Login"))

        //then (2)
        expect(screen.getByTestId("login-modal")).toBeInTheDocument()
    });
});