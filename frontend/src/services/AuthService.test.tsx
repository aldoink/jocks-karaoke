import { AuthService, JWT_TOKEN_KEY } from "./AuthService";
import axios from "axios";
import { waitFor } from "@testing-library/react";

jest.mock("axios");

describe("AuthService", () => {
  // Token expires 26.11.2021
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImlhdCI6MTYzNzg0NDc4MCwiZXhwIjoxNjM3OTMxMTgwfQ.dCEG5zkuXZZ-nty2Mu-rfe8CEBD3FskLsbA6uhA8n4o";
  const authService = new AuthService();

  it("login - calls login using the provided email and password", async () => {
    //given
    const email = "test@importr.com";
    const password = "insecurepassword";
    const expectedUrl = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
    const response = {
      data: {
        token,
        id: 1,
        username: "testuser",
        email: "testuser@email.com",
        roles: ["ROLE_ADMIN", "ROLE_USER"],
        type: "Bearer",
      },
    };
    axios.post = jest.fn().mockResolvedValue(response);
    jest.spyOn(window.localStorage.__proto__, "setItem");

    //when
    await authService.login(email, password);

    //then
    expect(axios.post).toHaveBeenCalledWith(expectedUrl, { email, password });

    await waitFor(() =>
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "jocks-karaoke-token",
        response.data.token
      )
    );
  });

  describe("isAuthenticated", () => {
    it("returns true when a valid token exists", () => {
      // given
      jest.useFakeTimers("modern").setSystemTime(new Date(2021, 10, 26));
      window.localStorage.__proto__.getItem = jest.fn().mockReturnValue(token);

      // when
      const result = authService.isAuthenticated();

      // then
      expect(result).toBe(true);
    });

    it("returns false when no token exists", () => {
      // given
      jest.useFakeTimers("modern").setSystemTime(new Date(2021, 10, 26));
      window.localStorage.__proto__.getItem = jest
        .fn()
        .mockReturnValue(undefined);

      // when
      const result = authService.isAuthenticated();

      // then
      expect(result).toBe(false);
    });

    it("returns false when token has expired", () => {
      // given
      jest.useFakeTimers("modern").setSystemTime(new Date(2021, 10, 27));
      window.localStorage.__proto__.getItem = jest.fn().mockReturnValue(token);

      // when
      const result = authService.isAuthenticated();

      // then
      expect(result).toBe(false);
    });
  });

  describe("logout", () => {
    it("removes the token from local storage", () => {
      //given
      jest.spyOn(window.localStorage.__proto__, "removeItem");

      //when
      authService.logout();

      //then
      expect(localStorage.removeItem).toHaveBeenCalledWith(JWT_TOKEN_KEY);
    });
  });
});
