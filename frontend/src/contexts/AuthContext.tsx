import {createContext} from "react";
import {AuthService} from "../services/AuthService";

export const AuthContext = createContext({authService: {} as AuthService});