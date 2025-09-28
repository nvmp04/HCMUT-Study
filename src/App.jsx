import Homepage from './components/Homepage/Homepage'
import { Route, Routes } from 'react-router-dom'
import LogIn from './components/LogIn/LogIn';
import Header from './components/HeaderFooter/Header';
import Footer from './components/HeaderFooter/Footer';
import UserHomepage from './components/UserHomepage/UserHomepage';
function AppRoutes(){
  return(
    <>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/login' element={<LogIn/>} />
      </Routes>
    </>
  )
}
function App() {
  
  return (
    <>
      <Header/>
      {/*<AppRoutes/>*/}
      <UserHomepage/>
      <Footer/>
    </>
  )
}

export default App;
