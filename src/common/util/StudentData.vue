<template>
  <div>
  <v-card>
    <v-card-title class="headline">
      <v-icon right>subject</v-icon>
      <h2 class="headline mb-0">{{$t('generalFollowUp.generalData')}}</h2>
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
        <v-flex xs6>
          <b>{{ this.$t('inscriptionRegister.community') }}: </b> {{ consulta.direccion && consulta.direccion.comunidad ? consulta.direccion.comunidad : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs6>
          <b>{{ this.$t('inscriptionRegister.zona') }}: </b> {{ consulta.direccion && consulta.direccion.zona ? consulta.direccion.zona : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs6>
          <b>{{ this.$t('inscriptionRegister.street') }}: </b> {{ consulta.direccion && consulta.direccion.calle ? consulta.direccion.calle : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs6>
          <b>{{ this.$t('inscriptionRegister.number') }}: </b> {{ consulta.direccion && consulta.direccion.numero ? consulta.direccion.numero : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs6>
          <b>{{ this.$t('inscriptionRegister.telefon') }}: </b> {{ consulta.direccion && consulta.direccion.telefono ? consulta.direccion.telefono : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs6>
          <b>{{ this.$t('inscriptionRegister.cellphone') }}: </b> {{ consulta.direccion && consulta.direccion.celular ? consulta.direccion.celular : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs6>
          <b>{{ this.$t('inscriptionRegister.country') }}: </b> {{consulta.direccion && consulta.direccion.pais ? getPais(consulta.direccion.pais) : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs6>
          <b>{{ this.$t('inscriptionRegister.departamento') }}: </b> {{consulta.direccion && consulta.direccion.departamento ? getDepartamento(consulta.direccion.departamento) : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs6>
          <b>{{ this.$t('inscriptionRegister.provincia') }}: </b> {{consulta.direccion && consulta.direccion.provincia ? getProvincia(consulta.direccion.provincia) : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
        <v-flex xs6>
          <b>{{ this.$t('inscriptionRegister.municipio') }}: </b> {{consulta.direccion && consulta.direccion.municipio ? getMunicipio(consulta.direccion.municipio) : this.$t('generalFollowUp.notRegistered')}}
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
  </div>
</template>
<script>
  export default {
    name: 'student-data',
    props: ['studentCode'],
    data () {
      return {
        // Propiedades de componente
        codigo: this.studentCode,
        // Variables de vistas
        generalDataPanel: true,
        consulta: {},
        // Listas de localizacion
        paisLista: [],
        departamentoLista: [],
        provinciaLista: [],
        municipioLista: []
      };
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
      this.$service.get(`estudiantes?codigo=${this.codigo}`)
      .then(respuesta => {
        if (!respuesta) {
          return;
        }
        if (respuesta.datos.length === 1) {
          this.consulta = respuesta.datos[0];
        }
      });
    },
    methods: {
      minimize () {
        this.generalDataPanel = false;
      },
      maximize () {
        this.generalDataPanel = true;
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
    },
    watch: {
    }
  };
</script>
