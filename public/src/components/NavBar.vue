<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">
          Vue Sample App
        </a>
      </div>

      <ul class="nav navbar-nav navbar-right">
        <li><a href="#" v-on:click="logout">Sign Out</a></li>
      </ul>
    </div>
  </nav>
</template>
<script>
  import Auth from '../auth'
  import router from '../router'

  export default {
    name: 'NavBar',
    methods: {
      logout: function () {
        Auth.logout()
        router.push('signin')
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
