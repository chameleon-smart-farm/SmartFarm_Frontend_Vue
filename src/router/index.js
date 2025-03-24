import { createRouter , createWebHistory } from "vue-router";

import MainPage from "@/pages/MainPage.vue";

import LoginPage from "@/pages/Login/LoginPage.vue";
import FindPwdPage from "@/pages/Login/FindPwdPage.vue";
import SelectHousePage from "@/pages/Login/SelectHousePage.vue";

const router = createRouter({
    history : createWebHistory(),
    routes : [

        {
            path : "/main",
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
            path : "/",
            name : "SelectHousePage",
            component : SelectHousePage
        }
    ]
})

export default router;