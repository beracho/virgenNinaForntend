<template>
  <div>
  <v-container>
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
  <br>
  <v-card>
    <v-card-title class="headline">
      <v-icon right>subject</v-icon>
      <h2 class="headline mb-0">Datos generales</h2>
      <v-spacer></v-spacer>
      <v-btn icon dark color="primary" @click.native="generalDataPanel?minimize(0):maximize(0)">
        <v-icon>{{generalDataPanel?"remove":"add"}}</v-icon>
      </v-btn>
    </v-card-title>
    <v-container fluid v-if="generalDataPanel">
      <v-layout row wrap>
        <v-flex xs6>
          <b>{{ this.$t('inscriptionRegister.names') }}: </b> {{consulta.nombres ? consulta.nombres : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs6></v-flex>
        <v-flex xs6>
          <b>{{ this.$t('inscriptionRegister.firstLastName') }}: </b> {{consulta.primer_apellido ? consulta.primer_apellido : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs6>
          <b>{{ this.$t('inscriptionRegister.secondLastName') }}: </b> {{consulta.segundo_apellido ? consulta.segundo_apellido : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs6>
          <b>{{ this.$t('inscriptionRegister.ci') }}: </b> {{consulta.documento_identidad ? consulta.documento_identidad + ' ' +consulta.lugar_documento_identidad : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs6>
          <b>{{ this.$t('entity.crud.code') }}: </b> {{consulta.estudiante && consulta.estudiante.codigo ? consulta.estudiante.codigo : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs6>
          <b>{{ this.$t('usuarios.bornDate') }}: </b> {{consulta.fecha_nacimiento ? getDate(consulta.fecha_nacimiento) : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs6>
          <b>{{ this.$t('generalFollowUp.age') }}: </b> {{consulta.fecha_nacimiento ? getAge(consulta.fecha_nacimiento) : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs6>
          <b>{{ this.$t('usuarios.gender') }}: </b> {{consulta.genero ? consulta.genero : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs6>
          <b>{{ this.$t('inscriptionRegister.cellphone') }}: </b> {{consulta.telefono ? consulta.telefono : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs12>
          <b>{{ this.$t('generalFollowUp.address') }}: </b> {{consulta.direccion ? consulta.direccion : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
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
        <v-flex xs12>
          <b>Unidad educativa: </b> {{consulta.unidades_educativas && consulta.unidades_educativas.length ? consulta.unidades_educativas : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <!-- <v-flex xs6>
          <b>Curso: </b> {{consulta.unidades_educativas && consulta.unidades_educativas.length ? consulta.nombres : this.$t('generalFollowUp.notRegistered')}}
        </v-flex> -->
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
        generalDataPanel: true,
        parentsDataPanel: true,
        schoolDataPanel: true,
        datosEstudiante: {},
        consulta: {},
        padres: []
      }
    },
    components: {
    },
    watch: {
    },
    created () {
      this.headers = {'Authorization': `Bearer ${this.$storage.get('token')}`};
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
      cerrarCarpeta (userData) {
        if (this.$storage.exist('menu')) {
          let nuevoMenu = this.$storage.get('menu');
          nuevoMenu[0].visible = true;
          nuevoMenu[1].visible = false;
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
