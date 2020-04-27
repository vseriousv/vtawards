import Vue from "vue";
import VueRouter from "vue-router";
import HeaderBlock from "./components/HeaderBlock/HeaderBlock";
import HeaderBlockOtherPage from "./components/HeaderBlock/HeaderBlockOtherPage";

import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ResultPage from "./pages/ResultPage";
import CommitteePage from "./pages/CommitteePage"

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "login",
        components: {
            header: HeaderBlockOtherPage,
            body: LoginPage
        },
        props: {
            header: {
                headName_en: 'login',
                headName_ru: 'вход'
            }
        },
        meta: { requiresAuth: true }
    },
    {
        path: "/",
        name: "main",
        components: {
            header: HeaderBlock,
            body: MainPage
        },
        props: {
            header: {
                headName_en: 'Home',
                headName_ru: 'Главная'
            }
        },
        meta: { requiresAuth: true }
    },
    {
        path: "/result",
        name: "result",
        components: {
            header: HeaderBlockOtherPage,
            body: ResultPage
        },
        props: {
            header: {
                headName_en: 'Voting results',
                headName_ru: 'Результаты голосования'
            }
        },
        meta: { requiresAuth: true }
    },
    {
        path: "/committee",
        name: "committee",
        components: {
            header: HeaderBlockOtherPage,
            body: CommitteePage
        },
        props: {
            header: {
                headName_en: 'Committee',
                headName_ru: 'Комиссия'
            }
        },
        meta: { requiresAuth: true }
    }
];


const router = new VueRouter({
    mode: "history",
    routes: routes
});
//
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (localStorage.getItem("jwt") == null) {
//             next({
//                 path: "/login",
//                 params: { nextUrl: to.fullPath }
//             });
//         } else {
//             const user = JSON.parse(localStorage.getItem("user"));
//             if (to.matched.some(record => record.meta.is_user)) {
//                 if (user.is_user) {
//                     next();
//                 } else {
//                     next({ name: "main" });
//                 }
//             } else {
//                 next();
//             }
//         }
//     } else if (to.matched.some(record => record.meta.guest)) {
//         if (localStorage.getItem("jwt") == null) {
//             next();
//         } else {
//             next({ name: "main" });
//         }
//     } else {
//         next();
//     }
// });

export default router;
