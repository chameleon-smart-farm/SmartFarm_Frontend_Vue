import { createRouter , createWebHistory } from "vue-router";

import MainPage from "@/pages/MainPage.vue";

import LoginPage from "@/pages/Login/LoginPage.vue";
import FindPwdPage from "@/pages/Login/FindPwdPage.vue";
import SelectHousePage from "@/pages/Login/SelectHousePage.vue";
import MyPage from "@/pages/User/MyPage.vue";
import HouseStatusPage from "@/pages/House/HouseStatusPage.vue";
import SignUpPage from "@/pages/Login/SignUpPage.vue";
import PreSignUpPage from "@/pages/Login/PreSignUpPage.vue";

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
        },
        {
            path : "/my-page",
            name : "MyPage",
            component : MyPage
        },
        {
            path : "/house-status",
            name : "HouseStatusPage",
            component : HouseStatusPage
        },
        {
            path : "/sign-up/:house_id",
            name : "SignUpPage",
            component : SignUpPage
        },
        {
            path : "/pre-sign-up",
            name : "PreSignUpPage",
            component : PreSignUpPage
        }
    ]
})

export default router;