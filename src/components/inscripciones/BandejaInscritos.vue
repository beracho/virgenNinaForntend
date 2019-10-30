<template>
<div>
  <div>
  <v-btn dark @click.native="csvWindow= true">
    {{$t('inscriptions.csv') }}
    <v-icon right dark>file_upload</v-icon>
  </v-btn>
  <v-toolbar color="secondary" dark>
    <v-icon right>group</v-icon>
    <v-toolbar-title>{{$t('menu.bandejaInscritos')}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color='primary' dark @click.native="nuevaInscripcion">
      {{$t('inscriptions.newStudent') }}
      <v-icon right dark>add_circle</v-icon>
    </v-btn>
  </v-toolbar>
  <!-- <v-card>
    <v-card-title class="headline">
      <v-icon right>search</v-icon>
      <h2 class="headline mb-0">{{$t('registerView.searchParams')}}</h2>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs6>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card> -->
  <!-- TABLA DE DATOS -->
  <v-data-table v-bind:headers="headersAsinacion" v-bind:items="asignaciones" v-bind:pagination.sync="pagination" :total-items="totalItems" class="elevation-1" :rows-per-page-text="$t('inscriptions.studentsPerPage')">
    <template slot="items" slot-scope="props">
      <td class="text-xs-right">
        <v-btn icon dark color="primary" @click.native="asignacionCurso(props.item)">
          <v-icon>school</v-icon>
        </v-btn>
        <v-btn icon dark color="primary" @click.native="editarEstudiante(props.item)">
          <v-icon>edit</v-icon>
        </v-btn>
      </td>
      <td>{{ props.item.codigo }}</td>
      <td>{{ primeraLetraMayuscula(props.item.nombres) }}</td>
      <td>{{ primeraLetraMayuscula(props.item.primer_apellido) }}</td>
      <td>{{ primeraLetraMayuscula(props.item.segundo_apellido) }}</td>
      <td>{{ props.item.estado}} </td>
    </template>
  </v-data-table>
  </div>

  <div>
    <!-- VENTANA DE ASIGNACIÓN DE CURSOS -->
    <v-layout row>
      <v-dialog v-model="dialogAsignacionCurso" width="1200px" persistent>
        <v-card>
          <v-card-title class="headline">
            <v-icon right>account_circle</v-icon>
            {{$t('inscriptions.courseAssignation')}}
          </v-card-title>
          <v-layout row>
            <v-flex xs10 offset-xs1>
              <v-alert color="primary" icon="book" value="true">
                {{$t('inscriptions.studentData')}}
              </v-alert>
              <v-flex xs12>
                {{$t('common.code')}}: {{formAsignacionCurso.codigo}}<br>
                {{$t('inscriptionRegister.ci')}}: {{formAsignacionCurso.ci}}<br>
                {{$t('courses.name')}}: {{formAsignacionCurso.nombres}} {{formAsignacionCurso.primer_apellido}} {{formAsignacionCurso.segundo_apellido}}
              </v-flex>
              <v-alert color="primary" icon="label" value="true">
                {{$t('courses.newCourse')}}:<br>{{$t('courses.thisYearCourses')}}
              </v-alert>
              <form @submit.prevent="asignaCurso">
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-select v-bind:items="cursos" v-model="formAsignacionCurso.fid_curso" :label="$t('courses.newCourse')" item-text="nombre_completo" item-value="id_curso"></v-select>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field disabled v-model="formAsignacionCurso.maestro" :label="$t('courses.teacher')"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field disabled v-model="formAsignacionCurso.descripcion" :label="$t('common.description')"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field disabled v-model="formAsignacionCurso.grado" :label="$t('inscriptionRegister.grade')"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field disabled v-model="formAsignacionCurso.tipo_discapacidad" :label="$t('inscriptionRegister.disability')"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field disabled v-model="formAsignacionCurso.criterio_edad" :label="$t('courses.ageRange')"></v-text-field>
                  </v-flex>
                </v-layout>
              </form>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="seccion" dark @click.native="dialogAsignacionCurso = false">{{$t('common.cancel')}}
              <v-icon right>cancel</v-icon>
            </v-btn>
            <v-btn class="primary" dark v-on:click="enviaAsignacionCurso()">{{$t('common.edit')}}
              <v-icon right>done</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <!-- VENTANA DE CARGA DE CSV -->
    <v-layout row>
      <v-dialog v-model="csvWindow" width="700px">
        <v-card>
          <v-card-title class="headline">
            <v-icon right>account_circle</v-icon>
            {{$t('inscriptions.loadCsv')}}
          </v-card-title>
          <v-layout row>
            <v-flex xs10 offset-xs1>
              <v-alert color="primary" icon="label" value="true">
                {{$t('inscriptions.stepLoad')}}
              </v-alert>
              <v-layout row wrap>
                <v-flex xs6 offset-xs3>
                  <file-upload
                    :url='urlCsv'
                    :thumb-url='thumbUrl'
                    :headers="headersCsv"
                    @success="onSuccess"
                    @error="onError"
                    accept='.csv'
                    :btn-label="$t('inscriptions.csv')"
                    :btn-uploading-label="$t('inscriptions.uploadingCsv')">
                  </file-upload>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="true" class="seccion" dark @click.native="csvWindow = false">{{$t('common.cancel')}}
              <v-icon right>cancel</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
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
          {text: this.$t('common.secondLastName'), value: 'segundo_apellido'},
          {text: this.$t('common.status'), value: 'estado'}
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
    },
    methods: {
      onError (error) {
        console.log('error: ' + error);
        this.$message.error('Error al cargar el archivo.');
      },
      onSuccess (success) {
        this.$message.success('Datos cargados correctamente.');
        this.cargarAsignaciones();
        this.csvWindow = false;
      },
      // onProgress (progress) {
      //   console.log('progress: ' + JSON.stringify(progress));
      //   // Handdle the progress
      // },
      thumbUrl (file) {
        return file.myThumbUrlProperty
      },
      nuevaInscripcion () {
        this.$router.push('registroInscripcion');
      },
      asignacionCurso (datos) { // Reenvía correo de activación
        this.formAsignacionCurso = datos;
        if (this.formAsignacionCurso.ci === 'null null') {
          this.formAsignacionCurso.ci = this.$t('inscriptions.noData');
        }
        this.dialogAsignacionCurso = !this.dialogAsignacionCurso;
      },
      editarEstudiante (datos) {
        this.$router.push('registroInscripcion?codigo=' + datos.codigo);
      },
      enviaAsignacionCurso () { // Envía datos de la nueva asignación
        // valida
        if (this.formAsignacionCurso.codigo !== '' && this.formAsignacionCurso.fid_curso !== '') {
          // Crea objeto de edición de estudiante
          this.$service.put(`estudiantes`, {
            'codigo': this.formAsignacionCurso.codigo,
            'fid_curso': this.formAsignacionCurso.fid_curso
          }).then(respuesta => {
            this.dialogAsignacionCurso = false
            this.cargarAsignaciones();
          });
        } else {
          this.$message.error('Debe llenar los datos para guardar.');
        }
      },
      cargarAsignaciones () { // Carga lista de estudiantes
        this.$service.get(`estudiantes?limit=5&page=1`)
          .then(response => {
            this.asignaciones = response.datos.rows;
            this.count = response.datos.count;
          })
      }
    }
  }
</script>
