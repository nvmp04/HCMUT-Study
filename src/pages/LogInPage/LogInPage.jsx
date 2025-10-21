import { useState, useRef } from "react";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { LogIn as AdminLogin } from '../../services/LogIn';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../hooks/useAuth';

function LogIn() {
  const [showAdminInputs, setShowAdminInputs] = useState(false);
  const [warning, setWarning] = useState(false);
  const { setAuth } = useAuth();

  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async () => {
  const username = userNameRef.current.value;
  const password = passwordRef.current.value;


  if (!username || !password) {
    setWarning(true);
    return;
  }

  const credentials = { username, password, role: 'admin' };
  const res = await AdminLogin(credentials);

  if (res.user) {
    sessionStorage.clear();
    
    const { token } = res;
    const { role } = res.user;
    const decoded = jwtDecode(token);
    const { id } = decoded;

    sessionStorage.setItem("id", id);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role);

    setAuth({ token, role });
    setWarning(false);
  } else {
    handleClear();
    setWarning(true);
  }


  };

  const handleClear = () => {
    if (userNameRef.current) userNameRef.current.value = '';
    if (passwordRef.current) passwordRef.current.value = '';
  };

  return ( 
  <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#f1f3f5] flex flex-col items-center"> <div className="flex flex-col items-center bg-white mt-16 p-8 rounded-xl shadow-lg w-[480px] box-border"> <img src={logo} alt="Logo" className="w-[150px] mb-4" />
      <div className="flex flex-col gap-[3px] w-full pt-[30px] pb-[30px] border-t border-b border-[#e0dfdf]">
        <h2 className="text-xl text-[#0c4a6e]">Log in using your account on:</h2>
        <Link 
          to="cas" 
          className="flex justify-center w-full border border-[#e0dfdf] rounded-md py-[10px] px-[10px] box-border hover:cursor-pointer mt-2"
        >
          <img src={logo} alt="Logo" className="mt-[5px] mr-[2px] h-[20px] w-[20px]" />
          <span className="lp-option-text">Tài khoản HCMUT (HCMUT account)</span>
        </Link>
        <div
          onClick={() => setShowAdminInputs(!showAdminInputs)}
          className="flex justify-center w-full border border-[#e0dfdf] rounded-md py-[10px] px-[10px] box-border hover:cursor-pointer mt-2"
        >
          <span className="lp-option-text">Admin</span>
        </div>

        {showAdminInputs && (
          <div className="flex flex-col gap-3 mt-3">
            {warning && (
              <div className="flex items-start gap-2 bg-[#fff3cd] border border-dotted border-[#856404] text-[#b91c1c] rounded-md p-3">
                <AlertTriangle className="mt-[2px]" size={18} />
                <p className="text-sm leading-5">
                  The credentials you provided cannot be determined to be authentic.
                </p>
              </div>
            )}

            <input 
              type="text" 
              placeholder="Username" 
              ref={userNameRef}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]"
            />
            <input 
              type="password" 
              placeholder="Password" 
              ref={passwordRef}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]"
            />

            <div className="flex flex-col sm:flex-row justify-between gap-2 mt-2">
              <button
                onClick={handleLogin}
                className="bg-[#0c4a6e] text-white py-2 rounded-md hover:bg-[#083d5b] w-full sm:w-[48%]"
              >
                Log in as Admin
              </button>
              <button
                onClick={handleClear}
                className="bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 w-full sm:w-[48%]"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-8 mt-8 w-full">
        <div className="flex justify-center items-center text-gray-600 cursor-pointer text-[0.95rem]">
          <span>English (en)</span>
          <span className="ml-1">▼</span>
        </div>
        <button className="bg-[#0c4a6e] text-white border-none py-[0.8rem] px-[1.2rem] rounded-md text-base cursor-pointer">
          Cookies notice
        </button>
      </div>
    </div>
  </div>

  );
}

export default LogIn;
