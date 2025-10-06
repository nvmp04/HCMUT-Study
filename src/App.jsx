import Header from './components/HeaderFooter/Header';
import Footer from './components/HeaderFooter/Footer';
import AppRoutes from './routes/AppRoutes';
import { useAuth } from './hooks/useAuth';
// LoadingModal.jsx
import React from "react";

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
  
  const token = auth.token;

  return (
    <>
      <Header/>
      <AppRoutes/>
      {!token && <Footer/>}
    </>
  )
}

export default App;
