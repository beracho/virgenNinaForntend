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
          <v-btn dark block color="red" @click.native="cerrarCarpeta()">{{$t('socialWork.closeFolder')}}</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card>
      <v-card-title class="headline">
        <v-icon right>subject</v-icon>
        <h2 class="headline mb-0">{{$t('usuarios.personalData')}}</h2>
        <v-spacer></v-spacer>
        <v-btn icon dark color="primary" @click.native="generalDataPanel?minimize(0):maximize(0)">
          <v-icon>{{generalDataPanel?"remove":"add"}}</v-icon>
        </v-btn>
      </v-card-title>
      <v-container fluid v-if="generalDataPanel">
        <v-layout row wrap>
          <v-flex xs6>
            <b>{{ this.$t('common.code') }}: </b>
          </v-flex>
          <v-flex xs6>
            <b>{{ this.$t('inscriptionRegister.subNames') }}: </b> {{datosEstudiante.primer_apellido ? datosEstudiante.primer_apellido : this.$t('generalFollowUp.notRegistered')}} {{datosEstudiante.segundo_apellido ? datosEstudiante.segundo_apellido : this.$t('generalFollowUp.notRegistered')}} {{datosEstudiante.nombres ? datosEstudiante.nombres : this.$t('generalFollowUp.notRegistered')}}
          </v-flex>
          <v-flex xs6>
            <b>{{ this.$t('inscriptionRegister.bornDate') }}: </b> {{datosEstudiante.segundo_apellido ? datosEstudiante.segundo_apellido : this.$t('generalFollowUp.notRegistered')}}
          </v-flex>
          <v-flex xs6>
            <b>{{ this.$t('generalFollowUp.age') }}: </b> {{datosEstudiante.nombres ? datosEstudiante.nombres : this.$t('generalFollowUp.notRegistered')}}
          </v-flex>
          <v-flex xs6>
            <b>{{ this.$t('socialWork.admissionDate') }}: </b> 
          </v-flex>
          <v-flex xs6>
            <b>{{ this.$t('socialWork.readmissionDate') }}: </b> 
          </v-flex>
          <v-flex xs6>
            <b>{{ this.$t('usuarios.gender') }}: </b> 
          </v-flex>
          <v-flex xs6>
            <b>{{ this.$t('inscriptionRegister.telefon') }}: </b> 
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-card>
      <v-card-title class="headline">
        <v-icon right>subject</v-icon>
        <h2 class="headline mb-0">{{$t('socialWork.familyInformation')}}</h2>
        <v-spacer></v-spacer>
        <v-btn icon dark color="primary" @click.native="familyDataPanel?minimize(1):maximize(1)">
          <v-icon>{{familyDataPanel?"remove":"add"}}</v-icon>
        </v-btn>
      </v-card-title>
      <v-container fluid v-if="familyDataPanel">
        <family-members :studentCode="datosEstudiante.codigo" :createRelation="true" :editRelation="true"></family-members>
      </v-container>
    </v-card>
  </div>

</template>

<script>
  import { required } from 'vuelidate/lib/validators';
  import errorsHandler from '@/common/mixins/errorsHandler';
  import FamilyMember from '@/common/util/FamilyMember.vue';
  import Comps from '../comps';
  /* eslint-disable semi */
  export default {
    mixins: [ Comps, errorsHandler ],
    data () {
      return {
        headers: {'access-token': '<your-token>'},
        generalDataPanel: true,
        familyDataPanel: true,
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
      'family-members': FamilyMember
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
      minimize (cardNumber) {
        switch (cardNumber) {
          case 0:
            this.generalDataPanel = false;
            break;
          case 1:
            this.familyDataPanel = false;
            break;
          case 2:
            this.backgroundDataPanel = false;
            break;
          case 3:
            this.psychomotorEvaluationDataPanel = false;
            break;
          default:
            break;
        }
      },
      maximize (cardNumber) {
        switch (cardNumber) {
          case 0:
            this.generalDataPanel = true;
            break;
          case 1:
            this.familyDataPanel = true;
            break;
          case 2:
            this.backgroundDataPanel = true;
            break;
          case 3:
            this.psychomotorEvaluationDataPanel = true;
            break;
          default:
            break;
        }
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
      },
      cerrarCarpeta (userData) {
        if (this.$storage.exist('menu')) {
          let nuevoMenu = this.$storage.get('menu');
          nuevoMenu[0].visible = true;
          nuevoMenu[1].visible = false;
          this.$store.state.menu = nuevoMenu;
          this.$storage.set('menu', nuevoMenu);
          this.$storage.remove('nino');
          this.$router.push('busquedaNino');
        } else {
          this.$message.error(this.$t('error.wrongUrl'));
        }
      }
    }
  }
</script>
