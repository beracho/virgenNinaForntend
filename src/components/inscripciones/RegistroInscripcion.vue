<template>
<v-container fluid>
  <v-layout row wrap align-center>
    <!-- <v-dialog v-model="dialog" persistent width="1200px"> -->
      <!-- <v-btn dark class="seccion" slot="activator">
        Nuevo Usuario
        <v-icon right dark>add_circle</v-icon>
      </v-btn> -->
      <v-flex xs12>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>account_circle</v-icon>
          {{$t('inscriptionRegister.tittle') }}
        </v-card-title>
        <v-layout row>
          <v-flex xs10 offset-xs1>
            <v-form v-model="validForm" ref="form" lazy-validation>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-alert color="primary" icon="domain" value="true">
                    <strong>{{$t('inscriptionRegister.subtitle1') }}</strong><br>
                  </v-alert>
                </v-flex>
                <v-flex xs12>
                  <v-radio-group v-model="form.unidadEducativa.tipo" :label="$t('inscriptionRegister.dependency')" :mandatory="true" row>
                    <v-radio :label="$t('inscriptionRegister.public')" value="radio-1"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.comunitary')" value="radio-2"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.convein')" value="radio-2"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.private')" value="radio-2"></v-radio>
                  </v-radio-group>
                  <v-flex sx6>
                    <v-text-field :label="$t('inscriptionRegister.nameEducative')" v-model="form.unidadEducativa.nombre"></v-text-field>
                  </v-flex>
                  <v-flex sx6>
                    <v-text-field :label="$t('inscriptionRegister.educativeDistrit')" v-model="form.unidadEducativa.distrito"></v-text-field>
                  </v-flex>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12>
                  <v-alert color="primary" icon="school" value="true">
                    <strong>{{$t('inscriptionRegister.subtitle2') }}</strong><br>
                  </v-alert>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.rude') }}</h4>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.codRude')" v-model="form.persona.codrude"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.procedenceUnit') }}</h4>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.codSie')" v-model="form.persona.codSie"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.nameEducativeUnit')" v-model="form.persona.nombreUnidad"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.identity') }}</h4>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.persona.tipoDocumento" :label="$t('inscriptionRegister.documentTipe')" :mandatory="true" column>
                    <v-radio :label="$t('inscriptionRegister.ci')" value="radio-1"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.passport')" value="radio-2"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.documentNumber')" v-model="form.persona.documentoIdentidad"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.documentPlace')" v-model="form.persona.lugarDocumento"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.subNames') }}</h4>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.firstLastName')" v-model="form.persona.primer_apellido"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.secondLastName')" v-model="form.persona.segundo_apellido"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.names')" v-model="form.persona.nombres"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.subBorn') }}</h4>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.country')" v-model="form.persona.pais"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.departamento')" v-model="form.persona.departamento"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.provincia')" v-model="form.persona.provincia"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.localidad')" v-model="form.persona.localidad"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-menu
                      lazy
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      full-width
                      :nudge-right="40"
                      max-width="290px"
                      min-width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        :label="$t('inscriptionRegister.bornDate')"
                        v-model="form.persona.fecha_nacimiento"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="form.persona.fecha_nacimiento" locale="es" no-title scrollable actions>
                        <template slot-scope="{ save, cancel }">
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="cancel">Cancelar</v-btn>
                            <v-btn flat color="primary" @click="save">Seleccionar</v-btn>
                          </v-card-actions>
                        </template>
                      </v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.bornCertificate') }}</h4>
                </v-flex>
                <v-text-field :label="$t('inscriptionRegister.civilRegistryNumber')" v-model="form.persona.nOficialia"></v-text-field>
                <v-text-field :label="$t('inscriptionRegister.bookNumber')" v-model="form.persona.nLibro"></v-text-field>
                <v-text-field :label="$t('inscriptionRegister.matchNumber')" v-model="form.persona.nPartida"></v-text-field>
                <v-text-field :label="$t('inscriptionRegister.folioNumber')" v-model="form.persona.nFolio"></v-text-field>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12>
                  <v-alert color="primary" icon="input" value="true">
                    <strong>{{$t('inscriptionRegister.subtitle3') }}</strong><br>
                  </v-alert>
                </v-flex>
                <v-flex xs6>
                  <v-radio-group v-model="form.nivel" :label="$t('inscriptionRegister.initialLevel')" :mandatory="true" row>
                    <v-radio :label="'1°'" value="radio-1"></v-radio>
                    <v-radio :label="'2°'" value="radio-2"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs6>
                  <v-radio-group v-model="form.nivel" :label="$t('inscriptionRegister.primaryLevel')" :mandatory="true" row>
                    <v-radio :label="'1°'" value="radio-3"></v-radio>
                    <v-radio :label="'2°'" value="radio-4"></v-radio>
                    <v-radio :label="'3°'" value="radio-5"></v-radio>
                    <v-radio :label="'4°'" value="radio-6"></v-radio>
                    <v-radio :label="'5°'" value="radio-7"></v-radio>
                    <v-radio :label="'6°'" value="radio-8"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs6 offset-xs3>
                  <v-radio-group v-model="form.nivel" :label="$t('inscriptionRegister.secondaryLevel')" :mandatory="true" row>
                    <v-radio :label="'1°'" value="radio-9"></v-radio>
                    <v-radio :label="'2°'" value="radio-10"></v-radio>
                    <v-radio :label="'3°'" value="radio-11"></v-radio>
                    <v-radio :label="'4°'" value="radio-12"></v-radio>
                    <v-radio :label="'5°'" value="radio-13"></v-radio>
                    <v-radio :label="'6°'" value="radio-14"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs6>
                  <v-radio-group v-model="form.nivelacion" :label="$t('inscriptionRegister.nivelation')" :mandatory="true" row>
                    <v-radio :label="'1'" value="radio-15"></v-radio>
                    <v-radio :label="'2'" value="radio-16"></v-radio>
                    <v-radio :label="'3'" value="radio-17"></v-radio>
                    <v-radio :label="'4'" value="radio-18"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs6>
                  <v-radio-group v-model="form.turno" :label="$t('inscriptionRegister.turn')" :mandatory="true" row>
                    <v-radio :label="$t('inscriptionRegister.morning')" value="manana"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.afternoon')" value="tarde"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.evening')" value="noche"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs12>
                  <v-radio-group v-model="form.paralelo" :label="$t('inscriptionRegister.paralel')" :mandatory="true" row>
                    <v-radio :label="'A'" value="a"></v-radio>
                    <v-radio :label="'B'" value="b"></v-radio>
                    <v-radio :label="'C'" value="c"></v-radio>
                    <v-radio :label="'D'" value="d"></v-radio>
                    <v-radio :label="'E'" value="e"></v-radio>
                    <v-radio :label="'F'" value="f"></v-radio>
                    <v-radio :label="'G'" value="g"></v-radio>
                    <v-radio :label="'H'" value="h"></v-radio>
                    <v-radio :label="'I'" value="i"></v-radio>
                    <v-radio :label="'J'" value="j"></v-radio>
                    <v-radio :label="'K'" value="k"></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-alert color="primary" icon="place" value="true">
                    <strong>{{$t('inscriptionRegister.subtitle4') }}</strong><br>
                  </v-alert>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.provincia')" v-model="form.persona.localidad"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.municipio')" v-model="form.persona.localidad"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.localidad')" v-model="form.persona.localidad"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field :label="$t('inscriptionRegister.zona')" v-model="form.persona.localidad"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field :label="$t('inscriptionRegister.street')" v-model="form.persona.localidad"></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field :label="$t('inscriptionRegister.number')" v-model="form.persona.localidad"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.telefon')" v-model="form.persona.localidad"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-alert color="primary" icon="portrait" value="true">
                    <strong>{{$t('inscriptionRegister.subtitle5') }}</strong><br>
                  </v-alert>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.languageRegion') }}</h4>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.motherLanguage')" v-model="form.sociales.idioma"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.language')" v-model="form.sociales.idiomas"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-select
                    v-bind:items="states"
                    v-model="form.sociales.puebloIndigena"
                    :label="$t('inscriptionRegister.originaryPopulation')"
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.health') }}</h4>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.sociales.saludDisponible" :label="$t('inscriptionRegister.healthAvailability')" :mandatory="true" row>
                    <v-radio :label="$t('inscriptionRegister.yes')" value="si"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.no')" value="no"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs8>
                  <v-radio-group v-model="form.sociales.frecuencia" :label="$t('inscriptionRegister.frecuency')" :mandatory="true" row>
                    <v-radio :label="$t('inscriptionRegister.oneToTwo')" value="dos"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.threeToFive')" value="cinco"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.fiveOrMore')" value="mas"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.never')" value="nunca"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.sociales.comunicacion" :label="$t('inscriptionRegister.comunication')" :mandatory="true" row>
                    <v-radio :label="$t('inscriptionRegister.yes')" value="si"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.no')" value="no"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.sociales.motriz" :label="$t('inscriptionRegister.motriz')" :mandatory="true" row>
                    <v-radio :label="$t('inscriptionRegister.yes')" value="si"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.no')" value="no"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.sociales.mental" :label="$t('inscriptionRegister.mental')" :mandatory="true" row>
                    <v-radio :label="$t('inscriptionRegister.yes')" value="si"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.no')" value="no"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.sociales.discapacityTipe" :label="$t('inscriptionRegister.discapacityTipe')" :mandatory="true" row>
                    <v-radio :label="$t('inscriptionRegister.born')" value="1"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.adquired')" value="2"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.hereditary')" value="3"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.basicServicesAcces') }}</h4>
                </v-flex>
                <v-flex xs12>
                  <v-radio-group v-model="form.sociales.aguaDisponible" :label="$t('inscriptionRegister.waterProcedence')" :mandatory="true" row>
                    <v-radio :label="$t('inscriptionRegister.netConexion')" value="si"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.publicWater')" value="si"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.deliveryCar')" value="no"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.well')" value="no"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.river')" value="si"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.other')" value="no"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.sociales.electricidadDisponible" :label="$t('inscriptionRegister.electricityService')" :mandatory="true" row>
                    <v-radio :label="$t('inscriptionRegister.yes')" value="si"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.no')" value="no"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs8>
                  <v-radio-group v-model="form.sociales.desague" :label="$t('inscriptionRegister.drain')" :mandatory="true" row>
                    <v-radio :label="$t('inscriptionRegister.sewer')" value="si"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.septicTank')" value="no"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.blindWell')" value="si"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.street')" value="no"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.river')" value="si"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.work') }}</h4>
                </v-flex>
                <v-flex xs4>
                  <v-select
                    v-bind:items="states"
                    v-model="form.sociales.actividadTrabajo"
                    :label="$t('inscriptionRegister.workActivity')"
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.workDays')" v-model="form.sociales.diasTrabajo"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.sociales.salarioTrabajo" :label="$t('inscriptionRegister.payWork')" :mandatory="true" row>
                    <v-radio :label="$t('inscriptionRegister.yes')" value="si"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.no')" value="no"></v-radio>
                  </v-radio-group>
                </v-flex>

                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.communicationTransport') }}</h4>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    :label="$t('inscriptionRegister.internetAccess')"
                    v-bind:items="states"
                    v-model="e6"
                    multiple
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    v-bind:items="items"
                    v-model="e1"
                    :label="$t('inscriptionRegister.internetFrecuency')"
                    single-line
                    bottom
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    v-bind:items="items"
                    v-model="e1"
                    :label="$t('inscriptionRegister.transportWay')"
                    single-line
                    bottom
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    v-bind:items="items"
                    v-model="e1"
                    :label="$t('inscriptionRegister.transportTime')"
                    single-line
                    bottom
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-alert color="primary" icon="supervisor_account" value="true">
                    <strong>{{$t('inscriptionRegister.subtitle6') }}</strong><br>
                  </v-alert>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.tutorData') }}</h4>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.firstLastName')" v-model="form.persona.primer_apellido"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.secondLastName')" v-model="form.persona.segundo_apellido"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.names')" v-model="form.persona.nombres"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.ci')" v-model="form.persona.ci"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.language')" v-model="form.persona.idioma"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.profession')" v-model="form.persona.profesion"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.maxEducation')" v-model="form.persona.nivelEducacion"></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="cancel" dark @click.native="dialog = false">{{$t('usuarios.cancel')}}
            <v-icon right>cancel</v-icon>
          </v-btn> -->
          <v-btn class="primary" flat :disabled="!validForm" @click="validForm = !validForm">{{$t('usuarios.save')}}
            <v-icon right>done</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-flex>
    <!-- </v-dialog> -->
  </v-layout>
  </v-container>
</template>

<script>

import { required } from 'vuelidate/lib/validators';
import AppLang from '@/common/layout/AppLang';
import errorsHandler from '@/common/mixins/errorsHandler';

export default {
  mixins: [ errorsHandler ],
  data () {
    return {
      validForm: true,
      form: {
        unidadEducativa: {
          tipo: '',
          nombre: '',
          distrito: ''
        },
        persona: {
          codrude: '',
          nombres: '',
          primer_apellido: '',
          segundo_apellido: '',
          pais: '',
          departamento: '',
          provincia: '',
          localidad: '',
          fecha_nacimiento: '',
          documentoIdentidad: '',
          lugarDocumento: ''
        },
        sociales: {
          idioma: ''
        }
      },
      errors: {
        username: [],
        password: []
      },
      hidePass: true,
      remember: false
    };
  },
  methods: {
    changeIcon () {
      if (this.form.password.length) {
        this.hidePass = !this.hidePass;
      }
    },
    submit () {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.login(this.form);
      }
    }
  },
  components: { AppLang },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  computed: {
    getIcon () {
      return this.form.password.length === 0 ? 'lock' : this.hidePass ? 'visibility' : 'visibility_off';
    }
  },
  watch: {
    'form.password': function (val) {
      if (val.length === 0) {
        this.hidePass = true;
      }
    },
    '$v.form.username.$error': function (val) {
      this.errorHandler(this.$v.form.username, this.errors.username);
    },
    '$v.form.password.$error': function (val) {
      this.errorHandler(this.$v.form.password, this.errors.password);
    }
  }
};
</script>

