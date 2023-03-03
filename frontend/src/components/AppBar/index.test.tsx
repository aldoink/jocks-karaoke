import "jest-styled-components";
import { render } from "@testing-library/react";
import { NavBar } from "./index";
import { ServiceContext } from "../../contexts/ServiceContext";
import { AuthService } from "../../services/AuthService";
import { HighScoreService } from "../../services/HighScoreService";

describe("NavBar", () => {
  const authService = {
    isAuthenticated: jest.fn().mockReturnValue(true),
  } as any as AuthService;
  const highScoreService = {} as any as HighScoreService;
  const renderNavBar = () =>
    render(
      <ServiceContext.Provider value={{ authService, highScoreService }}>
        <NavBar />
      </ServiceContext.Provider>
    );

  it("renders correctly", () => {
    expect(renderNavBar().asFragment()).toMatchSnapshot();
  });
});
