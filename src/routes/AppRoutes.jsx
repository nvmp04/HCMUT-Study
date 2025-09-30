import Homepage from '../components/Homepage/Homepage'
import { Route, Routes } from 'react-router-dom'
import LogIn from '../components/LogInPage/LogInPage';
import StudentHomepage from '../components/Student/StudentHomepage/StudentHomepage';
import StudentSchedulePage from '../components/Student/StudentSchedulePage/StudentSchedulePage';
import TutorProfile from '../components/Student/TutorReviewPage/TutorReviewPage';
import SSOLogin from '../components/LogInPage/SSOlogInPage';
import StudentLayout from '../layouts/StudentLayout';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';
function AppRoutes(){
  const {auth} = useAuth();
  return(
    <>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/login' element={<LogIn/>} />
        <Route path='/login/cas' element={<SSOLogin/>} />
        <Route element={<ProtectedRoute allowedRole='student' auth={auth}/>}>
            <Route path='/student' element={<StudentLayout/>}>
            <Route index element={<StudentHomepage/>} />
            <Route path='schedule' element={<StudentSchedulePage/>} />
            <Route path='schedule/:id' element={<TutorProfile/>} />
            </Route>
        </Route>
      </Routes>
    </>
  )
}
export default AppRoutes;