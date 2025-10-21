import Homepage from '../pages/Homepage/Homepage'
import { Route, Routes } from 'react-router-dom'
import LogIn from '../pages/LogInPage/LogInPage';
import StudentHomepage from '../pages/Student/StudentHomepage/StudentHomepage';
import StudentSchedulePage from '../pages/Student/StudentSchedulePage/StudentSchedulePage';
import SSOLogin from '../pages/LogInPage/SSOlogInPage';
import {AdminLayout, StudentLayout, TutorLayout} from '../layouts/Layout';
import {ProtectedRoute, ProtectedLogInRoute, ProtectedBannedRoute} from './ProtectedRoute';
import StudentMySchedulePage from '../pages/Student/StudentMySchedulePage/StudentMySchedulePage';
import StudentLibraryPage from '../pages/Student/StudentLibraryPage/StudentLibraryPage';
import TutorHomePage from '../pages/Tutor/TutorHomePage/TutorHomePage';
import TutorSchedule from '../pages/Tutor/TutorSchedulePage/TutorSchedulePage';
import StudentViewTutorPage from '../pages/Student/StudentViewTutorPage/StudentViewTutorPage';
import TutorAppointmentsPage from '../pages/Tutor/TutorAppointmentsPage/TutorAppointmentsPage';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import BanPage from '../pages/BanPage';
import StudentAIpage from '../pages/Student/StudentAIpage/StudentAIpage';
function AppRoutes(){
  return(
    <>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route element={<ProtectedLogInRoute />}>
          <Route path='/login' element={<LogIn/>} />
          <Route path='/login/cas' element={<SSOLogin/>} />
        </Route>

        <Route element={<ProtectedRoute allowedRole='student' />}>
          <Route path='/student' element={<StudentLayout/>}>
            <Route index element={<StudentHomepage/>} />
            <Route path='schedule' element={<StudentSchedulePage/>} />
            <Route path='schedule/:id' element={<StudentViewTutorPage/>} />
            <Route path='ai' element={<StudentAIpage/>} />
            <Route path='myschedule' element={<StudentMySchedulePage/>}/>
            <Route path='library' element={<StudentLibraryPage/>}/>
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole='tutor' />}>
          <Route path='/tutor' element={<TutorLayout/>}>
            <Route index element={<TutorHomePage/>}/>
            <Route path='myschedule' element={<TutorSchedule/>} />
            <Route path='appointments' element={<TutorAppointmentsPage/>} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole='admin' />}>
          <Route path='admin' element={<AdminLayout/>}>
            <Route index element={<AdminDashboard/>} />
          </Route>
        </Route>
        <Route element={<ProtectedBannedRoute/>}>
          <Route path='/banned' element={<BanPage/>}/>
        </Route>
      </Routes>
    </>
  )
}
export default AppRoutes;