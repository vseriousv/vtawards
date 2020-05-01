import Vue from "vue";
import VueRouter from "vue-router";
import HeaderBlock from "./components/HeaderBlock/HeaderBlock";
import HeaderBlockOtherPage from "./components/HeaderBlock/HeaderBlockOtherPage";
import HeaderBlockLoginPage from "./components/HeaderBlock/HeaderBlockLoginPage";
import AppHeader from "./components/AppHeader/AppHeader";
import FooterBlock from "./components/FooterBlock/FooterBlock";

import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import LogoutPage from "./pages/LogoutPage";
import MainPage from "./pages/MainPage";
import ResultPage from "./pages/ResultPage";
import CommitteePage from "./pages/CommitteePage";
import ArchivePage from "./pages/ArchivePage";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "login",
        components: {
            header: HeaderBlockLoginPage,
            body: LoginPage
        },
        meta: { guest: true }
    },
    {
        path: "/registration",
        name: "registration",
        components: {
            header: HeaderBlockLoginPage,
            body: RegistrationPage
        },
        meta: { guest: true }
    },
    {
        path: "/logout",
        name: "logout",
        components: {
            body: LogoutPage
        },
        meta: { requiresAuth: true }
    },
    {
        path: "/",
        name: "main",
        components: {
            header: HeaderBlock,
            body: MainPage,
            nav: AppHeader,
            footer: FooterBlock
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
            body: ResultPage,
            nav: AppHeader,
            footer: FooterBlock
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
            body: CommitteePage,
            nav: AppHeader,
            footer: FooterBlock
        },
        props: {
            header: {
                headName_en: 'Committee',
                headName_ru: 'Комиссия'
            }
        },
        meta: { requiresAuth: true }
    },
    {
        path: "/archive",
        name: "archive",
        components: {
            header: HeaderBlockOtherPage,
            body: ArchivePage,
            nav: AppHeader,
            footer: FooterBlock
        },
        props: {
            header: {
                headName_en: 'Archive',
                headName_ru: 'Архив'
            }
        },
        meta: { requiresAuth: true }
    }
];


const router = new VueRouter({
    mode: "history",
    routes: routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem("jwt") == null) {
            next({
                // path: "/login",
                // params: { nextUrl: to.fullPath }
                name: "login"
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem("jwt") == null) {
            next();
        } else {
            next({ name: "main" });
        }
    } else {
        next();
    }
});

export default router;
