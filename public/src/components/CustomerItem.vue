<template>
  <div class="list-group" v-on:click="navigate">
    <a href="#" class="list-group-item">
      <h4 class="list-group-item-heading">{{ customer.firstName }} {{ customer.lastName }}</h4>
      <div class="list-group-item-text">
        <div>Email: {{ customer.email }}</div>
        <div>Phone: {{ customer.phone }}</div>
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
      navigate: function () {
        //   this.$emit('remove')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
