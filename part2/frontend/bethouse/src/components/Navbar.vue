<template>
    <div>
        <b-navbar class="navbar" toggleable="lg" type="dark">
            <b-navbar-nav style="margin-left: 46.3%">
              <img class="logo" src="../assets/logo-nobg.png"/>
            </b-navbar-nav>

            <b-navbar-toggle target="nav_collapse" />

            <b-collapse is-nav id="nav_collapse">

            <!-- Right aligned nav items -->
            <b-navbar-nav v-if="show_user_info" class="ml-auto">
                <b-nav-item-dropdown right>
                    <!-- Using button-content slot -->
                    <template slot="button-content"><b style="font-size: 20px">Menu</b></template>
                    <b-dropdown-item href="#" v-if="isUser" @click="goProfile">Perfil</b-dropdown-item>
                    <b-dropdown-item href="#" @click="signout">Logout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
import router from '../router'
import VueRouter from 'vue-router';

export default {
  name: 'Navbar',

  data () {
    return {
      show_user_info: false,
      isUser: true
    }
  },

  mounted: function() {
    this.getSession()
  },

  methods: {
    getSession () {
      axios.get('http://localhost:2727/session')
        .then(response => {
          if (response.data) {
            this.show_user_info = true

            if ( typeof response.data[0].id !== 'number' ) {
              this.isUser = false
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    signout () {
      axios.get('http://localhost:2727/logout')
        .then(response => {
          router.push('/')
        })
        .catch(err => console.log(err))
    },

    goProfile () {
      router.push('/profile')
    }
  }

}
</script>

<style>
.navbar {
    height: 120px;
    background-color: black;
}

.logo {
    width: 140px;
    height: 95px;
}
</style>
