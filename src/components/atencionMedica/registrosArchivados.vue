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
        <v-icon right>search</v-icon>
        <h2 class="headline mb-0">Parámetros de búsqueda</h2>
        <v-spacer></v-spacer>
        <v-btn icon dark color="primary" @click.native="generalDataPanel?minimize():maximize()">
          <v-icon>{{generalDataPanel?"remove":"add"}}</v-icon>
        </v-btn>
      </v-card-title>
      <v-container fluid v-if="generalDataPanel">
        <v-layout row wrap>
          <v-flex xs4>
            <v-select
              v-bind:items="areas"
              item-text="text"
              item-value="value"
              v-model="search.area"
              label="Área"
            ></v-select>
          </v-flex>
          <v-flex xs4>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <!-- TABLA DE DATOS -->
    <v-card>
      <v-card-title class="headline">
        <v-icon right>list</v-icon>
        <h2 class="headline mb-0">Documentos</h2>
      </v-card-title>
      <v-data-table :headers="headersAsinacion" :items="registros" v-bind:pagination.sync="pagination" :total-items="totalItems" class="elevation-1" :rows-per-page-text="$t('inscriptions.studentsPerPage')">
        <template slot="items" slot-scope="props">
          <td>{{ getDate(props.item._fecha_creacion) }}</td>
          <!-- <td>{{ new Date(props.item._fecha_creacion).getDate() + ' - ' + $t('months[' + new Date(props.item._fecha_creacion).getMonth() + ']') + ' - ' + new Date(props.item._fecha_creacion).getFullYear() }}</td> -->
          <td>{{ props.item.usuario.nombre_completo }}</td>
          <td>{{ props.item.tipo === 'simple' ? 'seguimiento' : props.item.tipo }}</td>
          <td class="text-xs-right">
            <v-btn icon dark color="primary" @click.native="verRegistro(props.item.id_usuario, props.item.email)">
              <v-icon>filter_none</v-icon>
            </v-btn>
            <v-btn v-if="props.item._usuario_creacion == $storage.getUser().id_usuario" icon dark color="primary" @click.native="editaRegistro(props.item.id_usuario, props.item.email)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn v-if="props.item._usuario_creacion == $storage.getUser().id_usuario" icon dark color="red" @click.native="eliminaRegistro(props.item)">
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
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
        headers: {'access-token': '<your-token>'},
        generalDataPanel: true,
        // Opciones de area
        areas: [
          {
            value: 'psicomotricidad',
            text: 'Psicomotricidad'
          },
          {
            value: 'fisioterapia',
            text: 'Fisioterapia'
          },
          {
            value: 'fonoaudiologia',
            text: 'Fonoaudiología'
          },
          {
            value: 'nutricion',
            text: 'Nutrición'
          },
          {
            value: 'psicologia',
            text: 'Psicología'
          },
          {
            value: 'odontologia',
            text: 'Odontología'
          },
          {
            value: 'psicopedagogia',
            text: 'Psicopedagogía'
          },
          {
            value: 'medicina general',
            text: 'Medicina General'
          },
          {
            value: 'trabajo social',
            text: 'Trabajo Social'
          },
          {
            value: 'educacion',
            text: 'Educación'
          },
          {
            value: 'terapia ocupacional',
            text: 'Terapia ocupacional'
          }
        ],
        search: {
          area: ''
        },
        // Listado de estudiantes
        datosEstudiante: {},
        registros: [],
        asignaciones: [],
        totalItems: 0,
        pagination: {
          sortBy: null
        },
        headersAsinacion: [
          {text: 'Fecha', value: '_fecha_creacion'},
          {text: 'Doctor', value: '_usuario_creacion'},
          {text: 'Tipo', value: 'tipo'},
          {text: this.$t('common.actions'), value: ''}
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
      'search.area': function () {
        this.$service.get(`registros?area=${this.search.area.value}&estudiante=${this.datosEstudiante.codigo}`)
        .then(response => {
          this.registros = response.datos.rows ? response.datos.rows : response.datos;
        })
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
          // if()
          // let rutaEstudiantes;
          // if (this.pagination.rowsPerPage === -1) {
          //   rutaEstudiantes = sorting === '' ? `registros` : `registros?${sorting}`;
          // } else {
          //   rutaEstudiantes = sorting === '' ? `registros?limit=${this.pagination.rowsPerPage}&page=${this.pagination.page}` : `estudiantes?limit=${this.pagination.rowsPerPage}&page=${this.pagination.page}&${sorting}`;
          // }
          // this.$service.get(rutaEstudiantes)
          // .then(response => {
          //   this.registros = response.datos.rows ? response.datos.rows : response.datos;
          //   this.registros.forEach(function (element) {
          //     element.ci = element.documento_identidad + ' ' + element.lugar_documento_identidad;
          //   }, this);
          //   this.totalItems = response.datos.count ? response.datos.count : response.datos.lenght;
          // })
        },
        deep: true
      // },
      // 'formAsignacionCurso.fid_curso': function () {
      //   this.cursos.forEach(function (element) {
      //     if (element.id_curso === this.formAsignacionCurso.fid_curso) {
      //       this.formAsignacionCurso.maestro = element.maestro;
      //       this.formAsignacionCurso.descripcion = element.descripcion;
      //       this.formAsignacionCurso.grado = element.grado;
      //       this.formAsignacionCurso.tipo_discapacidad = element.tipo_discapacidad;
      //       this.formAsignacionCurso.criterio_edad = element.criterio_edad;
      //     }
      //   }, this);
      }
    },
    created () {
      this.headers = {'Authorization': `Bearer ${this.$storage.get('token')}`};
      this.datosEstudiante = this.$storage.get('nino');
      let areaActual = this.$storage.get('user');
      this.areas.forEach(area => {
        if (area.text === areaActual.rol.area) {
          this.search.area = area;
        }
      });
    },
    methods: {
      focus (boton) {
        this.areas.forEach((element, index) => {
          if (boton === index) {
            element.seleccionado = true;
            this.$service.get(`registros?area=${element.nombre}&estudiante=${this.datosEstudiante.codigo}`)
            .then(response => {
              this.registros = response.datos.rows ? response.datos.rows : response.datos;
            })
          } else {
            element.seleccionado = false;
          }
        });
      },
      minimize (cardNumber) {
        this.generalDataPanel = false;
      },
      maximize (cardNumber) {
        this.generalDataPanel = true;
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
      },
      getDate (dateString) {
        let date = dateString ? new Date(dateString) : new Date();
        return (date.getDate() + ' - ' + this.$t('months[' + date.getMonth() + ']') + ' - ' + date.getFullYear());
      },
      eliminaRegistro (item) {
      },
      editarRegistro (item) {
      }
    }
  }
</script>
