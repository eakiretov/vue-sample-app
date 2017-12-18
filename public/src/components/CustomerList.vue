<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <button class="btn btn-primary" v-on:click="create">Create a Customer</button>
        </div>
      </div>
      <br/>
      <div v-for="customer of customers" v-on:click="open(customer)">
        <router-link :to="{ path: '/', params: { customerId: customer.customerId }}">Open</router-link>
        <customer-item v-bind:customer="customer" v-on:remove="remove(customer)"></customer-item>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from './NavBar'
  import CustomerItem from './CustomerItem'

  export default {
    name: 'CustomerList',
    created() {
      this.init(null)
    },
    beforeRouteUpdate(to, from, next) {
      this.init(to.params.customerId)
      next()
    },
    data() {
      return {
        customers: []
      }
    },
    methods: {
      create: function () {
        this.$router.push('customer')
      },
      init: function (parentId) {
        const url = parentId ? 'api/v1/customer/list/' + parentId : 'api/v1/customer/list'
        this.$http.get(this.$config.API + url)
          .then((response) => {
            this.customers = response.body
          })
      },
      remove: function (customer) {
        this.$http.delete(this.$config.API + 'api/v1/customer/' + customer.customerId)
          .then(() => {
            this.init()
          })
      },
      open: function (customer) {
        this.$router.push({ path: '/', params: { customerId: customer.customerId }})
      }
    },
    components: {
      CustomerItem,
      'nav-bar': NavBar,
      'customer-item': CustomerItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
