<template>
  <div class="row m-2">
    <div class="cat m-2">
      <v-card
        class="pa-3"
        flat
      >
        <v-card class="d-inline-block elevation-12">
          <v-navigation-drawer
            floating
            permanent
            stateless
            value="true"
          >
            <v-list dense>
              <v-list-tile
                v-for="item in categorias"
                :key="item.idCategoria"
                v-on:click="getEventos(item)"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.Designacao }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-card>
    </div>
    <div>
      <v-card
        class="pa-3"
        flat
      >
        <v-card class="d-inline-block elevation-12">
          <v-navigation-drawer
            floating
            permanent
            stateless
            value="true"
          >
            <v-list dense>
              <v-list-tile
                v-for="evento in eventosAMostrar"
                :key="evento.idEvento"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ evento.idEvento }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-card>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Categories',
  data () {
    return {
      fields: [
        'Participante',
        'Odd'
      ],
      items: [
        {Participante: 'Benfica', Odd: '2.10'},
        {Participante: 'Porto', Odd: '3.19'}
      ],
      drawer: true,
      right: null,
      categorias: [],
      eventos: [],
      eventosFiltrados: [],
      eventosAMostrar: [[]]
    }
  },
  created () {
    axios.get('http://localhost:2727/categorias')
      .then((response) => {
        this.categorias = response.data
      })

    axios.get('http://localhost:2727/eventos')
      .then(response => {
        const keys = Object.keys(response.data)
        keys.forEach(e => this.eventos.push(response.data[e]))
      })
  },
  methods: {
    getEventos: function (item) {
      this.eventosFiltrados = this.eventos.filter(e => e.idCategoria === item.idCategoria)
      const ids = Object.keys(this.eventosFiltrados)
      let index = 0
      this.eventosFiltrados.forEach(e => {
        let evento = []
        const participantes = e.participantes
        const odds = e.odds
        const keys = Object.keys(participantes)
        keys.forEach(function (k) {
          let p = {}
          p.participante = participantes[k]
          p.odd = odds[k]
          evento.push(p)
        })
        evento.idEvento = ids[index]
        this.eventosAMostrar.push(evento)
        index++
        evento = []
      })
      console.log(this.eventosAMostrar)
    }
  }
}
</script>

<style>
.cat {
  background-color: #ffa64d;
}
</style>
