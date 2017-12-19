<template>
  <div class="list-group">
    <a href="javascript:void(0)" class="list-group-item">
      <h4 class="list-group-item-heading">
        <router-link :to="{ name: 'list', params: { id: customer.customerId }, query: { name: customer.firstName }}">{{
          customer.firstName }} {{ customer.lastName }}
        </router-link>
      </h4>
      <div class="list-group-item-text">
        <div>Email: {{ customer.email }}</div>
        <div>Phone: {{ customer.phone }}</div>
        <a href="#" v-on:click.prevent="edit">Edit</a>
        <a href="#" v-on:click.prevent="remove">Remove</a>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'CustomerItem',
    props: ['customer'],
    methods: {
      remove: function () {
        this.$emit('remove')
      },
      edit: function () {
        this.$router.push({name: 'edit-customer', params: {id: this.customer.customerId}})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
