<template>
<div>
  <v-btn dark @click.native="nuevaInscripcion">
    {{$t('inscriptions.newStudent') }}
    <v-icon right dark>add_circle</v-icon>
  </v-btn>
  <v-btn dark @click.native="cargarCsv">
    {{$t('inscriptions.csv') }}
    <v-icon right dark>file_upload</v-icon>
  </v-btn>
  <!-- TABLA DE DATOS -->
  <v-data-table v-bind:headers="headersAsinacion" v-bind:items="asignaciones" v-bind:pagination.sync="pagination" :total-items="totalItems" class="elevation-1" :rows-per-page-text="$t('usuarios.usersPerPage')">
    <!-- <template slot="headerCell" scope="props">
      <span v-tooltip:bottom="{ 'html': props.header.text }">
        {{ props.header.text }}
      </span>
    </template> -->
    <template slot="items" slot-scope="props">
      <td class="text-xs-right">
        <!-- <v-tooltip bottom> -->
          <v-btn icon dark color="primary" @click.native="abreDialog(props.item.id_usuario)">
            <v-icon>edit</v-icon>
          </v-btn>
          <!-- <span>Editar usuario</span>
        </v-tooltip> -->
        <!-- <v-tooltip bottom> -->
          <v-btn v-if="props.item.estado === 'PREINSCRITO'" icon dark color="primary" @click.native="inscripcion(props.item.id_usuario, props.item.email)">
            <v-icon>airplay</v-icon>
          </v-btn>
          <!-- <span>Reenviar activación</span>
        </v-tooltip> -->
      </td>
      <td>{{ props.item.nombres }}</td>
      <td>{{ props.item.primer_apellido }}</td>
      <td>{{ props.item.segundo_apellido }}</td>
      <td>{{ props.item.estado}} </td>
    </template>
  </v-data-table>

    <!-- VENTANA DE EDICIÓN DE USUARIO -->
    <v-layout row>
      <v-dialog v-model="dialogEdicion" width="1200px">
        <v-card>
          <v-card-title class="headline">
            <v-icon right>account_circle</v-icon>
            {{$t('usuarios.adding')}}
          </v-card-title>
          <v-layout row>
            <v-flex xs10 offset-xs1>
              <v-alert color="primary" icon="label" value="true">
                {{$t('usuarios.userData')}}
              </v-alert>
              <form @submit.prevent="editaUsuario">
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-text-field :label="$t('usuarios.email')" v-model="form1.email"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-select v-bind:items="roles" v-model="form1.tipo" :label="$t('usuarios.rol')" item-text="nombre" item-value="id_rol"></v-select>
                  </v-flex>
                </v-layout>
              </form>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="seccion" dark @click.native="dialogEdicion = false">{{$t('common.cancel')}}
              <v-icon right>cancel</v-icon>
            </v-btn>
            <v-btn class="primary" dark v-on:click="editarUsuario(idUsuario)">{{$t('common.edit')}}
              <v-icon right>done</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
  import Comps from '../comps';
  /* eslint-disable semi */
  export default {
    // name: 'bandeja-tecnicos',
    mixins: [ Comps ],
    data () {
      return {
        // Variables creación usuarios
        dialog: false,
        validForm: true,
        form: {
          persona: {
            'ci': '',
            'lugar': '',
            'fecha_nacimiento': '',
            'nombres': '',
            'primer_apellido': '',
            'segundo_apellido': '',
            'genero': ''
          },
          'email': '',
          'tipo': ''
        },
        // Variables edición usuarios
        dialogEdicion: false,
        form1: {
          'email': '',
          'tipo': ''
        },
        idusuario: '',
        // Variables lista tabla
        roles: [],
        lugarCi: [],
        asignaciones: [],
        totalItems: 0,
        pagination: {
          sortBy: null
        },
        headersAsinacion: [
          {text: this.$t('common.actions'), value: ''},
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
    watch: {
      pagination: {
        handler () {
          let sorting = '';
          if (this.pagination.sortBy != null && this.pagination.descending != null) {
            if (this.pagination.descending) {
              sorting = `&order=-${this.pagination.sortBy}`
            } else {
              sorting = `&order=${this.pagination.sortBy}`;
            }
          }
          const rutaEstudiantes = (this.pagination.rowsPerPage === -1) ? `estudiantes` : `estudiantes?limit=${this.pagination.rowsPerPage}&page=${this.pagination.page}${sorting}`;
          this.$service.get(rutaEstudiantes)
          .then(response => {
            this.asignaciones = response.datos.rows ? response.datos.rows : response.datos;
            this.totalItems = response.datos.count ? response.datos.count : response.datos.lenght;
          })
        },
        deep: true
      }
    },
    created () {
      // this.hasPermission('bandejaInscritos');
      // this.$service.get(`roles`)
      // .then(response => {
      //   this.roles = response.datos;
      //   return this.$service.get(`codigoDeptos`);
      // })
      // .then(response => {
      //   this.lugarCi = response.datos;
      // })
      // this.cargarAsignaciones();
    },
    methods: {
      nuevaInscripcion () {
        this.$router.push('registroInscripcion');
      },
      agregaUsuario () {
        // valida
        if (this.form.email !== '' && this.form.tipo !== '' && this.form.persona.ci !== '' &&
        this.form.persona.fecha_nacimiento !== '' && this.form.persona.nombres !== '' &&
        this.form.persona.primer_apellido !== '' && this.form.persona.segundo_apellido !== '' &&
        this.form.persona.genero !== '') {
          // Crea usuario
          this.$service.post(`usuarios`, {
            'usuario': {
              'email': this.form.email,
              'fid_rol': this.form.tipo
            },
            'persona': {
              'ci': this.form.persona.ci,
              'lugar': this.form.persona.lugar,
              'fecha_nacimiento': this.form.persona.fecha_nacimiento,
              'genero': this.form.persona.genero,
              'nombres': this.form.persona.nombres,
              'primer_apellido': this.form.persona.primer_apellido,
              'segundo_apellido': this.form.persona.segundo_apellido
            }
          }).then(respuesta => {
            this.form.persona.ci = '';
            this.form.persona.fecha_nacimiento = '';
            this.form.persona.nombres = '';
            this.form.persona.primer_apellido = '';
            this.form.persona.segundo_apellido = '';
            this.form.persona.lugar = '';
            this.form.persona.genero = '';
            this.form.email = '';
            this.form.tipo = '';
            this.dialog = false
            this.cargarAsignaciones();
          });
        } else {
          this.$message.error('Debe llenar el formulario para guardar.');
        }
      },
      abreDialog (idUser) { // Reenvía correo de activación
        this.idUsuario = idUser;
        this.dialogEdicion = !this.dialogEdicion;
        let emailUsuario = '';
        let rolUsuario = '';
        this.asignaciones.map(valor => {
          if (valor.id_usuario === idUser) {
            emailUsuario = valor.email;
            rolUsuario = valor.fid_rol;
          }
        })
        this.form1.email = emailUsuario;
        this.form1.tipo = rolUsuario;
      },
      editarUsuario (idUsuario) { // Edita un usuario existente
        // valida
        if (this.form1.email !== '' && this.form1.tipo !== '') {
          // Crea usuario
          this.$service.put(`usuarios/${idUsuario}`, {
            'usuario': {
              'fid_rol': this.form1.tipo,
              'email': this.form1.email
            }
          }).then(respuesta => {
            this.form1.email = '';
            this.form1.tipo = '';
            this.dialogEdicion = false
            this.cargarAsignaciones();
          });
        } else {
          this.$message.error('Debe llenar los datos para guardar.');
        }
      },
      inscripcion (idUsuario, email) { // Reenvía correo de activación
        this.$service.post(`usuarios/reenviar`, {
          'usuario': {
            'id_usuario': idUsuario
          }
        }).then(respuesta => {
          this.$message.success('Hemos enviado un correo de activación de cuenta a ' + email);
        }).catch(() => {
          this.$message.error('Fallo al enviar correo.');
        });
      },
      cargarAsignaciones () { // Carga lista de usuarios
        this.$service.get(`estudiantes?limit=5&page=1`)
          .then(response => {
            this.asignaciones = response.datos.rows;
            this.count = response.datos.count;
          })
      }
    }
  }
</script>
