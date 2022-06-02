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
    component: () => import('../components/pages/article/ArticlesPage.vue')
  },
  {
    path: '/article/:id',
    component: () => import('../components/pages/article/ArticlePage.vue'),
  },
  {
    path: '/teachers',
    component: () => import('../components/pages/TeachersPage.vue'),
  },
  {
    path: '/signUp',
    component: () => import('../components/pages/login/SignUp.vue'),
  },
  {
    path: '/signIn',
    component: () => import('../components/pages/login/SignIn.vue'),
  },
  {
    path: '/myProfile',
    component: () => import('../components/pages/profile/MyProfile.vue'),
  },
  {
    path: '/profile/:id',
    component: () => import('../components/pages/profile/ProfilePage.vue'),
  },
  {
    path: '/lessons',
    component: () => import('../components/pages/lesson/LessonsPage.vue'),
  },
  {
    path: '/lesson/:id',
    component: () => import('../components/pages/lesson/LessonPage.vue'),
    props: true
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
