import { Outlet } from "react-router-dom";
import NavigationBar from "../components/HeaderFooterNav/NavigationBar";
import NotificationModal from "../components/Notification/NotificationModal";
import AIchatbot from "../components/AIchatbot";
import LightMeshGradient from "../components/LightMeshGradient";

export function Layout(){
    return (
        <>
            <NotificationModal/>
            <NavigationBar/>
            {/* Background Effect */}
            <LightMeshGradient/>
            {/*<AIchatbot/>*/}
            <main className="md:ml-20">
                <Outlet/>
            </main>
        </>
    )
}
export function AdminLayout(){
    return(
        <>
            <Outlet/>
        </>
    )
}