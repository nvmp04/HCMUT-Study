import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({allowedRole}){
    const {auth} = useAuth();
    if(allowedRole !== auth.role){
        return <Navigate to="/login" replace />;
    }
    return <Outlet/>
}
export function ProtectedLogInRoute(){
    const {auth} = useAuth();
    if(auth.role){
        return <Navigate to={`/${auth.role}`}/>;
    }
    return <Outlet/>
}
export function ProtectedBannedRoute(){
    const {banned} = useAuth();
    if(!banned){
        return <Navigate to={`/${auth.role}`}/>;
    }
    return <Outlet/>
}