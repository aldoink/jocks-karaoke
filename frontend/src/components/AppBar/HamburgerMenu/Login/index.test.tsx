import { Login } from "./index";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginStatus, useLogin } from "./hooks/useLogin";

jest.mock("./hooks/useLogin");

describe("Login", () => {
  beforeEach(() => {
    (useLogin as any).mockReturnValue({
      status: LoginStatus.READY,
      login: jest.fn(),
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    jest.useRealTimers();
  });

  it("opens the login pop-up when the button is clicked", () => {
    //given
    render(<Login />);

    //then (1)
    expect(screen.queryByTestId("login-modal")).not.toBeInTheDocument();

    //when (1)
    userEvent.click(screen.getByText("Login"));

    //then (2)
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
  });

  it("shows a success icon when login is successful", async () => {
    //given
    (useLogin as any).mockReturnValue({ status: LoginStatus.SUCCESS });
    render(<Login />);

    //when
    userEvent.click(screen.getByText("Login"));

    //then
    expect(screen.getByTestId("success-checkmark")).toBeInTheDocument();
  });

  it("shows an error message when login is unsuccessful", async () => {
    (useLogin as any).mockReturnValue({ status: LoginStatus.FAILURE });
    render(<Login />);
    userEvent.click(screen.getByText("Login"));

    //then
    expect(
      screen.getByText("Username or password is incorrect")
    ).toBeInTheDocument();
  });

  it("closes the login modal 1.5 seconds after rendering", async () => {
    //given
    (useLogin as any).mockReturnValueOnce({ status: LoginStatus.READY });
    (useLogin as any).mockReturnValueOnce({ status: LoginStatus.SUCCESS });
    render(<Login />);

    //when
    userEvent.click(screen.getByText("Login"));

    //then (1)
    expect(screen.getByTestId("email-input")).toBeInTheDocument();

    //when
    act(() => {
      jest.advanceTimersByTime(1500);
    });

    //then (2)
    await waitFor(() =>
      expect(screen.queryByTestId("email-input")).not.toBeInTheDocument()
    );
  });
});
