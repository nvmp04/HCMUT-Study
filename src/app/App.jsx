import Header from '../components/HeaderFooterNav/Header';
import Footer from '../components/HeaderFooterNav/Footer';
import AppRoutes from '../routes/AppRoutes';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useLocation } from 'react-router-dom';


function App() {
  const {auth, setAuth} = useAuth();
  const location = useLocation();
  const path = location.pathname;
  const token = auth.token;
  return (
    <>
      {path!=='/login' && <Header/>}
      <AppRoutes/>
      {(!token || path === '/') && <Footer/>}
    </>
  )
}

export default App;
