<template>
<div>
  <div>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs3></v-flex>
      <v-flex xs3>
        <v-select 
          v-bind:items="tiposBusqueda" 
          v-model="busqueda.tipo" 
          :label="$t('generalFollowUp.searchBy')" 
          item-text="busqueda" 
          item-value="valor"
        ></v-select>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          v-model="busqueda.aBuscar"
          :label="$t('generalFollowUp.searchText')"
        ></v-text-field>
      </v-flex>
      <v-flex xs3>
        <v-btn dark block color="primary" @click.native="buscaEstudiante()">{{$t('common.search')}}</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
  <!-- TABLA DE DATOS -->
  <v-data-table v-bind:headers="headersAsinacion" v-bind:items="asignaciones" v-bind:pagination.sync="pagination" :total-items="totalItems" class="elevation-1" :rows-per-page-text="$t('inscriptions.studentsPerPage')">
    <template slot="items" slot-scope="props">
      <td class="text-xs-right">
        <!-- <v-tooltip bottom> -->
          <v-btn icon dark color="primary" @click.native="datosEstudiante(props.item.id_usuario, props.item.email)">
            <v-icon>folder</v-icon>
          </v-btn>
          <!-- <span>Utilizar folder</span> -->
        <!-- </v-tooltip> -->
      </td>
      <td>{{ props.item.codigo }}</td>
      <td>{{ props.item.nombres }}</td>
      <td>{{ props.item.primer_apellido }}</td>
      <td>{{ props.item.segundo_apellido }}</td>
    </template>
  </v-data-table>
  </div>
</div>
</template>

<script>
  import Comps from '../comps';
  /* eslint-disable semi */
  export default {
    mixins: [ Comps ],
    data () {
      return {
        // Busqueda de estudiante
        tiposBusqueda: [],
        busqueda: {},
        // Variables asignación de curso
        dialogAsignacionCurso: false,
        csvWindow: false,
        formAsignacionCurso: {},
        cursos: [],
        // Variables CSV
        urlCsv: '',
        headersCsv: {'access-token': '<your-token>'},
        lugarCi: [],
        asignaciones: [],
        totalItems: 0,
        pagination: {
          sortBy: null
        },
        headersAsinacion: [
          {text: this.$t('common.actions'), value: ''},
          {text: this.$t('common.code'), value: 'codigo'},
          {text: this.$t('common.names'), value: 'nombres'},
          {text: this.$t('common.firstLastName'), value: 'primer_apellido'},
          {text: this.$t('common.secondLastName'), value: 'segundo_apellido'}
        ],
        // rules
        nameRules: [
          (v) => !!v || 'El nombre es requerido',
          (v) => v.length <= 25 || 'Name must be less than 25 characters'
        ],
        emailRules: [
          (v) => !!v || 'El correo electrónico es requerido',
          (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'No es un correo electrónico válido'
        ]
      }
    },
    components: {
    },
    watch: {
      pagination: {
        handler () {
          let sorting = '';
          if (this.pagination.sortBy != null && this.pagination.descending != null) {
            if (this.pagination.descending) {
              sorting = `order=-`;
            } else {
              sorting = `order=`;
            }
            if (this.pagination.sortBy === 'codigo') {
              sorting = `${sorting}codigo`;
            } else {
              sorting = `${sorting}${this.pagination.sortBy}`;
            }
          }
          // if()
          let rutaEstudiantes;
          if (this.pagination.rowsPerPage === -1) {
            rutaEstudiantes = sorting === '' ? `estudiantes` : `estudiantes?${sorting}`;
          } else {
            rutaEstudiantes = sorting === '' ? `estudiantes?limit=${this.pagination.rowsPerPage}&page=${this.pagination.page}` : `estudiantes?limit=${this.pagination.rowsPerPage}&page=${this.pagination.page}&${sorting}`;
          }
          this.$service.get(rutaEstudiantes)
          .then(response => {
            this.asignaciones = response.datos.rows ? response.datos.rows : response.datos;
            this.asignaciones.forEach(function (element) {
              element.ci = element.documento_identidad + ' ' + element.lugar_documento_identidad;
            }, this);
            this.totalItems = response.datos.count ? response.datos.count : response.datos.lenght;
          })
        },
        deep: true
      },
      'formAsignacionCurso.fid_curso': function () {
        this.cursos.forEach(function (element) {
          if (element.id_curso === this.formAsignacionCurso.fid_curso) {
            this.formAsignacionCurso.maestro = element.maestro;
            this.formAsignacionCurso.descripcion = element.descripcion;
            this.formAsignacionCurso.grado = element.grado;
            this.formAsignacionCurso.tipo_discapacidad = element.tipo_discapacidad;
            this.formAsignacionCurso.criterio_edad = element.criterio_edad;
          }
        }, this);
      }
    },
    created () {
      this.headersCsv = {'Authorization': `Bearer ${this.$storage.get('token')}`};
      this.urlCsv = this.$apiUrl + 'importarEstudiantes';
      this.$service.get(`cursos?gestion=actual`)
      .then(response => {
        this.cursos = response.datos;
        this.cursos.forEach(function (element) {
          element.nombre_completo = element.nombre + ' - ' + element.paralelo;
        }, this);
      })
      this.tiposBusqueda = [
        {valor: 0, busqueda: this.$t('common.code')},
        {valor: 1, busqueda: this.$t('inscriptionRegister.ci')},
        {valor: 2, busqueda: this.$t('common.names')}
      ];
      this.busqueda.tipo = 0;
    },
    methods: {
      buscaEstudiante () {
        if (this.busqueda.aBuscar !== undefined && this.busqueda.aBuscar !== '') {
          let rutaEstudiantes = '';
          if (this.pagination.rowsPerPage === -1) {
            rutaEstudiantes = `estudiantes?tipobusqueda=${JSON.stringify(this.tiposBusqueda[this.busqueda.tipo].valor)}&buscar=${this.busqueda.aBuscar}`;
          } else {
            rutaEstudiantes = `estudiantes?limit=${this.pagination.rowsPerPage}&page=${this.pagination.page}&tipobusqueda=${JSON.stringify(this.tiposBusqueda[this.busqueda.tipo].valor)}&buscar=${this.busqueda.aBuscar}`;
          }
          this.$service.get(rutaEstudiantes)
          .then(response => {
            this.asignaciones = response.datos.rows;
            this.count = response.datos.count;
          })
        } else {
          this.$message.error(this.$t('error.mustAddSearchInformation'));
        }
      }
      // onError (error) {
      //   console.log('error: ' + error);
      //   this.$message.error('Error al cargar el archivo.');
      // },
      // onSuccess (success) {
      //   this.$message.success('Datos cargados correctamente.');
      //   this.cargarAsignaciones();
      //   this.csvWindow = false;
      // },
      // // onProgress (progress) {
      // //   console.log('progress: ' + JSON.stringify(progress));
      // //   // Handdle the progress
      // // },
      // thumbUrl (file) {
      //   return file.myThumbUrlProperty
      // },
      // nuevaInscripcion () {
      //   this.$router.push('registroInscripcion');
      // },
      // asignacionCurso (datos) { // Reenvía correo de activación
      //   this.formAsignacionCurso = datos;
      //   if (this.formAsignacionCurso.ci === 'null null') {
      //     this.formAsignacionCurso.ci = this.$t('inscriptions.noData');
      //   }
      //   this.dialogAsignacionCurso = !this.dialogAsignacionCurso;
      // },
      // enviaAsignacionCurso () { // Envía datos de la nueva asignación
      //   // valida
      //   if (this.formAsignacionCurso.codigo !== '' && this.formAsignacionCurso.fid_curso !== '') {
      //     // Crea objeto de edición de estudiante
      //     this.$service.put(`estudiantes`, {
      //       'codigo': this.formAsignacionCurso.codigo,
      //       'fid_curso': this.formAsignacionCurso.fid_curso
      //     }).then(respuesta => {
      //       this.dialogAsignacionCurso = false
      //       this.cargarAsignaciones();
      //     });
      //   } else {
      //     this.$message.error('Debe llenar los datos para guardar.');
      //   }
      // },
      // cargarAsignaciones () { // Carga lista de estudiantes
      //   this.$service.get(`estudiantes?limit=5&page=1`)
      //     .then(response => {
      //       this.asignaciones = response.datos.rows;
      //       this.count = response.datos.count;
      //     })
      // }
    }
  }
</script>
