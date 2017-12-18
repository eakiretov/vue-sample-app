// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import Auth from './auth'
import router from './router'

const vueConfig = require('vue-config')

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !Auth.isLoggedIn()) {
    next({path: '/signin', query: {redirect: to.fullPath}})
  } else {
    next()
  }
})

const configs = {
  API: 'http://localhost:3000/'
}

Vue.use(VueResource)
Vue.use(vueConfig, configs)

Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  request.headers.set('Accept', 'application/json')
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
