import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
    },
    mutations: {
        // set
        set_token: (state, token) => {
            state.token = token
            localStorage.setItem("token", token)
        },
        set_userInfo: (state, userInfo) => {
            state.userInfo = userInfo
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
        },
        remove_info: (state) => {
            state.token = ''
            state.userInfo = {}
            localStorage.setItem("token", '')
            sessionStorage.setItem("userInfo", JSON.stringify(''))
        }

    },
    getters: {
        // get
        getUser: state => {
            return state.userInfo
        }

    },
    actions: {
    },
    modules: {
    }
})
