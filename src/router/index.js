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
    path: '/signUp',
    component: () => import('../components/pages/login/SignUp.vue'),
  },
  {
    path: '/signIn',
    component: () => import('../components/pages/login/SignIn.vue'),
  },
  {
    path: '/teachers',
    component: () => import('../components/pages/TeachersPage.vue'),
  },
  {
    path: '/profile/:id',
    component: () => import('../components/pages/profile/ProfilePage.vue'),
  },
  {
    path: '/article/create',
    component: () => import('../components/pages/article/CreateArticle.vue'),
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
    path: '/article/:id/comments',
    component: () => import('../components/pages/comment/CommentPage.vue'),
  },
  {
    path: '/lesson/create',
    component: () => import('../components/pages/lesson/CreateLesson.vue'),
  },
  {
    path: '/lessons',
    component: () => import('../components/pages/lesson/LessonsPage.vue'),
  },
  {
    path: '/lesson/:id',
    component: () => import('../components/pages/lesson/LessonPage.vue'),
  },
  {
    path: '/lesson/:id/comments',
    component: () => import('../components/pages/comment/CommentPage.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
