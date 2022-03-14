import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import Feed from '../views/Feed.vue';
import Profile from '../views/Profile.vue';
import ProfileId from '../views/ProfileId.vue';
import axios from 'axios';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: '/logIn'
  },
  {
    path: '/logIn',
    name: 'LogIn',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/user/signUp',
    name: 'SignUp',
    component: SignUp,
    meta: { requiresAuth: false }
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/:userId',
    name: 'ProfileId',
    component: ProfileId,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async(to) => {
  try {
    const is_auth = await axios.get('http://localhost:3000/users/auth_user', { withCredentials: true } );
    let isValid = false;

    isValid = is_auth ? true : false;

    if (isValid == to.meta.requiresAuth) return true;
    if (isValid) return { name: 'Feed' };
    return { name: 'LogIn' };
  } catch (e) {
    // console.log(e);
    if (!to.meta.requiresAuth) return true;
    return { name: 'LogIn' };
  }
});

export default router;
