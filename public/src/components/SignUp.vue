<template>
  <div class="signup container">
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <form>
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" class="form-control" id="firstName" v-model.trim="firstName" placeholder="First Name">
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" class="form-control" id="lastName" v-model.trim="lastName" placeholder="Last Name">
          </div>
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="text" class="form-control" id="phone" v-model.trim="phone" placeholder="Phone">
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" v-model.trim="email" placeholder="Email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model.trim="password" placeholder="Password">
          </div>
          <div class="alert alert-danger alert-dismissible" role="alert" v-if="error">
            <strong>Warning!</strong> {{ error }}.
          </div>
          <button type="submit" v-on:click="signup" class="btn btn-default">Sign Up</button>
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
    name: 'SignUp',
    data() {
      return {
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        error: ''
      }
    },
    methods: {
      signup: function () {
        this.$http.post(this.$config.API + 'api/v1/auth/signup', {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone
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
  .signup {
    margin-top: 120px;
  }
</style>
