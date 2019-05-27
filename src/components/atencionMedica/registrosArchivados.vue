<template>
  <div>
    <div>
      <v-container>
        <v-layout row wrap>
          <v-flex xs1>
          </v-flex>
          <v-flex xs7>
            <h3>{{this.datosEstudiante.nombres + ' ' +  this.datosEstudiante.primer_apellido + ' ' +  this.datosEstudiante.segundo_apellido}}</h3>
          </v-flex>
          <v-flex xs4>
            <v-btn dark block color="red" @click.native="closeFolder()">{{$t('socialWork.closeFolder')}}</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <br>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>search</v-icon>
          <h2 class="headline mb-0">{{$t('registerView.searchParams')}}</h2>
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
      <br>
      <!-- TABLA DE DATOS -->
      <v-card>
        <v-card-title class="headline">
          <v-icon right>list</v-icon>
          <h2 class="headline mb-0">{{$t('registerView.files')}}</h2>
        </v-card-title>
        <v-data-table :headers="headersAsinacion" :items="registros" v-bind:pagination.sync="pagination" :total-items="totalItems" class="elevation-1" :rows-per-page-text="$t('inscriptions.studentsPerPage')">
          <template slot="items" slot-scope="props">
            <td>{{ getDate(props.item._fecha_creacion) }}</td>
            <td>{{ props.item.usuario.nombre_completo }}</td>
            <td>{{ props.item.tipo === 'simple' ? 'seguimiento' : props.item.tipo }}</td>
            <td class="text-xs-right">
              <v-btn icon dark color="primary" @click.native="verRegistro(props.item)">
                <v-icon>filter_none</v-icon>
              </v-btn>
              <v-btn v-if="props.item._usuario_creacion == $storage.getUser().id_usuario" icon dark color="primary" @click.native="editarRegistro(props.item)">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn v-if="props.item._usuario_creacion == $storage.getUser().id_usuario" icon dark color="red" @click.native="confirmDelete(props.item)">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <div>
      <v-layout row wrap align-center>
        <!-- VENTANA DE REGISTRO DE SEGUIMIENTO -->
        <v-dialog v-model="dialogRegistroSeguimiento" persistent width="1200px">
          <v-card>
            <vista-simple></vista-simple>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary" flat v-on:click="dialogRegistroSeguimiento = false">{{$t('common.accept')}}
                <v-icon right>done</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- VENTANA DE TRABAJO SOCIAL -->
        <v-dialog v-model="dialogRegistroEspecialidad" persistent width="1200px">
          <v-card>
            <vista-trabajo-social :v-if="areaView == 'Trabajo social'"></vista-trabajo-social>
            <vista-terapia-ocupacional :v-if="areaView == 'Terapia Ocupacional'"></vista-terapia-ocupacional>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary" flat v-on:click="dialogRegistroEspecialidad = false">{{$t('common.accept')}}
                <v-icon right>done</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- VENTANA CONFIRMACION -->
        <v-dialog v-model="dialogDeleteConfirm" persistent>
          <v-card>
            <v-card-title class="headline">
              <v-icon right>list</v-icon>
              <h2 class="headline mb-0">{{$t('generalFollowUp.confirmDeletion')}}</h2>
            </v-card-title>
            <v-container fluid v-if="generalDataPanel">
              <v-layout row wrap>
                <v-flex xs12>
                  {{$t('generalFollowUp.deleteWarning')}}
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="red" dark flat v-on:click="dialogDeleteConfirm = false">{{$t('common.cancel')}}
                <v-icon right>cancel</v-icon>
              </v-btn>
              <v-btn class="black" dark flat v-on:click="eliminarRegistro()">{{$t('common.accept')}}
                <v-icon right>done</v-icon>
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
  import RegistroSimple from '@/components/vistaRegistros/simple.vue';
  import RegistroEvalTrabajoSocial from '@/components/vistaRegistros/evalTrabajoSocial.vue';
  import registroEvaluacionTerapiaOcupacional from '@/components/vistaRegistros/evalTerapiaOcupacional.vue';
  /* eslint-disable semi */
  export default {
    mixins: [ Comps ],
    data () {
      return {
        headers: {'access-token': '<your-token>'},
        generalDataPanel: true,
        // Registro Seguimiento
        dialogRegistroSeguimiento: false,
        dialogRegistroEspecialidad: false,
        dialogRegistroSemestral: false,
        dialogDeleteConfirm: false,
        // Opciones de area
        areaView: '',
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
        deleteData: {},
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
      'vista-simple': RegistroSimple,
      'vista-trabajo-social': RegistroEvalTrabajoSocial,
      'vista-terapia-ocupacional': registroEvaluacionTerapiaOcupacional
    },
    watch: {
      'search.area': function () {
        this.getTableData();
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
      }
    },
    created () {
      this.headers = {'Authorization': `Bearer ${this.$storage.get('token')}`};
      this.datosEstudiante = this.$storage.get('nino');
      let areaActual = this.$storage.get('user');
      this.areas.forEach(area => {
        if (area.text.toLowerCase() === areaActual.rol.area.toLowerCase()) {
          this.search.area = area.value;
        }
      });
    },
    methods: {
      getTableData () {
        this.$service.get(`registros?area=${this.search.area}&estudiante=${this.datosEstudiante.codigo}`)
        .then(response => {
          this.registros = response.datos.rows ? response.datos.rows : response.datos;
        })
      },
      minimize () {
        this.generalDataPanel = false;
      },
      maximize () {
        this.generalDataPanel = true;
      },
      closeFolder (userData) {
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
      },
      getDate (dateString) {
        let date = dateString ? new Date(dateString) : new Date();
        return (date.getDate() + ' - ' + this.$t('months[' + date.getMonth() + ']') + ' - ' + date.getFullYear());
      },
      confirmDelete (item) {
        this.deleteData = item;
        this.dialogDeleteConfirm = true;
      },
      eliminarRegistro () {
        this.dialogDeleteConfirm = false
        let item = this.deleteData;
        switch (item.tipo) {
          case 'simple':
            this.$service.delete(`registroSimple`, item)
            .then(respuesta => {
              if (respuesta !== undefined) {
                this.$message.success(this.$t('generalFollowUp.registerRemovalSuccessfull'));
                this.getTableData();
              } else {
                this.$message.error(this.$t('generalFollowUp.registerRemovalUnsuccessfull'));
              }
            })
            .catch(() => {
              this.$message.error(this.$t('generalFollowUp.registerRemovalUnsuccessfull'));
            });
            break;
          case 'especialidad':
            switch (item.area) {
              case 'Trabajo social':
                this.$service.delete(`registroEvalTrabajoSocial`, item)
                .then(respuesta => {
                  if (respuesta !== undefined) {
                    this.$message.success(this.$t('generalFollowUp.registerRemovalSuccessfull'));
                    this.getTableData();
                  } else {
                    this.$message.error(this.$t('generalFollowUp.registerRemovalUnsuccessfull'));
                  }
                })
                .catch(() => {
                  this.$message.error(this.$t('generalFollowUp.registerRemovalUnsuccessfull'));
                });
                break;
              default:
                break;
            }
            break;
          case 'semestral':
            this.dialogRegistroSemestral = true;
            break;
          default:
            break;
        }
      },
      editarRegistro (item) {
        switch (item.tipo) {
          case 'simple':
            this.$store.state.simpleRegisterEdit = item;
            this.$router.push('registroSImple?registro=' + item.id_registro);
            break;
          case 'especialidad':
            switch (item.area) {
              case 'Trabajo social':
                this.$store.state.socialWorkRegisterEdit = item;
                this.$router.push('registroEvaluacionTrabajoSocial?registro=' + item.id_registro);
                break;
              case 'Terapia Ocupacional':
                this.$store.state.occupationalTherapyRegisterEdit = item;
                this.$router.push('registroEvaluacionTerapiaOcupacional?registro=' + item.id_registro);
                break;
              default:
                break;
            }
            break;
          case 'semestral':
            this.dialogRegistroSemestral = true;
            break;
          default:
            break;
        }
      },
      verRegistro (item) {
        switch (item.tipo) {
          case 'simple':
            const datosRegistro = {
              idRegistro: item.id_registro,
              fecha: this.getDate(item._fecha_creacion),
              area: item.area,
              autor: item.usuario.nombre + ' ' + item.usuario.primer_apellido + ' ' + item.usuario.segundo_apellido,
              observacion: item.registros_simple.observacion,
              intervencion: item.registros_simple.intervencion
            }
            this.$store.state.simpleRegisterView = datosRegistro;
            this.dialogRegistroSeguimiento = true;
            break;
          case 'especialidad':
            switch (item.area) {
              case 'Trabajo social':
                this.areaView = 'Trabajo social';
                const datosTrabajoSocial = {
                  idRegistro: item.id_registro,
                  fecha: this.getDate(item._fecha_creacion),
                  area: item.area,
                  autor: item.usuario.nombre + ' ' + item.usuario.primer_apellido + ' ' + item.usuario.segundo_apellido,
                  tipoDeFamilia: item.reg_tb.tipo_de_familia,
                  observacionGrupoFamiliar: item.reg_tb.observacion_grupo_familiar,
                  dinamicaFamiliar: item.reg_tb.dinamica_familiar,
                  procesoSocial: item.reg_tb.proceso_social,
                  relatoDiscapacidad: item.reg_tb.relato_discapacidad,
                  diagnosticoSocial: item.reg_tb.diagnostico_social,
                  conclusionSugerencia: item.reg_tb.conclusion_sugerencia
                };
                this.$store.state.socialWorkRegisterView = datosTrabajoSocial
                break;
              case 'Terapia Ocupacional':
                this.areaView = 'Trabajo social';
                const datosTerapiaOcupacional = {
                  idRegistro: item.id_registro,
                  fecha: this.getDate(item._fecha_creacion),
                  area: item.area,
                  autor: item.usuario.nombre + ' ' + item.usuario.primer_apellido + ' ' + item.usuario.segundo_apellido,
                  ducha_realiza: item.reg_to.ducha_realiza,
                  ducha_observacion: item.reg_to.ducha_observacion,
                  controlEsfinter_realiza: item.reg_to.controlEsfinter_realiza,
                  controlEsfinter_observacion: item.reg_to.controlEsfinter_observacion,
                  vestidoDesvestido_realiza: item.reg_to.vestidoDesvestido_realiza,
                  vestidoDesvestido_observacion: item.reg_to.vestidoDesvestido_observacion,
                  masticarTragar_realiza: item.reg_to.masticarTragar_realiza,
                  masticarTragar_observacion: item.reg_to.masticarTragar_observacion,
                  comerSolo_realiza: item.reg_to.comerSolo_realiza,
                  comerSolo_observacion: item.reg_to.comerSolo_observacion,
                  movilidadFuncional_realiza: item.reg_to.movilidadFuncional_realiza,
                  movilidadFuncional_observacion: item.reg_to.movilidadFuncional_observacion,
                  higienePersonalAseo_realiza: item.reg_to.higienePersonalAseo_realiza,
                  higienePersonalAseo_observacion: item.reg_to.higienePersonalAseo_observacion,
                  higieneInodoro_realiza: item.reg_to.higieneInodoro_realiza,
                  higieneInodoro_observacion: item.reg_to.higieneInodoro_observacion,
                  comprension_realiza: item.reg_to.comprension_realiza,
                  comprension_observacion: item.reg_to.comprension_observacion,
                  expresion_realiza: item.reg_to.expresion_realiza,
                  expresion_observacion: item.reg_to.expresion_observacion,
                  interaccionSocial_realiza: item.reg_to.interaccionSocial_realiza,
                  interaccionSocial_observacion: item.reg_to.interaccionSocial_observacion,
                  solProblemas_realiza: item.reg_to.solProblemas_realiza,
                  solProblemas_observacion: item.reg_to.solProblemas_observacion,
                  memoria_realiza: item.reg_to.memoria_realiza,
                  memoria_observacion: item.reg_to.memoria_observacion,
                  atencion_realiza: item.reg_to.atencion_realiza,
                  atencion_observacion: item.reg_to.atencion_observacion,
                  orientacion_realiza: item.reg_to.orientacion_realiza,
                  orientacion_observacion: item.reg_to.orientacion_observacion,
                  reconocimiento_realiza: item.reg_to.reconocimiento_realiza,
                  reconocimiento_observacion: item.reg_to.reconocimiento_observacion,
                  secuenciacion_realiza: item.reg_to.secuenciacion_realiza,
                  secuenciacion_observacion: item.reg_to.secuenciacion_observacion,
                  calculo_realiza: item.reg_to.calculo_realiza,
                  calculo_observacion: item.reg_to.calculo_observacion,
                  lenguaje_realiza: item.reg_to.lenguaje_realiza,
                  lenguaje_observacion: item.reg_to.lenguaje_observacion,
                  escritura_realiza: item.reg_to.escritura_realiza,
                  escritura_observacion: item.reg_to.escritura_observacion,
                  sedestacion_realiza: item.reg_to.sedestacion_realiza,
                  sedestacion_equilibrio: item.reg_to.sedestacion_equilibrio,
                  sedestacion_estatico: item.reg_to.sedestacion_estatico,
                  sedestacion_dinamico: item.reg_to.sedestacion_dinamico,
                  bipedestacion_realiza: item.reg_to.bipedestacion_realiza,
                  bipedestacion_equilibrio: item.reg_to.bipedestacion_equilibrio,
                  bipedestacion_estatico: item.reg_to.bipedestacion_estatico,
                  bipedestacion_dinamico: item.reg_to.bipedestacion_dinamico,
                  marcha_realiza: item.reg_to.marcha_realiza,
                  marcha_observacion: item.reg_to.marcha_observacion,
                  marcha_dinamico: item.reg_to.marcha_dinamico,
                  observacionesMovilidadFuncional: item.reg_to.observacionesMovilidadFuncional,
                  pinzaGruesa_cilindricaDerecha: item.reg_to.pinzaGruesa_cilindricaDerecha,
                  pinzaGruesa_cilindricaIzquierda: item.reg_to.pinzaGruesa_cilindricaIzquierda,
                  pinzaGruesa_esfericaDerecha: item.reg_to.pinzaGruesa_esfericaDerecha,
                  pinzaGruesa_esfericaIzquierda: item.reg_to.pinzaGruesa_esfericaIzquierda,
                  pinzaGruesa_engancheDerecha: item.reg_to.pinzaGruesa_engancheDerecha,
                  pinzaGruesa_engancheIzquierda: item.reg_to.pinzaGruesa_engancheIzquierda,
                  pinzaGruesa_observaciones: item.reg_to.pinzaGruesa_observaciones,
                  pinzaFina_subTerminalDerecha: item.reg_to.pinzaFina_subTerminalDerecha,
                  pinzaFina_subTerminalIzquierda: item.reg_to.pinzaFina_subTerminalIzquierda,
                  pinzaFina_terminoTerminalDerecha: item.reg_to.pinzaFina_terminoTerminalDerecha,
                  pinzaFina_terminoTerminalIzquierda: item.reg_to.pinzaFina_terminoTerminalIzquierda,
                  pinzaFina_lateralDerecha: item.reg_to.pinzaFina_lateralDerecha,
                  pinzaFina_lateralIzquierda: item.reg_to.pinzaFina_lateralIzquierda,
                  pinzaFina_tripodeDerecha: item.reg_to.pinzaFina_tripodeDerecha,
                  pinzaFina_tripodeIzquierda: item.reg_to.pinzaFina_tripodeIzquierda,
                  pinzaFina_interdigitalDerecha: item.reg_to.pinzaFina_interdigitalDerecha,
                  pinzaFina_interdigitalIzquierda: item.reg_to.pinzaFina_interdigitalIzquierda,
                  pinzaFina_lateroLateralDerecha: item.reg_to.pinzaFina_lateroLateralDerecha,
                  pinzaFina_lateroLateralIzquierda: item.reg_to.pinzaFina_lateroLateralIzquierda,
                  pinzaFina_multipulparDerecha: item.reg_to.pinzaFina_multipulparDerecha,
                  pinzaFina_multipulparIzquierda: item.reg_to.pinzaFina_multipulparIzquierda,
                  pinzaFina_observaciones: item.reg_to.pinzaFina_observaciones,
                  barrerasArquitectonicas: item.reg_to.barrerasArquitectonicas,
                  objetivosIntervención_objetivos: item.reg_to.objetivosIntervención_objetivos,
                  objetivosIntervención_observaciones: item.reg_to.objetivosIntervención_observaciones
                };
                this.$store.state.occupationalTherapyRegisterView = datosTerapiaOcupacional;
                break;
              default:
                break;
            }
            this.dialogRegistroEspecialidad = true;
            break;
          case 'semestral':
            this.dialogRegistroSemestral = true;
            break;
          default:
            break;
        }
      }
    }
  }
</script>
