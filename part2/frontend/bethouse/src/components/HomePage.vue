<template>
  <div>
    <div class="container" style="width: 30%">
      <b-alert v-model="showErrorAlert" variant="danger" dismissible>
        Não possui EssCoins suficientes!
      </b-alert>
    </div>
    <div class="row">
      <div class="col-md-7">
        <div style="padding-left: 10px">
          <b-card style="font-size: 17px;" header="Categorias" no-body header-bg-variant="dark" header-text-variant="white">
            <b-tabs pills vertical>
              <b-tab v-for="item in categorias" :key="`${item.idCategoria}`" :title="`${item.Designacao}`" title-link-class="btn btn-dark orange" active @click="() => getEventosDeCategoria(item)">
                <b-card-text v-for="evento in eventosCategoria" :key="evento.idEvento">
                  <b-card :header="`Evento ${evento.idEvento} - ${evento.data}`">
                    <div class="text-center">
                      <b-table :items="evento" :fields="fields">
                        <template slot="identificador" slot-scope="data">
                          {{ data.item.idParticipante}}
                        </template>
                        <template slot="resultado" slot-scope="data">
                          {{ data.item.participante }}
                        </template>
                        <template slot="odd" slot-scope="data">
                          {{ data.item.odd }}
                        </template>
                        <template slot="aposta" slot-scope="row">
                          <b-button variant="warning" @click="() => addEvento(row, evento.idEvento)">Apostar!</b-button>
                        </template>
                        <template slot="info_extra" slot-scope="row">
                          <div v-if="user.isPremium === 1">
                            <v-layout row justify-center>
                              <v-dialog v-model="dialogInfo" width="600px">
                                <template v-slot:activator="{ on }">
                                  <b-button variant="warning" v-on="on" @click="() => getInfoExtra(row)">Obter!</b-button>
                                </template>
                                <v-card>
                                  <v-card-title>
                                    <span class="headline">Informação extra sobre {{ part }}</span>
                                  </v-card-title>
                                  <v-card-text>
                                    <div style="text-align: center;">
                                      <b-table head-variant="dark" :items="info" :fields="fieldsInfo">
                                        <template slot="número_de_participações" slot-scope="data">
                                          {{ data.item.num_matches }}
                                        </template>
                                        <template slot="número_de_vitórias" slot-scope="data">
                                          {{ data.item.num_victories }}
                                        </template>
                                        <template slot="percentagem" slot-scope="data">
                                          {{ Math.round((data.item.num_victories / data.item.num_matches) * 100) }} %
                                        </template>
                                      </b-table>
                                    </div>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="orange darken-1" flat="flat" @click="dialogInfo = false"><b>OK</b></v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-layout>
                          </div>
                          <div v-else>
                            Apenas Premium!
                          </div>
                        </template>
                      </b-table>
                    </div>
                  </b-card>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
      <div class="col-md-5">
        <div>
          <b-card style="font-size: 17px; max-width: 95%;" header="Boletim" no-body header-bg-variant="dark" header-text-variant="white">
            <div style="text-align: center;">
              <b-table :items="items" :fields="fieldsAposta">
                <template slot="resultado" slot-scope="data">
                  {{ data.item.participante }}
                </template>
                <template slot="odd" slot-scope="data">
                  {{ data.item.odd }}
                </template>
                <template slot="evento" slot-scope="data">
                  {{ data.item.evento }}
                </template>
                <template slot="remover" slot-scope="row">
                  <b-button variant="danger" @click="() => removerEventoDeAposta(row)">X</b-button>
                </template>
              </b-table>
            </div>
            <template>
              <div class="ml-2">
                <label for="montante">Montante a apostar:</label>
                <div class="row">
                  <div class="col-sm-7">
                    <b-form-input id="montante" v-model="quantia" type="number"></b-form-input>
                  </div>
                  <div class="col-sm-5 pl-2">
                    <b-button variant="success" @click="() => submeterAposta()">Submeter!</b-button>
                  </div>
                </div>
                <div class="pt-2">Ganhos Possíveis: {{ quantia * ganhos }}</div>
              </div>
            </template>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import router from '../router'
import axios from 'axios'

export default {
  name: 'HomePage',
  data () {
    return {
      moment: require('moment'),
      showErrorAlert: false,
      user: {},
      quantia: 0,
      ganhos: 0,
      fields: [
        // A virtual column that doesn't exist in items
        'identificador',
        'resultado',
        'odd',
        'aposta',
        'info_extra'
      ],
      fieldsAposta: [
        'resultado',
        'odd',
        'evento',
        'remover'
      ],
      fieldsInfo: [
        'número_de_participações',
        'número_de_vitórias',
        'percentagem'
      ],
      items: [],
      categorias: [],
      eventos: [],
      eventosFiltrados: [],
      eventosAMostrar: [[]],
      eventosCategoria: [[]],
      info: [],
      part: '',
      dialogInfo: false
    }
  },

  created () {
    axios.get('http://localhost:2727/session')
      .then(response => {
        if (response.data) {
          if (typeof response.data[0].id === 'number') {
            this.user = response.data[0]
            this.getCategories()
            this.getEventos()
          } else {
            router.push('/')
          }
        } else {
          router.push('/')
        }
      })
      .catch(err => console.log(err))
  },

  methods: {
    getCategories () {
      axios
        .get('http://localhost:2727/categorias', { withCredentials: true })
        // eslint-disable-next-line no-return-assign
        .then(res => this.categorias = res.data)
        .catch(err => console.log(err))
    },

    getEventos: function () {
      axios.get('http://localhost:2727/eventos')
        .then(response => {
          const keys = Object.keys(response.data)
          keys.forEach(e => this.eventos.push(response.data[e]))
          this.parseEventos(this.eventos)
        })
        .catch(err => console.log(err))
    },

    parseEventos: function (list) {
      this.eventosFiltrados = list.filter(e => e.idCategoria === 1)
      // const ids = Object.keys(this.eventosFiltrados)
      // let index = 0
      this.eventosFiltrados.forEach(e => {
        let evento = []
        const participantes = e.participantes
        const odds = e.odds
        const keys = Object.keys(participantes)
        let indexParticipante = 1
        keys.forEach(function (k) {
          let p = {}
          p.participante = participantes[k]
          p.odd = odds[k]
          p.idParticipante = indexParticipante
          evento.push(p)
          indexParticipante++
        })
        evento.categoria = e.idCategoria
        evento.idEvento = e.Evento
        evento.data = this.moment(e.DiaHora).format("DD/MM/YYYY H:mm:ss")
        this.eventosAMostrar.push(evento)
        // index++
        evento = []
      })
      this.eventosCategoria = this.eventosAMostrar.filter(e => e.categoria === 1)
    },

    getEventosDeCategoria (item) {
      this.eventosCategoria = this.eventosAMostrar.filter(e => e.categoria === item.idCategoria)
    },

    addEvento (i, ie) {
      let flag = false
      for (var it in this.items) {
        if (this.items[it].evento === ie) flag = true
      }
      if (!flag) {
        let obj = {idParticipante: i.item.idParticipante, participante: i.item.participante, odd: i.item.odd, evento: ie}
        this.items.push(obj)
        this.ganhos += i.item.odd
      }
    },

    submeterAposta () {
      if (this.user.EssCoins - this.quantia < 0) {
        this.showErrorAlert = true
      } else {
        let data = []
        let aposta = {}

        this.items.forEach(it => {
          aposta.evento = it.evento
          aposta.resultado = it.participante
          aposta.odd = it.odd
          aposta.valor = this.quantia
          data.push(aposta)
          aposta = {}
        })

        axios.post('http://localhost:2727/apostar', data)
          .then(response => {
            if (response.data) {
              this.items = []
              this.quantia = 0
            }
          })
          .catch(errors => {
            console.log(errors)
          })
      }
    },

    removerEventoDeAposta (row) {
      this.items.pop(row.index)
    },

    getInfoExtra (row) {
        this.part = row.item.participante
        this.info = []
        axios
          .get('http://localhost:2727/infoParticipante/' + row.item.participante)
          .then(res => {
            this.info.push(res.data)
          })
          .catch(err => console.log(err))
    }

  }
}
</script>
