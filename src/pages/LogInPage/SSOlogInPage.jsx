import  {useState } from 'react';
import '../../style/LogIn/ssoLogIn.css'
import { AlertTriangle } from 'lucide-react';
import { LogIn } from '../../services/LogIn'
import { userNameRef, passwordRef, check } from '../../utils/checkUserNamePass';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
export default function SSOLogin() {
  const {setAuth} = useAuth();
  const navigate = useNavigate();
  const [warning, setWarning] = useState(false);
  async function handleLogin() {
    const inputUserName = userNameRef.current.value;
    const inputPassword = passwordRef.current.value;
    const hasError = check();
    if (!hasError) {
      const credentials = { username: inputUserName, password: inputPassword};
      const res = await LogIn(credentials);
      if (res.user) {
        const {token} = res;
        const {role} = res.user;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", role);
        setAuth({token: token, role: role});
      }
      else{
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
      <div className="sso-container">
        <div className="sso-card">
          {warning && <div className='sso-warning'>
            <AlertTriangle />
            <p>The credentials you provided cannot be determined to be authentic.</p>
          </div>}
          <h1 className="sso-title">
            Enter your Username and Password
          </h1>
          <div className="sso-form">
            <div className="form-group">
              <label className="form-label">
                Username
              </label>
              <input
                type="text"
                ref={userNameRef}
                className="form-input"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Password
              </label>
              <input
                type="password"
                ref={passwordRef}
                className="form-input"
                placeholder="Enter password"
              />
            </div>
            <div className="button-group">
              <button
                type="button"
                onClick={()=>handleLogin()}
                className="btn btn-login"
              >
                Login
              </button>
              <button
                onClick={handleClear}
                className="btn btn-clear"
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