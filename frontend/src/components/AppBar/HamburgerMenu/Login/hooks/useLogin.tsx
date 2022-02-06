import {useContext, useEffect, useState} from "react";
import {ServiceContext} from "contexts/ServiceContext";

export enum LoginStatus {
    LOADING,
    SUCCESS,
    FAILURE,
    READY
}

export function useLogin(email: string, password: string) {
    const [status, setStatus] = useState(LoginStatus.READY);
    const {authService} = useContext(ServiceContext);

    useEffect(() => {
        setStatus(LoginStatus.READY);
    }, [email, password])

    const login = async () => {
        setStatus(LoginStatus.LOADING)
        try {
            await authService.login(email, password);
            setStatus(LoginStatus.SUCCESS);
        } catch (error) {
            setStatus(LoginStatus.FAILURE);
        }
    }

    return {status, login};
}