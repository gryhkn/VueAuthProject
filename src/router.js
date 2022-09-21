import Vue from 'vue' ;
import VueRouter from 'vue-router' ;

import About from './pages/About.vue' ;
import HomePage from './pages/HomePage.vue' ;
import Auth from './pages/auth/Auth.vue' ;

Vue.use(VueRouter) ;

export const router = new VueRouter({
    routes: [
        { path: '/', component: HomePage },
        { path: '/about', component: About },
        { path: '/auth', component: Auth }
        ],
    mode: 'history'
}) ;
