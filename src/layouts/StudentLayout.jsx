import { Outlet } from "react-router-dom";
import StudentHeader from "../components/Student/StudentHeader";

function StudentLayout(){
    return (
        <>
            <StudentHeader/>
            <Outlet/>
        </>
    )
}
export default StudentLayout;