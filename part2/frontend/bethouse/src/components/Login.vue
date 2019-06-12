<!--<template>
  <div class="container" style="text-align: center">
    <div class="login">
      <h3>Sign In</h3>
      <input type="text" v-model="username" placeholder="Email"><br>
      <input type="password" v-model="password" placeholder="Password"><br>
      <button v-on:click="login">Login</button>
      <p>You don't have an account ? You can <router-link to="/signup">create one</router-link></p>
    </div>
  </div>
</template>-->
<template>
  <div class="container" style="width: 30%">
    <br>
    <h3 style="text-align: center">Sign In</h3>
    <br>
    <b-form @submit="login" v-if="show">
      <b-form-group id="input-group-1" label="Email:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="email"
          required
          placeholder="Introduza email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="password"
          v-model="form.password"
          required
          placeholder="Introduza a sua password"
        ></b-form-input><br>
      </b-form-group>

      <b-button class="button_custom" style="align:center" type="submit">Iniciar Sessão</b-button>
    </b-form>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      show: true,
      form: {
        username: '',
        password: ''
      }
    }
  },
  created () {
    this.getSession()
  },
  methods: {
    getSession () {
      axios.get('http://localhost:2727/session')
        .then(response => {
          if (response.data) {
            router.push('/home')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    login () {
      let data = {
        username: this.form.username,
        password: this.form.password
      }

      axios.post('http://localhost:2727/login/processLogin', data)
        .then(response => {
          router.push('/home')
        })
        .catch(errors => console.log(errors))
    }
  }
}
</script>

<style>
  .button_custom {
    background-color: rgb(245, 116, 52);
  }

  .button_custom:hover {
    background-color: rgb(199, 101, 53);
  }
</style>

<!--
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
</style> -->
