<template>
  <div>
    <div>
      <v-toolbar color="secondary" dark>
        <v-icon>folder_shared</v-icon>
        <v-toolbar-title>{{$t('registerView.folderBelongs') + ': ' + primeraLetraMayuscula(this.datosEstudiante.nombre_completo)}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon color="primary" @click.native="$router.push('datosEstudiante')">
          <v-icon>visibility</v-icon>
        </v-btn>
        <v-btn icon dark color="red" @click.native="cerrarCarpeta()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
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
              <!-- <v-btn icon dark color="primary" @click.native="verRegistro(props.item)">
                <v-icon>filter_none</v-icon>
              </v-btn> -->
              <v-btn icon dark color="primary" @click.native="printFile(props.item)">
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
        <v-dialog v-model="dialogRegistroEspecialidadTS" persistent width="1200px">
          <v-card>
            <vista-trabajo-social></vista-trabajo-social>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary" flat v-on:click="dialogRegistroEspecialidadTS = false">{{$t('common.accept')}}
                <v-icon right>done</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- VENTANA DE TERAPIA OCUPACIONAL -->
        <v-dialog v-model="dialogRegistroEspecialidadTO" persistent width="1200px">
          <v-card>
            <vista-terapia-ocupacional></vista-terapia-ocupacional>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary" flat v-on:click="dialogRegistroEspecialidadTO = false">{{$t('common.accept')}}
                <v-icon right>done</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- VENTANA DE PSICOMOTRICIDAD -->
        <v-dialog v-model="dialogRegistroEspecialidadPM" persistent width="1200px">
          <v-card>
            <vista-psicomotricidad></vista-psicomotricidad>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary" flat v-on:click="dialogRegistroEspecialidadPM = false">{{$t('common.accept')}}
                <v-icon right>done</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- VENTANA DE FISIOTERAPIA -->
        <v-dialog v-model="dialogRegistroEspecialidadFT" persistent width="1200px">
          <v-card>
            <vista-fisioterapia></vista-fisioterapia>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary" flat v-on:click="dialogRegistroEspecialidadFT = false">{{$t('common.accept')}}
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
  import RegistroEvaluacionTerapiaOcupacional from '@/components/vistaRegistros/evalTerapiaOcupacional.vue';
  import RegistroEvaluacionPsicomotricidad from '@/components/vistaRegistros/evalPsicomotricidad.vue';
  import RegistroEvaluacionFisioterapia from '@/components/vistaRegistros/evalFisioterapia.vue';
  /* eslint-disable semi */
  export default {
    mixins: [ Comps ],
    data () {
      return {
        headers: {'access-token': '<your-token>'},
        generalDataPanel: true,
        // Registro Seguimiento
        dialogRegistroSeguimiento: false,
        dialogRegistroEspecialidadTS: false,
        dialogRegistroEspecialidadTO: false,
        dialogRegistroEspecialidadPM: false,
        dialogRegistroEspecialidadFT: false,
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
      'vista-terapia-ocupacional': RegistroEvaluacionTerapiaOcupacional,
      'vista-psicomotricidad': RegistroEvaluacionPsicomotricidad,
      'vista-fisioterapia': RegistroEvaluacionFisioterapia
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
      cerrarCarpeta (userData) {
        if (this.$storage.exist('menu')) {
          let nuevoMenu = this.$storage.get('menu');
          nuevoMenu[0].visible = true;
          nuevoMenu[1].visible = false;
          this.$store.state.menu = nuevoMenu;
          this.$storage.set('menu', nuevoMenu);
          this.$storage.remove('nino');
          this.$router.push('home');
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
      printFile (item) {
        this.loading = true;
        let datosEstudiante = this.$storage.get('nino');
        this.$service.get(`imprimirRegistro?idRegistro=${item.id_registro}&estudiante=${datosEstudiante.codigo}`)
        .then(response => {
          if (response && response.datos) {
            window.open('data:application/pdf;base64,' + response.datos);
          }
          this.loading = false;
        });
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
              case 'Psicomotricidad':
                this.$store.state.psychomotorRegisterEdit = item;
                this.$router.push('registroEvaluacionPsicomotricidad?registro=' + item.id_registro);
                break;
              case 'Fisioterapia':
                this.$store.state.physiotherapyRegisterEdit = item;
                this.$router.push('registroEvaluacionFisioterapia?registro=' + item.id_registro);
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
                this.dialogRegistroEspecialidadTS = true;
                break;
              case 'Terapia Ocupacional':
                this.areaView = 'Terapia Ocupacional';
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
                this.dialogRegistroEspecialidadTO = true;
                break;
              case 'Psicomotricidad':
                this.areaView = 'Psicomotricidad';
                const datosPsicomotricidad = {
                  idRegistro: item.id_registro,
                  fecha: this.getDate(item._fecha_creacion),
                  area: item.area,
                  autor: item.usuario.nombre + ' ' + item.usuario.primer_apellido + ' ' + item.usuario.segundo_apellido,
                  anam_antecedentesFamiliares: item.reg_pm.anam_antecedentesFamiliares,
                  anam_antecedentesPatologicos: item.reg_pm.anam_antecedentesPatologicos,
                  anam_perinatal: item.reg_pm.anam_perinatal,
                  anam_prenatal: item.reg_pm.anam_prenatal,
                  anam_postnatal: item.reg_pm.anam_postnatal,
                  anam_controlCefálico: item.reg_pm.anam_controlCefálico,
                  anam_Sedestación: item.reg_pm.anam_Sedestación,
                  anam_Arrastre: item.reg_pm.anam_Arrastre,
                  anam_Gateo: item.reg_pm.anam_Gateo,
                  anam_Bipedestación: item.reg_pm.anam_Bipedestación,
                  anam_Marcha: item.reg_pm.anam_Marcha,
                  anam_razonConsulta: item.reg_pm.anam_razonConsulta,
                  psico_headUpright: item.reg_pm.psico_headUpright,
                  psico_movesHead: item.reg_pm.psico_movesHead,
                  psico_holdsObjects: item.reg_pm.psico_holdsObjects,
                  psico_playsFeetAndHands: item.reg_pm.psico_playsFeetAndHands,
                  psico_locateSounds: item.reg_pm.psico_locateSounds,
                  psico_babbles: item.reg_pm.psico_babbles,
                  psico_gutturalSounds: item.reg_pm.psico_gutturalSounds,
                  psico_stimulusSmile: item.reg_pm.psico_stimulusSmile,
                  psico_recognicesMother: item.reg_pm.psico_recognicesMother,
                  psico_mouthSounds: item.reg_pm.psico_mouthSounds,
                  psico_liftHead: item.reg_pm.psico_liftHead,
                  psico_ulnaChange: item.reg_pm.psico_ulnaChange,
                  psico_picksCloseObjects: item.reg_pm.psico_picksCloseObjects,
                  psico_makesSounds: item.reg_pm.psico_makesSounds,
                  psico_callsForAttention: item.reg_pm.psico_callsForAttention,
                  psico_repeatsSyllables: item.reg_pm.psico_repeatsSyllables,
                  psico_smilesToExtrangers: item.reg_pm.psico_smilesToExtrangers,
                  psico_recognicesCaretaker: item.reg_pm.psico_recognicesCaretaker,
                  psico_sitsWithoutSupport: item.reg_pm.psico_sitsWithoutSupport,
                  psico_drags: item.reg_pm.psico_drags,
                  psico_picksAndHitsObjects: item.reg_pm.psico_picksAndHitsObjects,
                  psico_takesFoodToMouth: item.reg_pm.psico_takesFoodToMouth,
                  psico_likesSongs: item.reg_pm.psico_likesSongs,
                  psico_searchsSounds: item.reg_pm.psico_searchsSounds,
                  psico_recognicesObjects: item.reg_pm.psico_recognicesObjects,
                  psico_criesBeforeExtrangers: item.reg_pm.psico_criesBeforeExtrangers,
                  psico_imitatesMovements: item.reg_pm.psico_imitatesMovements,
                  psico_sitsWithSupport: item.reg_pm.psico_sitsWithSupport,
                  psico_crawl: item.reg_pm.psico_crawl,
                  psico_discoversObjects: item.reg_pm.psico_discoversObjects,
                  psico_walksWithSupport: item.reg_pm.psico_walksWithSupport,
                  psico_wordsWithMeaning: item.reg_pm.psico_wordsWithMeaning,
                  psico_embraceAdultChild: item.reg_pm.psico_embraceAdultChild,
                  psico_answersToName: item.reg_pm.psico_answersToName,
                  psico_meetsSimpleOrders: item.reg_pm.psico_meetsSimpleOrders,
                  psico_jumpsWithBothFeet: item.reg_pm.psico_jumpsWithBothFeet,
                  psico_throwsBall: item.reg_pm.psico_throwsBall,
                  psico_UndressHimself: item.reg_pm.psico_UndressHimself,
                  psico_useForkCup: item.reg_pm.psico_useForkCup,
                  psico_makesNounVerbPhrases: item.reg_pm.psico_makesNounVerbPhrases,
                  psico_useNegatives: item.reg_pm.psico_useNegatives,
                  psico_answerQuestions: item.reg_pm.psico_answerQuestions,
                  psico_bigAndSmallDifferences: item.reg_pm.psico_bigAndSmallDifferences,
                  psico_singChildrenSongs: item.reg_pm.psico_singChildrenSongs,
                  psico_exploreEnvironment: item.reg_pm.psico_exploreEnvironment,
                  psico_recognicesPhotographs: item.reg_pm.psico_recognicesPhotographs,
                  psico_playsSmallGroups: item.reg_pm.psico_playsSmallGroups,
                  psico_greetsOnCommand: item.reg_pm.psico_greetsOnCommand,
                  psico_performManualActivities: item.reg_pm.psico_performManualActivities,
                  psico_runsJumps: item.reg_pm.psico_runsJumps,
                  psico_copyLinesAndCircles: item.reg_pm.psico_copyLinesAndCircles,
                  psico_identifiesEspatialConcepts: item.reg_pm.psico_identifiesEspatialConcepts,
                  psico_acknowledgeHisSex: item.reg_pm.psico_acknowledgeHisSex,
                  psico_gerundPluralArticleDifference: item.reg_pm.psico_gerundPluralArticleDifference,
                  psico_articlePhonemes: item.reg_pm.psico_articlePhonemes,
                  psico_gestureCommunication: item.reg_pm.psico_gestureCommunication,
                  psico_talksFirstPerson: item.reg_pm.psico_talksFirstPerson,
                  psico_useOralLanguage: item.reg_pm.psico_useOralLanguage,
                  psico_showsPersonalPreferences: item.reg_pm.psico_showsPersonalPreferences,
                  psico_likesChildAndAnimals: item.reg_pm.psico_likesChildAndAnimals,
                  psico_joinsSmallTeams: item.reg_pm.psico_joinsSmallTeams,
                  motor_run: item.reg_pm.motor_run,
                  motor_jump: item.reg_pm.motor_jump,
                  motor_throw: item.reg_pm.motor_throw,
                  motor_kick: item.reg_pm.motor_kick,
                  motor_staticDinamicBalance: item.reg_pm.motor_staticDinamicBalance,
                  motor_staticBalance: item.reg_pm.motor_staticBalance,
                  motor_partialDisociation: item.reg_pm.motor_partialDisociation,
                  motor_generalCoordination: item.reg_pm.motor_generalCoordination,
                  motor_eye_right: item.reg_pm.motor_eye_right,
                  motor_eye_left: item.reg_pm.motor_eye_left,
                  motor_ear_right: item.reg_pm.motor_ear_right,
                  motor_ear_left: item.reg_pm.motor_ear_left,
                  motor_hand_right: item.reg_pm.motor_hand_right,
                  motor_hand_left: item.reg_pm.motor_hand_left,
                  motor_feet_right: item.reg_pm.motor_feet_right,
                  motor_feet_left: item.reg_pm.motor_feet_left,
                  motor_scrash: item.reg_pm.motor_scrash,
                  motor_button: item.reg_pm.motor_button,
                  motor_cut: item.reg_pm.motor_cut,
                  motor_makeTower: item.reg_pm.motor_makeTower,
                  motor_threadingNeedle: item.reg_pm.motor_threadingNeedle,
                  motor_observaciones: item.reg_pm.motor_observaciones,
                  cogni_drawsHumanFigure: item.reg_pm.cogni_drawsHumanFigure,
                  cogni_nameHumanParts: item.reg_pm.cogni_nameHumanParts,
                  cogni_compleateHumanFigure: item.reg_pm.cogni_compleateHumanFigure,
                  cogni_bodyImage: item.reg_pm.cogni_bodyImage,
                  cogni_urlPhoto: item.reg_pm.cogni_urlPhoto,
                  cogni_headersPhoto: item.reg_pm.cogni_headersPhoto,
                  cogni_arriba: item.reg_pm.cogni_arriba,
                  cogni_abajo: item.reg_pm.cogni_abajo,
                  cogni_delante: item.reg_pm.cogni_delante,
                  cogni_detras: item.reg_pm.cogni_detras,
                  cogni_dentro: item.reg_pm.cogni_dentro,
                  cogni_fuera: item.reg_pm.cogni_fuera,
                  cogni_izquierda: item.reg_pm.cogni_izquierda,
                  cogni_derecha: item.reg_pm.cogni_derecha,
                  cogni_inflaGlobo: item.reg_pm.cogni_inflaGlobo,
                  cogni_encubaHuevos: item.reg_pm.cogni_encubaHuevos,
                  cogni_plantaFlores: item.reg_pm.cogni_plantaFlores,
                  cogni_undifferentiatedCrying: item.reg_pm.cogni_undifferentiatedCrying,
                  cogni_socialSmile: item.reg_pm.cogni_socialSmile,
                  cogni_vocalGame: item.reg_pm.cogni_vocalGame,
                  cogni_babbleReflection: item.reg_pm.cogni_babbleReflection,
                  cogni_gutturalSound: item.reg_pm.cogni_gutturalSound,
                  cogni_gestures: item.reg_pm.cogni_gestures,
                  cogni_intentionalSyllable: item.reg_pm.cogni_intentionalSyllable,
                  cogni_juxtaposedWord: item.reg_pm.cogni_juxtaposedWord,
                  cogni_simplePhrase: item.reg_pm.cogni_simplePhrase,
                  cogni_phraseWord: item.reg_pm.cogni_phraseWord,
                  cogni_languageInteriorization: item.reg_pm.cogni_languageInteriorization,
                  cogni_waitTurn: item.reg_pm.cogni_waitTurn,
                  cogni_completePhrase: item.reg_pm.cogni_completePhrase,
                  cogni_gramaticalElemmentUse: item.reg_pm.cogni_gramaticalElemmentUse,
                  cogni_makeComplexeSentences: item.reg_pm.cogni_makeComplexeSentences,
                  cogni_fullfillComplexOrder: item.reg_pm.cogni_fullfillComplexOrder,
                  cogni_beginReadingWriting: item.reg_pm.cogni_beginReadingWriting,
                  cogni_usePreposition: item.reg_pm.cogni_usePreposition,
                  cogni_useAdjectives: item.reg_pm.cogni_useAdjectives,
                  cogni_slangLanguage: item.reg_pm.cogni_slangLanguage,
                  cogni_useAdjectivesAdverbs: item.reg_pm.cogni_useAdjectivesAdverbs,
                  cogni_verbUse: item.reg_pm.cogni_verbUse,
                  cogni_fluidCommunication: item.reg_pm.cogni_fluidCommunication,
                  cogni_observaciones: item.reg_pm.cogni_observaciones,
                  socio_plays: item.reg_pm.socio_plays,
                  socio_proposeGame: item.reg_pm.socio_proposeGame,
                  socio_leaderInGames: item.reg_pm.socio_leaderInGames,
                  socio_acceptAnothersGame: item.reg_pm.socio_acceptAnothersGame,
                  socio_otherGame: item.reg_pm.socio_otherGame,
                  socio_acceptIt: item.reg_pm.socio_acceptIt,
                  socio_searchIt: item.reg_pm.socio_searchIt,
                  socio_provokesIt: item.reg_pm.socio_provokesIt,
                  socio_thanksHim: item.reg_pm.socio_thanksHim,
                  socio_waitGrownUpApprovation: item.reg_pm.socio_waitGrownUpApprovation,
                  socio_waitOrders: item.reg_pm.socio_waitOrders,
                  socio_collaborateWithAdult: item.reg_pm.socio_collaborateWithAdult,
                  socio_otherAdult: item.reg_pm.socio_otherAdult,
                  socio_observaciones: item.reg_pm.socio_observaciones,
                  diagnosticoPsicomotriz: item.reg_pm.diagnosticoPsicomotriz,
                  recomendaciones: item.reg_pm.recomendaciones
                };
                this.$store.state.psychomotorRegisterView = datosPsicomotricidad
                this.dialogRegistroEspecialidadPM = true;
                break;
              case 'Fisioterapia':
                this.areaView = 'Fisioterapia';
                const datosFisioterapia = {
                  idRegistro: item.id_registro,
                  fecha: this.getDate(item._fecha_creacion),
                  area: item.area,
                  autor: item.usuario.nombre + ' ' + item.usuario.primer_apellido + ' ' + item.usuario.segundo_apellido,
                  diagnosticoMedico: item.reg_ft.diagnosticoMedico,
                  motivoConsulta: item.reg_ft.motivoConsulta,
                  antecedentesEnfermedadActual: item.reg_ft.antecedentesEnfermedadActual,
                  ag_numeroEmbarazo: item.reg_ft.ag_numeroEmbarazo,
                  ag_numeroHijos: item.reg_ft.ag_numeroHijos,
                  ag_controlPrenatal: item.reg_ft.ag_controlPrenatal,
                  ag_hospital: item.reg_ft.ag_hospital,
                  ag_problemasDuranteEmbarazo: item.reg_ft.ag_problemasDuranteEmbarazo,
                  ag_tiempoGestacional: item.reg_ft.ag_tiempoGestacional,
                  ag_parto: item.reg_ft.ag_parto,
                  ag_tipoParto: item.reg_ft.ag_tipoParto,
                  ag_posicion: item.reg_ft.ag_posicion,
                  ag_llanto: item.reg_ft.ag_llanto,
                  ag_movimientos: item.reg_ft.ag_movimientos,
                  ag_cianosis: item.reg_ft.ag_cianosis,
                  ag_oxigeno: item.reg_ft.ag_oxigeno,
                  ag_incubadora: item.reg_ft.ag_incubadora,
                  ag_tiempoIncubadora: item.reg_ft.ag_tiempoIncubadora,
                  ag_otros: item.reg_ft.ag_otros,
                  epf_planoAnterior: item.reg_ft.epf_planoAnterior,
                  epf_planoPosterior: item.reg_ft.epf_planoPosterior,
                  epf_planoLateral: item.reg_ft.epf_planoLateral,
                  epf_otros: item.reg_ft.epf_otros,
                  epf_tipoRespiracion: item.reg_ft.epf_tipoRespiracion,
                  epf_patronRespiracion: item.reg_ft.epf_patronRespiracion,
                  epf_marcha: item.reg_ft.epf_marcha,
                  epf_Po_thomas: item.reg_ft.epf_Po_thomas,
                  epf_Po_galeazi: item.reg_ft.epf_Po_galeazi,
                  epf_Po_ober: item.reg_ft.epf_Po_ober,
                  epf_Po_ortolani: item.reg_ft.epf_Po_ortolani,
                  epf_Po_barlow: item.reg_ft.epf_Po_barlow,
                  epf_Po_asimetriaPliegues: item.reg_ft.epf_Po_asimetriaPliegues,
                  epf_Po_otros: item.reg_ft.epf_Po_otros,
                  epf_tono: item.reg_ft.epf_tono,
                  epf_trofismo: item.reg_ft.epf_trofismo,
                  escalaAshworth: item.reg_ft.escalaAshworth,
                  ref_suctionReflection: item.reg_ft.ref_suctionReflection,
                  ref_suctionReflectionText: item.reg_ft.ref_suctionReflectionText,
                  ref_TRIPLEEXTFLX: item.reg_ft.ref_TRIPLEEXTFLX,
                  ref_TRIPLEEXTFLXText: item.reg_ft.ref_TRIPLEEXTFLXText,
                  ref_RTCA: item.reg_ft.ref_RTCA,
                  ref_RTCAText: item.reg_ft.ref_RTCAText,
                  ref_RTCS: item.reg_ft.ref_RTCS,
                  ref_RTCSText: item.reg_ft.ref_RTCSText,
                  ref_RTL: item.reg_ft.ref_RTL,
                  ref_RTLText: item.reg_ft.ref_RTLText,
                  ref_RMORO: item.reg_ft.ref_RMORO,
                  ref_RMOROText: item.reg_ft.ref_RMOROText,
                  ref_RBABINSKI: item.reg_ft.ref_RBABINSKI,
                  ref_RBABINSKIText: item.reg_ft.ref_RBABINSKIText,
                  ref_REXTCRUZADA: item.reg_ft.ref_REXTCRUZADA,
                  ref_REXTCRUZADAText: item.reg_ft.ref_REXTCRUZADAText,
                  ref_GALANT: item.reg_ft.ref_GALANT,
                  ref_GALANTText: item.reg_ft.ref_GALANTText,
                  ref_LANDAU: item.reg_ft.ref_LANDAU,
                  ref_LANDAUText: item.reg_ft.ref_LANDAUText,
                  ref_DEFENSA: item.reg_ft.ref_DEFENSA,
                  ref_DEFENSAText: item.reg_ft.ref_DEFENSAText,
                  ref_RPALMAR: item.reg_ft.ref_RPALMAR,
                  ref_RPALMARText: item.reg_ft.ref_RPALMARText,
                  ref_RPLANTAR: item.reg_ft.ref_RPLANTAR,
                  ref_RPLANTARText: item.reg_ft.ref_RPLANTARText,
                  ref_RPOSITIVODEAPOYO: item.reg_ft.ref_RPOSITIVODEAPOYO,
                  ref_RPOSITIVODEAPOYOText: item.reg_ft.ref_RPOSITIVODEAPOYOText,
                  ref_RPARACAIDAS: item.reg_ft.ref_RPARACAIDAS,
                  ref_RPARACAIDASText: item.reg_ft.ref_RPARACAIDASText,
                  re_laberintico: item.reg_ft.re_laberintico,
                  re_laberinticoText: item.reg_ft.re_laberinticoText,
                  re_sobreOjos: item.reg_ft.re_sobreOjos,
                  re_sobreOjosText: item.reg_ft.re_sobreOjosText,
                  ame_decubitoDorsal: item.reg_ft.ame_decubitoDorsal,
                  ame_decubitoVentral: item.reg_ft.ame_decubitoVentral,
                  ame_cambioPosicion: item.reg_ft.ame_cambioPosicion,
                  ame_rolido: item.reg_ft.ame_rolido,
                  ame_arrastre: item.reg_ft.ame_arrastre,
                  ame_sedente: item.reg_ft.ame_sedente,
                  ame_gateo: item.reg_ft.ame_gateo,
                  ame_arrodillado: item.reg_ft.ame_arrodillado,
                  ame_bipedo: item.reg_ft.ame_bipedo,
                  ep_esquemaCorporal: item.reg_ft.ep_esquemaCorporal,
                  ep_esquemaCorporalText: item.reg_ft.ep_esquemaCorporalText,
                  ep_imagenCorporal: item.reg_ft.ep_imagenCorporal,
                  ep_imagenCorporalText: item.reg_ft.ep_imagenCorporalText,
                  ep_conceptoCorporal: item.reg_ft.ep_conceptoCorporal,
                  ep_conceptoCorporalText: item.reg_ft.ep_conceptoCorporalText,
                  ep_estructuracionEspacial: item.reg_ft.ep_estructuracionEspacial,
                  ep_estructuracionEspacialText: item.reg_ft.ep_estructuracionEspacialText,
                  ep_estructuracionTemporal: item.reg_ft.ep_estructuracionTemporal,
                  ep_estructuracionTemporalText: item.reg_ft.ep_estructuracionTemporalText,
                  ep_equilibrioEstatico: item.reg_ft.ep_equilibrioEstatico,
                  ep_equilibrioEstaticoText: item.reg_ft.ep_equilibrioEstaticoText,
                  ep_equilibrioDinamico: item.reg_ft.ep_equilibrioDinamico,
                  ep_equilibrioDinamicoText: item.reg_ft.ep_equilibrioDinamicoText,
                  ep_coordinacionGruesa: item.reg_ft.ep_coordinacionGruesa,
                  ep_coordinacionGruesaText: item.reg_ft.ep_coordinacionGruesaText,
                  ep_coordinacionFina: item.reg_ft.ep_coordinacionFina,
                  ep_coordinacionFinaText: item.reg_ft.ep_coordinacionFinaText,
                  ep_coordinacionOjoMano: item.reg_ft.ep_coordinacionOjoMano,
                  ep_coordinacionOjoManoText: item.reg_ft.ep_coordinacionOjoManoText,
                  ep_coordinacionOjoPie: item.reg_ft.ep_coordinacionOjoPie,
                  ep_coordinacionOjoPieText: item.reg_ft.ep_coordinacionOjoPieText,
                  ep_lateralidad: item.reg_ft.ep_lateralidad,
                  ep_observacion: item.reg_ft.ep_observacion,
                  avd_higiene: item.reg_ft.avd_higiene,
                  avd_higieneText: item.reg_ft.avd_higieneText,
                  avd_alimentacion: item.reg_ft.avd_alimentacion,
                  avd_alimentacionText: item.reg_ft.avd_alimentacionText,
                  avd_vestimenta: item.reg_ft.avd_vestimenta,
                  avd_vestimentaText: item.reg_ft.avd_vestimentaText,
                  asa_muestrasAfectivas: item.reg_ft.asa_muestrasAfectivas,
                  asa_muestrasAfectivasText: item.reg_ft.asa_muestrasAfectivasText,
                  asa_comunicacionOral: item.reg_ft.asa_comunicacionOral,
                  asa_comunicacionOralText: item.reg_ft.asa_comunicacionOralText,
                  asa_comunicacionAlternativa: item.reg_ft.asa_comunicacionAlternativa,
                  asa_comunicacionAlternativaText: item.reg_ft.asa_comunicacionAlternativaText,
                  asa_relacionamientoSocial: item.reg_ft.asa_relacionamientoSocial,
                  asa_relacionamientoSocialText: item.reg_ft.asa_relacionamientoSocialText,
                  areaCognitiva: item.reg_ft.areaCognitiva,
                  areaCognitivaText: item.reg_ft.areaCognitivaText,
                  aa_vision: item.reg_ft.aa_vision,
                  aa_visionText: item.reg_ft.aa_visionText,
                  aa_audicion: item.reg_ft.aa_audicion,
                  aa_audicionText: item.reg_ft.aa_audicionText,
                  aa_lenguaje: item.reg_ft.aa_lenguaje,
                  aa_lenguajeText: item.reg_ft.aa_lenguajeText,
                  aa_sindromeConvulsivo: item.reg_ft.aa_sindromeConvulsivo,
                  aa_sindromeConvulsivoText: item.reg_ft.aa_sindromeConvulsivoText,
                  aa_memoriaLargoPlazo: item.reg_ft.aa_memoriaLargoPlazo,
                  aa_memoriaLargoPlazoText: item.reg_ft.aa_memoriaLargoPlazoText,
                  aa_memoriaCortoPlazo: item.reg_ft.aa_memoriaCortoPlazo,
                  aa_memoriaCortoPlazoText: item.reg_ft.aa_memoriaCortoPlazoText,
                  aa_estadoEmocional: item.reg_ft.aa_estadoEmocional,
                  aa_estadoEmocionalText: item.reg_ft.aa_estadoEmocionalText,
                  aa_estadoNutricional: item.reg_ft.aa_estadoNutricional,
                  aa_estadoNutricionalText: item.reg_ft.aa_estadoNutricionalText,
                  aa_sensibilidad: item.reg_ft.aa_sensibilidad,
                  aa_sensibilidadText: item.reg_ft.aa_sensibilidadText,
                  aa_estereotipos: item.reg_ft.aa_estereotipos,
                  conclusiones: item.reg_ft.conclusiones,
                  diagnostico: item.reg_ft.diagnostico,
                  objetivos: item.reg_ft.objetivos,
                  planTratamiento: item.reg_ft.planTratamiento
                };
                this.$store.state.physiotherapyRegisterView = datosFisioterapia
                this.dialogRegistroEspecialidadFT = true;
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
      }
    }
  }
</script>
