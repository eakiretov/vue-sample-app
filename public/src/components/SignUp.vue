<template>
  <div class="signup container">
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <form>
          <div class="form-group" :class="{'has-error': $v.firstName.$error }">
            <label for="firstName">First Name</label>
            <input type="text" class="form-control" id="firstName" v-model="firstName" @click="$v.firstName.$touch()"
                   placeholder="First Name"/>
            <p class="text-danger" v-if="$v.firstName.$error">First Name is required</p>
          </div>
          <div class="form-group" :class="{'has-error': $v.lastName.$error }">
            <label for="lastName">Last Name</label>
            <input type="text" class="form-control" id="lastName" v-model.trim="lastName" @click="$v.lastName.$touch()"
                   placeholder="Last Name"/>
            <p class="text-danger" v-if="$v.lastName.$error">Last Name is required</p>
          </div>
          <div class="form-group" :class="{'has-error': $v.email.$error }">
            <label class="control-label" for="email">Email</label>
            <input v-model.trim="email" id="email" class="form-control" type="email" placeholder="Email"
                   @click="$v.email.$touch()">
            <p class="text-danger" v-if="!$v.email.required">Email is required</p>
            <p class="text-danger" v-if="$v.email.required && !$v.email.email">Email is incorrect</p>
          </div>
          <div class="form-group" :class="{'has-error': $v.password.$error }">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model.trim="password"
                   @click="$v.password.$touch()" placeholder="Password">
            <p class="text-danger" v-if="$v.password.$error">Password is required</p>
          </div>
          <div class="alert alert-danger alert-dismissible" role="alert" v-if="error">
            <strong>Warning!</strong> {{ error }}.
          </div>
          <button type="submit" :disabled="$v.$error" v-on:click="signup" class="btn btn-default">Sign Up</button>
        </form>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>

<script>
  import Auth from '../auth'
  import {required, email} from 'vuelidate/lib/validators'

  export default {
    name: 'SignUp',
    data() {
      return {
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        error: ''
      }
    },
    validations: {
      email: {
        required,
        email
      },
      firstName: {
        required
      },
      lastName: {
        required
      },
      password: {
        required
      }
    },
    methods: {
      signup: function () {
        this.$v.$touch()
        if (this.$v.$error) {
          return
        }

        this.$http.post(this.$config.API + 'api/v1/auth/signup', {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        }).then((response) => {
          Auth.login(response.body.authToken)
          this.$router.push('/')
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
