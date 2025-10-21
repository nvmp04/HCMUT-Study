import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
const AuthContext = createContext();
export function AuthProvider({children}){
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [auth, setAuth] = useState({token: sessionStorage.getItem("token"), role: sessionStorage.getItem("role")});
    const [banned, setBanned] = useState(sessionStorage.getItem("banned")==='true');
    const logout = () => {
        queryClient.clear();
        sessionStorage.clear();
        setAuth({ token: null, role: null });
        navigate('/login');
    };
    useEffect(()=>{
        if(auth.token){
            const decoded = jwtDecode(auth.token);
            const timeLeft = decoded.exp * 1000 - Date.now();
            if (timeLeft <= 0) {
                logout();
            } else {
                const timer = setTimeout(logout, timeLeft);
                return () => clearTimeout(timer); 
            }
        }
    },[auth.token]);
    return (
        <AuthContext.Provider value={{auth, setAuth, banned, setBanned}}>
            {children}
        </AuthContext.Provider>
    ) 
}
export function useAuth(){
    return useContext(AuthContext);
}