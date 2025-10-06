import Homepage from '../components/Homepage/Homepage'
import { Route, Routes } from 'react-router-dom'
import LogIn from '../components/LogInPage/LogInPage';
import StudentHomepage from '../components/Student/StudentHomepage/StudentHomepage';
import StudentSchedulePage from '../components/Student/StudentSchedulePage/StudentSchedulePage';
import TutorProfile from '../components/Student/TutorReviewPage/TutorReviewPage';
import SSOLogin from '../components/LogInPage/SSOlogInPage';
import {StudentLayout, TutorLayout} from '../layouts/Layout';
import { useAuth } from '../hooks/useAuth';
import {ProtectedRoute, ProtectedLogInRoute} from './ProtectedRoute';
import StudentMySchedulePage from '../components/Student/StudentMySchedulePage/StudentMySchedulePage';
import StudentPairingPage from '../components/Student/StudentPairingPage/StudentPairingPage';
import StudentProgressPage from '../components/Student/StudentProgressPage/StudentProgressPage';
import StudentLibraryPage from '../components/Student/StudentLibraryPage/StudentLibraryPage';
import TutorHomePage from '../components/Tutor/TutorHomePage/TutorHomePage';
import TutorSchedule from '../components/Tutor/TutorSchedulePage/TutorSchedulePage';
function AppRoutes(){
  const {auth} = useAuth();
  return(
    <>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route element={<ProtectedLogInRoute auth={auth}/>}>
          <Route path='/login' element={<LogIn/>} />
          <Route path='/login/cas' element={<SSOLogin/>} />
        </Route>

        <Route element={<ProtectedRoute allowedRole='student' auth={auth}/>}>
          <Route path='/student' element={<StudentLayout/>}>
            <Route index element={<StudentHomepage/>} />
            <Route path='schedule' element={<StudentSchedulePage/>} />
            <Route path='schedule/:id' element={<TutorProfile/>} />
            <Route path='myschedule' element={<StudentMySchedulePage/>}/>
            <Route path='pairing' element={<StudentPairingPage/>}/>
            <Route path='progress' element={<StudentProgressPage/>}/>
            <Route path='library' element={<StudentLibraryPage/>}/>
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole='tutor' auth={auth}/>}>
          <Route path='/tutor' element={<TutorLayout/>}>
            <Route index element={<TutorHomePage/>}/>
            <Route path='myschedule' element={<TutorSchedule/>} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}
export default AppRoutes;