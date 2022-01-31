import {LoginStatus, useLogin} from "./useLogin";
import {AuthContext} from "../../../../contexts/AuthContext";
import {AuthService} from "../../../../services/AuthService";
import {act, renderHook} from "@testing-library/react-hooks";
import React from "react";

describe('useLogin', () => {

    const mockedAuthService = {} as AuthService;

    const renderUseLogin = (email: string, password: string) => {
        const contextWrapper = (props: any) =>
            <AuthContext.Provider value={{authService: mockedAuthService}}>
                {props.children}
            </AuthContext.Provider>

        return renderHook(({email, password}) => useLogin(email, password),
            {
                wrapper: contextWrapper,
                initialProps: {email, password}
            }
        )
    }

    beforeEach(() => {
        mockedAuthService.login = jest.fn().mockResolvedValue(undefined);
    });

    describe('login', () => {
        it('calls the auth service with the email and password provided', async () => {
            //given
            const {result} = renderUseLogin('test@user.com', 'weakpassword');

            //when
            await act(() => result.current.login());

            //then
            expect(mockedAuthService.login).toHaveBeenCalledWith('test@user.com', 'weakpassword');
        });

        it('sets SUCCESS status on success', async () => {
            //given
            const {result} = renderUseLogin('test@user.com', 'weakpassword');

            //when
            await act(() => result.current.login());

            //then
            expect(result.current.status).toBe(LoginStatus.SUCCESS);
        });

        it('sets FAILURE status on failure', async () => {
            //given
            mockedAuthService.login = jest.fn().mockRejectedValue({status: 401});
            const {result} = renderUseLogin('test@user.com', 'weakpassword');

            //when
            await act(() => result.current.login());

            //then
            expect(result.current.status).toBe(LoginStatus.FAILURE);
        });

        it('sets LOADING status while waiting on a response from auth service', (done) => {
            //given
            const {result} = renderUseLogin('test@user.com', 'weakpassword');

            //when
            act(() => result.current.login()).then(() => {
                expect(result.current.status).toBe(LoginStatus.SUCCESS);
                done();
            });

            //then
            expect(result.current.status).toBe(LoginStatus.LOADING);
        });

        it('sets status to READY when email is changed', async () => {
            //given
            const {result, rerender} = renderUseLogin('test@user.com', 'weakpassword');

            //when
            await act(() => result.current.login());

            //then
            expect(result.current.status).toBe(LoginStatus.SUCCESS);

            //when (2)
            rerender({email: "other@user.com", password: 'weakpassword'});

            //then (2)
            expect(result.current.status).toBe(LoginStatus.READY);
        });

        it('sets status to READY when password is changed', async () => {
            //given
            const {result, rerender} = renderUseLogin('test@user.com', 'weakpassword');

            //when
            await act(() => result.current.login());

            //then
            expect(result.current.status).toBe(LoginStatus.SUCCESS);

            //when (2)
            rerender({email: "test@user.com", password: 'Str0ngP4sSword!'});

            //then (2)
            expect(result.current.status).toBe(LoginStatus.READY);
        })
    });
});