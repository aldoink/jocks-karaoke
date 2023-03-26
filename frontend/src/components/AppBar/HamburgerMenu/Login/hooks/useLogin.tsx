import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext";

export enum LoginStatus {
  LOADING,
  SUCCESS,
  FAILURE,
  READY,
}

export function useLogin(email: string, password: string) {
  const [status, setStatus] = useState(LoginStatus.READY);
  const { authService, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    setStatus(LoginStatus.READY);
  }, [email, password]);

  const login = async () => {
    setStatus(LoginStatus.LOADING);
    try {
      await authService.login(email, password);
      setStatus(LoginStatus.SUCCESS);
      setIsAuthenticated(true);
    } catch (error) {
      setStatus(LoginStatus.FAILURE);
    }
  };

  return { status, login };
}
