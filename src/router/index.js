import { createRouter , createWebHistory } from "vue-router";

import MainPage from "@/pages/MainPage.vue";

import LoginPage from "@/pages/Login/LoginPage.vue";
import FindPwdPage from "@/pages/Login/FindPwdPage.vue";
import SignUpPage from "@/pages/Login/SignUpPage.vue";

const router = createRouter({
    history : createWebHistory(),
    routes : [

        {
            path : "/",
            name : "Main",
            component : MainPage
        },
        {
            path : "/login",
            name : "Login",
            component : LoginPage
        },
        {
            path : "/find-pwd",
            name : "FindPwdPage",
            component : FindPwdPage
        },
        {
            path : "/sign-up",
            name : "SignUpPage",
            component : SignUpPage
        }
    ]
})

export default router;