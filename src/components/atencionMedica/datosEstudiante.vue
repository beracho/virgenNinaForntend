<template>
  <div>
  <v-card>
    <v-layout row wrap>
      <v-flex xs8>
        <h3>Folder de {{this.datosEstudiante.nombres}}</h3>
      </v-flex>
      <v-flex xs4>
        <v-btn dark block color="red" @click.native="close()">Cerrar archivador</v-btn>
      </v-flex>
    </v-layout>
    <v-card-title class="headline">
      <v-icon right>perm_contact_calendar</v-icon>
      <h2 class="headline mb-0">Datos de {{this.datosEstudiante.nombres}}</h2>
      <v-spacer></v-spacer>
      <v-btn icon dark color="primary" @click.native="maximizeDataPanel?minimize():maximize()">
        <v-icon>{{maximizeDataPanel?"remove":"add"}}</v-icon>
      </v-btn>
    </v-card-title>
    <v-container fluid v-if="maximizeDataPanel">
      <v-layout row wrap>
        <v-flex xs4>
          <b>{{ this.$t('inscriptionRegister.names') }}: </b> {{this.datosEstudiante.nombres}} 
        </v-flex>
        <v-flex xs4>
          <b>{{ this.$t('inscriptionRegister.firstLastName') }}: </b> {{this.datosEstudiante.primer_apellido}} 
        </v-flex>
        <v-flex xs4>
          <b>{{ this.$t('inscriptionRegister.secondLastName') }}: </b> {{this.datosEstudiante.segundo_apellido}} 
        </v-flex>
        <v-flex xs4>
          <b>{{ this.$t('inscriptionRegister.ci') }}: </b> {{this.datosEstudiante.ci}} 
        </v-flex>
        <v-flex xs4>
          <b>Código: </b> {{this.datosEstudiante.codigo}} 
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
        datosEstudiante: {}
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
      }
    }
  }
</script>
