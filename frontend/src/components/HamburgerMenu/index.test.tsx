import {render, screen} from "@testing-library/react";
import {HamburgerMenu} from "./index";
import userEvent from "@testing-library/user-event";
import exp from "constants";
import {waitFor} from "@testing-library/dom";

describe('HamburgerMenu', () => {
    it('opens menu when the hamburger button is clicked', () => {
        //given
        render(<HamburgerMenu />)

        //then (1)
        expect(screen.getByTestId("menu-drawer")).not.toBeVisible();

        //when (1)
        userEvent.click(screen.getByTestId("hamburger-button"));

        //then (2)
        expect(screen.getByTestId("menu-drawer")).toBeVisible();
    });

    it('changes hamburger button to active state when clicked', () => {
        //given
        render(<HamburgerMenu />)

        //then (1)
        expect(screen.getByTestId("hamburger-button")).not.toHaveClass("is-active")
        expect(screen.getByTestId("hamburger-container")).not.toHaveClass("is-active")

        //when (1)
        userEvent.click(screen.getByTestId("hamburger-button"));

        //then (2)
        expect(screen.getByTestId("hamburger-button")).toHaveClass("is-active")
        expect(screen.getByTestId("hamburger-container")).toHaveClass("is-active")
    });
});