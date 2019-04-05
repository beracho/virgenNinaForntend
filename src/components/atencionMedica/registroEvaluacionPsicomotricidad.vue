<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs1>
        </v-flex>
        <v-flex xs7>
          <h3>{{this.datosEstudiante.nombres}} <br> {{this.datosEstudiante.primer_apellido + ' ' +  this.datosEstudiante.segundo_apellido}}</h3>
        </v-flex>
        <v-flex xs4>
          <v-btn dark block color="red" @click.native="cerrarCarpeta()">Cerrar archivador</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card>
      <v-card-title class="headline">
        <v-icon right>subject</v-icon>
        <h2 class="headline mb-0">Datos personales</h2>
        <v-spacer></v-spacer>
        <v-btn icon dark color="primary" @click.native="generalDataPanel?minimize(0):maximize(0)">
          <v-icon>{{generalDataPanel?"remove":"add"}}</v-icon>
        </v-btn>
      </v-card-title>
      <v-container fluid v-if="generalDataPanel">
        <v-layout row wrap>
          <v-flex xs12>
            <b>{{ this.$t('inscriptionRegister.subNames') }}: </b> {{datosEstudiante.primer_apellido ? datosEstudiante.primer_apellido : this.$t('generalFollowUp.notRegistered')}} {{datosEstudiante.segundo_apellido ? datosEstudiante.segundo_apellido : this.$t('generalFollowUp.notRegistered')}} {{datosEstudiante.nombres ? datosEstudiante.nombres : this.$t('generalFollowUp.notRegistered')}}
          </v-flex>
          <v-flex xs6>
            <b>{{ this.$t('inscriptionRegister.bornDate') }}: </b> {{datosEstudiante.segundo_apellido ? datosEstudiante.segundo_apellido : this.$t('generalFollowUp.notRegistered')}}
          </v-flex>
          <v-flex xs6>
            <b>{{ this.$t('generalFollowUp.age') }}: </b> {{datosEstudiante.nombres ? datosEstudiante.nombres : this.$t('generalFollowUp.notRegistered')}}
          </v-flex>
          <v-flex xs6>
            <b>{{ this.$t('psicomotricity.evaluationDate') }}: </b> 
          </v-flex>
          <v-flex xs6>
            <b>{{ this.$t('psicomotricity.sentDiagnosis') }}: </b> 
          </v-flex>
          <v-flex xs6>
            <b>{{ this.$t('psicomotricity.educationCenter') }}: </b> 
          </v-flex>
          <v-flex xs6>
            <b>{{ this.$t('psicomotricity.schoolGrade') }}: </b> 
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-card>
      <v-card-title class="headline">
        <v-icon right>account_circle</v-icon>
        <h2 class="headline mb-0">{{ this.$t('inscriptionRegister.tutorData') }}</h2>
        <v-spacer></v-spacer>
        <v-btn icon dark color="primary" @click.native="parentsDataPanel?minimize(1):maximize(1)">
          <v-icon>{{parentsDataPanel?"remove":"add"}}</v-icon>
        </v-btn>
      </v-card-title>
      <v-container fluid v-if="parentsDataPanel">
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs6
                v-for="padre in padres"
                :key="padre.relacion"
              >
              <h4>{{ $t('inscriptionRegister.relation').toUpperCase() }}: {{padre.relation ? padre.relation.toUpperCase() : $t('generalFollowUp.notRegistered').toUpperCase()}}</h4>
              <b>{{ $t('inscriptionRegister.firstLastName') }}: </b> {{padre.primer_apellido ? padre.primer_apellido : $t('generalFollowUp.notRegistered')}}<br>
              <b>{{ $t('inscriptionRegister.secondLastName') }}: </b> {{padre.segundo_apellido ? padre.segundo_apellido : $t('generalFollowUp.notRegistered')}}<br>
              <b>{{ $t('inscriptionRegister.names') }}: </b> {{padre.nombres ? padre.nombres : $t('generalFollowUp.notRegistered')}}<br>
              <b>{{ $t('inscriptionRegister.ci') }}: </b> {{padre.documento_identidad ? padre.documento_identidad + ' ' + padre.lugar_documento_identidad : $t('generalFollowUp.notRegistered')}}<br>
              <b>{{ $t('inscriptionRegister.bornDate') }}: </b> {{padre.fecha_nacimiento ? getDate(padre.fecha_nacimiento) : $t('generalFollowUp.notRegistered')}}<br>
              <b>{{ $t('usuarios.gender') }}: </b> {{padre.genero ? padre.genero == 'M' ? $t('usuarios.male') : $t('usuarios.female') : $t('generalFollowUp.notRegistered')}}<br>
              <b>{{ $t('inscriptionRegister.language') }}: </b> {{padre.idiomas ? padre.idiomas : $t('generalFollowUp.notRegistered')}}<br>
              <b>{{ $t('inscriptionRegister.profession') }}: </b> {{padre.ocupacion_actual ? padre.ocupacion_actual : $t('generalFollowUp.notRegistered')}}<br>
              <b>{{ $t('inscriptionRegister.maxEducation') }}: </b> {{padre.grado_instruccion ? padre.grado_instruccion : $t('generalFollowUp.notRegistered')}}<br>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-card>
      <form @submit.prevent="submit">
        <v-card-title class="headline">
          <v-icon right>note_add</v-icon>
          <h2 class="headline mb-0">Antecedentes</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="backgroundDataPanel?minimize(2):maximize(2)">
            <v-icon>{{backgroundDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="backgroundDataPanel">
          <v-layout row wrap>
            <v-flex xs6>
              <v-textarea
                :label="$t('psicomotricity.perinatal')"
                v-model="formularioRegistro.perinatal"
                :error="$v.formularioRegistro.perinatal.$error"
                @input="$v.formularioRegistro.perinatal.$touch()"
                :error-messages="errors.perinatal"
              ></v-textarea>
            </v-flex>
            <v-flex xs6>
              <v-textarea
                :label="$t('psicomotricity.prenatal')"
                v-model="formularioRegistro.prenatal"
                :error="$v.formularioRegistro.prenatal.$error"
                @input="$v.formularioRegistro.prenatal.$touch()"
                :error-messages="errors.prenatal"
              ></v-textarea>
            </v-flex>
            <v-flex xs6>
              <v-textarea
                :label="$t('psicomotricity.postnatal')"
                v-model="formularioRegistro.postnatal"
                :error="$v.formularioRegistro.postnatal.$error"
                @input="$v.formularioRegistro.postnatal.$touch()"
                :error-messages="errors.postnatal"
              ></v-textarea>
            </v-flex>
            <v-flex xs3>
              <v-radio-group v-model="formularioRegistro.cephalicControl" :label="$t('psicomotricity.cephalicControl')" :mandatory="true" column>
                <v-radio :label="$t('common.yes')" value="CARNET_IDENTIDAD"></v-radio>
                <v-radio :label="$t('common.no')" value="PASAPORTE"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group v-model="formularioRegistro.sitting" :label="$t('psicomotricity.sitting')" :mandatory="true" column>
                <v-radio :label="$t('common.yes')" value="CARNET_IDENTIDAD"></v-radio>
                <v-radio :label="$t('common.no')" value="PASAPORTE"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group v-model="formularioRegistro.drag" :label="$t('psicomotricity.drag')" :mandatory="true" column>
                <v-radio :label="$t('common.yes')" value="CARNET_IDENTIDAD"></v-radio>
                <v-radio :label="$t('common.no')" value="PASAPORTE"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group v-model="formularioRegistro.crawl" :label="$t('psicomotricity.crawl')" :mandatory="true" column>
                <v-radio :label="$t('common.yes')" value="CARNET_IDENTIDAD"></v-radio>
                <v-radio :label="$t('common.no')" value="PASAPORTE"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group v-model="formularioRegistro.standing" :label="$t('psicomotricity.standing')" :mandatory="true" column>
                <v-radio :label="$t('common.yes')" value="CARNET_IDENTIDAD"></v-radio>
                <v-radio :label="$t('common.no')" value="PASAPORTE"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group v-model="formularioRegistro.walk" :label="$t('psicomotricity.walk')" :mandatory="true" column>
                <v-radio :label="$t('common.yes')" value="CARNET_IDENTIDAD"></v-radio>
                <v-radio :label="$t('common.no')" value="PASAPORTE"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('psicomotricity.consultationReason')"
                v-model="formularioRegistro.consultationReason"
                :error="$v.formularioRegistro.consultationReason.$error"
                @input="$v.formularioRegistro.consultationReason.$touch()"
                :error-messages="errors.consultationReason"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </form>
    </v-card>
    <v-card>
      <form @submit.prevent="submit">
        <v-card-title class="headline">
          <v-icon right>note_add</v-icon>
          <h2 class="headline mb-0">{{$t('psicomotricity.psychomotorEvaluation')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="psychomotorEvaluationDataPanel?minimize(3):maximize(3)">
            <v-icon>{{psychomotorEvaluationDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="psychomotorEvaluationDataPanel">
          <v-layout row wrap>
            <v-flex xs4>
              <v-combobox
                v-model="formularioRegistro.motor0a3"
                :filter="filter"
                :hide-no-data="!searchMotor0a3"
                :items="itemsMotor0a3"
                hide-selected
                :label="$t('psicomotricity.motor')"
                multiple
                small-chips
              >
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
            <v-flex xs4>
              <v-combobox
                v-model="formularioRegistro.cognitive0a3"
                :filter="filter"
                :hide-no-data="!searchCognitive0a3"
                :items="itemsCognitive0a3"
                hide-selected
                :label="$t('psicomotricity.cognitive')"
                multiple
                small-chips
              >
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
            <v-flex xs4>
              <v-combobox
                v-model="formularioRegistro.socioAfective0a3"
                :filter="filter"
                :hide-no-data="!searchSocioAfective0a3"
                :items="itemsSocioAfective0a3"
                hide-selected
                :label="$t('psicomotricity.cognitive')"
                multiple
                small-chips
              >
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
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs6>
              </v-flex>
              <v-flex xs3>
                <v-btn class="seccion" dark @click.native="limpiarCampos()">{{$t('common.clear')}}
                  <v-icon right>cached</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs3>
                <v-btn class="primary" dark type="submit">{{$t('common.save')}}
                  <v-icon right>done</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-actions>
      </form>
    </v-card>
  </div>

</template>

<script>
  import { required } from 'vuelidate/lib/validators';
  import errorsHandler from '@/common/mixins/errorsHandler';
  import Comps from '../comps';
  /* eslint-disable semi */
  export default {
    mixins: [ Comps, errorsHandler ],
    data () {
      return {
        headers: {'access-token': '<your-token>'},
        generalDataPanel: true,
        parentsDataPanel: true,
        backgroundDataPanel: true,
        psychomotorEvaluationDataPanel: true,
        datosEstudiante: {},
        padres: [],
        formularioRegistro: {
          perinatal: '',
          prenatal: '',
          postnatal: '',
          consultationReason: '',
          motor0a3: [],
          cognitive0a3: [],
          socioAfective0a3: []
        },
        errors: {
          perinatal: [],
          prenatal: [],
          postnatal: [],
          consultationReason: []
        },
        // ComboBox
        colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
        index: -1,
        itemsMotor0a3: [
          { header: this.$t('account.select') },
          {
            text: 'Cabeza erguida',
            color: 'blue'
          },
          {
            text: 'Mueve la cabeza',
            color: 'red'
          },
          {
            text: 'Sostiene objetos',
            color: 'green'
          },
          {
            text: 'Juega con pies y manos',
            color: 'orange'
          }
        ],
        itemsCognitive0a3: [
          { header: this.$t('account.select') },
          {
            text: 'Localiza sonidos',
            color: 'blue'
          },
          {
            text: 'Balbucea',
            color: 'red'
          },
          {
            text: 'Realiza sonidos guturales',
            color: 'green'
          }
        ],
        itemsSocioAfective0a3: [
          { header: this.$t('account.select') },
          {
            text: 'Sonrie a un estímulo',
            color: 'blue'
          },
          {
            text: 'Reconoce a la madre',
            color: 'red'
          },
          {
            text: 'Emite sonidos bucales',
            color: 'green'
          }
        ],
        searchMotor0a3: null,
        searchCognitive0a3: null,
        searchSocioAfective0a3: null
      }
    },
    components: {
    },
    watch: {
      '$v.formularioRegistro.perinatal.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.perinatal, this.errors.perinatal);
      },
      '$v.formularioRegistro.prenatal.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.prenatal, this.errors.prenatal);
      },
      '$v.formularioRegistro.postnatal.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.postnatal, this.errors.postnatal);
      },
      '$v.formularioRegistro.consultationReason.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.consultationReason, this.errors.consultationReason);
      }
    },
    created () {
      this.headers = {'Authorization': `Bearer ${this.$storage.get('token')}`};
      this.datosEstudiante = this.$storage.get('nino');
    },
    validations: {
      formularioRegistro: {
        perinatal: {
          required
        },
        prenatal: {
          required
        },
        postnatal: {
          required
        },
        consultationReason: {
          required
        }
      }
    },
    methods: {
      minimize (cardNumber) {
        switch (cardNumber) {
          case 0:
            this.generalDataPanel = false;
            break;
          case 1:
            this.parentsDataPanel = false;
            break;
          case 2:
            this.backgroundDataPanel = false;
            break;
          case 3:
            this.psychomotorEvaluationDataPanel = false;
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
            this.parentsDataPanel = true;
            break;
          case 2:
            this.backgroundDataPanel = true;
            break;
          case 3:
            this.psychomotorEvaluationDataPanel = true;
            break;
          default:
            break;
        }
      },
      submit () { // Envía datos de la nueva asignación
        this.$v.formularioRegistro.$touch();
        if (!this.$v.formularioRegistro.$invalid) {
          this.formularioRegistro.codigoEstudiante = this.datosEstudiante.codigo;
          this.$service.post(`registroSimple`, this.formularioRegistro)
          .then(respuesta => {
            this.dialogAsignacionCurso = false
            this.limpiarCampos();
            this.$message.success('Registro creado exitosamente');
            this.$router.push('registrosArchivados');
          })
          .catch(() => {
            this.$message.error('Error an la creación del registro');
          });
        }
      },
      filter (item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },
      limpiarCampos () {
        this.formularioRegistro.perinatal = '';
        this.formularioRegistro.prenatal = '';
        this.formularioRegistro.postnatal = '';
        this.formularioRegistro.consultationReason = '';
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
