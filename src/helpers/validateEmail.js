const validateEmail = (email)  => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email); 
}

export default validateEmail;
