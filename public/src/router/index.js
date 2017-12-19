import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import CustomerList from '@/components/CustomerList'
import Customer from '@/components/Customer'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/signin', name: 'SignIn', component: SignIn},
    {path: '/signup', name: 'SignUp', component: SignUp},
    {path: '/customer/create/:id?', name: 'create-customer', component: Customer, meta: {requiresAuth: true}},
    {path: '/customer/:id?', name: 'edit-customer', component: Customer, meta: {requiresAuth: true}},
    {path: '/:id?', name: 'list', component: CustomerList, meta: {requiresAuth: true}}
  ]
})
