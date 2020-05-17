import Vue from "vue";
import VueRouter from "vue-router";
import axios from 'axios';
import JwtHelper from "./helpers/JwtHelper";
import config from "./constants/config";
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
import ParticipantsPage from "./pages/ParticipantsPage";
import ParticipantBlockID from "./components/ParticipantsBlock/ParticipantBlockID";


//ADMINKA
import AdminPanel from "./components/AdminModule/AdminPanel";
import AdminPage from "./pages/AdminPage";
import AdminMain from "./components/AdminModule/AdminMain";
import AdminMembers from "./components/AdminModule/AdminMembers/AdminMembers";
import AdminUsers from "./components/AdminModule/AdminUsers/AdminUsers";
import AdminShowUserID from "./components/AdminModule/AdminUsers/AdminShowUserID";
import AdminVoting from "./components/AdminModule/AdminVoting/AdminVoting";
import AdminCatalogs from "./components/AdminModule/AdminCatalogs/AdminCatalogs";
import AdminWinners from "./components/AdminModule/AdminWinners/AdminWinners";

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
            adminPanel: AdminPanel,
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
            adminPanel: AdminPanel,
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
            adminPanel: AdminPanel,
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
        path: "/participants",
        name: "participants",
        components: {
            adminPanel: AdminPanel,
            header: HeaderBlockOtherPage,
            body: ParticipantsPage,
            nav: AppHeader,
            footer: FooterBlock
        },
        props: {
            header: {
                headName_en: 'Participants',
                headName_ru: 'Участники'
            }
        },
        meta: { requiresAuth: true }
    },
    {
        path: "/participants/id/:id",
        name: "participantsID",
        components: {
            adminPanel: AdminPanel,
            header: HeaderBlockOtherPage,
            body: ParticipantBlockID,
            nav: AppHeader,
            footer: FooterBlock
        },
        props: {
            header: {
                headName_en: 'About participant',
                headName_ru: 'Об участнике'
            }
        },
        meta: { requiresAuth: true }
    },
    {
        path: "/archive",
        name: "archive",
        components: {
            adminPanel: AdminPanel,
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
    },
    {
        path: "/admin",
        name: "admin",
        components: { body: AdminPage },
        redirect: '/admin/general',
        children: [
            { name: "generalAdmin",     path: "general",        component: AdminMain,       meta: { isAdmin: true} },
            { name: "catalogsAdmin",    path: "catalogs",       component: AdminCatalogs,   meta: { isAdmin: true} },
            { name: "usersAdmin",       path: "users",          component: AdminUsers,      meta: { isAdmin: true} },
            { name: "usersIdAdmin",     path: "users/id/:id",   component: AdminShowUserID, meta: { isAdmin: true} },
            { name: "membersAdmin",     path: "members",        component: AdminMembers,    meta: { isAdmin: true} },
            { name: "votingAdmin",      path: "voting",         component: AdminVoting,     meta: { isAdmin: true} },
            { name: "winnersAdmin",     path: "winners",        component: AdminWinners,    meta: { isAdmin: true} }

        ],
        meta: { isAdmin: true }
    }
];


const router = new VueRouter({
    mode: "history",
    routes: routes
});

const url = config.API_URL + "/users/check";

const jwtHeader = new JwtHelper();

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.isAdmin)){
        if(jwtHeader.isAdmin()) {
            next();
        }else{
            next({name: "main"});
        }
    } else
        if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!jwtHeader.isJwt()) {
            next({
                name: "login"
            });
        } else {
            axios.get( url, { headers: {  Authorization: "Bearer " + localStorage.getItem("jwt") } } )
            .then(res => {
                if(res.data.result === true) {
                    next()
                }else {
                    localStorage.removeItem("jwt")
                    next({name: "login"});
                }
            })
            .catch(error => {
                console.error("er", error.response.status);
                localStorage.removeItem("jwt")
                next({name: "login"});
            });
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
