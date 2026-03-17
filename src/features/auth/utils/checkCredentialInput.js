export function checkUsername(username){
    if (username.trim() === '') {
        return true;
    }
    return false;
}
export function checkPassword(password){
    if (password.trim() === '') {
        return true;
    }
    return false;
}