<template>
  <div>
    Olá perfil
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Profile',
  data () {
    return {
      user: []
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
            this.user = response.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
