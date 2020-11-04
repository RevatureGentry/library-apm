import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import {currentUser} from "@/plugins/firebase";

Vue.use(VueRouter)

const base: string = process.env.BASE_URL ?? '/';
console.log(base);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'SignInForm',
    component: () => import(/* webpackChunkName: "sign-in" */ '../components/forms/SignInForm.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      protected: true,
      view: true
    },
    beforeEnter(to, from, next) {
      if (currentUser() !== null) {
        next();
      } else {
        next({ path: '/', replace: true })
      }
    }
  },
  {
    path: '/authors',
    name: 'Authors',
    component: () => import(/* webpackChunkName: "authors" */ '../views/Authors.vue'),
    meta: {
      protected: true,
      view: true
    },
    beforeEnter(to, from, next) {
      if (currentUser() !== null) {
        next();
      } else {
        next({ path: '/', replace: true })
      }
    }
  },
  {
    path: '/authors/:id/books',
    name: 'AuthorsBooks',
    component: () => import(/* webpackChunkName: "authorsBooks" */ '../views/AuthorsBooks.vue'),
    meta: {
      protected: true,
      view: true
    },
    beforeEnter(to, from, next) {
      if (currentUser() !== null) {
        next();
      } else {
        next({ path: '/', replace: true })
      }
    },
    props: route => ({ authorId: +route.params.id })
  },
  {
    path: '/books',
    name: 'Books',
    component: () => import(/* webpackChunkName: "books" */ '../views/Books.vue'),
    meta: {
      protected: true,
      view: true
    },
    beforeEnter(to, from, next) {
      if (currentUser() !== null) {
        next();
      } else {
        next({ path: '/', replace: true })
      }
    },
  },
  {
    path: '/books/:id',
    name: 'Reviews',
    component: () => import(/* webpackChunkName: "reviews" */ '../views/Reviews.vue'),
    meta: {
      protected: true,
      view: true
    },
    props: route => ({ bookId: +route.params.id, showReviews: false }),
    beforeEnter(to, from, next) {
      if (currentUser() !== null) {
        next();
      } else {
        next({ path: '/', replace: true })
      }
    },
    children: [
      {
        path: 'review',
        name: 'ReviewForm',
        component: () => import(/* webpackChunkName: "createReview" */ '../components/forms/ReviewForm.vue'),
        meta: {
          protected: true
        },
        props: route => ({ bookId: +route.params.id }),
      },
      {
        path: 'reviews',
        name: 'ReviewsList',
        component: () => import(/* webpackChunkName: "reviews" */ '../components/reviews/ReviewsList.vue'),
        meta: {
          protected: true
        },
        props: route => ({ bookId: +route.params.id }),
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base,
  routes
});


export default router
