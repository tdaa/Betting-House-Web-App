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
    <div>
      <b-alert v-model="showErrorAlert" variant="danger" dismissible>
        Email ou Password incorretos!
      </b-alert>
    </div>
    <br>
    <h3 style="text-align: center">Sign In</h3>
    <br>
    <b-form @submit.prevent="login" v-if="show">
      <b-form-group id="input-group-1" label="Email:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="email"
          required
          placeholder="Introduza o seu email"
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
      <div style="text-align: center">
        <input class="btn btn-primary button_custom" type="submit" value="Iniciar Sessão"/>
      </div>
    </b-form>
    <br>
    <p style="text-align: center">Não possui conta? Poderá criar uma <router-link to="/signup">aqui</router-link>!</p>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      showErrorAlert: false,
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
            if (typeof response.data[0].id === 'number') {
              router.push('/home')
            } else if (typeof response.data[0].id !== 'number') {
              router.push('/homeAdmin')
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    login: function () {
      let data = {
        username: this.form.username,
        password: this.form.password
      }

      axios.post('http://localhost:2727/login/processLogin', data)
        .then(response => {
          if (response.data['id'] === 'betadmin@bettinghouse.com') {
            router.push('/homeAdmin')
          } else {
            router.push('/home')
          }
        })
        .catch(errors => {
          this.showErrorAlert = true
          console.log(JSON.stringify(errors))
        })
    }
  }
}
</script>

<style>
  .button_custom {
    background-color: rgb(245, 116, 52);
    border-color: rgb(0, 0, 0);
  }

  .button_custom:hover {
    background-color: rgb(199, 101, 53);
    border-color: rgb(0, 0, 0);
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
