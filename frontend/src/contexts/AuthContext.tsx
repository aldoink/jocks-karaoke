import {createContext} from "react";
import {AuthService} from "../services/AuthService";

const authService = new AuthService();

export const AuthContext = createContext({authService})