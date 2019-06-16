<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs1>
        </v-flex>
        <v-flex xs7>
          <h3>{{this.datosEstudiante.nombres}} <br> {{this.datosEstudiante.primer_apellido + ' ' +  this.datosEstudiante.segundo_apellido}}</h3>
        </v-flex>
        <v-flex xs4>
          <v-btn dark block color="red" @click.native="cerrarCarpeta()">Cerrar archivador</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card>
      <form @submit.prevent="submit">
        <v-card-title class="headline">
          <v-icon right>note_add</v-icon>
          <h2 class="headline mb-0">{{ this.$t('generalFollowUp.newStandartRegistry') }}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="maximizeDataPanel?minimize():maximize()">
            <v-icon>{{maximizeDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="maximizeDataPanel">
          <v-layout row wrap>
            <v-flex xs12>
              <b>{{ this.$t('generalFollowUp.date') }}: </b> {{new Date().getDate() + ' - ' + this.$t('months[' + new Date().getMonth() + ']') + ' - ' + new Date().getFullYear()}} 
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('generalFollowUp.intervention')"
                v-model="formularioRegistro.intervencion"
                :error="$v.formularioRegistro.intervencion.$error"
                @input="$v.formularioRegistro.intervencion.$touch()"
                :error-messages="errors.intervencion"
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('generalFollowUp.observation')"
                v-model="formularioRegistro.observacion"
                :error="$v.formularioRegistro.observacion.$error"
                @input="$v.formularioRegistro.observacion.$touch()"
                :error-messages="errors.observacion"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs6>
              </v-flex>
              <v-flex xs3>
                <v-btn class="seccion" dark @click.native="limpiarCampos()">{{$t('common.clear')}}
                  <v-icon right>cached</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs3>
                <v-btn class="primary" dark type="submit">{{$t('common.save')}}
                  <v-icon right>done</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-actions>
      </form>
    </v-card>
  </div>

</template>

<script>
  import { required } from 'vuelidate/lib/validators';
  import errorsHandler from '@/common/mixins/errorsHandler';
  import Comps from '../comps';
  /* eslint-disable semi */
  export default {
    mixins: [ Comps, errorsHandler ],
    data () {
      return {
        headers: {'access-token': '<your-token>'},
        maximizeDataPanel: true,
        datosEstudiante: {},
        formularioRegistro: {
          observacion: '',
          intervencion: ''
        },
        errors: {
          observacion: [],
          intervencion: []
        }
      }
    },
    components: {
    },
    watch: {
      '$v.formularioRegistro.observacion.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.observacion, this.errors.observacion);
      },
      '$v.formularioRegistro.intervencion.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.intervencion, this.errors.intervencion);
      }
    },
    created () {
      this.headers = {'Authorization': `Bearer ${this.$storage.get('token')}`};
      this.datosEstudiante = this.$storage.get('nino');
    },
    validations: {
      formularioRegistro: {
        observacion: {
          required
        },
        intervencion: {
          required
        }
      }
    },
    methods: {
      minimize () {
        this.maximizeDataPanel = false;
      },
      maximize () {
        this.maximizeDataPanel = true;
      },
      submit () { // Envía datos de la nueva asignación
        this.$v.formularioRegistro.$touch();
        if (!this.$v.formularioRegistro.$invalid) {
          this.formularioRegistro.codigoEstudiante = this.datosEstudiante.codigo;
          this.$service.post(`registroSimple`, this.formularioRegistro)
          .then(respuesta => {
            this.dialogAsignacionCurso = false
            this.limpiarCampos();
            this.$message.success('Registro creado exitosamente');
            this.$router.push('registrosArchivados');
          })
          .catch(() => {
            this.$message.error('Error an la creación del registro');
          });
        }
      },
      limpiarCampos () {
        this.formularioRegistro.observacion = '';
        this.formularioRegistro.intervencion = '';
      }
    }
  }
</script>
