import { useState, useRef } from "react";
import { LoginMethodModal } from "../../features/auth/components/LoginMethodModal";
import { LoginModal } from "../../features/auth/components/LoginModal";

function LoginPage() {
  const [loginMethod, setLoginMethod] = useState(null);
  return ( 
    <>
      {!loginMethod && 
        <LoginMethodModal 
        loginMethod = {loginMethod} 
        setLoginMethod = {setLoginMethod} />}
      {loginMethod && 
        <LoginModal 
        loginMethod = {loginMethod}
        setLoginMethod = {setLoginMethod}/>}
    </>
  );
}

export default LoginPage;
