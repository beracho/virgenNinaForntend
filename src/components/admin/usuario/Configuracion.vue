<template>
  <div>
    <form @submit.prevent="submit">
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">{{$t('charts.reportPerArea')}}</h2>
        </v-card-title>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs4>
              <v-menu
                ref="menu"
                v-model="fechaInicio"
                lazy
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    slot="activator"
                    :label="$t('charts.fromDate')"
                    v-model="datosConsulta.fechaInicial"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker 
                  v-model="datosConsulta.fechaInicial" 
                  locale="es"
                  :allowed-dates="fechaInicialValida"
                  no-title scrollable actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="fechaInicio = false">{{$t('common.cancel')}}</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(datosConsulta.fechaInicial)">{{$t('common.accept')}}</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs4>
              <v-menu
                ref="menu"
                v-model="fechaFinal"
                lazy
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    slot="activator"
                    :label="$t('charts.toDate')"
                    v-model="datosConsulta.fechaFinal"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker 
                  v-model="datosConsulta.fechaFinal" 
                  locale="es" 
                  :allowed-dates="fechaFinalValida"
                  no-title scrollable actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="fechaFinal = false">{{$t('common.cancel')}}</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(datosConsulta.fechaFinal)">{{$t('common.accept')}}</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs4>
              <v-radio-group 
                :label="$t('charts.reportType')"
                v-model="datosConsulta.tipoInforme">
                <v-radio
                  key="followUp"
                  :label="$t('charts.followUp')"
                  value="followUp"
                ></v-radio>
                <v-radio
                  key="evaluation"
                  :label="$t('charts.evaluation')"
                  value="evaluation"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs8>
              <v-combobox
                v-model="datosConsulta.area"
                :filter="filter"
                :items="areaItems"
                hide-selected
                :label="$t('socialWork.familyType')"
                :error="$v.datosConsulta.area.$error"
                @input="$v.datosConsulta.area.$touch()"
                :error-messages="errors.area"
                small-chips
                multiple
              >
                <template v-slot:no-data>
                  <v-list-tile>
                    <v-chip
                      :color="`${colors[nonce - 1]} lighten-3`"
                      label
                      small
                    >
                      {{ familyTypeSearch }}
                    </v-chip>
                    <span class="subheading">{{$t('charts.noMatches')}}</span>
                  </v-list-tile>
                </template>
                <template v-slot:selection="{ item, parent, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    :color="`${item.color} lighten-3`"
                    :selected="selected"
                    label
                    small
                  >
                    <span class="pr-2">
                      {{ item.text }}
                    </span>
                    <v-icon small @click="parent.selectItem(item)">close</v-icon>
                  </v-chip>
                </template>
                <template v-slot:item="{ index, item }">
                  <v-list-tile-content>
                    <v-chip
                      :color="`${item.color} lighten-3`"
                      dark
                      label
                      small
                    >
                      {{ item.text }}
                    </v-chip>
                  </v-list-tile-content>
                </template>
              </v-combobox>
            </v-flex>
            <v-flex xs4>
              <v-radio-group 
                :label="$t('charts.frecuency')"
                v-model="datosConsulta.frecuencia">
                <v-radio
                  key="day"
                  :label="$t('charts.day')"
                  value="day"
                ></v-radio>
                <v-radio
                  key="week"
                  :label="$t('charts.week')"
                  value="week"
                ></v-radio>
                <v-radio
                  key="month"
                  :label="$t('charts.month')"
                  value="month"
                ></v-radio>
                <v-radio
                  key="year"
                  :label="$t('charts.year')"
                  value="year"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12>
              <v-btn dark block color="primary" type="submit">
                <v-icon>visibility</v-icon> Generar
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </form>
    <v-dialog v-model="GraphicView">
      <v-card>
        <v-card-title class="headline">
          <v-icon right>account_circle</v-icon>
          {{$t('charts.' + datosConsulta.tipoInforme + 'Report')}}
        </v-card-title>
        <v-layout row>
          <v-flex xs8 offset-xs2>
            <line-chart :chart-data="datacollection"></line-chart>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="true" class="seccion" dark @click.native="GraphicView = false">{{$t('common.close')}}
            <v-icon right>cancel</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators';
import errorsHandler from '@/common/mixins/errorsHandler';
import LineChart from '@/common/util/charts/LineChart.js';
export default {
  mixins: [ errorsHandler ],
  components: {
    'line-chart': LineChart
  },
  data () {
    return {
      headers: '',
      fechaInicio: false,
      fechaFinal: false,
      familyTypeSearch: null,
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange', 'pink', 'blue', 'red'],
      nonce: 1,
      areaItems: [
        { header: this.$t('socialWork.selectOrCreate') },
        {
          text: this.$t('areas.medicalDoctor'),
          color: 'blue'
        },
        {
          text: this.$t('areas.socialWork'),
          color: 'red'
        },
        {
          text: this.$t('areas.occupationalTherapy'),
          color: 'orange'
        },
        {
          text: this.$t('areas.psychomotor'),
          color: 'pink'
        },
        {
          text: this.$t('areas.physiotherapy'),
          color: 'purple'
        },
        {
          text: this.$t('areas.psycology'),
          color: 'green'
        },
        {
          text: this.$t('areas.phonoaudiology'),
          color: 'teal'
        },
        {
          text: this.$t('areas.nutrition'),
          color: 'red'
        },
        {
          text: this.$t('areas.education'),
          color: 'orange'
        }
      ],
      // Consulta
      datosConsulta: {
        fechaInicial: '',
        fechaFinal: '',
        tipoInforme: 'followUp',
        area: [],
        frecuencia: ''
      },
      errors: {
        area: []
      },
      // Vista de gráfico
      GraphicView: false,
      datacollection: null
    };
  },
  mounted () {
    this.fillData();
    this.datosConsulta.fechaFinal = this.dateFormat();
    var d = new Date();
    d.setDate(d.getDate() - 6);
    this.datosConsulta.fechaInicial = this.dateFormat(d);
  },
  methods: {
    fechaInicialValida (value) {
      if (this.datosConsulta.fechaFinal) {
        return new Date(value) < new Date(this.datosConsulta.fechaFinal);
      }
    },
    fechaFinalValida (value) {
      if (this.datosConsulta.fechaInicial) {
        return new Date(value) > new Date(this.datosConsulta.fechaInicial);
      }
    },
    submit () {
      this.$v.datosConsulta.$touch();
      if (!this.$v.datosConsulta.$invalid) {
        let areas = [];
        this.datosConsulta.area.forEach(element => {
          areas.push(element.text);
        });
        const datosEnvio = {
          fechaInicial: this.datosConsulta.fechaInicial,
          fechaFinal: this.datosConsulta.fechaFinal,
          tipoInforme: this.datosConsulta.tipoInforme,
          area: areas,
          frecuencia: this.datosConsulta.frecuencia
        };
        this.headers = {'Authorization': `Bearer ${this.$storage.get('token')}`};
        this.$service.post(`informesPorArea`, datosEnvio)
        .then(respuesta => {
        });
        this.GraphicView = true;
      } else {
        this.$message.error(this.$t('usuarios.errorFillForm'));
      }
    },
    dateFormat (fecha) {
      if (!fecha) {
        fecha = new Date();
      }
      let dd = fecha.getDate();
      if (dd < 10) {
        dd = '0' + dd;
      }
      let mm = fecha.getMonth() + 1;
      if (mm < 10) {
        mm = '0' + mm;
      }
      let nuevaFecha = fecha.getFullYear() + '-' + mm + '-' + dd;
      return nuevaFecha;
    },
    fillData () {
      this.datacollection = {
        labels: ['enero', 'febrero', 'marzo', 'abril', 'mayo'],
        datasets: [
          {
            label: 'Data One',
            fill: false,
            borderColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }, {
            label: 'Data Two',
            fill: false,
            borderColor: '#7979f8',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }, {
            label: 'Data Three',
            fill: false,
            borderColor: '#79f879',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }
        ]
      };
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    filter (item, queryText, itemText) {
      if (item.header) return false;
      const hasValue = val => val != null ? val : '';
      const text = hasValue(itemText);
      const query = hasValue(queryText);
      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1;
    },
    frecuenciaConDias (dias) {
      if (dias < 10) {
        this.datosConsulta.frecuencia = 'day';
      }
      if (dias >= 10 && dias < 120) {
        this.datosConsulta.frecuencia = 'week';
      }
      if (dias >= 120 && dias < 600) {
        this.datosConsulta.frecuencia = 'month';
      }
      if (dias >= 600) {
        this.datosConsulta.frecuencia = 'year';
      }
    }
  },
  validations: {
    datosConsulta: {
      area: {
        required
      }
    }
  },
  watch: {
    '$v.datosConsulta.area.$error': function (val) {
      this.errorHandler(this.$v.datosConsulta.area, this.errors.area);
    },
    'datosConsulta.area': function (val) {
      let datosValidos = [];
      this.datosConsulta.area.forEach(element => {
        if (element.text) {
          datosValidos.push(element);
        }
      });
      if (this.datosConsulta.area.length !== datosValidos.length) {
        this.datosConsulta.area = datosValidos;
      }
    },
    'datosConsulta.fechaInicial': function (val) {
      let dias = (new Date(this.datosConsulta.fechaFinal) - new Date(val)) / (24 * 60 * 60 * 1000);
      this.frecuenciaConDias(dias);
    },
    'datosConsulta.fechaFinal': function (val) {
      let dias = (new Date(val) - new Date(this.datosConsulta.fechaInicial)) / (24 * 60 * 60 * 1000);
      this.frecuenciaConDias(dias);
    }
  }
};
</script>
