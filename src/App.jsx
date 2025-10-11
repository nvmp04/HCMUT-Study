import Header from './components/HeaderFooterNav/Header';
import Footer from './components/HeaderFooterNav/Footer';
import AppRoutes from './routes/AppRoutes';
import { useAuth } from './hooks/useAuth';
// LoadingModal.jsx
import React from "react";
import { useLocation } from 'react-router-dom';
import  NotificationModal  from './components/Notification/NotificationModal';

export function LoadingModal() {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-lg font-medium">Đang tải dữ liệu...</p>
      </div>
    </div>
  );
}

function App() {
  const {auth, setAuth} = useAuth();
  const location = useLocation();
  const path = location.pathname;
  const token = auth.token;
  return (
    <>
      <NotificationModal/>
      <Header/>
      <AppRoutes/>
      {(!token || path === '/') && <Footer/>}
    </>
  )
}

export default App;
