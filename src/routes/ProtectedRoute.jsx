import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({allowedRole, auth}){
    if(allowedRole !== auth.role){
        return <Navigate to="/login" replace />;
    }
    return <Outlet/>
}
export default ProtectedRoute;