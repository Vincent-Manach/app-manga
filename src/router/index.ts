import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Mangas from '../views/Mangas.vue';
import Manga from '../views/Manga.vue';
import Login from '../views/Login.vue';
import Lists from '../views/Lists.vue';
import List from '../views/List.vue';
import Profile from '../views/Profile.vue';
import Search from '../views/Search.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/mangas',
    name: 'Mangas',
    component: Mangas
  },
  {
    path: '/manga/:id',
    name: 'Manga',
    component: Manga
  },
  {
    path: '/myLists',
    name: 'Lists',
    component: Lists
  },
  {
    path: '/myLists/:id',
    name: 'List',
    component: List
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;

// OLD VUEJS

// import Router from 'vue-router'
// import Vue from 'vue'

// import Main from '@/views/Main'
// import Login from '@/views/Login'
// import Register from '@/views/Register'
// import Concerts from '@/views/Concerts'
// import Artistes from '@/views/Artistes'
// import Groupes from '@/views/Groupes'

// import auth from '@/api/auth'

// Vue.use(Router)

// const router = new Router({
//   mode: 'history',
//   base: '/',
//   routes: [
//     {
//       component: Main,
//       path: '/',
//       meta: {
//         auth: true,
//       }
//     },
//     {
//       component: Login,
//       path: '/login',
//     },
//     {
//       component: Concerts,
//       path: '/concerts',
//     },
//     {
//       component: Artistes,
//       path: '/artistes',
//     },
//     {
//       component: Groupes,
//       path: '/groupes',
//     },
//     {
//       component: Register,
//       path: '/register',
//     }
//   ]
// })

// router.beforeEach(async (to, from, next) => {
//   if (to.matched.some(route => route.meta.auth)) {
//     try {
//       await auth.get(`/users/${localStorage.getItem('vuejs_user_id')}`)
//       return next()
//     } catch (e) {
//       localStorage.removeItem('vuejs_user_id')
//       localStorage.removeItem('vuejs_token')
//       return next('/login')
//     }
//   } else {
//     return next()
//   }
// })

// export default router


