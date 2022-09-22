import Vue from 'vue' ;
import Vuex from 'vuex' ;
import axios from "axios";
import { router } from './router.js' ;

Vue.use(Vuex) ;

const store = new Vuex.Store({
    state: {
        token: "",
        fbAPIKey: "AIzaSyAcPUAXRXzGfdYSjJv3ivogvJKAAcjGxgs",
    },
    mutations: {
        setToken(state, token) {
            state.token = token ;
        },
        clearToken(state) {
            state.token = "" ;
        }
    },
    actions: {
        initAuth({commit, dispatch}) {
            let token = localStorage.getItem('token') ;
            if (token) {
                    commit("setToken", token)
                    router.push('/') ;
                }
                else {
                    router.push('/auth') ;
                    return false
                }
            },
        login({commit,dispatch, state}, autData) {
            let authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
            if (autData.isUser) {
                authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
            }
            return axios.post(
                authLink + "AIzaSyAcPUAXRXzGfdYSjJv3ivogvJKAAcjGxgs",
                {
                    email: autData.email,
                    password: autData.password,
                    returnSecureToken: true
                })
                .then(response => {
                    commit("setToken", response.data.idToken);
                    console.log(response.data.idToken);
                    localStorage.setItem("token", response.data.idToken);
                })
        },
        logout({commit,dispatch, state}) {
            commit("clearToken");
            localStorage.removeItem("token");
        },
    },
    getters: {
        isAuthenticated(state) {
            return state.token !== "";
        }
    }
})

export default store ;