import "jest-styled-components";
import { render } from "@testing-library/react";
import { NavBar } from "./index";
import { AuthService } from "../../services/AuthService";
import { HighScoreService } from "../../services/HighScoreService";
import { AuthContext, IAuthContext } from "../../contexts/AuthContext";
import {
  HighScoreContext,
  IHighScoreContext,
} from "../../contexts/HighScoreContext";

describe("NavBar", () => {
  const mockedAuthService = {
    isAuthenticated: jest.fn().mockReturnValue(true),
  } as any as AuthService;
  const mockedHighScoreService = {} as any as HighScoreService;
  const renderNavBar = () =>
    render(
      <AuthContext.Provider
        value={{ authService: mockedAuthService } as IAuthContext}
      >
        <HighScoreContext.Provider
          value={
            { highScoreService: mockedHighScoreService } as IHighScoreContext
          }
        >
          <NavBar />
        </HighScoreContext.Provider>
      </AuthContext.Provider>
    );

  it("renders correctly", () => {
    expect(renderNavBar().asFragment()).toMatchSnapshot();
  });
});
