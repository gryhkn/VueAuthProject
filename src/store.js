import Vue from 'vue' ;
import Vuex from 'vuex' ;
import axios from "axios";

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
                })
        },
        logout({commit,dispatch, state}) {
            commit("clearToken");
        },
    },
    getters: {
        isAuthenticated(state) {
            return state.token !== "";
        }
    }
})

export default store ;