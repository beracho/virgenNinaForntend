<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs1></v-flex>
        <v-flex xs6>
          <h3>{{this.datosEstudiante.nombres}} <br> {{this.datosEstudiante.primer_apellido + ' ' +  this.datosEstudiante.segundo_apellido}}</h3>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs4>
          <v-btn dark block color="red" @click.native="cerrarCarpeta()">{{$t('socialWork.closeFolder')}}</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <form @submit.prevent="submit">
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">{{$t('usuarios.personalData')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="generalDataPanel?minimize(0):maximize(0)">
            <v-icon>{{generalDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="generalDataPanel">
          <v-layout row wrap>
            <v-flex xs12>
              <b>{{ this.$t('registerView.creationDate') }}: </b> {{getDate(fechaCreacion)}} 
            </v-flex>
            <v-flex xs6>
              <b>{{ this.$t('common.code') }}: </b>
            </v-flex>
            <v-flex xs6>
              <b>{{ this.$t('inscriptionRegister.subNames') }}: </b> {{datosEstudiante.primer_apellido ? datosEstudiante.primer_apellido : this.$t('generalFollowUp.notRegistered')}} {{datosEstudiante.segundo_apellido ? datosEstudiante.segundo_apellido : this.$t('generalFollowUp.notRegistered')}} {{datosEstudiante.nombres ? datosEstudiante.nombres : this.$t('generalFollowUp.notRegistered')}}
            </v-flex>
            <v-flex xs6>
              <b>{{ this.$t('inscriptionRegister.bornDate') }}: </b> {{datosEstudiante.segundo_apellido ? datosEstudiante.segundo_apellido : this.$t('generalFollowUp.notRegistered')}}
            </v-flex>
            <v-flex xs6>
              <b>{{ this.$t('generalFollowUp.age') }}: </b> {{datosEstudiante.nombres ? datosEstudiante.nombres : this.$t('generalFollowUp.notRegistered')}}
            </v-flex>
            <v-flex xs6>
              <b>{{ this.$t('socialWork.admissionDate') }}: </b> 
            </v-flex>
            <v-flex xs6>
              <b>{{ this.$t('socialWork.readmissionDate') }}: </b> 
            </v-flex>
            <v-flex xs6>
              <b>{{ this.$t('usuarios.gender') }}: </b> 
            </v-flex>
            <v-flex xs6>
              <b>{{ this.$t('inscriptionRegister.telefon') }}: </b> 
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">{{$t('socialWork.familyInformation')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="familyDataPanel?minimize(1):maximize(1)">
            <v-icon>{{familyDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="familyDataPanel">
          <v-layout row wrap>
            <v-flex xs12>
              <family-members :studentCode="datosEstudiante.codigo" :createRelation="true" :editRelation="true"></family-members>
            </v-flex>
            <v-flex xs12>
              <v-combobox
                v-model="formularioRegistro.tipoDeFamiliaObject"
                :filter="filter"
                :hide-no-data="!familyTypeSearch"
                :items="familyTypeItems"
                :search-input.sync="familyTypeSearch"
                hide-selected
                :label="$t('socialWork.familyType')"
                :error="$v.formularioRegistro.tipoDeFamiliaObject.$error"
                @input="$v.formularioRegistro.tipoDeFamiliaObject.$touch()"
                :error-messages="errors.tipoDeFamiliaObject"
                small-chips
              >
                <template v-slot:no-data>
                  <v-list-tile>
                    <span class="subheading">{{$t('inscriptionRegister.createNew')}}</span>
                    <v-chip
                      :color="`${colors[nonce - 1]} lighten-3`"
                      label
                      small
                    >
                      {{ familyTypeSearch }}
                    </v-chip>
                  </v-list-tile>
                </template>
                <template v-slot:selection="{ item, parent, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    :color="`${item.color} lighten-3`"
                    :selected="selected"
                    label
                    small
                  >
                    <span class="pr-2">
                      {{ item.text }}
                    </span>
                    <v-icon
                      small
                      @click="parent.selectItem(item)"
                    >close</v-icon>
                  </v-chip>
                </template>
                <template v-slot:item="{ index, item }">
                  <v-list-tile-content>
                    <v-chip
                      :color="`${item.color} lighten-3`"
                      dark
                      label
                      small
                    >
                      {{ item.text }}
                    </v-chip>
                  </v-list-tile-content>
                </template>
              </v-combobox>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('socialWork.groupFamilyObservation')"
                v-model="formularioRegistro.observacionGrupoFamiliar"
                :error="$v.formularioRegistro.observacionGrupoFamiliar.$error"
                @input="$v.formularioRegistro.observacionGrupoFamiliar.$touch()"
                :error-messages="errors.observacionGrupoFamiliar"
                counter
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">{{$t('socialWork.familyDinamicDetail')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="socialDataPanel?minimize(2):maximize(2)">
            <v-icon>{{socialDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="socialDataPanel">
          <v-layout row wrap>
            <v-flex xs12>
              <v-textarea
                :label="$t('socialWork.familyDinamic')"
                v-model="formularioRegistro.dinamicaFamiliar"
                :placeholder="$t('socialWork.familyDinamicPlaceholder')"
                :error="$v.formularioRegistro.dinamicaFamiliar.$error"
                @input="$v.formularioRegistro.dinamicaFamiliar.$touch()"
                :error-messages="errors.dinamicaFamiliar"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('socialWork.socialProces')"
                v-model="formularioRegistro.procesoSocial"
                :placeholder="$t('socialWork.socialProcesPlaceholder')"
                :error="$v.formularioRegistro.procesoSocial.$error"
                @input="$v.formularioRegistro.procesoSocial.$touch()"
                :error-messages="errors.procesoSocial"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('socialWork.disabilityStory')"
                v-model="formularioRegistro.relatoDiscapacidad"
                :error="$v.formularioRegistro.relatoDiscapacidad.$error"
                @input="$v.formularioRegistro.relatoDiscapacidad.$touch()"
                :error-messages="errors.relatoDiscapacidad"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('socialWork.socialDiagnostics')"
                v-model="formularioRegistro.diagnosticoSocial"
                :placeholder="$t('socialWork.socialDiagnosticsPlaceholder')"
                :error="$v.formularioRegistro.diagnosticoSocial.$error"
                @input="$v.formularioRegistro.diagnosticoSocial.$touch()"
                :error-messages="errors.diagnosticoSocial"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('socialWork.conclusionSuggestion')"
                v-model="formularioRegistro.conclusionSugerencia"
                :placeholder="$t('socialWork.conclusionSuggestionPlaceholder')"
                :error="$v.formularioRegistro.conclusionSugerencia.$error"
                @input="$v.formularioRegistro.conclusionSugerencia.$touch()"
                :error-messages="errors.conclusionSugerencia"
                counter
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-container fluid>
            <v-layout row wrap>
              <v-spacer></v-spacer>
              <v-flex xs3>
                <v-btn class="seccion" block dark @click.native="limpiarCampos()">{{$t('common.clear')}}
                  <v-icon right>cached</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs3>
                <v-btn class="primary" block dark type="submit">{{$t('common.save')}}
                  <v-icon right>done</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators';
  import errorsHandler from '@/common/mixins/errorsHandler';
  import FamilyMember from '@/common/util/FamilyMember.vue';
  import Comps from '../comps';
  /* eslint-disable semi */
  export default {
    mixins: [ Comps, errorsHandler ],
    data () {
      return {
        headers: {'access-token': '<your-token>'},
        generalDataPanel: true,
        familyDataPanel: true,
        socialDataPanel: true,
        fechaCreacion: new Date(),
        datosEstudiante: {},
        formularioRegistro: {
          tipoDeFamilia: '',
          tipoDeFamiliaObject: '',
          observacionGrupoFamiliar: '',
          dinamicaFamiliar: '',
          procesoSocial: '',
          relatoDiscapacidad: '',
          diagnosticoSocial: '',
          conclusionSugerencia: ''
        },
        errors: {
          tipoDeFamiliaObject: [],
          observacionGrupoFamiliar: [],
          dinamicaFamiliar: [],
          procesoSocial: [],
          relatoDiscapacidad: [],
          diagnosticoSocial: [],
          conclusionSugerencia: []
        },
        colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
        nonce: 1,
        familyTypeItems: [
          { header: this.$t('socialWork.selectOrCreate') },
          {
            text: 'Nuclear',
            color: 'blue'
          },
          {
            text: 'Monoparental',
            color: 'red'
          },
          {
            text: 'Extensa',
            color: 'orange'
          },
          {
            text: 'Reconstituida',
            color: 'green'
          }
        ],
        familyTypeSearch: null
      }
    },
    components: {
      'family-members': FamilyMember
    },
    watch: {
      'formularioRegistro.tipoDeFamiliaObject': function (val, prev) {
        if (typeof this.formularioRegistro.tipoDeFamiliaObject === 'string') {
          this.formularioRegistro.tipoDeFamiliaObject = {
            text: this.formularioRegistro.tipoDeFamiliaObject,
            color: this.colors[this.nonce - 1]
          };
          this.familyTypeItems.push(this.formularioRegistro.tipoDeFamilia);
          this.nonce++;
        }
        // this.formRelative.civil_state = this.formularioRegistro.tipoDeFamilia.text;
        return this.formularioRegistro.tipoDeFamiliaObject;
      },
      '$v.formularioRegistro.tipoDeFamiliaObject.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.tipoDeFamiliaObject, this.errors.tipoDeFamiliaObject);
      },
      '$v.formularioRegistro.observacionGrupoFamiliar.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.observacionGrupoFamiliar, this.errors.observacionGrupoFamiliar);
      },
      '$v.formularioRegistro.dinamicaFamiliar.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.dinamicaFamiliar, this.errors.dinamicaFamiliar);
      },
      '$v.formularioRegistro.procesoSocial.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.procesoSocial, this.errors.procesoSocial);
      },
      '$v.formularioRegistro.relatoDiscapacidad.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.relatoDiscapacidad, this.errors.relatoDiscapacidad);
      },
      '$v.formularioRegistro.diagnosticoSocial.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.diagnosticoSocial, this.errors.diagnosticoSocial);
      },
      '$v.formularioRegistro.conclusionSugerencia.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.conclusionSugerencia, this.errors.conclusionSugerencia);
      }
    },
    created () {
      this.headers = {'Authorization': `Bearer ${this.$storage.get('token')}`};
      this.datosEstudiante = this.$storage.get('nino');
      if (this.$route.query.registro) {
        const socialWorkAux = this.$store.state.socialWorkRegisterEdit.registro_eval_trabajo_social;
        this.formularioRegistro = {
          tipoDeFamilia: socialWorkAux.tipo_de_familia ? socialWorkAux.tipo_de_familia : null,
          tipoDeFamiliaObject: socialWorkAux.tipo_de_familia ? {
            text: socialWorkAux.tipo_de_familia,
            color: this.colors[this.nonce - 1]} : null,
          observacionGrupoFamiliar: socialWorkAux.observacion_grupo_familiar ? socialWorkAux.observacion_grupo_familiar : null,
          dinamicaFamiliar: socialWorkAux.dinamica_familiar ? socialWorkAux.dinamica_familiar : null,
          procesoSocial: socialWorkAux.proceso_social ? socialWorkAux.proceso_social : null,
          relatoDiscapacidad: socialWorkAux.relato_discapacidad ? socialWorkAux.relato_discapacidad : null,
          diagnosticoSocial: socialWorkAux.diagnostico_social ? socialWorkAux.diagnostico_social : null,
          conclusionSugerencia: socialWorkAux.conclusion_sugerencia ? socialWorkAux.conclusion_sugerencia : null
        }
        // this.fechaCreacion = this.$store.state.socialWorkRegisterEdit._fecha_creacion;
      }
    },
    validations: {
      formularioRegistro: {
        tipoDeFamiliaObject: {
          required
        },
        observacionGrupoFamiliar: {},
        dinamicaFamiliar: {},
        procesoSocial: {},
        relatoDiscapacidad: {},
        diagnosticoSocial: {},
        conclusionSugerencia: {}
      }
    },
    methods: {
      minimize (cardNumber) {
        switch (cardNumber) {
          case 0:
            this.generalDataPanel = false;
            break;
          case 1:
            this.familyDataPanel = false;
            break;
          case 2:
            this.backgroundDataPanel = false;
            break;
          case 3:
            this.socialDataPanel = false;
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
            this.familyDataPanel = true;
            break;
          case 2:
            this.backgroundDataPanel = true;
            break;
          case 3:
            this.socialDataPanel = true;
            break;
          default:
            break;
        }
      },
      getDate (dateString) {
        let date = dateString ? new Date(dateString) : new Date();
        return (date.getDate() + ' - ' + this.$t('months[' + date.getMonth() + ']') + ' - ' + date.getFullYear());
      },
      filter (item, queryText, itemText) {
        if (item.header) return false;

        const hasValue = val => val != null ? val : '';

        const text = hasValue(itemText);
        const query = hasValue(queryText);

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1;
      },
      submit () { // Envía datos de la nueva asignación
        this.$v.formularioRegistro.$touch();
        if (!this.$v.formularioRegistro.$invalid) {
          this.formularioRegistro.tipoDeFamilia = this.formularioRegistro.tipoDeFamiliaObject.text;
          if (this.$route.query.registro) {
            // Edita registro Simple
            this.formularioRegistro.idRegistro = this.$route.query.registro;
            this.formularioRegistro.idRegistroTrabajoSocial = this.$store.state.socialWorkRegisterEdit.registro_eval_trabajo_social.id_registro_eval_trabajo_social;
            this.$service.put(`registroEvalTrabajoSocial`, this.formularioRegistro)
            .then(respuesta => {
              if (respuesta !== undefined) {
                this.limpiarCampos();
                this.$message.success(this.$t('generalFollowUp.registerCreationSuccessfull'));
                this.$router.push('registrosArchivados');
              } else {
                this.$message.error(this.$t('generalFollowUp.registerCreationUnsuccessfull'));
              }
            })
            .catch(() => {
              this.$message.error(this.$t('generalFollowUp.registerCreationUnsuccessfull'));
            });
          } else {
            // Crea registro simple
            this.formularioRegistro.codigoEstudiante = this.datosEstudiante.codigo;
            this.$service.post(`registroEvalTrabajoSocial`, this.formularioRegistro)
            .then(respuesta => {
              if (respuesta !== undefined) {
                this.limpiarCampos();
                this.$message.success(this.$t('generalFollowUp.registerCreationSuccessfull'));
                this.$router.push('registrosArchivados');
              } else {
                this.$message.error(this.$t('generalFollowUp.registerCreationUnsuccessfull'));
              }
            })
            .catch(() => {
              this.$message.error(this.$t('generalFollowUp.registerCreationUnsuccessfull'));
            });
          }
        } else {
          this.$message.error(this.$t('usuarios.errorFillForm'));
        }
      },
      limpiarCampos () {
        this.formularioRegistro.tipoDeFamilia = '';
        this.formularioRegistro.tipoDeFamiliaObject = {};
        this.formularioRegistro.observacionGrupoFamiliar = '';
        this.formularioRegistro.dinamicaFamiliar = '';
        this.formularioRegistro.procesoSocial = '';
        this.formularioRegistro.relatoDiscapacidad = '';
        this.formularioRegistro.diagnosticoSocial = '';
        this.formularioRegistro.conclusionSugerencia = '';
      },
      cerrarCarpeta (userData) {
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
      }
    }
  }
</script>
