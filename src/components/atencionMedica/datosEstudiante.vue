<template>
  <div>
  <v-toolbar color="secondary" dark>
    <v-icon>folder_shared</v-icon>
    <v-toolbar-title>{{$t('registerView.folderBelongs') + ': ' + primeraLetraMayuscula(this.datosEstudiante.nombre_completo)}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn dark color="red" @click.native="cerrarCarpeta()">{{$t('socialWork.closeFolder')}}</v-btn>
  </v-toolbar>
  <student-data :studentCode="datosEstudiante.codigo"></student-data>
  <v-card>
    <v-card-title class="headline">
      <v-icon right>account_circle</v-icon>
      <h2 class="headline mb-0">{{ this.$t('inscriptionRegister.tutorData') }}</h2>
      <v-spacer></v-spacer>
      <v-btn icon dark color="primary" @click.native="parentsDataPanel?minimize(1):maximize(1)">
        <v-icon>{{parentsDataPanel?"remove":"add"}}</v-icon>
      </v-btn>
    </v-card-title>
    <v-container fluid v-if="parentsDataPanel">
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs6
              v-for="padre in padres"
              :key="padre.relacion"
            >
            <h4>{{ $t('inscriptionRegister.relation').toUpperCase() }}: {{padre.relation ? padre.relation.toUpperCase() : $t('generalFollowUp.notRegistered').toUpperCase()}}</h4>
            <b>{{ $t('inscriptionRegister.firstLastName') }}: </b> {{padre.primer_apellido ? padre.primer_apellido : $t('generalFollowUp.notRegistered')}}<br>
            <b>{{ $t('inscriptionRegister.secondLastName') }}: </b> {{padre.segundo_apellido ? padre.segundo_apellido : $t('generalFollowUp.notRegistered')}}<br>
            <b>{{ $t('inscriptionRegister.names') }}: </b> {{padre.nombres ? padre.nombres : $t('generalFollowUp.notRegistered')}}<br>
            <b>{{ $t('inscriptionRegister.ci') }}: </b> {{padre.documento_identidad ? padre.documento_identidad + ' ' + padre.lugar_documento_identidad : $t('generalFollowUp.notRegistered')}}<br>
            <b>{{ $t('inscriptionRegister.bornDate') }}: </b> {{padre.fecha_nacimiento ? getDate(padre.fecha_nacimiento) : $t('generalFollowUp.notRegistered')}}<br>
            <b>{{ $t('usuarios.gender') }}: </b> {{padre.genero ? padre.genero == 'M' ? $t('usuarios.male') : $t('usuarios.female') : $t('generalFollowUp.notRegistered')}}<br>
            <b>{{ $t('inscriptionRegister.language') }}: </b> {{padre.idiomas ? padre.idiomas : $t('generalFollowUp.notRegistered')}}<br>
            <b>{{ $t('inscriptionRegister.profession') }}: </b> {{padre.ocupacion_actual ? padre.ocupacion_actual : $t('generalFollowUp.notRegistered')}}<br>
            <b>{{ $t('inscriptionRegister.maxEducation') }}: </b> {{padre.grado_instruccion ? padre.grado_instruccion : $t('generalFollowUp.notRegistered')}}<br>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
  <v-card>
    <v-card-title class="headline">
      <v-icon right>school</v-icon>
      <h2 class="headline mb-0">{{ this.$t('inscriptionRegister.subtitle1') }}</h2>
      <v-spacer></v-spacer>
      <v-btn icon dark color="primary" @click.native="schoolDataPanel?minimize(2):maximize(2)">
        <v-icon>{{schoolDataPanel?"remove":"add"}}</v-icon>
      </v-btn>
    </v-card-title>
    <v-container fluid v-if="schoolDataPanel">
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout row wrap>
          </v-layout>
        </v-flex>
        <v-flex xs6
          v-for="ue in consulta.unidades_educativas"
          :key="ue.id_unidad_educativa_estudiante"
        >
          <h5>{{ $t('inscriptionRegister.tittle') }} </h5>
          <b>{{ $t('courses.gestion') }}: </b> {{ue.gestion ? ue.gestion : $t('generalFollowUp.notRegistered')}}<br>
          <b>{{ $t('inscriptionRegister.level') }}: </b> {{ue.nivel ? ue.nivel : $t('generalFollowUp.notRegistered')}}<br>
          <b>{{ $t('inscriptionRegister.paralel') }}: </b> {{ue.paralelo ? ue.paralelo : $t('generalFollowUp.notRegistered')}}<br>
          <b>{{ $t('inscriptionRegister.turn') }}: </b> {{ue.turno ? ue.turno : $t('generalFollowUp.notRegistered')}}<br>
          <h5>{{ $t('inscriptionRegister.subtitle1') }} </h5>
          <b>{{ $t('inscriptionRegister.sie') }}: </b> {{ue.unidad_educativa.sie ? ue.unidad_educativa.sie : $t('generalFollowUp.notRegistered')}}<br>
          <b>{{ $t('inscriptionRegister.nameEducativeUnit') }}: </b> {{ue.unidad_educativa.nombre ? ue.unidad_educativa.nombre : $t('generalFollowUp.notRegistered')}}<br>
          <b>{{ $t('inscriptionRegister.dependency') }}: </b> {{ue.unidad_educativa.dependencia ? $t('inscriptionRegister.' + ue.unidad_educativa.dependencia) : $t('generalFollowUp.notRegistered')}}<br>
          <b>{{ $t('inscriptionRegister.educativeDistrit') }}: </b> {{ue.unidad_educativa.distrito ? ue.unidad_educativa.distrito : $t('generalFollowUp.notRegistered')}}<br>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
  </div>

</template>

<script>
  import Comps from '../comps';
  import StudentData from '@/common/util/StudentData.vue';
  /* eslint-disable semi */
  export default {
    mixins: [ Comps ],
    data () {
      return {
        headers: {'access-token': '<your-token>'},
        generalDataPanel: true,
        parentsDataPanel: true,
        schoolDataPanel: true,
        datosEstudiante: {},
        consulta: {},
        padres: [],
        paisLista: [],
        departamentoLista: [],
        provinciaLista: [],
        municipioLista: []
      }
    },
    components: {
      'student-data': StudentData
    },
    watch: {
    },
    created () {
      this.headers = {'Authorization': `Bearer ${this.$storage.get('token')}`};
      this.$service.get(`dpaNivel?nivel=1`)
      .then(respuesta => {
        this.paisLista = respuesta.datos;
      });
      this.$service.get(`dpaNivel?nivel=2`)
      .then(respuesta => {
        this.departamentoLista = respuesta.datos;
      });
      this.$service.get(`dpaNivel?nivel=3`)
      .then(respuesta => {
        this.provinciaLista = respuesta.datos;
      });
      this.$service.get(`dpaNivel?nivel=4`)
      .then(respuesta => {
        this.municipioLista = respuesta.datos;
      });
      this.datosEstudiante = this.$storage.get('nino');
      this.$service.get(`estudiantes?codigo=${this.datosEstudiante.codigo}`)
      .then(respuesta => {
        if (!respuesta) {
          return;
        }
        if (respuesta.datos.length === 1) {
          this.consulta = respuesta.datos[0];
        }
        this.padres = [];
        this.consulta.persona_de.forEach(function (tutor) {
          const obj = {
            id: tutor.id_parentezco,
            id_persona: tutor.fid_persona_es,
            cargado: true,
            relation: tutor.relacion,
            descripcion: tutor.descripcion,
            tipo_documento: tutor.persona_es.tipo_documento,
            documento_identidad: tutor.persona_es.documento_identidad,
            lugar_documento_identidad: tutor.persona_es.lugar_documento_identidad,
            complemento_documento: tutor.persona_es.complemento_documento,
            tipo_documento_discapacidad: tutor.persona_es.tipo_documento_discapacidad,
            carnet_discapacidad: tutor.persona_es.carnet_discapacidad,
            fecha_nacimiento: tutor.persona_es.fecha_nacimiento,
            nombres: tutor.persona_es.nombres,
            primer_apellido: tutor.persona_es.primer_apellido,
            segundo_apellido: tutor.persona_es.segundo_apellido,
            casada_apellido: tutor.persona_es.casada_apellido,
            genero: tutor.persona_es.genero,
            nombre_completo: tutor.persona_es.nombre_completo,
            idiomas: tutor.persona_es.idiomas,
            idioma_materno: tutor.persona_es.idioma_materno,
            ocupacion_actual: tutor.persona_es.ocupacion_actual,
            grado_instruccion: tutor.persona_es.grado_instruccion,
            discapacidad: tutor.persona_es.discapacidad,
            src: '/static/images/' + (tutor.persona_es.genero === 'M' ? 'hombre.jpg' : 'mujer.jpg')
          };
          this.padres.push(obj);
        }, this);
        // Unidades educativas
        this.consulta.unidades_educativas.forEach(function (element) {
          if (element.gestion === new Date().getFullYear()) {
            // this.form.unidadEducativa.nombre = element.fid_unidad_educativa;
            // this.form.registroInscripcion.nivel = element.nivel;
            // this.form.registroInscripcion.grado = element.grado;
            // this.form.registroInscripcion.turno = element.turno;
            // this.form.registroInscripcion.paralelo = element.paralelo;
            // if (this.form.unidadEducativa.nombre !== '') {
            //   this.buscaUnidadEducativa('search');
            // }
          } else {
          // if (element.gestion === '2017') {
            // this.form.unidadEducativaAnterior.id = element.fid_unidad_educativa;
            // this.form.unidadEducativaAnterior.codSie = element.unidad_educativa.sie;
            // this.form.unidadEducativaAnterior.nombreUnidad = element.unidad_educativa.nombre;
          }
        }, this);
      });
    },
    methods: {
      minimize (cardNumber) {
        switch (cardNumber) {
          case 0:
            this.generalDataPanel = false;
            break;
          case 1:
            this.parentsDataPanel = false;
            break;
          case 2:
            this.schoolDataPanel = false;
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
            this.parentsDataPanel = true;
            break;
          case 2:
            this.schoolDataPanel = true;
            break;
          default:
            break;
        }
      },
      getDate (dateString) {
        let date = dateString ? new Date(dateString) : new Date();
        return (date.getDate() + ' - ' + this.$t('months[' + date.getMonth() + ']') + ' - ' + date.getFullYear());
      },
      getAge (dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      },
      getPais (itemPais) {
        let response = 'No registrado';
        this.paisLista.forEach(element => {
          if (element.id_dpa === itemPais) {
            response = element.nombre;
          }
        });
        return response;
      },
      getDepartamento (itemDepartamento) {
        let response = 'No registrado';
        this.departamentoLista.forEach(element => {
          if (element.id_dpa === itemDepartamento) {
            response = element.nombre;
          }
        });
        return response;
      },
      getProvincia (itemProvincia) {
        let response = 'No registrado';
        this.provinciaLista.forEach(element => {
          if (element.id_dpa === itemProvincia) {
            response = element.nombre;
          }
        });
        return response;
      },
      getMunicipio (itemMunicipio) {
        let response = 'No registrado';
        this.municipioLista.forEach(element => {
          if (element.id_dpa === itemMunicipio) {
            response = element.nombre;
          }
        });
        return response;
      }
    }
  }
</script>
