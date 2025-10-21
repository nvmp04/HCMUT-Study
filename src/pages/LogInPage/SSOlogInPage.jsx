import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { LogIn } from '../../services/LogIn';
import { userNameRef, passwordRef, check } from '../../utils/checkUserNamePass';
import { useAuth } from '../../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function SSOLogin() {
  const { setAuth, setBanned } = useAuth();
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();
  async function handleLogin() {
    const inputUserName = userNameRef.current.value;
    const inputPassword = passwordRef.current.value;
    const hasError = check();
    if (!hasError) {
      const credentials = { username: inputUserName, password: inputPassword, role: 'user' };
      const res = await LogIn(credentials);
      if(res.banned){
        sessionStorage.setItem("banned", 'true');
        setBanned(true);
        navigate('/banned');
        return;
      }
      if (res.user) {
        sessionStorage.clear();
        const { token } = res;
        const { role } = res.user;
        const decoded = jwtDecode(token);
        const { id } = decoded;
        sessionStorage.setItem("id", id);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", role);
        setAuth({ token: token, role: role });
      } else {
        handleClear();
        setWarning(true);
      }
    }
  }

  const handleClear = () => {
    userNameRef.current.value = '';
    passwordRef.current.value = '';
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-[36rem] sm:p-6">
          
          {warning && (
            <div className="w-[92%] bg-[#fef3cd] border border-dotted border-[#856404] rounded-md p-4 mb-6 flex items-start gap-4 text-[#b91c1c]">
              <AlertTriangle />
              <p className="text-base m-0 leading-6">
                The credentials you provided cannot be determined to be authentic.
              </p>
            </div>
          )}

          <h1 className="text-3xl font-bold text-[#b91c1c] mb-8 sm:text-2xl">
            Enter your Username and Password
          </h1>

          <div className="flex flex-col mt-5 gap-6">
            <div className="flex flex-col">
              <label className="block text-gray-600 font-semibold mb-2 text-lg">
                Username
              </label>
              <input
                type="text"
                ref={userNameRef}
                placeholder="Enter username"
                className="w-[92%] py-3 px-4 bg-[#eff6ff] border border-gray-300 rounded text-base outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-600 font-semibold mb-2 text-lg">
                Password
              </label>
              <input
                type="password"
                ref={passwordRef}
                placeholder="Enter password"
                className="w-[92%] py-3 px-4 bg-[#eff6ff] border border-gray-300 rounded text-base outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex gap-4 pt-4 justify-start flex-wrap">
              <button
                type="button"
                onClick={() => handleLogin()}
                className="py-3 px-8 font-semibold rounded bg-blue-600 text-white text-base hover:bg-blue-700 transition-colors w-[92%] sm:w-[80%] md:w-auto"
              >
                Login
              </button>
              <button
                onClick={handleClear}
                className="py-3 px-8 font-semibold rounded bg-blue-600 text-white text-base hover:bg-blue-700 transition-colors w-[92%] sm:w-[80%] md:w-auto"
              >
                Clear
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
