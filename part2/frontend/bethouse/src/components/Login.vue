<template>
  <div class="container" style="text-align: center">
    <div class="login">
      <h3>Sign In</h3>
      <input type="text" v-model="email" placeholder="Email"><br>
      <input type="password" v-model="password" placeholder="Password"><br>
      <button v-on:click="login">Login</button>
      <p>You don't have an account ? You can <router-link to="/signup">create one</router-link></p>
    </div>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      let data = {
        email: this.email,
        password: this.password
      }
      axios.post('http://localhost:2727/login/', data)
        .then(response => {
          console.log(response)
          router.push('/')
        })
        .catch(errors => {
          console.log('Cannot login')
        })
    }
  }
}
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
.login {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
