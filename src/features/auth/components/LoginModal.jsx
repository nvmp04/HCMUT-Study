import { useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { AlertTriangle } from "lucide-react";
import { checkPassword, checkUsername } from "../utils/checkCredentialInput";
export function LoginModal({loginMethod, setLoginMethod}){
    const [warning, setWarning] = useState(false);
    const {login} = useAuth();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    async function handleLogin() {
        const inputUserName = usernameRef.current.value;
        const inputPassword = passwordRef.current.value;
        const usernameError = checkUsername(inputUserName);
        const passwordError = checkPassword(inputPassword);
        if(usernameError) usernameRef.current.placeholder = 'Username has not been entered';
        if(passwordError) passwordRef.current.placeholder = 'Password has not been entered';
        if (!usernameError && !passwordError) {
            const credentials = { 
                username: inputUserName, 
                password: inputPassword, 
                role: loginMethod 
            };
            const res = await login(credentials);
            if (res.error){
                handleClear();
                setWarning(true);
                return;
            }
        }
    }
    const handleClear = () => {
        usernameRef.current.value = '';
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
                {loginMethod === 'user' ? "Enter your Username and Password" : "Login as Administrator"}
            </h1>

            <div className="flex flex-col mt-5 gap-6">
                <div className="flex flex-col">
                <label className="block text-gray-600 font-semibold mb-2 text-lg">
                    Username
                </label>
                <input
                    type="text"
                    ref={usernameRef}
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
                    className="login-modal-button login-button"
                >
                    Login
                </button>
                <button
                    onClick={handleClear}
                    className="login-modal-button clear-button"
                >
                    Clear
                </button>
                <button
                    className="login-modal-button cancel-button"
                    onClick={()=>setLoginMethod(null)}
                >Cancel</button>
                </div>

            </div>
            </div>
        </div>
        </>
    )
}