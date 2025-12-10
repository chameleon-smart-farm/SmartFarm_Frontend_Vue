import { createRouter , createWebHistory } from "vue-router";

// import MainPage from "@/pages/MainPage.vue";

// import LoginPage from "@/pages/Login/LoginPage.vue";
// import FindPwdPage from "@/pages/Login/FindPwdPage.vue";
// import SelectHousePage from "@/pages/Login/SelectHousePage.vue";
// import MyPage from "@/pages/User/MyPage.vue";
// import HouseStatusPage from "@/pages/House/HouseStatusPage.vue";
// import SignUpPage from "@/pages/Login/SignUpPage.vue";
// import PreSignUpPage from "@/pages/Login/PreSignUpPage.vue";
// import ListReservationPage from "@/pages/Reservation/ListReservationPage.vue";
// import AddReservationPage from "@/pages/Reservation/AddReservationPage.vue";
// import HouseMachinePage from "@/pages/House/HouseMachinePage.vue";

const router = createRouter({
    history : createWebHistory(),
    routes : [

        {
            path : "/main",
            name : "Main",
            // component : MainPage
            component : () => import ('@/pages/MainPage.vue')
        },
        {
            path : "/",
            name : "Login",
            // component : LoginPage
            component : () => import ('@/pages/Login/LoginPage.vue')
        },
        {
            path : "/find-pwd",
            name : "FindPwdPage",
            // component : FindPwdPage
            component : () => import ('@/pages/Login/FindPwdPage.vue')
        },
        {
            path : "/select-house",
            name : "SelectHousePage",
            // component : SelectHousePage
            component : () => import ('@/pages/Login/SelectHousePage.vue')
        },
        {
            path : "/my-page",
            name : "MyPage",
            // component : MyPage
            component : () => import ('@/pages/User/MyPage.vue')
        },
        {
            path : "/house-status",
            name : "HouseStatusPage",
            // component : HouseStatusPage
            component : () => import ('@/pages/House/HouseStatusPage.vue')
        },
        {
            path : "/house-machine",
            name : "HouseMachinePage",
            // component : HouseMachinePage
            component : () => import ('@/pages/House/HouseMachinePage.vue')
        },
        {
            path : "/serial-check",
            name : "SerialCheckPage",
            // component : SignUpPage
            component : () => import ('@/pages/House/SerialCheckPage.vue')
        },
        {
            path : "/add-house/:house_id",
            name : "AddHousePage",
            // component : SignUpPage
            component : () => import ('@/pages/House/AddHousePage.vue')
        },
        {
            path : "/sign-up/:house_id",
            name : "SignUpPage",
            // component : SignUpPage
            component : () => import ('@/pages/Login/SignUpPage.vue')
        },
        {
            path : "/pre-sign-up",
            name : "PreSignUpPage",
            // component : PreSignUpPage
            component : () => import ('@/pages/Login/PreSignUpPage.vue')
        },
        {
            path : "/reservation-list",
            name : "ListReservationPage",
            // component : ListReservationPage
            component : () => import ('@/pages/Reservation/ListReservationPage.vue')
        },
        {
            path : "/reservation-add",
            name : "AddReservationPage",
            // component : AddReservationPage
            component : () => import ('@/pages/Reservation/AddReservationPage.vue')
        }
    ]
})

export default router;