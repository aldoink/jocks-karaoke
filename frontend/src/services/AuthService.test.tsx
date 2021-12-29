import {AuthService} from "./AuthService";
import axios from "axios";
import {waitFor} from "@testing-library/dom";

jest.mock("axios")

describe('AuthService', () => {

    it('login - calls login using the provided email and password', async () => {
        //given
        const email = "test@importr.com";
        const password = "insecurepassword";
        const expectedUrl = `${process.env.REACT_APP_BACKEND_URL}/auth/login`
        const response = {
            data: {
                token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImlhdCI6MTYzNzg0NDc4MCwiZXhwIjoxNjM3OTMxMTgwfQ.dCEG5zkuXZZ-nty2Mu-rfe8CEBD3FskLsbA6uhA8n4o",
                id: 1,
                username: "testuser",
                email: "testuser@email.com",
                roles: [
                    "ROLE_ADMIN",
                    "ROLE_USER"
                ],
                type: "Bearer"
            }
        }
        axios.post = jest.fn().mockResolvedValue(response);
        jest.spyOn(window.localStorage.__proto__, 'setItem');

        const service = new AuthService();

        //when
        await service.login(email, password);

        //then
        expect(axios.post).toHaveBeenCalledWith(expectedUrl, {email, password});

        await waitFor(() => expect(localStorage.setItem).toHaveBeenCalledWith("token", response.data.token));
    });
});