import { useEffect } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { getTokenExpiry } from "../../features/auth/utils/getTokenExpiry";
import { useNavigate } from "react-router-dom";

export function AuthInitializer({children}){
    const {auth, logout, banned} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!auth.token) return;
        const timeLeft = getTokenExpiry(auth.token);
        if(timeLeft <= 0) {
            logout();
            navigate('/login');
            return;
        }
        const timer = setTimeout(logout, timeLeft);
        return ()=> clearTimeout(timer);
    }, [auth.token]);//auto logout
    useEffect(()=>{
        if(!banned) return;
        navigate('/banned', {replace: true});
    }, [banned])
    return children;
}