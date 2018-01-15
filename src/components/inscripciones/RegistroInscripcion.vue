<template>
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
        <v-container fluid>
        <v-layout row>
          <v-flex xs10 offset-xs1>
            <v-form v-model="validForm" ref="form" lazy-validation>

              <v-layout row wrap>
                <v-flex xs12>
                  <v-alert color="primary" icon="domain" value="true">
                    <strong>{{$t('inscriptionRegister.subtitle1') }}</strong><br>
                  </v-alert>
                </v-flex>
                  <v-flex sx6>
                    <!-- <v-text-field   ></v-text-field> -->
                    <v-select
                      v-bind:items="opcionesUE"
                      v-model="form.unidadEducativa.nombre"
                      item-text="nombre"
                      item-value="id_unidad_educativa"
                      :label="$t('inscriptionRegister.nameEducative')"
                      :disabled="searchUE"
                      autocomplete
                    ></v-select>
                  </v-flex>
                <v-flex sx4 offset-xs1>
                  <v-btn v-if="!searchUE" class="primary" block flat v-on:click="buscaUnidadEducativa('search')">{{$t('common.search')}}
                    <v-icon right> search </v-icon>
                  </v-btn>
                  <v-btn v-if="searchUE" class="primary" block flat v-on:click="buscaUnidadEducativa('restore')">{{$t('common.change')}}
                    <v-icon right> cached </v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs12>
                  <v-radio-group v-model="form.unidadEducativa.dependencia" :disabled="disableOptionsUE" :label="$t('inscriptionRegister.dependency')" :mandatory="true" row>
                    <v-radio :disabled="disableOptionsUE" :label="$t('inscriptionRegister.public')" value="public"></v-radio>
                    <v-radio :disabled="disableOptionsUE" :label="$t('inscriptionRegister.comunitary')" value="comunitary"></v-radio>
                    <v-radio :disabled="disableOptionsUE" :label="$t('inscriptionRegister.convein')" value="convein"></v-radio>
                    <v-radio :disabled="disableOptionsUE" :label="$t('inscriptionRegister.private')" value="private"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex sx6>
                  <v-text-field :label="$t('inscriptionRegister.sie')" :disabled="disableOptionsUE" v-model="form.unidadEducativa.sie"></v-text-field>
                </v-flex>
                  <v-flex sx6>
                    <v-text-field :label="$t('inscriptionRegister.educativeDistrit')" :disabled="disableOptionsUE" v-model="form.unidadEducativa.distrito"></v-text-field>
                  </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12>
                  <v-alert color="primary" icon="school" value="true">
                    <strong>{{$t('inscriptionRegister.subtitle2') }}</strong><br>
                  </v-alert>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.identity') }}</h4>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group :disabled="searchRE" v-model="form.persona.tipoDocumento" :label="$t('inscriptionRegister.documentTipe')" :mandatory="true" column>
                    <v-radio :label="$t('inscriptionRegister.ci')" value="CARNET_IDENTIDAD"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.passport')" value="PASAPORTE"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :disabled="searchRE" :label="$t('inscriptionRegister.documentNumber')" v-model="form.persona.documentoIdentidad"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :disabled="searchRE" :label="$t('inscriptionRegister.documentPlace')" v-model="form.persona.lugarDocumento"></v-text-field>
                </v-flex>
                <v-flex sx4 offset-xs8>
                  <v-btn v-if="!searchRE" class="primary" block flat v-on:click="buscaEstudiante('search')">{{$t('common.search')}}
                    <v-icon right> search </v-icon>
                  </v-btn>
                  <v-btn v-if="searchRE" class="primary" block flat v-on:click="buscaEstudiante('restore')">{{$t('common.change')}}
                    <v-icon right> cached </v-icon>
                  </v-btn>
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
                  <v-text-field :label="$t('inscriptionRegister.codSie')" v-model="form.unidadEducativaAnterior.codSie"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.nameEducativeUnit')" v-model="form.unidadEducativaAnterior.nombreUnidad"></v-text-field>
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
                    <v-radio :label="'1°'" value="i1"></v-radio>
                    <v-radio :label="'2°'" value="i2"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs6>
                  <v-radio-group v-model="form.nivel" :label="$t('inscriptionRegister.primaryLevel')" :mandatory="true" row>
                    <v-radio :label="'1°'" value="p1"></v-radio>
                    <v-radio :label="'2°'" value="p2"></v-radio>
                    <v-radio :label="'3°'" value="p3"></v-radio>
                    <v-radio :label="'4°'" value="p4"></v-radio>
                    <v-radio :label="'5°'" value="p5"></v-radio>
                    <v-radio :label="'6°'" value="p6"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs6 offset-xs3>
                  <v-radio-group v-model="form.nivel" :label="$t('inscriptionRegister.secondaryLevel')" :mandatory="true" row>
                    <v-radio :label="'1°'" value="s1"></v-radio>
                    <v-radio :label="'2°'" value="s2"></v-radio>
                    <v-radio :label="'3°'" value="s3"></v-radio>
                    <v-radio :label="'4°'" value="s4"></v-radio>
                    <v-radio :label="'5°'" value="s5"></v-radio>
                    <v-radio :label="'6°'" value="s6"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs6>
                  <v-radio-group v-model="form.nivelacion" :label="$t('inscriptionRegister.nivelation')" :mandatory="true" row>
                    <v-radio :label="'1'" value="r1"></v-radio>
                    <v-radio :label="'2'" value="r2"></v-radio>
                    <v-radio :label="'3'" value="r3"></v-radio>
                    <v-radio :label="'4'" value="r4"></v-radio>
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
                  <v-text-field :label="$t('inscriptionRegister.motherLanguage')" v-model="form.registroInscripcion.idioma"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.language')" v-model="form.registroInscripcion.idiomas"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-select
                    v-bind:items="opcionesPIOC"
                    v-model="form.registroInscripcion.puebloIndigena"
                    :label="$t('inscriptionRegister.originaryPopulation')"
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.health') }}</h4>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.registroInscripcion.saludDisponible" :label="$t('inscriptionRegister.healthAvailability')" :mandatory="true" row>
                    <v-radio :label="$t('common.yes')" value="si"></v-radio>
                    <v-radio :label="$t('common.no')" value="no"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs8>
                  <v-radio-group v-model="form.registroInscripcion.frecuencia" :label="$t('inscriptionRegister.frecuency')" :mandatory="true" row>
                    <v-radio :label="$t('inscriptionRegister.oneToTwo')" value="dos"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.threeToFive')" value="cinco"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.fiveOrMore')" value="mas"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.never')" value="nunca"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.registroInscripcion.comunicacion" :label="$t('inscriptionRegister.comunication')" :mandatory="true" row>
                    <v-radio :label="$t('common.yes')" value="si"></v-radio>
                    <v-radio :label="$t('common.no')" value="no"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.registroInscripcion.motriz" :label="$t('inscriptionRegister.motriz')" :mandatory="true" row>
                    <v-radio :label="$t('common.yes')" value="si"></v-radio>
                    <v-radio :label="$t('common.no')" value="no"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.registroInscripcion.mental" :label="$t('inscriptionRegister.mental')" :mandatory="true" row>
                    <v-radio :label="$t('common.yes')" value="si"></v-radio>
                    <v-radio :label="$t('common.no')" value="no"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.registroInscripcion.discapacityTipe" :label="$t('inscriptionRegister.discapacityTipe')" :mandatory="true" row>
                    <v-radio :label="$t('inscriptionRegister.born')" value="1"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.adquired')" value="2"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.hereditary')" value="3"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.basicServicesAcces') }}</h4>
                </v-flex>
                <v-flex xs12>
                  <v-radio-group v-model="form.registroInscripcion.aguaDisponible" :label="$t('inscriptionRegister.waterProcedence')" :mandatory="true" row>
                    <v-radio :label="$t('inscriptionRegister.netConexion')" value="si"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.publicWater')" value="si"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.deliveryCar')" value="no"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.well')" value="no"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.river')" value="si"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.other')" value="no"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.registroInscripcion.electricidadDisponible" :label="$t('inscriptionRegister.electricityService')" :mandatory="true" row>
                    <v-radio :label="$t('common.yes')" value="si"></v-radio>
                    <v-radio :label="$t('common.no')" value="no"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs8>
                  <v-radio-group v-model="form.registroInscripcion.desague" :label="$t('inscriptionRegister.drain')" :mandatory="true" row>
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
                    v-bind:items="opcionesAT"
                    v-model="form.registroInscripcion.actividadTrabajo"
                    :label="$t('inscriptionRegister.workActivity')"
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.workDays')" v-model="form.registroInscripcion.diasTrabajo"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.registroInscripcion.salarioTrabajo" :label="$t('inscriptionRegister.payWork')" :mandatory="true" row>
                    <v-radio :label="$t('common.yes')" value="si"></v-radio>
                    <v-radio :label="$t('common.no')" value="no"></v-radio>
                  </v-radio-group>
                </v-flex>

                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.communicationTransport') }}</h4>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    :label="$t('inscriptionRegister.internetAccess')"
                    v-bind:items="opcionesIA"
                    v-model="form.registroInscripcion.internetAcces"
                    multiple
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    v-bind:items="opcionesIF"
                    v-model="form.registroInscripcion.internetFrecuency"
                    :label="$t('inscriptionRegister.internetFrecuency')"
                    single-line
                    bottom
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    v-bind:items="opcionesTW"
                    v-model="form.registroInscripcion.transportWay"
                    :label="$t('inscriptionRegister.transportWay')"
                    single-line
                    bottom
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    v-bind:items="opcionesTT"
                    v-model="form.registroInscripcion.transportTime"
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
          <v-btn class="primary" flat :disabled="!validForm" @click="validForm = !validForm">{{$t('common.save')}}
            <v-icon right>done</v-icon>
          </v-btn>
        </v-card-actions>
        </v-container>
      </v-card>
      </v-flex>
    <!-- </v-dialog> -->
  </v-layout>
</template>

<script>

import { required } from 'vuelidate/lib/validators';
import AppLang from '@/common/layout/AppLang';
import errorsHandler from '@/common/mixins/errorsHandler';
import Comps from '../comps';

export default {
  mixins: [ Comps, errorsHandler ],
  data () {
    return {
      validForm: true,
      form: {
        unidadEducativa: {
          dependencia: '',
          nombre: '',
          distrito: '',
          sie: ''
        },
        unidadEducativaAnterior: {
          codSie: '',
          nombreUnidad: ''
        },
        persona: {
          nombres: '',
          primer_apellido: '',
          segundo_apellido: '',
          pais: '',
          departamento: '',
          provincia: '',
          localidad: '',
          fecha_nacimiento: '',
          tipoDocumento: '',
          documentoIdentidad: '',
          lugarDocumento: '',
          carnet_discapacidad: '',
          nOficialia: '',
          nLibro: '',
          nPartida: '',
          nFolio: ''
        },
        estudiante: {
          codrude: '',
          idioma: ''
        },
        ubicación: {

        },
        registroInscripcion: {
          idioma: '',
          idiomas: '',
          internetAcces: '',
          internetFrecuency: '',
          transportWay: '',
          transportTime: ''
        },
        relacionEstudiante: {

        }
      },
      errors: {
        username: [],
        password: []
      },
      // Unidad Educativa
      disableOptionsUE: true,
      searchUE: false,
      chargingUE: true,
      opcionesUE: [],
      // Registro Estudiante
      disableOptionsRE: true,
      searchRE: false,
      chargingRE: true,
      opcionesRE: [],
      // Registro Inscripcion
      opcionesPIOC: [],
      opcionesAT: [],
      opcionesIA: [],
      opcionesIF: [],
      opcionesTW: [],
      opcionesTT: [],
      //
      hidePass: true,
      remember: false
    };
  },
  created () {
    this.hasPermission('registroInscripcion');
    this.getUnidadesEducativas();
    this.form.unidadEducativa.nombre = 1;
    this.form.persona.documentoIdentidad = '0000015';
    this.form.persona.lugarDocumento = 'LP';
    this.form.persona.tipoDocumento = 'CARNET_IDENTIDAD';
  },
  methods: {
    getUnidadesEducativas () {
      this.$service.get(`unidadesEducativas`)
        .then(respuesta => {
          this.opcionesUE = respuesta.datos;
        });
    },
    buscaUnidadEducativa (action) {
      if (this.form.unidadEducativa.nombre) {
        if (action === 'search') {
          if (this.form.unidadEducativa.nombre !== -1) {
            this.opcionesUE.forEach(function (itemUE) {
              if (itemUE.id_unidad_educativa === this.form.unidadEducativa.nombre) {
                // Rellena los campos de Unidad Educativa
                this.form.unidadEducativa.sie = itemUE.sie ? itemUE.sie : 'NO CUENTA CON SIE';
                this.form.unidadEducativa.dependencia = itemUE.dependencia;
                this.form.unidadEducativa.distrito = itemUE.distrito ? itemUE.distrito : 'NO CUENTA CON DISTRITO';
              }
            }, this);
          } else {
            this.disableOptionsUE = false;
          }
          this.searchUE = true;
        }
        if (action === 'restore') {
          this.searchUE = false;
          if (!this.disableOptionsUE) {
            this.disableOptionsUE = true;
          } else {
            this.form.unidadEducativa.sie = null;
            this.form.unidadEducativa.dependencia = null;
            this.form.unidadEducativa.distrito = null;
          }
        }
      } else {
        this.$message.error(this.$t('inscriptionRegister.errorNameField'));
      }
    },
    buscaEstudiante (action) {
      if (this.form.persona.documentoIdentidad && this.form.persona.lugarDocumento && this.form.persona.tipoDocumento) {
        if (action === 'search') {
          if (this.form.unidadEducativa.nombre !== -1) {
            this.$service.get(`estudiantes?tipo_documento=${this.form.persona.tipoDocumento}&documento_identidad=${this.form.persona.documentoIdentidad}&lugar_documento_identidad=${this.form.persona.lugarDocumento}`)
              .then(respuesta => {
                if (!respuesta) {
                }
                if (respuesta.length !== 1) {

                }
                // Jala datos al formulario
                // this.form.persona.carnet_discapacidad = respuesta.datos[0].carnet_discapacidad ? respuesta.datos[0].carnet_discapacidad : 'No cuenta con carnet';
                this.form.persona.fecha_nacimiento = respuesta.datos[0].fecha_nacimiento;
                this.form.persona.nombres = respuesta.datos[0].nombres;
                this.form.persona.primer_apellido = respuesta.datos[0].primer_apellido;
                this.form.persona.segundo_apellido = respuesta.datos[0].segundo_apellido;
                this.form.persona.casada_apellido = respuesta.datos[0].casada_apellido;
                this.form.persona.genero = respuesta.datos[0].genero;
                this.form.persona.discapacidad = respuesta.datos[0].discapacidad ? respuesta.datos[0].discapacidad : '';
                this.form.registroInscripcion.idioma = respuesta.datos[0].idioma_materno ? respuesta.datos[0].idioma_materno : '';
                this.form.registroInscripcion.idiomas = respuesta.datos[0].idiomas ? respuesta.datos[0].idiomas : '';
              });
          } else {
            this.disableOptionsUE = false;
          }
          this.searchUE = true;
        }
        if (action === 'restore') {
          this.searchUE = false;
          if (!this.disableOptionsUE) {
            this.disableOptionsUE = true;
          } else {
            this.form.unidadEducativa.nombre = null;
            this.form.unidadEducativa.dependencia = null;
            this.form.unidadEducativa.distrito = null;
          }
        }
      } else {
        this.$message.error(this.$t('inscriptionRegister.errorNameField'));
      }
    },
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

