import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '../components/pages/MainPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: MainPage
  },
  {
    path: '/articles',
    component: () => import('../components/pages/ArticlesPage.vue')
  },
  {
    path: '/article/:id',
    component: () => import('../components/pages/ArticlePage.vue'),
  },
  {
    path: '/teachers',
    component: () => import('../components/pages/TeachersPage.vue'),
  },
  {
    path: '/students',
    component: () => import('../components/pages/StudentsPage.vue'),
  },
  {
    path: '/signUp',
    component: () => import('../components/pages/SignUp.vue'),
  },
  {
    path: '/signIn',
    component: () => import('../components/pages/SignIn.vue'),
  },
  {
    path: '/profile/:id',
    component: () => import('../components/pages/ProfilePage.vue'),
    props: true
  },
  {
    path: '/lessons',
    component: () => import('../components/pages/LessonsPage.vue'),
  },
  {
    path: '/lesson/:id',
    component: () => import('../components/pages/LessonPage.vue'),
    props: true
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
