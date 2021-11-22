import {render} from "@testing-library/react";
import {Modal} from "./index";
import {screen} from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

describe('Modal', () => {
    it('shows modal when isOpen is true', () => {
        //given
        render(<Modal isOpen={true} closeFn={() => {}}/>)

        //then
        expect(screen.getByTestId("foreground")).toBeInTheDocument()
        expect(screen.getByTestId("background")).toBeInTheDocument()
    });

    it('shows nothing when isOpen is false', () => {
        //given
        render(<Modal isOpen={false} closeFn={() => {}}/>)

        //then
        expect(screen.queryByTestId("foreground")).toBeNull()
        expect(screen.queryByTestId("background")).toBeNull()
    });

    it('renders child content', () => {
        //given
        render(<Modal isOpen={true} closeFn={() => {}}>Some child content</Modal>)

        //then
        expect(screen.getByText("Some child content")).toBeInTheDocument()
    });

    it.each(["foreground","background"])
    ('calls close callback when clicking outside of the content container', (selector) => {
        //given
        const closeCallback = jest.fn();
        render(<Modal isOpen={true} closeFn={closeCallback}>Content</Modal>);

        //when
        userEvent.click(screen.getByTestId(selector));

        //then
        expect(closeCallback).toHaveBeenCalled();
    });

    it('calls the close callback when the close icon is clicked', () => {
        //given
        const closeCallback = jest.fn();
        render(<Modal isOpen={true} closeFn={closeCallback}><button>Click me!</button></Modal>);

        //when
        userEvent.click(screen.getByTitle("close-icon"))

        //then
        expect(closeCallback).toHaveBeenCalled()
    });


    it('does not call close callback when clicking within the content container', () => {
        //given
        const closeCallback = jest.fn();
        render(<Modal isOpen={true} closeFn={closeCallback}><button>Click me!</button></Modal>);

        //when
        userEvent.click(screen.getByText("Click me!"))

        //then
        expect(closeCallback).not.toHaveBeenCalled()
    });
});