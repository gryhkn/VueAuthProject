import Vue from 'vue' ;
import VueRouter from 'vue-router' ;

import About from './pages/About.vue' ;
import HomePage from './pages/HomePage.vue' ;
import Auth from './pages/auth/Auth.vue' ;
import store from './store.js' ;

Vue.use(VueRouter) ;

export const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: HomePage,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next();
                }
                else {
                    next('/auth');
                }
            }
        },
        {
            path: '/about',
            component: About,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next();
                }
                else {
                    next('/auth');
                }
            }
        },

        { path: '/auth', component: Auth }
        ],
    mode: 'history'
}) ;
