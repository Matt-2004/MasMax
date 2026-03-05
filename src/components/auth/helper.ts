const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
// Declearing new variable because extenstion:prettier make this line seperate to new line
// The function does not work because of this

export const userRegex = /^[a-zA-Z0-9_]{3,20}$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
export const passwordRegex = reg;
