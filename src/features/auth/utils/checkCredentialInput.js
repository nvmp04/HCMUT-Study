export function checkPassword(password){
    if (password.trim() === '') {
        return true;
    }
    return false;
}