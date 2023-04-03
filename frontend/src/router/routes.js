const Login = () => import("../views/Login.vue");
const Register =() => import("../views/Registrasi.vue")
const Dashboard = () => import("../views/Dashboard.vue")
const Container = () => import("../components/Container.vue")
const Home = () => import("../views/Home.vue")

import isLogin from "../store/auth.js"

const routes = [
    {
        path:"/",
        component:Login
    },
    {
        path:"/registrasi",
        component:Register
    },
    {
        path:"/dashboard",
        name: "Dashboard",
        component:Dashboard,
        beforeEnter:isLogin,
    },
    {
        path:"/home",
        name:"Home",
        component:Home
    }
]
export default routes;