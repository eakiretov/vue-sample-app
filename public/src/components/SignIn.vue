<template>
  <div class="signin container">
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <form>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" v-model.trim="email" placeholder="Email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" v-model.trim="password" id="password" placeholder="Password">
          </div>
          <div>
            <router-link to="signup">Do not have an account?</router-link>
          </div>
          <br/>
          <div class="alert alert-danger alert-dismissible" role="alert" v-if="error">
            <strong>Warning!</strong> {{ error }}.
          </div>
          <button type="submit" v-on:click="signin" class="btn btn-default">Sign In</button>
        </form>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>

<script>
  import Auth from '../auth'
  import router from '../router'

  export default {
    name: 'SignIn',
    data() {
      return {
        password: '',
        email: '',
        error: ''
      }
    },
    methods: {
      signin: function () {
        this.$http.post(this.$config.API + 'api/v1/auth/signin', {
          email: this.email,
          password: this.password
        }).then((response) => {
          Auth.login(response.body.authToken)
          router.push('customers')
        }, (err) => {
          if (err) {
            console.log(err)
          }
          this.error = err.body.message
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .signin {
    margin-top: 120px;
  }
</style>
