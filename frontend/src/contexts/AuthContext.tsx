import { AuthService } from "../services/AuthService";
import { createContext } from "react";

export const authService = new AuthService();
export interface IAuthContext {
  authService: AuthService;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({
  authService,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});
