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
                  <v-text-field :label="$t('inscriptionRegister.country')" v-model="form.nacimiento.pais"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.departamento')" v-model="form.nacimiento.departamento"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.provincia')" v-model="form.nacimiento.provincia"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.localidad')" v-model="form.nacimiento.municipio"></v-text-field>
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
                        v-model="form.nacimiento.fecha_nacimiento"
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
                <v-text-field :label="$t('inscriptionRegister.civilRegistryNumber')" v-model="form.nacimiento.nOficialia"></v-text-field>
                <v-text-field :label="$t('inscriptionRegister.bookNumber')" v-model="form.nacimiento.nLibro"></v-text-field>
                <v-text-field :label="$t('inscriptionRegister.matchNumber')" v-model="form.nacimiento.nPartida"></v-text-field>
                <v-text-field :label="$t('inscriptionRegister.folioNumber')" v-model="form.nacimiento.nFolio"></v-text-field>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12>
                  <v-alert color="primary" icon="input" value="true">
                    <strong>{{$t('inscriptionRegister.subtitle3') }}</strong><br>
                  </v-alert>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.nivel" :label="$t('inscriptionRegister.initialLevel')" :mandatory="true" column>
                    <v-radio :label="'1°'" value="i1"></v-radio>
                    <v-radio :label="'2°'" value="i2"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.nivel" :label="$t('inscriptionRegister.primaryLevel')" :mandatory="true" column>
                    <v-radio :label="'1°'" value="p1"></v-radio>
                    <v-radio :label="'2°'" value="p2"></v-radio>
                    <v-radio :label="'3°'" value="p3"></v-radio>
                    <v-radio :label="'4°'" value="p4"></v-radio>
                    <v-radio :label="'5°'" value="p5"></v-radio>
                    <v-radio :label="'6°'" value="p6"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.nivel" :label="$t('inscriptionRegister.secondaryLevel')" :mandatory="true" column>
                    <v-radio :label="'1°'" value="s1"></v-radio>
                    <v-radio :label="'2°'" value="s2"></v-radio>
                    <v-radio :label="'3°'" value="s3"></v-radio>
                    <v-radio :label="'4°'" value="s4"></v-radio>
                    <v-radio :label="'5°'" value="s5"></v-radio>
                    <v-radio :label="'6°'" value="s6"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs6>
                  <v-radio-group v-model="form.nivelacion" :label="$t('inscriptionRegister.nivelation')" :mandatory="true" column>
                    <v-radio :label="'1'" value="r1"></v-radio>
                    <v-radio :label="'2'" value="r2"></v-radio>
                    <v-radio :label="'3'" value="r3"></v-radio>
                    <v-radio :label="'4'" value="r4"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs6>
                  <v-radio-group v-model="form.turno" :label="$t('inscriptionRegister.turn')" :mandatory="true" column>
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
                  <v-text-field :label="$t('inscriptionRegister.provincia')" v-model="form.direccion.provincia"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.municipio')" v-model="form.direccion.municipio"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.localidad')" v-model="form.direccion.localidad"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.zona')" v-model="form.direccion.zona"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.street')" v-model="form.direccion.calle"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.number')" v-model="form.direccion.numero"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.telefon')" v-model="form.direccion.telefono"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.cellphone')" v-model="form.direccion.celular"></v-text-field>
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
                    item-text="nombre"
                    item-value="id_pioc"
                    v-model="form.persona.pioc"
                    :label="$t('inscriptionRegister.originaryPopulation')"
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.health') }}</h4>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.salud.centro_salud" :label="$t('inscriptionRegister.healthAvailability')" :mandatory="true" column>
                    <v-radio :label="$t('common.yes')" :value="true"></v-radio>
                    <v-radio :label="$t('common.no')" :value="false"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs8>
                  <v-text-field :label="$t('inscriptionRegister.frecuency')" v-model="form.salud.frecuencia_medica"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.salud.discapacidad_comunicacion" :label="$t('inscriptionRegister.comunication')" :mandatory="true" column>
                    <v-radio :label="$t('common.yes')" :value="true"></v-radio>
                    <v-radio :label="$t('common.no')" :value="false"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.salud.discapacidad_motriz" :label="$t('inscriptionRegister.motriz')" :mandatory="true" column>
                    <v-radio :label="$t('common.yes')" :value="true"></v-radio>
                    <v-radio :label="$t('common.no')" :value="false"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.salud.discapacidad_mental" :label="$t('inscriptionRegister.mental')" :mandatory="true" column>
                    <v-radio :label="$t('common.yes')" :value="true"></v-radio>
                    <v-radio :label="$t('common.no')" :value="false"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.salud.discapacidad_origen" :label="$t('inscriptionRegister.discapacityTipe')" :mandatory="true" column>
                    <v-radio :label="$t('inscriptionRegister.born')" :value="'de nacimiento'"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.adquired')" :value="'adquirida'"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.hereditary')" :value="'hereditaria'"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.basicServicesAcces') }}</h4>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.servicios_basicos.origen_agua" :label="$t('inscriptionRegister.waterProcedence')" :mandatory="true" column>
                    <v-radio :label="$t('inscriptionRegister.netConexion')" :value="'netConexion'"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.publicWater')" :value="'publicWater'"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.deliveryCar')" :value="'deliveryCar'"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.well')" :value="'well'"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.river')" :value="'river'"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.other')" :value="'other'"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.servicios_basicos.acceso_electricidad" :label="$t('inscriptionRegister.electricityService')" :mandatory="true" column>
                    <v-radio :label="$t('common.yes')" :value="true"></v-radio>
                    <v-radio :label="$t('common.no')" :value="false"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.servicios_basicos.destino_agua" :label="$t('inscriptionRegister.drain')" :mandatory="true" column>
                    <v-radio :label="$t('inscriptionRegister.sewer')" :value="'sewer'"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.septicTank')" :value="'septicTank'"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.blindWell')" :value="'blindWell'"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.street')" :value="'street'"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.river')" :value="'river'"></v-radio>
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
          tipoDocumento: '',
          documentoIdentidad: '',
          lugarDocumento: '',
          carnet_discapacidad: '',
          pioc: ''
        },
        nacimiento: {
          fecha_nacimiento: '',
          pais: '',
          departamento: '',
          provincia: '',
          municipio: '',
          nOficialia: '',
          nLibro: '',
          nPartida: '',
          nFolio: ''
        },
        estudiante: {
          codrude: '',
          idioma: ''
        },
        direccion: {
          pais: '',
          departamento: '',
          provincia: '',
          municipio: '',
          localidad: '',
          zona: '',
          calle: '',
          numero: '',
          telefono: '',
          celular: ''
        },
        registroInscripcion: {
          idioma: '',
          idiomas: '',
          internetAcces: '',
          internetFrecuency: '',
          transportWay: '',
          transportTime: ''
        },
        salud: {
          centro_salud: '',
          frecuencia_medica: '',
          discapacidad_comunicacion: '',
          discapacidad_motriz: '',
          discapacidad_mental: '',
          discapacidad_otra: '',
          discapacidad_origen: ''
        },
        servicios_basicos: {
          origen_agua: '',
          acceso_electricidad: '',
          destino_agua: ''
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
    // Carga los pioc
    this.$service.get(`piocs`)
      .then(respuesta => {
        this.opcionesPIOC = respuesta.datos;
      });
    // default example values
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
                var consulta = {};
                if (!respuesta) {
                  // error
                }
                if (respuesta.datos.length === 1) {
                  consulta = respuesta.datos[0];
                } else {
                  // error
                }
                // Jala datos al formulario
                // this.form.persona.carnet_discapacidad = consulta.carnet_discapacidad ? consulta.carnet_discapacidad : 'No cuenta con carnet';
                this.form.persona.nombres = consulta.nombres;
                this.form.persona.primer_apellido = consulta.primer_apellido;
                this.form.persona.segundo_apellido = consulta.segundo_apellido;
                this.form.persona.casada_apellido = consulta.casada_apellido;
                this.form.persona.genero = consulta.genero;
                this.form.persona.discapacidad = consulta.discapacidad ? consulta.discapacidad : '';
                // registroInscripcion
                this.form.registroInscripcion.idioma = consulta.idioma_materno ? consulta.idioma_materno : '';
                this.form.registroInscripcion.idiomas = consulta.idiomas ? consulta.idiomas : '';
                // estudiante
                this.form.persona.codrude = consulta.estudiante.rude;
                this.form.persona.pioc = consulta.estudiante.registro.pioc.id_pioc;
                // nacimiento
                this.form.nacimiento.fecha_nacimiento = consulta.fecha_nacimiento; // get posicion T y cortar
                this.form.nacimiento.municipio = consulta.lugar_nacimiento.municipio;
                this.form.nacimiento.provincia = consulta.lugar_nacimiento.provincia;
                this.form.nacimiento.departamento = consulta.lugar_nacimiento.departamento;
                this.form.nacimiento.pais = consulta.lugar_nacimiento.pais;
                this.form.nacimiento.nOficialia = consulta.estudiante.registro.oficialia;
                this.form.nacimiento.nLibro = consulta.estudiante.registro.libro;
                this.form.nacimiento.nPartida = consulta.estudiante.registro.partida;
                this.form.nacimiento.nFolio = consulta.estudiante.registro.folio;
                // direccion
                this.form.direccion.pais = consulta.direccion.pais;
                this.form.direccion.departamento = consulta.direccion.departamento;
                this.form.direccion.provincia = consulta.direccion.provincia;
                this.form.direccion.municipio = consulta.direccion.municipio;
                this.form.direccion.localidad = consulta.direccion.localidad;
                this.form.direccion.zona = consulta.direccion.zona;
                this.form.direccion.calle = consulta.direccion.calle;
                this.form.direccion.numero = consulta.direccion.numero;
                this.form.direccion.telefono = consulta.direccion.telefono;
                this.form.direccion.celular = consulta.direccion.celular;
                // salud
                this.form.salud.centro_salud = consulta.estudiante.registro.centro_salud;
                this.form.salud.frecuencia_medica = consulta.estudiante.registro.frecuencia_medica;
                this.form.salud.discapacidad_comunicacion = consulta.estudiante.discapacidad_comunicacion;
                this.form.salud.discapacidad_motriz = consulta.estudiante.discapacidad_motriz;
                this.form.salud.discapacidad_mental = consulta.estudiante.discapacidad_mental;
                this.form.salud.discapacidad_otra = consulta.estudiante.discapacidad_otra;
                this.form.salud.discapacidad_origen = consulta.estudiante.discapacidad_origen;
                // servicios básicos
                this.form.servicios_basicos.origen_agua = consulta.estudiante.registro.origen_agua;
                this.form.servicios_basicos.acceso_electricidad = consulta.estudiante.registro.acceso_electricidad;
                this.form.servicios_basicos.destino_agua = consulta.estudiante.registro.destino_agua;
                // empleo
                // transporte
                // padres
                console.log('--------------------------');
                console.log(JSON.stringify(this.form.servicios_basicos));
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

