<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs1>
        </v-flex>
        <v-flex xs7>
          <h3>{{this.datosEstudiante.nombres + ' ' +  this.datosEstudiante.primer_apellido + ' ' +  this.datosEstudiante.segundo_apellido}}</h3>
        </v-flex>
        <v-flex xs4>
          <v-btn dark block color="red" @click.native="cerrarCarpeta()">Cerrar archivador</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card>
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
          <v-flex xs6>
            <v-text-field :label="$t('generalFollowUp.intervention')" v-model="formularioRegistro.intervencion"></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field :label="$t('generalFollowUp.observation')" v-model="formularioRegistro.observacion"></v-text-field>
          </v-flex>
          <v-flex xs6>
          </v-flex>
          <v-flex xs3>
            <v-btn class="seccion" dark @click.native="limpiarCampos()">{{$t('common.clear')}}
              <v-icon right>cached</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs3>
            <v-btn class="primary" dark v-on:click="crearRegistro()">{{$t('common.save')}}
              <v-icon right>done</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>

</template>

<script>
  import Comps from '../comps';
  /* eslint-disable semi */
  export default {
    mixins: [ Comps ],
    data () {
      return {
        headers: {'access-token': '<your-token>'},
        maximizeDataPanel: true,
        datosEstudiante: {},
        formularioRegistro: {
          observacion: '',
          intervencion: ''
        }
      }
    },
    components: {
    },
    watch: {
    },
    created () {
      this.headers = {'Authorization': `Bearer ${this.$storage.get('token')}`};
      this.datosEstudiante = this.$storage.get('nino');
    },
    methods: {
      minimize () {
        this.maximizeDataPanel = false;
      },
      maximize () {
        this.maximizeDataPanel = true;
      },
      focus (boton) {
      },
      crearRegistro () { // Envía datos de la nueva asignación
        this.$service.post(`registroSimple`, {
          'observacion': this.formularioRegistro.observacion,
          'intervencion': this.formularioRegistro.intervencion,
          'codigoEstudiante': this.datosEstudiante.codigo
        })
        .then(respuesta => {
          this.dialogAsignacionCurso = false
          this.cargarAsignaciones();
        });
        this.formularioRegistro.observacion = '';
        this.formularioRegistro.intervencion = '';
      },
      limpiarCampos () {
        this.formularioRegistro.observacion = '';
        this.formularioRegistro.intervencion = '';
      },
      cerrarCarpeta (userData) {
        if (this.$storage.exist('menu')) {
          let nuevoMenu = this.$storage.get('menu');
          nuevoMenu[0].visible = true;
          nuevoMenu[1].visible = false;
          // this.recargaMenu(nuevoMenu);
          this.$storage.set('menu', nuevoMenu);
          this.$storage.set('nino', {});
          this.$router.push('busquedaNino');
        } else {
          this.$message.error(this.$t('error.wrongUrl'));
        }
      }
    }
  }
</script>
