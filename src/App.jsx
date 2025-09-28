import Homepage from './components/Homepage/Homepage'
import { Route, Routes } from 'react-router-dom'
import LogIn from './components/LogIn/LogIn';
import Header from './components/HeaderFooter/Header';
import Footer from './components/HeaderFooter/Footer';
import UserHomepage from './components/User/UserHomepage/UserHomepage';
import UserSchedulePage from './components/User/UserSchedulePage/UserSchedulePage';
function AppRoutes(){
  return(
    <>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/login' element={<LogIn/>} />
        <Route path='/user/home' element={<UserHomepage/>}/>
        <Route path='/user/schedule' element={<UserSchedulePage/>} />
      </Routes>
    </>
  )
}
function App() {
  
  return (
    <>
      <Header/>
      <AppRoutes/>
      <Footer/>
    </>
  )
}

export default App;
