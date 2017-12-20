<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
        </div>
        <div class="col-md-4">
          <h4 v-if="parentName">Add/Update Child Customer For <i>{{ parentName }}</i></h4>
          <h4 v-else>Add/Update Child Customer</h4>
          <form>
            <div class="form-group" :class="{'has-error': $v.email.$error }">
              <label class="control-label" for="email">Email</label>
              <input v-model="email" id="email" class="form-control" type="email" placeholder="Email"
                     @click="$v.email.$touch()">
              <p class="text-danger" v-if="!$v.email.required && $v.email.$error">Email is required</p>
              <p class="text-danger" v-if="$v.email.required && !$v.email.email">Email is incorrect</p>
            </div>
            <div class="form-group" :class="{'has-error': $v.firstName.$error }">
              <label for="firstName">First Name</label>
              <input type="text" class="form-control" id="firstName" v-model="firstName" @click="$v.firstName.$touch()"
                     placeholder="First Name"/>
              <p class="text-danger" v-if="$v.firstName.$error">First Name is required</p>
            </div>
            <div class="form-group" :class="{'has-error': $v.lastName.$error }">
              <label for="lastName">Last Name</label>
              <input type="text" class="form-control" id="lastName" v-model.trim="lastName"
                     @click="$v.lastName.$touch()" placeholder="Last Name"/>
              <p class="text-danger" v-if="$v.lastName.$error">Last Name is required</p>
            </div>
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="number" class="form-control" id="phone" v-model.trim="phone" placeholder="Phone">
            </div>
            <div class="alert alert-danger alert-dismissible" role="alert" v-if="error">
              <strong>Warning!</strong> {{ error }}.
            </div>
            <button v-if="$route.name === 'edit-customer'" type="submit" v-on:click="update" class="btn btn-primary">
              Update
            </button>
            <button v-else type="submit" v-on:click="create" class="btn btn-primary">Create</button>
            <button type="button" v-on:click="cancel" class="btn btn-default">Cancel</button>
          </form>
        </div>
        <div class="col-md-4">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from './NavBar'
  import {required, email} from 'vuelidate/lib/validators'

  export default {
    name: 'Customer',
    created() {
      if (this.$route.name === 'edit-customer') {
        this.initToEdit()
      } else {
        this.initToCreate()
      }
    },
    data() {
      return {
        customerId: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        parentId: null,
        parentName: '',
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
      }
    },
    methods: {
      create: function () {
        this.$v.$touch()
        if (this.$v.$error) {
          return
        }

        this.$http.post(this.$config.API + 'api/v1/customer', {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone,
          parent: this.parentId
        }).then((res) => {
          this.$router.push({name: 'list', params: {id: this.parentId}})
        }, (err) => {
          if (err) {
            console.log(err)
          }
          this.error = err.body.message
        })
      },
      update: function () {
        this.$v.$touch()
        if (this.$v.$error) {
          return
        }

        this.$http.put(this.$config.API + 'api/v1/customer/' + this.customerId, {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone,
          parent: this.parentId
        }).then((res) => {
          this.$router.push({name: 'list', params: {id: this.parentId}})
        }, (err) => {
          if (err) {
            console.log(err)
          }
          this.error = err.body.message
        })
      },
      cancel: function () {
        this.$router.push({name: 'list', params: {id: this.parentId}})
      },
      initToEdit: function () {
        if (this.$route.params.id) {
          this.$http.get(this.$config.API + 'api/v1/customer/' + this.$route.params.id)
            .then((res) => {
              this.customerId = res.body.customerId
              this.email = res.body.email
              this.firstName = res.body.firstName
              this.lastName = res.body.lastName
              this.phone = res.body.phone
              this.email = res.body.email
              this.parentId = res.body.parents[res.body.parents.length - 1]
              if (this.parentId) {
                this.$http.get(this.$config.API + 'api/v1/customer/' + this.parentId)
                  .then((res) => {
                    this.parentName = res.body.firstName + ' ' + res.body.lastName
                  })
              }
            })
        }
      },
      initToCreate: function () {
        if (this.$route.params.id) {
          this.$http.get(this.$config.API + 'api/v1/customer/' + this.$route.params.id)
            .then((res) => {
              this.parentName = res.body.firstName + ' ' + res.body.lastName
              this.parentId = res.body.customerId
            })
        }
      }
    },
    components: {
      'nav-bar': NavBar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
