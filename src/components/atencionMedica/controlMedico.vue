<template>
  <div>
  <v-card>
    <v-layout row wrap>
      <v-flex xs12>
        <h3>Folder de Jaimito de la Quinta</h3>
      </v-flex>
      <v-flex xs6>
        <v-btn dark block color="primary" @click.native="nuevoRegistro()">Crear Nuevo Registro</v-btn>
      </v-flex>
      <v-flex xs6>
        <v-btn dark block color="secondary" @click.native="close()">Cerrar archivador</v-btn>
      </v-flex>
    </v-layout>
  </v-card>
  <br>
  <v-card>
    <v-card-title class="headline">
      <v-icon right>perm_contact_calendar</v-icon>
      <!-- {{$t('inscriptionRegister.tittle') }} -->
      <h2 class="headline mb-0">Datos de Jaimito</h2>
      <v-spacer></v-spacer>
      <v-btn icon dark color="primary" @click.native="maximizeDataPanel?minimize():maximize()">
        <v-icon>{{maximizeDataPanel?"remove":"add"}}</v-icon>
      </v-btn>
    </v-card-title>
    <v-container fluid v-if="maximizeDataPanel">
      <v-layout row wrap>
        <v-flex xs12>
          <b>Nombre Completo: </b>
        </v-flex>
        <v-flex xs4>
          <b>CI: </b>
        </v-flex>
        <v-flex xs4>
          <b>RUDE: </b>
        </v-flex>
        <v-flex xs4>
          <b>COD: </b>
        </v-flex>
        <v-flex xs12>
          <div>Aqui entran todos los datos del estudiante</div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
  <br>
  <!-- TABLA DE DATOS -->
  <v-card>
    <v-card-title class="headline">
      <v-icon right>list</v-icon>
      <!-- {{$t('inscriptionRegister.tittle') }} -->
      <h2 class="headline mb-0">Documentos de Jaimito</h2>
    </v-card-title>
    <v-layout row wrap primary>
      <v-flex xs3>
        <v-btn id="0" dark block class="elevation-0" color="primary" @click.native="focus(0)">Psicomotricidad</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn id="1" dark block class="elevation-0" color="secondary" @click.native="focus(1)">Fisioterapia</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn id="2" dark block class="elevation-0" color="primary" @click.native="focus(2)">Fonoaudiología</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn id="3" dark block class="elevation-0" color="primary" @click.native="focus(3)">Nutrición</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn id="4" dark block class="elevation-0" color="primary" @click.native="focus(4)">Psicología</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn id="5" dark block class="elevation-0" color="primary" @click.native="focus(5)">Odontología</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn id="6" dark block class="elevation-0" color="primary" @click.native="focus(6)">Psicopedagogía</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn id="7" dark block class="elevation-0" color="primary" @click.native="focus(7)">Medicina General</v-btn>
      </v-flex>
    </v-layout>
    <v-data-table v-bind:headers="headersAsinacion" v-bind:items="asignaciones" v-bind:pagination.sync="pagination" :total-items="totalItems" class="elevation-1" :rows-per-page-text="$t('inscriptions.studentsPerPage')">
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">
          <!-- <v-tooltip bottom> -->
          <v-btn icon dark color="primary" @click.native="datosEstudiante(props.item.id_usuario, props.item.email)">
            <v-icon>filter_none</v-icon>
          </v-btn>
          <!-- <span>Utilizar folder</span> -->
          <!-- </v-tooltip> -->
        </td>
        <td>{{ props.item.codigo }}</td>
        <td>{{ props.item.nombres }}</td>
      </template>
    </v-data-table>
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
        maximizeDataPanel: true,
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
          {text: 'Fecha', value: 'codigo'},
          {text: 'Doctor', value: 'nombres'}
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
      minimize () {
        this.maximizeDataPanel = false;
      },
      maximize () {
        this.maximizeDataPanel = true;
      },
      focus (boton) {
      },
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
    }
  }
</script>
