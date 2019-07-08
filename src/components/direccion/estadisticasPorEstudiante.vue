<template>
  <div>
    <v-toolbar color="secondary" dark>
      <v-icon right>school</v-icon>
      <v-toolbar-title>{{$t('menu.estadisticasPorEstudiante')}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="grey--text">{{$t('user.crud.role') + ': ' + this.$store.state.user.rol.nombre}}</span>
    </v-toolbar>
    <form @submit.prevent="submit">
      <v-card>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs4>
              <v-radio-group 
                :label="$t('charts.getStudentsBy')"
                v-model="datosConsulta.buscarPor">
                <v-radio
                  key="gestion"
                  :label="$t('courses.gestion')"
                  value="gestion"
                ></v-radio>
                <v-radio
                  key="course"
                  :label="$t('charts.course')"
                  value="course"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-if="datosConsulta.buscarPor === 'gestion'"
                :label="$t('courses.gestion')"
                v-model="datosConsulta.gestion"
                :error="$v.datosConsulta.gestion.$error"
                @input="$v.datosConsulta.gestion.$touch()"
                :error-messages="errors.gestion"
              ></v-text-field>
              <v-select 
                v-else
                :label="$t('charts.course')" 
                v-model="datosConsulta.curso" 
                v-bind:items="cursos" 
                item-text="nombre_completo" 
                item-value="id_curso"
                :error="$v.datosConsulta.curso.$error"
                @input="$v.datosConsulta.curso.$touch()"
                :error-messages="errors.curso"
              ></v-select>
            </v-flex>
            <v-flex xs4>
              <v-radio-group 
                :label="$t('charts.disability')"
                v-model="datosConsulta.discapacidad">
                <v-radio
                  key="withDisability"
                  :label="$t('charts.withDisability')"
                  value="withDisability"
                ></v-radio>
                <v-radio
                  key="withoutDisability"
                  :label="$t('charts.withoutDisability')"
                  value="withoutDisability"
                ></v-radio>
                <v-radio
                  key="both"
                  :label="$t('charts.both')"
                  value="both"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                :label="$t('courses.minimalAge')"
                v-model="datosConsulta.minimalAge"
                :error="$v.datosConsulta.minimalAge.$error"
                @input="$v.datosConsulta.minimalAge.$touch()"
                :error-messages="errors.minimalAge"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                :label="$t('courses.maximalAge')"
                v-model="datosConsulta.maximalAge"
                :error="$v.datosConsulta.maximalAge.$error"
                @input="$v.datosConsulta.maximalAge.$touch()"
                :error-messages="errors.maximalAge"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-radio-group 
                :label="$t('usuarios.gender')"
                v-model="datosConsulta.genero">
                <v-radio
                  key="maleOrFemale"
                  :label="$t('charts.maleOrFemale')"
                  value="maleOrFemale"
                ></v-radio>
                <v-radio
                  key="male"
                  :label="$t('usuarios.male')"
                  value="male"
                ></v-radio>
                <v-radio
                  key="female"
                  :label="$t('usuarios.female')"
                  value="female"
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
            <bar-chart :height="300" :chart-data="datacollection"></bar-chart>
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
import BarChart from '@/common/util/charts/BarChart.js';
import Comps from '../comps';
export default {
  mixins: [ errorsHandler, Comps ],
  components: {
    'bar-chart': BarChart
  },
  data () {
    return {
      headers: '',
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange', 'pink', 'blue', 'red'],
      cursos: [],
      // Consulta
      datosConsulta: {
        buscarPor: 'gestion',
        gestion: (new Date()).getFullYear(),
        curso: 'none',
        genero: 'maleOrFemale',
        discapacidad: 'both',
        minimalAge: 0,
        maximalAge: 12,
        fechaInicial: '',
        fechaFinal: '',
        tipoInforme: 'followUp',
        area: [],
        frecuencia: ''
      },
      errors: {
        minimalAge: [],
        maximalAge: [],
        gestion: [],
        curso: []
      },
      // Vista de gráfico
      GraphicView: false,
      datacollection: null
    };
  },
  created () {
    this.headersCsv = {'Authorization': `Bearer ${this.$storage.get('token')}`};
    this.$service.get(`cursos?gestion=actual`)
    .then(response => {
      this.cursos = response.datos;
      this.cursos.forEach(function (element) {
        element.nombre_completo = element.nombre + ' - ' + element.paralelo;
      }, this);
    });
  },
  mounted () {
  },
  methods: {
    submit () {
      this.$v.datosConsulta.$touch();
      if (!this.$v.datosConsulta.$invalid) {
        let areas = [];
        this.datosConsulta.area.forEach(element => {
          areas.push(element.text);
        });
        const datosEnvio = {
          buscarPor: this.datosConsulta.buscarPor,
          gestion: this.datosConsulta.gestion,
          curso: this.datosConsulta.curso,
          genero: this.datosConsulta.genero,
          discapacidad: this.datosConsulta.discapacidad,
          minimalAge: this.datosConsulta.minimalAge,
          maximalAge: this.datosConsulta.maximalAge
        };
        this.headers = {'Authorization': `Bearer ${this.$storage.get('token')}`};
        this.$service.post(`informesEstudiantes`, datosEnvio)
        .then(respuesta => {
          if (respuesta) {
            this.fillData(respuesta.datos.labels, respuesta.datos.dataset);
            this.GraphicView = true;
          }
        });
      } else {
        this.$message.error(this.$t('usuarios.errorFillForm'));
      }
    },
    dateFormat (fecha) {
      if (!fecha) {
        fecha = new Date();
      } else {
        fecha = new Date(fecha);
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
    getWeekNumber (d) {
      d = new Date(d);
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
      var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
      return [d.getUTCFullYear(), this.$t('charts.week') + ': ' + weekNo];
    },
    getCourseFromID (idCourse) {
      let nombreCurso = '';
      this.cursos.forEach(courseItem => {
        if (courseItem.id_curso === idCourse) {
          nombreCurso = courseItem.nombre_completo;
        }
      });
      return nombreCurso;
    },
    fillData (labelsReceiveData, datasetsReceiveData) {
      this.datacollection = {
        labels: [],
        datasets: []
      };
      let colorCounter = 0;
      labelsReceiveData.forEach(labelElement => {
        this.datacollection.labels.push(labelElement === 1 ? labelElement + ' ' + this.$t('common.year') : labelElement + ' ' + this.$t('common.years'));
      });
      datasetsReceiveData.forEach(dataElement => {
        const auxData = {
          label: this.datosConsulta.buscarPor === 'course' ? this.getCourseFromID(dataElement.label) : dataElement.label,
          // fill: false,
          // borderColor: this.colors[colorCounter % 9],
          backgroundColor: this.colors[colorCounter % 9],
          data: dataElement.data
        };
        colorCounter++;
        this.datacollection.datasets.push(auxData);
      });
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
      minimalAge: {
        required
      },
      maximalAge: {
        required
      },
      gestion: {
        required
      },
      curso: {
        required
      }
    }
  },
  watch: {
    '$v.datosConsulta.minimalAge.$error': function (val) {
      this.errorHandler(this.$v.datosConsulta.minimalAge, this.errors.minimalAge);
    },
    '$v.datosConsulta.maximalAge.$error': function (val) {
      this.errorHandler(this.$v.datosConsulta.maximalAge, this.errors.maximalAge);
    },
    '$v.datosConsulta.gestion.$error': function (val) {
      this.errorHandler(this.$v.datosConsulta.gestion, this.errors.gestion);
    },
    '$v.datosConsulta.curso.$error': function (val) {
      this.errorHandler(this.$v.datosConsulta.curso, this.errors.curso);
    },
    'datosConsulta.buscarPor': function (val) {
      if (val === 'gestion') {
        this.datosConsulta.curso = 'none';
      } else {
        this.datosConsulta.curso = '';
      }
    }
  }
};
</script>
