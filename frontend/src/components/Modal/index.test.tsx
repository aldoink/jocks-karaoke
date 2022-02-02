import {render} from "@testing-library/react";
import {Modal} from "./index";
import {screen} from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

describe('Modal', () => {

    const content = "Test1234";

    it('shows modal and renders content when isOpen is true', () => {
        //given
        render(
            <Modal isOpen={true} closeFn={jest.fn()}>
                <h1>{content}</h1>
            </Modal>
        )

        //then
        expect(screen.getByText(content)).toBeInTheDocument()
    });

    it('shows nothing when isOpen is false', () => {
        //given
        render(
            <Modal isOpen={false} closeFn={jest.fn()}>
                <h1>{content}</h1>
            </Modal>
        )

        //then
        expect(screen.queryByText(content)).not.toBeInTheDocument();
    });

    it('calls close callback when clicking outside of the content container', () => {
        //given
        const closeCallback = jest.fn();
        render(<Modal isOpen={true} closeFn={closeCallback}>Content</Modal>);

        //when
        userEvent.click(screen.getByTestId('background'));

        //then
        expect(closeCallback).toHaveBeenCalled();
    });

    it('calls the close callback when the close icon is clicked', () => {
        //given
        const closeCallback = jest.fn();
        render(
            <Modal isOpen={true} closeFn={closeCallback}>
                {content}
            </Modal>
        );

        //when
        userEvent.click(screen.getByTitle("close-icon"))

        //then
        expect(closeCallback).toHaveBeenCalled()
    });


    it('does not call close callback when clicking within the content container', () => {
        //given
        const closeCallback = jest.fn();
        render(<Modal isOpen={true} closeFn={closeCallback}>
            <h1>{content}</h1>
            <button>Click me!</button>
        </Modal>);

        //when
        userEvent.click(screen.getByText("Click me!"));
        userEvent.click(screen.getByText(content));

        //then
        expect(closeCallback).not.toHaveBeenCalled()
    });
});