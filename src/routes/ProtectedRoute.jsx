import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({allowedRole, auth}){
    if(allowedRole !== auth.role){
        return <Navigate to="/login" replace />;
    }
    return <Outlet/>
}
export function ProtectedLogInRoute({auth}){
    if(auth.role){
        return <Navigate to={`/${auth.role}`}/>;
    }
    return <Outlet/>
}