<template>
<div>
  <div>
  <v-toolbar color="secondary" dark>
    <v-icon right>group</v-icon>
    <v-toolbar-title>{{$t('menu.bandejaProfesores')}}</v-toolbar-title>
    <v-spacer></v-spacer>
   <v-btn color='primary' dark @click.native="dialogNewTeacher = true">
        {{$t('inscriptionsTeachers.newTeacher') }}
        <v-icon right dark>add_circle</v-icon>
      </v-btn>
  </v-toolbar>
  <!-- VENTANA DE NUEVO PROFESOR -->
    <v-layout row wrap align-center>
      <v-dialog v-model="dialogNewTeacher" persistent width="1200px">
        <!-- <v-btn dark class="seccion" slot="activator">
          Nuevo Curso
          <v-icon right dark>add_circle</v-icon>
        </v-btn> -->
        <v-card>
          <v-card-title class="headline">
            <v-icon right>book</v-icon>
            {{$t('addTeachers.newTeacher') }}
          </v-card-title>
          <v-layout row>
            <v-flex xs10 offset-xs1>
              <v-alert color="primary" icon="label" value="true">
                {{$t('inscriptionsTeachers.teacherData')}}
              </v-alert>
              <form @submit.prevent="agregaProfesor()">
                <v-layout row wrap>
                  <v-flex xs4>
                    <v-text-field 
                    :label="$t('addTeachers.names')" 
                    v-model="formularioCreacionTeacher.nombres" 
                    :rules="nameRules"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                    :label="$t('addTeachers.firstLastName')" 
                    v-model="formularioCreacionTeacher.firstlastname" 
                    :rules="nameRules"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                    :label="$t('addTeachers.secondLastName')" 
                    v-model="formularioCreacionTeacher.secondlastname" 
                    :rules="nameRules"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                    v-model="formularioCreacionTeacher.telefono"
                    :label="$t('addTeachers.cellphone')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="formularioCreacionTeacher.fechanacimiento"
                          :label="$t('usuarios.bornDate')"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="date"
                        :max="new Date().toISOString().substr(0, 10)"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field :label="$t('usuarios.id')" v-model="formularioCreacionTeacher.ci" @keydown.native="$filter.numeric($event)" required></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-select v-bind:items="lugarCi" v-model="formularioCreacionTeacher.lugar" :label="$t('usuarios.place')" item-text="codigo_ine" item-value="abreviacion"></v-select>
                  </v-flex>
                     <v-flex xs4>
                    <v-text-field
                    :label="$t('addTeachers.email')"
                    v-model="formularioCreacionTeacher.email"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                    :label="$t('addTeachers.ciudad')"
                    v-model="formularioCreacionTeacher.ciudad"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                    :label="$t('addTeachers.zona')"
                    v-model="formularioCreacionTeacher.zona"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                    :label="$t('addTeachers.street')"
                    v-model="formularioCreacionTeacher.street"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                    :label="$t('addTeachers.number')"
                    v-model="formularioCreacionTeacher.number"
                    ></v-text-field>
                  </v-flex>
                   <v-flex xs6>
                    <v-radio-group v-model="formularioCreacionTeacher.genero" :label="$t('usuarios.gender')" :mandatory="true" row>
                      <v-radio :label="$t('usuarios.male')" value="M"></v-radio>
                      <v-radio :label="$t('usuarios.female')" value="F"></v-radio>
                    </v-radio-group>
                  </v-flex>
                </v-layout>
              </form>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="cancel" dark @click.native="dialogNewTeacher = false">{{$t('common.cancel')}}
              <v-icon right>cancel</v-icon>
            </v-btn>
            <v-btn class="primary" flat v-on:click="agregaProfesor()">{{$t('common.save')}}
              <v-icon right>done</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  <!-- TABLA DE DATOS -->
  <v-data-table v-bind:headers="headersAsinacion" v-bind:items="asignacionesProfesores" v-bind:pagination.sync="pagination" :total-items="totalItems" class="elevation-1" :rows-per-page-text="$t('inscriptions.studentsPerPage')">
    <template slot="items" slot-scope="props">
      <td class="text-xs-right">
        <v-btn icon dark color="primary" @click.native="asignacionCurso(props.item)">
          <v-icon>school</v-icon>
        </v-btn>
        <v-btn icon dark color="primary" @click.native="editarEstudiante(props.item)">
          <v-icon>edit</v-icon>
        </v-btn>
      </td>
      <td>{{ props.item.usuario }}</td>
      <td>{{ primeraLetraMayuscula(props.item.nombres) }}</td>
      <td>{{ primeraLetraMayuscula(props.item.primer_apellido) }}</td>
      <td>{{ primeraLetraMayuscula(props.item.segundo_apellido) }}</td>
      <td>{{ props.item.estado}} </td>
    </template>
  </v-data-table>
  </div>
  <div>
    <!-- VENTANA DE CARGA DE CSV -->
    <v-layout row>
      <v-dialog v-model="csvWindow" width="700px">
        <v-card>
          <v-card-title class="headline">
            <v-icon right>cloud_upload</v-icon>
            {{$t('inscriptions.loadCsv')}}
            <v-spacer></v-spacer>
            <v-btn dark icon color="green">
              <v-icon>insert_chart</v-icon>
            </v-btn>
            <v-btn dark icon color="red" @click.native="abrirManual">
              <v-icon>info</v-icon>
            </v-btn>
          </v-card-title>
          <v-layout row>
            <v-flex xs10 offset-xs1>
              <v-alert color="primary" icon="label" value="true">
                {{$t('inscriptions.stepLoad')}}
              </v-alert><br>
              <ol>
                <li>{{$t('csvLoadSteps.0')}}</li>
                <li>{{$t('csvLoadSteps.1')}}</li>
                <li>{{$t('csvLoadSteps.2')}}</li>
                <li>{{$t('csvLoadSteps.3')}}</li>
                <li>{{$t('csvLoadSteps.4')}}</li>
                <li>{{$t('csvLoadSteps.5')}}</li>
                <li>{{$t('csvLoadSteps.6')}}</li>
              </ol><br>
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
        // Variables creacion profesor
        dialogNewTeacher: false,
        formularioCreacionTeacher: {},
        // Variables asignación de curso
        dialogAsignacionCurso: false,
        csvWindow: false,
        formAsignacionCurso: {},
        cursos: [],
        // Variables CSV
        urlCsv: '',
        headersCsv: {'access-token': '<your-token>'},
        lugarCi: [],
        asignacionesProfesores: [],
        totalItems: 0,
        pagination: {
          sortBy: null
        },
        // Variables creación profesores
        dialogNewCourse: false,
        menu: false,
        formularioCreacionCurso: {
          'nombres': '',
          'firstlastname': '',
          'secondlastname': '',
          'telefono': '',
          'email': '',
          'carnet': '',
          'fechanacimiento': '',
          'ciudad': '',
          'zona': '',
          'street': '',
          'number': '',
          'genero': ''
        },
        headersAsinacion: [
          {text: this.$t('common.actions'), value: ''},
          {text: this.$t('common.code'), value: 'usuario'},
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
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      pagination: {
        handler () {
          // let sorting = '';
          // if (this.pagination.sortBy != null && this.pagination.descending != null) {
          //   if (this.pagination.descending) {
          //     sorting = `order=-`;
          //   } else {
          //     sorting = `order=`;
          //   }
          //   if (this.pagination.sortBy === 'codigo') {
          //     sorting = `${sorting}codigo`;
          //   } else {
          //     sorting = `${sorting}${this.pagination.sortBy}`;
          //   }
          // }
          // let rutaProfesores;
          // if (this.pagination.rowsPerPage === -1) {
          //   rutaProfesores = sorting === '' ? `profesor` : `profesor?${sorting}`;
          // } else {
          //   rutaProfesores = sorting === '' ? `profesor?limit=${this.pagination.rowsPerPage}&page=${this.pagination.page}` : `profesor?limit=${this.pagination.rowsPerPage}&page=${this.pagination.page}&${sorting}`;
          // }
          this.$service.get('profesor')
          .then(response => {
            console.log(JSON.stringify(response));
            this.asignacionesProfesores = response.datos.rows ? response.datos.rows : response.datos;
            // this.asignacionesProfesores.forEach(function (element) {
            //   element.ci = element.documento_identidad + ' ' + element.lugar_documento_identidad;
            // }, this);
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
      agregaProfesor () {
        // valida
        if (this.formularioCreacionTeacher.nombres !== '' && this.formularioCreacionTeacher.firstlastname !== '' && this.formularioCreacionTeacher.secondlastname !== '' &&
        this.formularioCreacionTeacher.telefono !== '' && this.formularioCreacionTeacher.email !== '' && this.formularioCreacionTeacher.ci !== '' &&
        this.formularioCreacionTeacher.fechaNacimiento !== '' &&
        this.formularioCreacionTeacher.ciudad !== '' && this.formularioCreacionTeacher.zona !== '' &&
        this.formularioCreacionTeacher.street !== '' && this.formularioCreacionTeacher.number !== '' &&
        this.formularioCreacionTeacher.genero !== '') {
          // Crea curso
          this.$service.post(`profesor`, {
            'nombres': this.formularioCreacionTeacher.nombres,
            'firstlastname': this.formularioCreacionTeacher.firstlastname,
            'secondlastname': this.formularioCreacionTeacher.secondlastname,
            'carnet': this.formularioCreacionTeacher.ci,
            'fechanacimiento': this.formularioCreacionTeacher.fechaNacimiento,
            'telefono': this.formularioCreacionTeacher.telefono,
            'email': this.formularioCreacionTeacher.email,
            'ciudad': this.formularioCreacionTeacher.ciudad,
            'zona': this.formularioCreacionTeacher.zona,
            'street': this.formularioCreacionTeacher.street,
            'number': this.formularioCreacionTeacher.number,
            'genero': this.formularioCreacionTeacher.genero
          })
          .then(respuesta => {
            this.formularioCreacionTeacher.nombres = '';
            this.formularioCreacionTeacher.firstlastname = '';
            this.formularioCreacionTeacher.secondlastname = '';
            this.formularioCreacionTeacher.ci = '';
            this.formularioCreacionTeacher.fechaNacimiento = '';
            this.formularioCreacionTeacher.telefono = '';
            this.formularioCreacionTeacher.email = '';
            this.formularioCreacionTeacher.ciudad = '';
            this.formularioCreacionTeacher.zona = '';
            this.formularioCreacionTeacher.street = '';
            this.formularioCreacionTeacher.number = '';
            this.formularioCreacionTeacher.genero = '';
            this.dialogNewCourse = false
            this.cargarAsignaciones();
          });
        } else {
          this.$message.error('Debe llenar el formulario para guardar.');
        }
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
      },
      abrirManual () {
        // window.open('data:application/pdf;base64,' + response.datos);
        // window.open('data:application/pdf;base64,' + filePDF.toString('base64'));
        // window.open('data:application/pdf;base64,' + await toBase64("../../../static/docs/csvAlumnos.pdf"));
        // console.log(await toBase64(file));
        const toBase64 = file => new Promise((resolve, reject) => {
          const reader = new FileReader();
          console.log('file');
          console.log(file);
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        }).then(filePDF => {
          window.open('data:application/pdf;base64,' + filePDF);
        });
        return toBase64('../../../static/docs/csvAlumnos.pdf');
      },
      save (date) {
        this.$refs.menu.save(date)
        this.formularioCreacionTeacher.fechanacimiento = date;
      }
    }
  }
</script>
