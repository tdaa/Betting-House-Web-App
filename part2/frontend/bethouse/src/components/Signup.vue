<template>
  <div class="container" style="width: 30%">
    <br>
    <h3 style="text-align: center">Sign Up</h3>
    <br>
    <div>
      <b-alert v-model="showErrorAlert" variant="danger" dismissible>
        Email já existente!
      </b-alert>
    </div>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-1" label="Email:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Introduza email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Nome:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.nome"
          required
          placeholder="Introduza o seu nome"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="password"
          v-model="form.password"
          required
          placeholder="Introduza a sua password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Pretende ser Premium?">
        <b-form-group id="radiobuttons-4">
          <b-form-radio @input="processPremium" v-model="selected" name="some-radios" value="prem">Sim</b-form-radio>
          <b-form-radio v-model="selected" name="some-radios" value="nom_prem">Não</b-form-radio>
        </b-form-group>
      </b-form-group>

      <b-form-group id="input-group-5" label="Introduza depósito:" label-for="input-5" v-if="show_premium">
        <b-form-input
          id="input-5"
          type="number"
          v-model="deposito"
          required
          placeholder=""
        ></b-form-input><br>
      </b-form-group>

      <b-button class="button_custom" style="align:center" type="submit">Criar Conta</b-button>
    </b-form>
  </div>
</template>

<script>
/* eslint-disable */
  import axios from 'axios'  
  import router from '../router'

  export default {
    data() {
      return {
        showErrorAlert: false,
        show: true,
        form: {
          email: '',
          nome: '',
          password: '',
          premium: false
        },
        selected: '',
        show_premium: false,
        deposito: 1
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()

        if (this.selected == 'prem') {
          this.form.premium = true
          this.form['deposito'] = this.deposito
        }

        axios.post('http://localhost:2727/signup', this.form)
          .then(response => {
            if (response.data.status == -1) {
              this.showErrorAlert = true
              
              /* Clear all input. */
              this.form.email = ''
              this.form.nome = ''
              this.form.password = ''
              this.form.premium = false
              this.selected = ''
              this.show_premium = false
              this.deposito = 1
            } else {
              router.push('/')
            }
          })
          .catch(err => console.log(err))
      },

      processPremium() {
        if (this.selected == 'prem') {
          this.show_premium = true
        } else {
          this.show_premium = false
        }
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