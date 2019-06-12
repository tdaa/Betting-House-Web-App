<template>
  <div class="container">
    <v-tabs
      centered
      color="orange"
      dark
      icons-and-text
    >
      <v-tabs-slider color="grey"></v-tabs-slider>

      <v-tab href="#tab-1">
        Apostas
        <i class="material-icons">
          monetization_on
        </i>
      </v-tab>

      <v-tab href="#tab-2">
        Dados Pessoais
        <i class="material-icons">
          face
        </i>
      </v-tab>

      <v-tab href="#tab-3">
        Carregamento
        <i class="material-icons">
          control_point
        </i>
      </v-tab>

      <v-tab-item
        v-for="i in 3"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card flat>
          <v-card-text v-if="i === 1">
            <div style="text-align: center;">
              <b-table :items="apostas" :fields="fields">
                <template slot="identificador" slot-scope="data">
                  {{ data.item.idAposta }}
                </template>
                <template slot="valor" slot-scope="data">
                  {{ data.item.valor }}
                </template>
                <template slot="ganhos_possiveis" slot-scope="data">
                  {{ data.item.ganhosPossiveis }}
                </template>
                <template slot="estado" slot-scope="data">
                  <div v-if="data.item.estado === 0">
                    <BCardText>ABERTA</BCardText>
                  </div>
                  <div v-else>
                    <BCardText>FECHADA</BCardText>
                  </div>
                </template>
                <template slot="consultar" slot-scope="row">
                  <v-layout row justify-center>
                    <v-dialog v-model="dialog" width="600px">
                      <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark v-on="on" @click="() => getEventosDeAposta(row)">Consultar aposta</v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Aposta {{ aposta }}</span>
                        </v-card-title>
                        <v-card-text>
                          <div style="text-align: center;">
                            <b-table :items="eventos" :fields="fieldsAposta">
                              <template slot="resultado" slot-scope="data">
                                {{ data.item.resultadoApostado }}
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
                          <v-btn color="orange darken-1" flat="flat" @click="dialog = false">OK</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-layout>
                </template>
              </b-table>
            </div>
          </v-card-text>
          <v-card-text v-else-if="i === 2">
            <v-container>
              <v-layout row wrap>
                <v-flex x12 sm3></v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    v-model="user.Nome"
                    label="Nome"
                    outline
                    readonly
                  ></v-text-field>
                  <v-text-field
                    v-model="user.Email"
                    label="Email"
                    outline
                    readonly
                  ></v-text-field>
                  <v-text-field
                    v-model="user.EssCoins"
                    label="Moedas"
                    outline
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex x12 sm3></v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-text v-else>
            <center>
              <b-form-group id="input-group-5" label="Carregar moedas:" label-for="input-5">
                <b-form-input
                  id="input-5"
                  type="number"
                  v-model="moedas"
                  required
                  placeholder=""
                ></b-form-input><br>
                <b-button variant="success" @click="() => addCoins()">Confirmar</b-button>
              </b-form-group>
            </center>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Profile',
  data () {
    return {
      user: [],
      text: 'taki taki',
      moedas: 0,
      apostas: [],
      aposta: 0,
      eventos: [],
      fieldsAposta: [
        'resultado',
        'odd',
        'evento'
      ],
      fields: [
        'identificador',
        'valor',
        'ganhos_possiveis',
        'estado',
        'consultar'
      ],
      dialog: false
    }
  },
  created () {
    this.getSession()
    this.getData()
  },
  methods: {
    getSession () {
      axios.get('http://localhost:2727/session')
        .then(response => {
          if (response.data) {
            this.user = response.data[0]
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getData () {
      /* axios
        .get('http://localhost:2727/apostas/:' + this.user.id, { withCredentials: true })
        .then(res => { this.apostas = res.data })
        .catch(err => console.log(err))
       */
      this.apostas = [{idAposta: 1, valor: 2.00, ganhosPossiveis: 20.00, estado: 0, eventos: [{idEvento: 1, resultadoApostado: 'Benfica', odd: 2.35}, {idEvento: 3, resultadoApostado: 'Braga', odd: 3.65}]},
        {idAposta: 3, valor: 10.00, ganhosPossiveis: 100.00, estado: 0, eventos: [{idEvento: 10, resultadoApostado: 'Barcelona', odd: 4.21}, {idEvento: 14, resultadoApostado: 'Chelsea', odd: 2.78}]}]
    },
    getEventosDeAposta (row) {
      let id = row.item.idAposta
      this.aposta = id
      let e = this.apostas.filter(a => a.idAposta === id)
      this.eventos = e[0].eventos
    }
  }
}
</script>
