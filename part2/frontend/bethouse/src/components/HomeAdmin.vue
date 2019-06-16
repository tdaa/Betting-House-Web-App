<template>
  <div>
    <div class="row" style="margin-top: 20px">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <b-alert v-model="showSucessoEventoNovo" variant="success" dismissible>
          Evento registado com sucesso!
        </b-alert>
      </div>
      <div class="col-md-3"></div>
    </div>
    <div class="container">
      <v-tabs
        centered
        color="orange"
        dark
        icons-and-text
      >
        <v-tabs-slider color="grey"></v-tabs-slider>

        <v-tab href="#tab-1">
          Utilizadores
          <i class="material-icons">
            face
          </i>
        </v-tab>

        <v-tab href="#tab-2">
          Eventos
          <i class="material-icons">
            today
          </i>
        </v-tab>

        <v-tab href="#tab-3">
          Categorias
          <i class="material-icons">
            list
          </i>
        </v-tab>

        <v-tab href="#tab-4">
          Participantes
          <i class="material-icons">
            line_weight
          </i>
        </v-tab>

        <v-tab-item
          v-for="i in 4"
          :key="i"
          :value="'tab-' + i"
        >
          <v-card flat>
            <v-card-text v-if="i === 1">
              <div style="text-align: center;">
                <b-table head-variant="dark" :items="users" :fields="fieldsUser">
                  <template slot="detalhes" slot-scope="row">
                    <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                      {{ row.detailsShowing ? 'Ocultar' : 'Consultar'}} Apostas
                    </b-button>
                  </template>
                  <template slot="row-details" slot-scope="row">
                    <b-card border-variant="secondary">
                      <b-card-title>
                        <span class="headline">Apostas de {{ row.item.nome }}</span>
                      </b-card-title>
                      <b-table :items="row.item.apostas" :fields="fields.values()">
                        <template slot="ganhos_possiveis" slot-scope="data">
                          {{ Math.round(data.item.ganhosPossiveis * 100) / 100 }}
                        </template>
                        <template slot="estado" slot-scope="data">
                          <div v-if="data.item.estado === 0">
                            <BCardText>FECHADA</BCardText>
                          </div>
                          <div v-else>
                            <BCardText>ABERTA</BCardText>
                          </div>
                        </template>
                        <template slot="eventos" slot-scope="row">
                          <v-layout row justify-center>
                            <v-dialog v-model="dialogEventos" width="600px">
                              <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark v-on="on" @click="() => getEventosDeAposta(row)">Ver detalhes</v-btn>
                              </template>
                              <v-card>
                                <v-card-title>
                                  <span class="headline">Aposta {{ row.item.idAposta }}</span>
                                </v-card-title>
                                <v-card-text>
                                  <div style="text-align: center;">
                                    <b-table :items="row.item.eventos" :fields="fieldsAposta.values()">
                                      <template slot="resultado_apostado" slot-scope="data">
                                        {{ data.item.resultado }}
                                      </template>
                                      <template slot="odd" slot-scope="data">
                                        {{ data.item.odd }}
                                      </template>
                                      <template slot="evento" slot-scope="data">
                                        {{ data.item.idEvento }}
                                      </template>
                                    </b-table>
                                  </div>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="orange darken-1" flat="flat" @click="dialogEventos = false"><b>OK</b></v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </v-layout>
                        </template>
                      </b-table>
                    </b-card>
                  </template>
                </b-table>
              </div>
            </v-card-text>
            <v-card-text v-else-if="i === 2">
              <div style="text-align: center">
                <b-card>
                  <b-table head-variant="dark" :items="eventosAll" :fields="fieldsEventos" style="margin-top: 10px">
                    <template slot="evento" slot-scope="data">
                      {{ data.item.Evento }}
                    </template>
                    <template slot="categoria" slot-scope="data">
                      {{ data.item.Categoria }}
                    </template>
                    <template slot="estado" slot-scope="data">
                      <div v-if="data.item.estado === 0">
                        <BCardText>FECHADO</BCardText>
                      </div>
                      <div v-else>
                        <BCardText>ABERTO</BCardText>
                      </div>
                    </template>
                    <template slot="dia_e_hora" slot-scope="data">
                      {{ moment(data.item.DiaHora).format("DD/MM/YYYY H:mm:ss") }}
                    </template>
                    <template slot="detalhes" slot-scope="row">
                      <v-layout row justify-center>
                        <v-dialog v-model="dialogSingleEvento" width="600px">
                          <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark v-on="on" @click="() => getEvento(row)">Ver detalhes</v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="headline">Informação sobre Evento</span>
                            </v-card-title>
                            <v-card-text>
                              <div style="text-align: center;">
                                <b-table head-variant="dark" :items="evento" :fields="fieldsEvento">
                                  <template slot="participantes" slot-scope="data">
                                    {{ data.item.participante }}
                                  </template>
                                  <template slot="odds" slot-scope="data">
                                    {{ data.item.odd }}
                                  </template>
                                </b-table>
                              </div>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="orange darken-1" flat="flat" @click="dialogSingleEvento = false"><b>OK</b></v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-layout>
                    </template>
                  </b-table>
                  <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6"></div>
                    <div class="col-md-3" style="text-align: center">
                      <template>
                        <div>
                          <b-button @click="show=true" variant="secondary">Novo Evento</b-button>

                          <b-modal
                            v-model="show"
                            title="Registar novo evento"
                            header-bg-variant="secondary"
                            header-text-variant="light"
                            body-bg-variant="light"
                            body-text-variant="dark"
                            footer-bg-variant="secondary"
                            footer-text-variant="light"
                            size="lg"
                          >
                            <div class="row" style="margin-top: 20px">
                              <div class="col-md-3"></div>
                              <div class="col-md-6">
                                <b-alert v-model="showPartsAlert" variant="success" dismissible>
                                  Participantes registados!
                                </b-alert>
                              </div>
                              <div class="col-md-3"></div>
                            </div>
                            <b-container fluid>
                              <b-row class="mb-2 text-center">
                                <b-col>Participantes</b-col>
                                <b-col>Odds</b-col>
                              </b-row>
                              <b-row class="mb-2">
                                <b-col>
                                  <b-form-select
                                    required
                                    v-model="participante"
                                    :options="resDes"
                                  ></b-form-select>
                                </b-col>
                                <b-col>
                                  <b-form-input
                                    required
                                    class="w-100"
                                    v-model="odd"
                                    type="number"
                                  ></b-form-input>
                                </b-col>
                              </b-row>
                            </b-container>

                            <b-container fluid style="padding-top: 20px">
                              <b-row class="mb-2 text-center">
                                <b-col></b-col>
                                <b-col><b-button variant="danger" @click="() => novoParticipante()">Guardar Participante e Odd</b-button></b-col>
                                <b-col></b-col>
                              </b-row>
                            </b-container>

                            <v-divider></v-divider>

                            <b-container fluid>
                              <b-row class="mb-2 text-center">
                                <b-col>Data</b-col>
                                <b-col>Hora</b-col>
                              </b-row>
                              <b-row class="mb-2">
                                <b-col>
                                  <b-form-input
                                    required
                                    v-model="data"
                                    type="date">
                                  </b-form-input>
                                </b-col>
                                <b-col>
                                  <b-form-input
                                    required
                                    v-model="hora"
                                    type="time">
                                  </b-form-input>
                                </b-col>
                              </b-row>
                            </b-container>

                            <v-divider></v-divider>

                            <b-container fluid>
                              <b-row class="mb-2 text-center">
                                <b-col></b-col>
                                <b-col>Categoria</b-col>
                                <b-col></b-col>
                              </b-row>
                              <b-row class="mb-2">
                                <b-col></b-col>
                                <b-col>
                                  <b-form-select
                                    required
                                    v-model="categoria"
                                    :options="catDes"
                                  ></b-form-select>
                                </b-col>
                                <b-col></b-col>
                              </b-row>
                            </b-container>

                            <div slot="modal-footer" class="w-100">
                              <b-button
                                variant="warning"
                                size="md"
                                class="float-right"
                                @click="registaEvento"
                              >
                                Confirmar
                              </b-button>
                            </div>
                          </b-modal>
                        </div>
                      </template>
                    </div>
                  </div>
                </b-card>
              </div>
            </v-card-text>
            <v-card-text v-else-if="i === 3">
              <div class="text-center">
                <b-alert v-model="showErrorCat" variant="danger" dismissible>
                  Categoria já existente!
                </b-alert>
              </div>
              <div class="text-center">
                <b-alert v-model="showCatAlert" variant="success" dismissible>
                  Categoria registada com sucesso!
                </b-alert>
              </div>
              <div class="text-center">
                <b-table head-variant="dark" :items="categorias" :fields="fieldsCategorias">
                  <template slot="identificador" slot-scope="data">
                    {{ data.item.idCategoria }}
                  </template>
                  <template slot="categoria" slot-scope="data">
                    {{ data.item.Designacao }}
                  </template>
                </b-table>
                <b-button @click="showNovaCategoria=true" variant="secondary">Nova Categoria</b-button>
                <b-modal
                  v-model="showNovaCategoria"
                  title="Registar nova categoria"
                  header-bg-variant="secondary"
                  header-text-variant="light"
                  body-bg-variant="light"
                  body-text-variant="dark"
                  footer-bg-variant="secondary"
                  footer-text-variant="light"
                  size="lg"
                >
                  <div class="row" style="margin-top: 20px">
                    <div class="col-md-3"></div>
                    <div class="col-md-3"></div>
                  </div>
                  <b-container fluid>
                    <b-row class="mb-2 text-center">
                      <b-col>Designação da categoria</b-col>
                    </b-row>
                    <b-row class="mb-2">
                      <b-col></b-col>
                      <b-col>
                        <b-form-input
                          required
                          class="w-100"
                          v-model="novacat"
                          type="text"
                        ></b-form-input>
                      </b-col>
                      <b-col></b-col>
                    </b-row>
                  </b-container>

                  <div slot="modal-footer" class="w-100">
                    <b-button
                      variant="warning"
                      size="md"
                      class="float-right"
                      @click="registaCategoria"
                    >
                      Confirmar
                    </b-button>
                  </div>
                </b-modal>
              </div>
            </v-card-text>
            <v-card-text v-else>
              <div class="text-center">
                <b-alert v-model="showErrorParticipante" variant="danger" dismissible>
                  Participante já existente!
                </b-alert>
              </div>
              <div class="text-center">
                <b-alert v-model="showNovoPartAlert" variant="success" dismissible>
                  Participante registado com sucesso!
                </b-alert>
              </div>
              <div class="text-center">
                <b-table head-variant="dark" :items="resultados" :fields="fieldsParticipante">
                  <template slot="identificador" slot-scope="data">
                    {{ data.item.idResultado }}
                  </template>
                  <template slot="designação_de_participante" slot-scope="data">
                    {{ data.item.Designacao }}
                  </template>
                </b-table>
                <b-button @click="showNovoParticipante=true" variant="secondary">Novo Participante</b-button>
                <b-modal
                  v-model="showNovoParticipante"
                  title="Registar novo participante"
                  header-bg-variant="secondary"
                  header-text-variant="light"
                  body-bg-variant="light"
                  body-text-variant="dark"
                  footer-bg-variant="secondary"
                  footer-text-variant="light"
                  size="lg"
                >
                  <div class="row" style="margin-top: 20px">
                    <div class="col-md-3"></div>
                    <div class="col-md-3"></div>
                  </div>
                  <b-container fluid>
                    <b-row class="mb-2 text-center">
                      <b-col>Designação do participante</b-col>
                    </b-row>
                    <b-row class="mb-2">
                      <b-col></b-col>
                      <b-col>
                        <b-form-input
                          required
                          class="w-100"
                          v-model="novopart"
                          type="text"
                        ></b-form-input>
                      </b-col>
                      <b-col></b-col>
                    </b-row>
                  </b-container>

                  <div slot="modal-footer" class="w-100">
                    <b-button
                      variant="warning"
                      size="md"
                      class="float-right"
                      @click="registaParticipante"
                    >
                      Confirmar
                    </b-button>
                  </div>
                </b-modal>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
import router from '../router'

export default {
  name: 'Profile',

  data () {
    return {
      show: false,
      participante: '',
      parts: [],
      novopart: '',
      odd: '',
      data: '',
      datetime: '',
      hora: '',
      categoria: '',
      categorias: [],
      catDes: [],
      resultados: [],
      resDes: [],
      novacat: '',
      showErrorAlert: false,
      moment: require('moment'),
      nome: '',
      users: [],
      moedas: 0,
      apostas: [],
      aposta: 0,
      eventosUser: [],
      eventosAll: [],
      evento: [],
      fieldsAposta: [
        'resultado_apostado',
        'odd',
        'evento'
      ],
      fieldsUser: [
        'nome',
        'email',
        'detalhes'
      ],
      fields: [
        'identificador',
        'valor_apostado',
        'ganhos_possiveis',
        'estado'
      ],
      fieldsEventos: [
        'evento',
        'categoria',
        'dia_e_hora',
        'estado',
        'detalhes'
      ],
      fieldsEvento: [
        'participantes',
        'odds'
      ],
      fieldsCategorias: [
        'identificador',
        'categoria'
      ],
      fieldsParticipante: [
        'identificador',
        'designação_de_participante'
      ],
      dialogEventos: false,
      dialogSingleEvento: false,
      dialogNovoEvento: false,
      table: true,
      showPartsAlert: false,
      showSucessoEventoNovo: false,
      showNovaCategoria: false,
      showCatAlert: false,
      showErrorCat: false,
      showErrorParticipante: false,
      showNovoPartAlert: false,
      showNovoParticipante: false,
      evs: []
    }
  },

  created () {
    axios.get('http://localhost:2727/session')
      .then(response => {
        if (response.data) {
          if (typeof response.data[0].id !== 'number') {
            this.getData()
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
    getData () {
      axios
        .get('http://localhost:2727/eventos')
        .then(res => {
          const keys = Object.keys(res.data)
          keys.forEach(e => this.eventosAll.push(res.data[e]))
        })
        .catch(err => console.log(err))

      axios
        .get('http://localhost:2727/categorias', { withCredentials: true })
        .then(res => {
          if (res.data) {
            this.categorias = res.data
            this.categorias.forEach(c => { this.catDes.push(c.Designacao) })
          }
        })
        .catch(err => console.log(err))

      axios
        .get('http://localhost:2727/resultados', { withCredentials: true })
        .then(res => {
          if (res.data) {
            this.resultados = res.data
            this.resultados.forEach(r => { this.resDes.push(r.Designacao) })
          }
        })
        .catch(err => console.log(err))
      
      axios.get('http://localhost:2727/utilizadores', { withCredentials: true })
        .then(response => {
          console.log(response)

          if (response.data) {
          }
        })
        .catch(err => console.log(err))
      
      this.users = [
        {
          idUser: 1,
          nome: 'Miguel',
          email: 'miguel@gmail.com',
          apostas: [
            {
              idAposta: 1,
              valor: 20.00,
              estado: 0,
              ganhosPossiveis: 32.00,
              eventos: [
                {
                  idEvento: 1,
                  resultado: 'Benfica',
                  odd: 2.36
                }
              ]
            }
          ]
        },
        {
          idUser: 2,
          nome: 'Joana',
          email: 'joana@gmail.com',
          apostas: [
            {
              idAposta: 2,
              valor: 10.00,
              estado: 0,
              ganhosPossiveis: 100.00,
              eventos: [
                {
                  idEvento: 5,
                  resultado: 'Barcelona',
                  odd: 4.36
                }
              ]
            }
          ]
        }
      ]
    },

    getApostasUser (row) {
      let email = row.item.email
      let apostas = this.users.filter(u => u.email === email)
      this.apostas = apostas[0].apostas
      this.nome = row.item.nome
    },

    getEventosDeAposta (row) {
      let id = row.item.idAposta
      this.aposta = id
      let e = this.apostas.filter(a => a.idAposta === id)
      this.eventosUser = e[0].eventos
    },

    async getEvento (row) {
      let id = row.item.Evento
      let e = this.eventosAll.filter(e => e.Evento === id)
      await e.forEach(e => {
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
        this.evento = evento
      })
    },

    novoParticipante () {
      if (this.participante !== '' && this.odd !== '') {
        let p = {}
        p.participante = this.participante
        p.odd = this.odd
        this.parts.push(p)
        this.showPartsAlert = true
        this.participante = ''
        this.odd = ''
      }
    },

    registaEvento () {
      this.show = false

      this.datetime = this.data + ' ' + this.hora

      let data = {
        resOdds: this.parts,
        diahora: this.datetime,
        categoria: this.categoria
      }

      axios
        .post('http://localhost:2727/evento', data, { withCredentials: true })
        .then(res => {
          if (res.data) {
            this.showSucessoEventoNovo = true
          }
        })
        .catch(err => console.log(err))
    },

    registaCategoria () {
      let data = {
        novaCategoria: this.novacat
      }
      this.showNovaCategoria = false

      if (!this.catDes.includes(this.novacat)) {
        axios
          .post('http://localhost:2727/categoria', data, { withCredentials: true })
          .then(res => {
            if (res.data) {
              this.showCatAlert = true
              this.categorias.push( { idCategoria: res.data.idCategoria, Designacao: res.data.Designacao } );
              this.catDes.push(res.data.Designacao)
            }
          })
          .catch(err => console.log(err))
      } else {
        this.showErrorCat = true;
      }

      this.novacat = ''
    },

    registaParticipante () {
      let data = {
        novoParticipante: this.novopart
      }
      this.showNovoParticipante = false

      console.log(this.resDes)

      if (!this.resDes.includes(this.novopart)) {
        axios
          .post('http://localhost:2727/resultado', data, { withCredentials: true })
          .then(res => {
            if (res.data) {
              this.showNovoPartAlert = true
              this.resultados.push( { idResultado: res.data.idResultado, Designacao: res.data.Designacao } );
              this.resDes.push(res.data.Designacao)
            }
          })
          .catch(err => console.log(err))
      } else {
        this.showErrorParticipante = true;
      }

      this.novopart = ''
    }
  }
}
</script>
