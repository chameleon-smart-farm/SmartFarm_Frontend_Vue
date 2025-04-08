import { createRouter , createWebHistory } from "vue-router";

import MainPage from "@/pages/MainPage.vue";

import LoginPage from "@/pages/Login/LoginPage.vue";
import FindPwdPage from "@/pages/Login/FindPwdPage.vue";
import SelectHousePage from "@/pages/Login/SelectHousePage.vue";
import MyPage from "@/pages/User/MyPage.vue";
import HouseStatusPage from "@/pages/House/HouseStatusPage.vue";
import SignUpPage from "@/pages/Login/SignUpPage.vue";
import PreSignUpPage from "@/pages/Login/PreSignUpPage.vue";
import ListReservationPage from "@/pages/Reservation/ListReservationPage.vue";
import AddReservationPage from "@/pages/Reservation/AddReservationPage.vue";
import HouseMachinePage from "@/pages/House/HouseMachinePage.vue";

const router = createRouter({
    history : createWebHistory(),
    routes : [

        {
            path : "/main",
            name : "Main",
            component : MainPage
        },
        {
            path : "/",
            name : "Login",
            component : LoginPage
        },
        {
            path : "/find-pwd",
            name : "FindPwdPage",
            component : FindPwdPage
        },
        {
            path : "/select-house",
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
            path : "/house-machine",
            name : "HouseMachinePage",
            component : HouseMachinePage
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
        },
        {
            path : "/reservation-list",
            name : "ListReservationPage",
            component : ListReservationPage
        },
        {
            path : "/reservation-add",
            name : "AddReservationPage",
            component : AddReservationPage
        }
    ]
})

export default router;