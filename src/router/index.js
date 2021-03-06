import Vue from 'vue'
import VueRouter from 'vue-router'
import QuestionEdit from '../views/QuestionEdit.vue'
import QuestionDetail from '../views/QuestionDetail.vue'
import MainPage from '../views/MainPage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Debug from '../views/Debug.vue'
import Debug2 from '../views/Debug2.vue'
import personalPage from '../views/personalPage.vue'
import searchPage from '../views/searchPage.vue'
import personalInfoEdit from '../views/personalInfoEdit.vue'
import AnswerDetail from '../views/AnswerDetail.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Index',
      redirect: {name: "Login"}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/question/:questionId',
      // path:'/question',
      name: 'QuestionDetail',
      component: QuestionDetail
    },
    {
      path: '/question/:questionId/edit/',
      name: 'QuestionEdit',
      component: QuestionEdit
    },
    {
      path: '/personalPage',
      name: 'personalPage',
      component: personalPage
    },
    {
      path: '/personalPage/info/edit',
      name: 'personalInfoEdit',
      component: personalInfoEdit
    },
    {
      path: '/main',
      name: 'Main',
      component: MainPage
    },
    {
      path: '/search/:key_word',
      name : 'Search',
      component: searchPage
    },
    {
      path: '/debug',
      name: 'Debug',
      component: Debug
    },
    {
      path: '/debug2',
      name: 'Debug2',
      component: Debug2
    },
    {
      path: '/answer/:answerId',
      name:'AnswerDetail',
      component: AnswerDetail
    },

  ]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
