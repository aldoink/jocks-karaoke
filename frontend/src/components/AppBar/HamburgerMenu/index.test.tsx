import { render, screen } from "@testing-library/react";
import { HamburgerMenu } from "./index";
import userEvent from "@testing-library/user-event";
import {
  IServiceContext,
  ServiceContext,
} from "../../../contexts/ServiceContext";
import { AuthService } from "../../../services/AuthService";

describe("HamburgerMenu", () => {
  const mockedAuthService = {} as AuthService;
  const renderHamburgerMenu = () =>
    render(
      <ServiceContext.Provider
        value={
          {
            authService: mockedAuthService,
          } as IServiceContext
        }
      >
        <HamburgerMenu />{" "}
      </ServiceContext.Provider>
    );

  beforeEach(() => {
    mockedAuthService.isAuthenticated = jest.fn().mockReturnValue(false);
  });

  it("clicking the hamburger icon opens and closes the menu", () => {
    //given
    renderHamburgerMenu();
    expect(screen.getByTestId("menu-drawer")).not.toBeVisible();

    //when (1)
    userEvent.click(screen.getByTestId("hamburger-button"));

    //then (1)
    expect(screen.getByTestId("menu-drawer")).toBeVisible();

    //when (2)
    userEvent.click(screen.getByTestId("hamburger-button"));

    //then (2)
    expect(screen.getByTestId("menu-drawer")).not.toBeVisible();
  });

  it("changes hamburger button to active state when clicked", () => {
    //given
    renderHamburgerMenu();

    //then (1)
    expect(screen.getByTestId("hamburger-button")).not.toHaveClass("is-active");
    expect(screen.getByTestId("hamburger-container")).not.toHaveClass(
      "is-active"
    );

    //when (1)
    userEvent.click(screen.getByTestId("hamburger-button"));

    //then (2)
    expect(screen.getByTestId("hamburger-button")).toHaveClass("is-active");
    expect(screen.getByTestId("hamburger-container")).toHaveClass("is-active");
  });

  it("shows login menu option when user is unauthenticated", () => {
    //given
    mockedAuthService.isAuthenticated = jest.fn().mockReturnValue(false);

    renderHamburgerMenu();

    //when
    screen.getByTestId("hamburger-button").click();

    //then
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  it("shows logout menu option when user is authenticated", () => {
    //given
    mockedAuthService.isAuthenticated = jest.fn().mockReturnValue(true);

    renderHamburgerMenu();

    //when
    screen.getByTestId("hamburger-button").click();

    //then
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });

  it("calls the authservice logout function and closes the menu when logout is clicked", () => {
    //given
    mockedAuthService.isAuthenticated = jest.fn().mockReturnValue(true);
    mockedAuthService.logout = jest.fn();
    renderHamburgerMenu();

    //when
    screen.getByText("Logout").click();

    //then
    expect(mockedAuthService.logout).toHaveBeenCalled();
    expect(screen.getByTestId("hamburger-container")).not.toHaveClass(
      "is-active"
    );
  });
});
