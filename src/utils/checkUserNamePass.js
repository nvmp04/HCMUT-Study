import { createRef } from "react";

export const userNameRef = createRef(null);
export const passwordRef = createRef(null);
export function check(){
    let hasError = false;
    const inputUserName = userNameRef.current.value;
    if (inputUserName.trim() === '') {
        userNameRef.current.placeholder = 'Username has not been entered';
        hasError = true;
    }
    const inputPassword = passwordRef.current.value;
    if (inputPassword.trim() === '') {
        hasError = true;
        passwordRef.current.placeholder = 'Password has not been entered';
    }
    return hasError;
}