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
            console.log(response.data[0])
            this.user = response.data[0]
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
