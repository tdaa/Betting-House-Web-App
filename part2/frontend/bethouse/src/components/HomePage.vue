<template>
  <div>
    <div class="row">
      <div class="col-md-7">
        <div style="margin-top: 20px; padding-left: 10px">
          <b-card style="font-size: 17px;" header="Categorias" no-body header-bg-variant="dark" header-text-variant="white">
            <b-tabs pills vertical>
              <b-tab v-for="item in categorias" :key="`${item.idCategoria}`" :title="`${item.Designacao}`" title-link-class="btn btn-dark orange" active @click="() => getEventosDeCategoria(item)">
                <b-card-text v-for="evento in eventosCategoria" :key="evento.idEvento">
                  <b-card :header="`Evento ${evento.idEvento}`">
                    <div class="text-center">
                      <b-table :items="evento" :fields="fields">
                        <template slot="index" slot-scope="data">
                          {{ data.item.idParticipante}}
                        </template>
                        <template slot="participante" slot-scope="data">
                          {{ data.item.participante }}
                        </template>
                        <template slot="odd" slot-scope="data">
                          {{ data.item.odd }}
                        </template>
                        <template slot="aposta" slot-scope="row">
                          <b-button variant="warning" @click="() => addEvento(row, evento.idEvento)">Apostar!</b-button>
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
        <div style="margin-top: 20px;">
          <b-card style="font-size: 17px; max-width: 95%;" header="Boletim" no-body header-bg-variant="dark" header-text-variant="white">
            <div style="text-align: center;">
              <b-table :items="items" :fields="fieldsAposta">
                <template slot="participante" slot-scope="data">
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
import axios from 'axios'
export default {
  name: 'HomePage',
  data () {
    return {
      quantia: 0,
      ganhos: 0,
      fields: [
        // A virtual column that doesn't exist in items
        'index',
        'participante',
        'odd',
        'aposta'
      ],
      fieldsAposta: [
        'participante',
        'odd',
        'evento',
        'remover'
      ],
      items: [],
      categorias: [],
      eventos: [],
      eventosFiltrados: [],
      eventosAMostrar: [[]],
      eventosCategoria: [[]]
    }
  },
  created () {
    this.getCategories()
    this.getEventos()
  },
  methods: {
    getCategories () {
      axios
        .get('http://localhost:2727/categorias')
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
      const ids = Object.keys(this.eventosFiltrados)
      let index = 0
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
        evento.idEvento = ids[index]
        this.eventosAMostrar.push(evento)
        index++
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
    },
    removerEventoDeAposta (row) {
      this.items.pop(row.index)
    }
  }
}
</script>
