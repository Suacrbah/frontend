import Vue from 'vue'
import VueRouter from 'vue-router'
import Questions from '../views/Questions.vue'
import QuestionEdit from '../views/QuestionEdit.vue'
import QuestionDetail from '../views/QuestionDetail.vue'
import MainPage from '../views/MainPage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Debug from '../views/Debug.vue'
import Debug2 from '../views/Debug2.vue'
import personalPage from '../views/personalPage.vue'

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
      path: '/questions',
      name: 'Questions',
      component: Questions
    },
    {
      path: '/question/add',
      name: 'QuestionEdit',
      component: QuestionEdit
    },
    {
      path: '/question/:questionId',
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
      path: '/main',
      name: 'Main',
      component: MainPage
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
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
