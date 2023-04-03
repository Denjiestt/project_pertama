const isLogin = (to, from, next) => {
    const isAuthenticated = JSON.parse(localStorage.getItem("authenticated"));
    if(isAuthenticated){
        next()
    }else{
        next('/')
    }
}

export default isLogin