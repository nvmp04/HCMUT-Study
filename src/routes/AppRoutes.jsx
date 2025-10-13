import Homepage from '../pages/Homepage/Homepage'
import { Route, Routes } from 'react-router-dom'
import LogIn from '../pages/LogInPage/LogInPage';
import StudentHomepage from '../pages/Student/StudentHomepage/StudentHomepage';
import StudentSchedulePage from '../pages/Student/StudentSchedulePage/StudentSchedulePage';
import SSOLogin from '../pages/LogInPage/SSOlogInPage';
import {StudentLayout, TutorLayout} from '../layouts/Layout';
import { useAuth } from '../hooks/useAuth';
import {ProtectedRoute, ProtectedLogInRoute} from './ProtectedRoute';
import StudentMySchedulePage from '../pages/Student/StudentMySchedulePage/StudentMySchedulePage';
import StudentPairingPage from '../pages/Student/StudentPairingPage/StudentPairingPage';
import StudentProgressPage from '../pages/Student/StudentProgressPage/StudentProgressPage';
import StudentLibraryPage from '../pages/Student/StudentLibraryPage/StudentLibraryPage';
import TutorHomePage from '../pages/Tutor/TutorHomePage/TutorHomePage';
import TutorSchedule from '../pages/Tutor/TutorSchedulePage/TutorSchedulePage';
import StudentViewTutorPage from '../pages/Student/StudentViewTutorPage/StudentViewTutorPage';
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
            <Route path='schedule/:id' element={<StudentViewTutorPage/>} />
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