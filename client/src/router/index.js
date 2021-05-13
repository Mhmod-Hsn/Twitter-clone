import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import Posts from '../views/Posts.vue'
import About from '../views/About.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Search from '../views/Search.vue'
import Error404 from '../views/errors/404.vue'
import {parseJwt} from "../utils";
import Home from "../views/Home";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/follows',
    name: 'Posts',
    component: Posts,
    beforeEnter: guard,
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
    beforeEnter: guard,


    props(route) {
      return {
        id: route.params.id
      }
    },
  },
  {
    path: '/search/:q',
    name: 'Search',
    component: Search,
    beforeEnter: guard,

    props(route) {
      return {
        q: route.params.q
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: unauthorized,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: unauthorized,
  },
  {
    path: "/:catchAll(.*)",
    name: 'Error404',
    component: Error404
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


function unauthorized(to, from, next) {
  const token = localStorage.getItem('token')
  let now = new Date().getTime()
  let tokenTime
  if(token){
    tokenTime = new Date(parseJwt(token).exp).getTime()*1000
  }

  if (token && tokenTime > now) {
    next({name: 'Home'});
  } else {
    next();
  }
}
function guard(to, from, next) {
  const token = localStorage.getItem('token')
  let now = new Date().getTime()
  let tokenTime
  if(token){
    tokenTime = new Date(parseJwt(token).exp).getTime()*1000
  }

  if (token && tokenTime > now) {
    next();
  } else {
    next({name: 'Home'});
  }
}

export default router
