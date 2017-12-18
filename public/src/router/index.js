import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import CustomerList from '@/components/CustomerList'
import Customer from '@/components/Customer'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/customer/:customerId?', component: Customer, meta: {requiresAuth: true}},
    {path: '/customer/:customerId', component: Customer, meta: {requiresAuth: true}},
    {path: '/signin', name: 'SignIn', component: SignIn},
    {path: '/signup', name: 'SignUp', component: SignUp},
    {path: '/:customerId?', component: CustomerList, meta: {requiresAuth: true}},
  ]
})
