import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useQueryClient } from "@tanstack/react-query";
import { loginAPI } from "../services/auth.service";
import { jwtDecode } from "jwt-decode";
export function useAuth(){
    const queryClient = useQueryClient();
    const {auth, setAuth, banned, setBanned} = useContext(AuthContext);
    const login = async (credentials) => {
        const response = await loginAPI(credentials);
        if(response.banned) {
            sessionStorage.setItem('banned', true);
            setBanned(true);
            return;
        }
        
        if(response.error) return {error: response.error}
        setAuth({
            token: response.token, 
            role: response.user.currentRole
        });
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('role', response.user.currentRole);
        const decoded = jwtDecode(response.token);
        const { sub } = decoded;
        sessionStorage.setItem('id', sub);
        return response.user;
    }
    const logout = () => {
        queryClient.clear();
        sessionStorage.clear();
        window.location.href = '/';
        setAuth({ token: null, role: null });
    }
    return {
        auth, setAuth, banned, setBanned, login, logout
    }
}