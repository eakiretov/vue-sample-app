<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <button class="btn btn-default pull-left" v-if="parentName" v-on:click="back">Go Back</button>
          <button class="btn btn-primary pull-right" v-on:click="create">Create a Customer</button>
        </div>
      </div>

      <div class="row" v-if="parentName">
        <div class="col-md-12 align-center">
          <h4>Customer List for <i>{{ parentName }}</i></h4>
        </div>
      </div>
      <br/>
      <div v-for="customer of customers" v-if="customers.length">
        <customer-item v-bind:customer="customer" v-on:remove="remove(customer)"></customer-item>
      </div>
      <div v-if="!customers.length">
        No Customers Found
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
      this.init()
    },
    watch: {
      '$route': 'init'
    },
    data() {
      return {
        customers: [],
        parentName: '',
        topParentId: ''
      }
    },
    methods: {
      create: function () {
        this.$router.push({name: 'create-customer', params: {id: this.$route.params.id}})
      },
      init: function () {
        const url = this.$route.params.id ? 'api/v1/customer/list/' + this.$route.params.id : 'api/v1/customer/list'
        this.$http.get(this.$config.API + url)
          .then((response) => {
            this.customers.splice(0, this.customers.length)
            this.customers = this.customers.concat(response.body)

            if (this.$route.params.id) {
              this.$http.get(this.$config.API + 'api/v1/customer/' + this.$route.params.id)
                .then((res) => {
                  this.parentName = res.body.firstName
                  this.topParentId = res.body.parents[res.body.parents.length - 1]
                })
            } else {
              this.parentName = ''
              this.topParentId = ''
            }
          })
      },
      remove: function (customer) {
        this.$http.delete(this.$config.API + 'api/v1/customer/' + customer.customerId)
          .then(() => {
            this.init()
          })
      },
      back: function () {
        this.$router.push({name: 'list', params: {id: this.topParentId}})
      }
    },
    components: {
      'nav-bar': NavBar,
      'customer-item': CustomerItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
