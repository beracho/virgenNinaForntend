<template>
  <div>
  <v-toolbar color="secondary" dark>
    <v-icon right>account_circle</v-icon>
    <v-toolbar-title>{{$t('inscriptionRegister.tittle')}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <span class="grey--text">{{$t('user.crud.role') + ': ' + this.$store.state.user.rol.nombre}}</span>
  </v-toolbar>
  <v-layout row wrap align-center>
      <v-flex xs12>
      <v-card>
        <v-container fluid>
        <v-layout row>
          <v-flex xs10 offset-xs1>
            <v-form v-model="validForm" ref="form" lazy-validation>

              <v-layout row wrap>
                <v-flex xs12>
                  <v-alert color="primary" icon="school" value="true">
                    <strong>{{$t('inscriptions.studentData') }}</strong><br>
                  </v-alert>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.identity') }}</h4>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group :disabled="searchRE" v-model="form.persona.tipo_documento" :label="$t('inscriptionRegister.documentTipe')" :mandatory="true" column>
                    <v-radio :label="$t('inscriptionRegister.ci')" :disabled="searchRE" value="CARNET_IDENTIDAD"></v-radio>
                    <v-radio :label="$t('inscriptionRegister.passport')" :disabled="searchRE" value="PASAPORTE"></v-radio>
                    <v-radio :label="$t('common.code')" :disabled="searchRE" value="CODIGO"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs4 v-if="!codeChosen">
                  <v-text-field :disabled="searchRE" :label="$t('inscriptionRegister.documentNumber')" v-model="form.persona.documento_identidad"></v-text-field>
                </v-flex>
                <v-flex xs8 v-else>
                  <v-text-field :disabled="searchRE" :label="$t('common.code')" v-model="form.persona.codigo"></v-text-field>
                </v-flex>
                <v-flex xs4 v-if="!codeChosen">
                  <v-autocomplete
                    :disabled="searchRE"
                    v-bind:items="lugarCi"
                    item-text="codigo_ine"
                    item-value="abreviacion"
                    v-model="form.persona.lugar_documento_identidad"
                    :label="$t('inscriptionRegister.documentPlace')"
                  ></v-autocomplete>
                </v-flex>
                <!-- <v-flex xs4 v-if="codeChosen && searchRE">
                  <v-text-field :disabled="ciLoaded" :label="$t('inscriptionRegister.documentType')" v-model="form.persona.tipo_documento"></v-text-field>
                </v-flex> -->
                <v-flex sx4 offset-xs8>
                  <v-btn v-if="!searchRE" class="primary" block flat v-on:click="buscaEstudiante()">{{$t('common.search')}}
                    <v-icon right> search </v-icon>
                  </v-btn>
                  <v-btn v-if="searchRE" class="primary" block flat v-on:click="reiniciaBusqueda()">{{$t('common.change')}}
                    <v-icon right> cached </v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs4 v-if="codeChosen && searchRE">
                  <v-text-field :disabled="ciLoaded" :label="$t('inscriptionRegister.documentNumber')" v-model="form.persona.documento_identidad"></v-text-field>
                </v-flex>
                <v-flex xs4 v-if="codeChosen && searchRE">
                  <!-- <v-text-field :disabled="ciLoaded" :label="$t('inscriptionRegister.documentPlace')" v-model="form.persona.lugar_documento_identidad"></v-text-field> -->
                  <v-autocomplete :disabled="ciLoaded" v-bind:items="lugarCi" v-model="form.persona.lugar_documento_identidad" :label="$t('inscriptionRegister.documentPlace')" item-text="codigo_ine" item-value="abreviacion"></v-autocomplete>
                </v-flex>
                <v-flex sx4>
                  <v-btn v-if="!ciLoaded" class="primary" block flat v-on:click="actualizarDocumento()">{{$t('inscriptionRegister.updateIdData')}}
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
                  <v-autocomplete
                    v-bind:items="todosUE"
                    item-text="resumen"
                    item-value="id_unidad_educativa"
                    v-model="form.unidadEducativaAnterior.id"
                    :label="$t('inscriptionRegister.codSie')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs4>
                  <v-btn block color="primary" @click="windowUE = true">{{$t('inscriptionRegister.createNew')}}</v-btn>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.subNames') }}</h4>
                </v-flex>
                <v-flex xs6>
                  <v-text-field :label="$t('inscriptionRegister.firstLastName')" v-model="form.persona.primer_apellido"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field :label="$t('inscriptionRegister.secondLastName')" v-model="form.persona.segundo_apellido"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field :label="$t('inscriptionRegister.names')" v-model="form.persona.nombres"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-radio-group v-model="form.persona.genero" :label="$t('usuarios.gender')" :mandatory="true" row>
                    <v-radio :label="$t('usuarios.male')" value="M"></v-radio>
                    <v-radio :label="$t('usuarios.female')" value="F"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.subBorn') }}</h4>
                </v-flex>
                <v-flex xs4>
                  <v-autocomplete
                    v-bind:items="opcionesPaisNacimiento"
                    item-text="nombre"
                    item-value="id_dpa"
                    v-model="form.nacimiento.pais"
                    :label="$t('inscriptionRegister.country')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs4>
                  <v-autocomplete
                    v-bind:items="opcionesDepartamentoNacimiento"
                    item-text="nombre"
                    item-value="id_dpa"
                    v-model="form.nacimiento.departamento"
                    :label="$t('inscriptionRegister.departamento')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs4>
                  <v-autocomplete
                    v-bind:items="opcionesProvinciaNacimiento"
                    item-text="nombre"
                    item-value="id_dpa"
                    v-model="form.nacimiento.provincia"
                    :label="$t('inscriptionRegister.provincia')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs4>
                  <v-autocomplete
                    v-bind:items="opcionesMunicipioNacimiento"
                    item-text="nombre"
                    item-value="id_dpa"
                    v-model="form.nacimiento.municipio"
                    :label="$t('inscriptionRegister.localidad')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs4>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="form.nacimiento.fecha_nacimiento"
                        :label="$t('inscriptionRegister.bornDate')"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="form.nacimiento.fecha_nacimiento"
                      :max="new Date().toISOString().substr(0, 10)"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.bornCertificate') }}</h4>
                </v-flex>
                <v-flex xs3>
                  <v-text-field :label="$t('inscriptionRegister.civilRegistryNumber')" v-model="form.nacimiento.nOficialia"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field :label="$t('inscriptionRegister.bookNumber')" v-model="form.nacimiento.nLibro"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field :label="$t('inscriptionRegister.matchNumber')" v-model="form.nacimiento.nPartida"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field :label="$t('inscriptionRegister.folioNumber')" v-model="form.nacimiento.nFolio"></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12>
                  <v-alert color="primary" icon="place" value="true">
                    <strong>{{$t('inscriptionRegister.subtitle4') }}</strong><br>
                  </v-alert>
                </v-flex>
                <v-flex xs4>
                  <v-autocomplete
                    v-bind:items="opcionesProvinciaDireccion"
                    item-text="nombre"
                    item-value="id_dpa"
                    v-model="form.direccion.provincia"
                    :label="$t('inscriptionRegister.provincia')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs4>
                  <v-autocomplete
                    v-bind:items="opcionesMunicipioDireccion"
                    item-text="nombre"
                    item-value="id_dpa"
                    v-model="form.direccion.municipio"
                    :label="$t('inscriptionRegister.municipio')"
                  ></v-autocomplete>
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
                  <v-autocomplete
                    v-bind:items="opcionesPIOC"
                    item-text="nombre"
                    item-value="id_pioc"
                    v-model="form.persona.pioc"
                    :label="$t('inscriptionRegister.originaryPopulation')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.health') }}</h4>
                </v-flex>
                <v-flex xs6>
                  <v-radio-group v-model="form.salud.centro_salud" :label="$t('inscriptionRegister.healthAvailability')" :mandatory="true" row>
                    <v-radio :label="$t('common.yes')" :value="true"></v-radio>
                    <v-radio :label="$t('common.no')" :value="false"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs6>
                  <v-text-field :label="$t('inscriptionRegister.frecuency')" v-model="form.salud.frecuencia_medica"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-radio-group v-model="form.salud.tiene_discapacidad" :label="$t('inscriptionRegister.hasDisability')" :mandatory="true" row>
                    <v-radio :label="$t('common.yes')" :value="true"></v-radio>
                    <v-radio :label="$t('common.no')" :value="false"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs6 v-if="form.salud.tiene_discapacidad === true">
                  <v-text-field :label="$t('inscriptionRegister.disabilityCard')" v-model="form.salud.carnet_discapacidad"></v-text-field>
                </v-flex>
                <v-flex xs4 v-if="form.salud.tiene_discapacidad === true">
                  <v-autocomplete
                    v-bind:items="tipoDiscapacidad"
                    item-text="nombre"
                    item-value="id_parametro"
                    v-model="form.salud.tipo_discapacidad"
                    :label="$t('inscriptionRegister.disability')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs4>
                  <v-autocomplete
                    v-if="form.salud.tipo_discapacidad !== '' && form.salud.tiene_discapacidad === true"
                    v-bind:items="subtipoDiscapacidad"
                    item-text="nombre"
                    item-value="id_parametro"
                    v-model="form.salud.subtipo_discapacidad"
                    :label="$t('inscriptionRegister.subDisability')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs4 v-if="form.salud.tiene_discapacidad === true">
                  <v-autocomplete
                    v-bind:items="discapacidadOrigen"
                    item-text="name"
                    item-value="value"
                    v-model="form.salud.discapacidad_origen"
                    :label="$t('inscriptionRegister.disabilityTipe')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.basicServicesAcces') }}</h4>
                </v-flex>
                <v-flex xs6>
                  <v-autocomplete
                    v-bind:items="opcionesWaterOrigin"
                    item-text="nombre"
                    item-value="value"
                    v-model="form.servicios_basicos.origen_agua"
                    :label="$t('inscriptionRegister.waterProcedence')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs6>
                  <v-autocomplete
                    v-bind:items="opcionesWaterDestiny"
                    item-text="nombre"
                    item-value="value"
                    v-model="form.servicios_basicos.destino_agua"
                    :label="$t('inscriptionRegister.drain')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs8 offset-xs2>
                  <v-radio-group v-model="form.servicios_basicos.acceso_electricidad" :label="$t('inscriptionRegister.electricityService')" :mandatory="true" row>
                    <v-radio :label="$t('common.yes')" :value="true"></v-radio>
                    <v-radio :label="$t('common.no')" :value="false"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.work') }}</h4>
                </v-flex>
                <v-flex xs4>
                  <v-autocomplete
                    v-bind:items="opcionesActividad"
                    item-text="nombre"
                    item-value="value"
                    v-model="form.empleo.actividad_laboral"
                    :label="$t('inscriptionRegister.workActivity')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('inscriptionRegister.workDays')" v-model="form.empleo.dias_trabajo"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-radio-group v-model="form.empleo.salario" :label="$t('inscriptionRegister.payWork')" :mandatory="true" row>
                    <v-radio :label="$t('common.yes')" :value="true"></v-radio>
                    <v-radio :label="$t('common.no')" :value="false"></v-radio>
                  </v-radio-group>
                </v-flex>

                <v-flex xs12>
                  <h4>{{$t('inscriptionRegister.communicationTransport') }}</h4>
                </v-flex>
                <v-flex xs6>
                  <v-text-field :label="$t('inscriptionRegister.internetAccess')" v-model="form.comunicacion_transporte.acceso_internet"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-autocomplete
                    v-bind:items="opcionesInternetFrecuencia"
                    item-text="nombre"
                    item-value="value"
                    v-model="form.comunicacion_transporte.frecuencia_internet"
                    :label="$t('inscriptionRegister.internetFrecuency')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs6>
                  <v-autocomplete
                    v-bind:items="opcionesTransporte"
                    item-text="nombre"
                    item-value="value"
                    v-model="form.comunicacion_transporte.medio_transporte"
                    :label="$t('inscriptionRegister.transportWay')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs6>
                  <v-autocomplete
                    v-bind:items="opcionesTiempoTransporte"
                    item-text="nombre"
                    item-value="value"
                    v-model="form.comunicacion_transporte.duracion_transporte"
                    :label="$t('inscriptionRegister.transportTime')"
                  ></v-autocomplete>
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
                <v-flex xs12>
                  <v-text-field disabled :label="$t('inscriptionRegister.livesWith')" v-model="form.vive_con"></v-text-field>
                </v-flex>
                <v-flex xs3
                  v-for="padre in padres"
                  :key="padre.relacion"
                >
                  <v-card>
                    <v-responsive 
                    :src="padre.src" 
                    height="200px">
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex xs12 align-end flexbox>
                            <span class="headline blue--text" v-text="padre.relacion"></span>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-responsive>
                    <v-card-actions class="white">
                      <v-spacer></v-spacer>
                      <!-- <v-btn icon>
                        <v-icon>visibility</v-icon>
                      </v-btn> -->
                      <v-btn icon v-on:click="windowA = true, formA = padre, edita = true">
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-icon>face</v-icon>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex xs3
                  text-xs-center
                  layout
                  align-center
                  justify-center
                >
                  <v-card>
                    <v-responsive
                    align-center
                    height="200px">
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex xs12 align-end flexbox>
                            <v-avatar
                              :tile="false"
                              size="150px"
                              class="grey lighten-4"
                            >
                              <img src="/static/images/unknown.png" alt="avatar">
                            </v-avatar>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-responsive>
                    <v-card-actions class="white">
                      <v-spacer></v-spacer>
                      <v-btn icon v-on:click="windowA = true, formA = formAux">
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12>
                  <v-alert color="primary" icon="input" value="true">
                    <strong>{{$t('inscriptionRegister.subtitle3') }}</strong><br>
                  </v-alert>
                </v-flex>
                <v-flex xs3>
                  <v-autocomplete
                    v-bind:items="opcionesNivel"
                    item-text="name"
                    item-value="value"
                    v-model="form.registroInscripcion.nivel"
                    :label="$t('inscriptionRegister.level')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs3>
                  <v-autocomplete
                  v-if="form.registroInscripcion.nivel !== ''"
                    v-bind:items="opcionesGrado"
                    item-text="name"
                    item-value="value"
                    v-model="form.registroInscripcion.grado"
                    :label="$t('inscriptionRegister.grade')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs3>
                  <v-autocomplete
                    v-bind:items="opcionesTurno"
                    item-text="name"
                    item-value="value"
                    v-model="form.registroInscripcion.turno"
                    :label="$t('inscriptionRegister.turn')"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs3>
                  <v-text-field :label="$t('courses.gestion')" v-model="form.registroInscripcion.gestion"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-radio-group v-model="form.registroInscripcion.paralelo" :label="$t('inscriptionRegister.paralel')" :mandatory="true" row>
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
                  <v-alert color="primary" icon="domain" value="true">
                    <strong>{{$t('inscriptionRegister.subtitle1') }}</strong><br>
                  </v-alert>
                </v-flex>
                <v-flex xs8>
                  <v-autocomplete
                    v-bind:items="opcionesUE"
                    v-model="form.unidadEducativa.nombre"
                    item-text="codigoNombre"
                    item-value="id_unidad_educativa"
                    :label="$t('inscriptionRegister.codeNameEducativeUnit')"
                    :disabled="searchUE"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs4>
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
                <!-- <v-flex sx4>
                  <v-text-field :label="$t('inscriptionRegister.nameEducativeUnit')" :disabled="disableOptionsUE" v-model="form.unidadEducativa.nombre"></v-text-field>
                </v-flex> -->
                <v-flex sx6>
                  <v-text-field :label="$t('inscriptionRegister.sie')" :disabled="disableOptionsUE" v-model="form.unidadEducativa.sie"></v-text-field>
                </v-flex>
                <v-flex sx6>
                  <v-text-field :label="$t('inscriptionRegister.educativeDistrit')" :disabled="disableOptionsUE" v-model="form.unidadEducativa.distrito"></v-text-field>
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
          <v-btn class="primary" flat :disabled="!validForm" @click="guardarInscripcion()">{{$t('common.save')}}
            <v-icon right>done</v-icon>
          </v-btn>
        </v-card-actions>
        </v-container>
      </v-card>
      </v-flex>
  <!-- VENTANA DE CREACIÓN DE UNIDAD EDUCATIVA -->
      <v-dialog v-model="windowUE" max-width="800px">
        <v-card>
          <v-card-title>
            {{$t('inscriptionRegister.createNewSchool')}}
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs6>
                <v-text-field :label="$t('inscriptionRegister.codSie')" v-model="formUE.sie"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field :label="$t('inscriptionRegister.nameEducativeUnit')" v-model="formUE.nombre"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-autocomplete
                  v-bind:items="dependency"
                  item-text="name"
                  item-value="value"
                  v-model="formUE.dependencia"
                  :label="$t('inscriptionRegister.dependency')"
                  autocomplete
                ></v-autocomplete>
              </v-flex>
              <v-flex xs6>
                <v-text-field :label="$t('inscriptionRegister.educativeDistrit')" v-model="formUE.distrito"></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.stop="windowUE=false">{{$t('common.close')}}</v-btn>
          <v-btn color="primary" @click.stop="agregaUnidadEducativa()">{{$t('common.save')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  <!-- VENTANA DE CREACIÓN DE PERSONAS -->
      <v-dialog v-model="windowA" max-width="800px" persistent>
        <v-card>
          <v-card-title>
            {{$t('inscriptionRegister.tutorData')}}
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs4>
                <v-text-field :label="$t('inscriptionRegister.firstLastName')" v-model="formA.primer_apellido"></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field :label="$t('inscriptionRegister.secondLastName')" v-model="formA.segundo_apellido"></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field :label="$t('inscriptionRegister.names')" v-model="formA.nombres"></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field :disabled="edita" :label="$t('inscriptionRegister.ci')" v-model="formA.documento_identidad"></v-text-field>
              </v-flex>
              <v-flex xs4>
                  <v-autocomplete
                    :disabled="edita"
                    v-bind:items="lugarCi"
                    item-text="codigo_ine"
                    item-value="abreviacion"
                    v-model="formA.lugar_documento_identidad"
                    :label="$t('inscriptionRegister.documentPlace')"
                  ></v-autocomplete>
              </v-flex>
                <v-flex xs4>
                  <v-menu
                    ref="menuPerson"
                    v-model="menuPerson"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="formA.fecha_nacimiento"
                        :label="$t('inscriptionRegister.bornDate')"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="pickerPerson"
                      v-model="formA.fecha_nacimiento"
                      :max="new Date().toISOString().substr(0, 10)"
                      @change="savePerson"
                    ></v-date-picker>
                  </v-menu>
              </v-flex>
              <v-flex xs6>
                <v-radio-group v-model="formA.genero" :label="$t('usuarios.gender')" row>
                  <v-radio :label="$t('usuarios.male')" :value="'M'"></v-radio>
                  <v-radio :label="$t('usuarios.female')" :value="'F'"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs6>
                <v-text-field :label="$t('inscriptionRegister.relation')" v-model="formA.relation"></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field :label="$t('inscriptionRegister.language')" v-model="formA.idioma_materno"></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field :label="$t('inscriptionRegister.profession')" v-model="formA.ocupacion_actual"></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field :label="$t('inscriptionRegister.maxEducation')" v-model="formA.grado_instruccion"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field :label="$t('inscriptionRegister.telefon')" v-model="formA.telefono"></v-text-field>
              </v-flex> 
              <v-flex xs6>
                <!-- <v-text-field :label="$t('inscriptionRegister.livesWithKid')" v-model="formA.vive_con_ninio"></v-text-field> -->
                <v-radio-group v-model="formA.vive_con_ninio" :label="$t('inscriptionRegister.livesWithKid')" row>
                  <v-radio :label="$t('common.yes')" :value="true"></v-radio>
                  <v-radio :label="$t('common.no')" :value="false"></v-radio>
                </v-radio-group>
              </v-flex> 
            </v-layout>
          </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.stop="cerrarTutor()">{{$t('common.close')}}</v-btn>
          <v-btn v-if="edita" color="primary" @click.stop="agregaTutor('edita')">{{$t('common.save')}}</v-btn>
          <v-btn v-if="!edita" color="primary" @click.stop="agregaTutor('nuevo')">{{$t('common.save')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- VENTANA DE RESULTADOS -->
      <v-dialog v-model="windowFin" max-width="500px" persistent>
        <v-card>
          <v-card-title>
            <b>{{this.creado}}</b>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs4>
                <b>{{$t('common.code') + ': '}}</b>{{this.codigoCreado}}
              </v-flex>
              <v-flex xs8>
                <b>{{$t('common.names') + ': '}}</b>{{this.nombreCreado}}
                {{this.apellidoPaternoCreado}}
                {{this.apellidoMaternoCreado}}
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.stop="cierraMensaje()">{{$t('common.accept')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
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
      lugarCi: [],
      formUE: {
        sie: '',
        nombre: '',
        dependencia: '',
        distrito: ''
      },
      formAux: {},
      formA: {
        primer_apellido: '',
        segundo_apellido: '',
        nombres: '',
        documento_identidad: '',
        lugar_documento_identidad: '',
        relation: '',
        idioma_materno: '',
        ocupacion_actual: '',
        grado_instruccion: '',
        genero: '',
        fecha_nacimiento: '',
        vive_con_ninio: false
      },
      menu: false,
      menuPerson: false,
      form: {
        vive_con: '',
        unidadEducativa: {
          dependencia: '',
          nombre: '',
          distrito: '',
          sie: ''
        },
        unidadEducativaAnterior: {
          id: '',
          codSie: '',
          nombreUnidad: ''
        },
        persona: {
          nombres: '',
          primer_apellido: '',
          segundo_apellido: '',
          tipo_documento: '',
          documento_identidad: '',
          lugar_documento_identidad: '',
          genero: '',
          codigo: '',
          carnet_discapacidad: '',
          pioc: '',
          codrude: ''
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
          nivel: '',
          grado: '',
          paralelo: '',
          turno: '',
          gestion: (new Date()).getFullYear()
        },
        salud: {
          centro_salud: '',
          frecuencia_medica: '',
          tipo_discapacidad: '',
          subtipo_discapacidad: '',
          discapacidad_origen: '',
          tiene_discapacidad: false,
          carnet_discapacidad: ''
        },
        servicios_basicos: {
          origen_agua: '',
          acceso_electricidad: '',
          destino_agua: ''
        },
        empleo: {
          actividad_laboral: '',
          dias_trabajo: '',
          salario: ''
        },
        comunicacion_transporte: {
          acceso_internet: '',
          frecuencia_internet: '',
          medio_transporte: '',
          duracion_transporte: ''
        },
        apoderados: []
      },
      errors: {
        username: [],
        password: []
      },
      // Unidad Educativa
      disableOptionsUE: true,
      searchUE: false,
      chargingUE: true,
      todosUE: [],
      opcionesUE: [],
      windowUE: false,
      dependency: [],
      // Resumen de Creación
      windowFin: false,
      creado: false,
      codigoCreado: '',
      nombreCreado: '',
      apellidoPaternoCreado: '',
      apellidoMaternoCreado: '',
      // Registro Estudiante
      codeChosen: false,
      disableOptionsRE: true,
      searchRE: false,
      ciLoaded: false,
      chargingRE: true,
      opcionesRE: [],
      // Registro Inscripcion
      opcionesPaisNacimiento: [],
      opcionesDepartamentoNacimiento: [],
      opcionesProvinciaNacimiento: [],
      opcionesMunicipioNacimiento: [],
      opcionesProvinciaDireccion: [],
      opcionesMunicipioDireccion: [],
      opcionesPIOC: [],
      opcionesAT: [],
      opcionesIA: [],
      opcionesIF: [],
      opcionesTW: [],
      opcionesTT: [],
      discapacidadOrigen: [],
      opcionesNivel: [],
      opcionesGrado: [],
      opcionesTurno: [],
      // Paramétricas
      opcionesWaterOrigin: [],
      opcionesWaterDestiny: [],
      opcionesActividad: [],
      opcionesTransporte: [],
      opcionesInternetFrecuencia: [],
      opcionesTiempoTransporte: [],
      opcionesDiscapacidad: [],
      tipoDiscapacidad: [],
      subtipoDiscapacidad: [],
      // Apoderados
      edita: false,
      windowA: false,
      padres: [],
      //
      hidePass: true,
      remember: false
    };
  },
  created () {
    this.hasPermission('registroInscripcion');
    this.discapacidadOrigen = [
      {name: this.$t('inscriptionRegister.born'), value: 'BORN'},
      {name: this.$t('inscriptionRegister.adquired'), value: 'ADQUIRED'},
      {name: this.$t('inscriptionRegister.inherited'), value: 'INHERITED'},
      {name: this.$t('inscriptionRegister.none'), value: 'NONE'}];
    this.opcionesNivel = [
      {name: this.$t('inscriptionRegister.initial'), value: 'INICIAL'},
      {name: this.$t('inscriptionRegister.primary'), value: 'PRIMARIA'},
      {name: this.$t('inscriptionRegister.secondary'), value: 'SECUNDARIA'},
      {name: this.$t('inscriptionRegister.lag'), value: 'REZAGO'}
    ];
    this.opcionesTurno = [
      {name: this.$t('inscriptionRegister.morning'), value: 'MAÑANA'},
      {name: this.$t('inscriptionRegister.afternoon'), value: 'TARDE'},
      {name: this.$t('inscriptionRegister.evening'), value: 'NOCHE'}
    ];
    this.dependency = [
      {name: this.$t('inscriptionRegister.public'), value: 'public'},
      {name: this.$t('inscriptionRegister.comunitary'), value: 'comunitary'},
      {name: this.$t('inscriptionRegister.convein'), value: 'convein'},
      {name: this.$t('inscriptionRegister.private'), value: 'private'}
    ];
    this.$service.get(`unidadesEducativas`)
    .then(respuesta => {
      this.todosUE = respuesta.datos;
      this.todosUE.forEach(function (element) {
        element.resumen = (element.sie ? 'Sie: ' + element.sie : '') + (element.nombre ? ' Nombre: ' + element.nombre : '');
        element.codigoNombre = 'Cod: ' + element.codigo + ', Nombre: ' + element.nombre;
        if (element.id_unidad_educativa === 1 || element.id_unidad_educativa === 2 || element.id_unidad_educativa === 3 ||
          element.id_unidad_educativa === 4 || element.id_unidad_educativa === 5) {
          this.opcionesUE.push(element);
        }
      }, this);
      // Carga ubicaciones de documento
      return this.$service.get(`codigoDeptos`);
    })
    .then(response => {
      this.lugarCi = response.datos;
      // Carga los pioc
      return this.$service.get(`piocs`);
    })
    .then(respuesta => {
      this.opcionesPIOC = respuesta.datos;
      // Carga los paises
      return this.$service.get(`dpaNivel?nivel=1`);
    })
    .then(respuesta => {
      this.opcionesPaisNacimiento = respuesta.datos;
      // Carga los departamentos
      return this.$service.get(`dpaNivel?nivel=2`);
    })
    .then(respuesta => {
      this.opcionesDepartamentoNacimiento = respuesta.datos;
      // Carga los provincias
      return this.$service.get(`dpaNivel?nivel=3`);
    })
    .then(respuesta => {
      this.opcionesProvinciaNacimiento = respuesta.datos;
      this.opcionesProvinciaDireccion = respuesta.datos;
      this.form.nacimiento.provincia = 86;
      this.form.direccion.provincia = 86;
      // Carga las opciones de paramétricas
      return this.$service.get(`parametrosRude`);
    })
    .then(respuesta => {
      respuesta.datos.forEach(function (element) {
        let auxi = {};
        switch (element.grupo) {
          case 'water_origin':
            auxi = {
              value: element.nombre,
              nombre: this.$t(`parameters.${element.nombre}`)
            };
            this.opcionesWaterOrigin.push(auxi);
            break;
          case 'water_destiny':
            auxi = {
              value: element.nombre,
              nombre: this.$t(`parameters.${element.nombre}`)
            };
            this.opcionesWaterDestiny.push(auxi);
            break;
          case 'activity_rude':
            auxi = {
              value: element.nombre,
              nombre: this.$t(`parameters.${element.nombre}`)
            };
            this.opcionesActividad.push(auxi);
            break;
          case 'transport':
            auxi = {
              value: element.nombre,
              nombre: this.$t(`parameters.${element.nombre}`)
            };
            this.opcionesTransporte.push(auxi);
            break;
          case 'internet_frecuency':
            auxi = {
              value: element.nombre,
              nombre: this.$t(`parameters.${element.nombre}`)
            };
            this.opcionesInternetFrecuencia.push(auxi);
            break;
          case 'transport_time':
            auxi = {
              value: element.nombre,
              nombre: this.$t(`parameters.${element.nombre}`)
            };
            this.opcionesTiempoTransporte.push(auxi);
            break;
          case 'disability':
            auxi = {
              id_parametro: element.id_parametro,
              value: element.nombre,
              nombre: this.$t(`disability.${element.nombre}`),
              padre: element.fid_parametro_padre
            };
            this.opcionesDiscapacidad.push(auxi);
            if (element.orden === 1) {
              this.tipoDiscapacidad.push(auxi);
            } else {
              this.subtipoDiscapacidad.push(auxi);
            }
            break;
          default:
            break;
        }
      }, this);
    })
    .then(() => {
      if (this.$route.query.codigo) {
        this.form.persona.tipo_documento = 'CODIGO';
        this.form.persona.codigo = this.$route.query.codigo;
        this.buscaEstudiante();
      }
    });
  },
  methods: {
    getUnidadesEducativas () {
      this.$service.get(`unidadesEducativas`)
        .then(respuesta => {
          this.opcionesUE = respuesta.datos;
        });
    },
    actualizarDocumento () {
      const carnetData = {
        tipo_documento: this.form.persona.tipo_documento,
        documento_identidad: this.form.persona.documento_identidad,
        lugar_documento_identidad: this.form.persona.lugar_documento_identidad
      };
      const idPersona = 145;
      this.$service.put(`actualizaPersona`, {idPersona, carnetData})
        .then(respuesta => {
          this.ciLoaded = true;
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
    agregaUnidadEducativa () {
      this.$service.post(`unidadEducativa`, this.formUE)
      .then(respuesta => {
        if (respuesta.finalizado) {
          this.form.unidadEducativaAnterior.id = respuesta.datos.id_unidad_educativa;
          this.windowUE = false;
          return this.$service.get(`unidadesEducativas`);
        } else {
          return false;
        }
      })
      .then(respuesta => {
        if (respuesta) {
          this.todosUE = respuesta.datos;
          this.todosUE.forEach(function (element) {
            element.resumen = (element.sie ? 'Sie: ' + element.sie : '') + (element.nombre ? ' Nombre: ' + element.nombre : '');
            if (element.id_unidad_educativa === 1 || element.id_unidad_educativa === 2 || element.id_unidad_educativa === 3) {
              this.opcionesUE.push(element);
            }
          }, this);
        }
      });
    },
    cerrarTutor () {
      this.windowA = false;
      if (!this.edita) {
        this.formAux = this.formA;
      }
      this.edita = false;
    },
    cierraMensaje () {
      this.windowFin = false;
      this.$router.push('home');
    },
    agregaTutor (accion) {
      let obj = {};
      if (accion === 'edita') {
        this.padres.forEach(function (element) {
          if (this.formA.id === element.id_parentezco) {
            element.id = this.formA.id;
            element.estadoApoderado = element.estadoApoderado !== 'nuevo' ? 'editado' : element.estadoApoderado;
            element.relation = this.formA.relation;
            element.descripcion = null;
            element.tipo_documento = 'CARNET_IDENTIDAD';
            element.documento_identidad = this.formA.documento_identidad;
            element.lugar_documento_identidad = this.formA.lugar_documento_identidad;
            element.fecha_nacimiento = this.formA.fecha_nacimiento;
            element.nombres = this.formA.nombres;
            element.primer_apellido = this.formA.primer_apellido;
            element.segundo_apellido = this.formA.segundo_apellido;
            element.casada_apellido = null;
            element.genero = this.formA.genero;
            element.telefono = this.formA.telefono;
            element.idioma_materno = this.formA.idioma_materno;
            element.ocupacion_actual = this.formA.ocupacion_actual;
            element.grado_instruccion = this.formA.grado_instruccion;
            element.discapacidad = false;
            element.src = '/static/images/' + (this.formA.genero === 'M' ? 'hombre.jpg' : 'mujer.jpg');
          }
        }, this);
        this.edita = false;
      };
      if (accion === 'nuevo') {
        obj = {
          estadoApoderado: 'nuevo',
          relation: this.formA.relation,
          tipo_documento: 'CARNET_IDENTIDAD',
          documento_identidad: this.formA.documento_identidad,
          lugar_documento_identidad: this.formA.lugar_documento_identidad,
          fecha_nacimiento: this.formA.fecha_nacimiento,
          nombres: this.formA.nombres,
          primer_apellido: this.formA.primer_apellido,
          segundo_apellido: this.formA.segundo_apellido,
          genero: this.formA.genero,
          idioma_materno: this.formA.idioma_materno,
          ocupacion_actual: this.formA.ocupacion_actual,
          grado_instruccion: this.formA.grado_instruccion,
          telefono: this.formA.telefono,
          vive_con_ninio: this.formA.vive_con_ninio,
          src: '/static/images/' + (this.formA.genero === 'M' ? 'hombre.jpg' : 'mujer.jpg')
        };
        this.padres.push(obj);
      }
      if (this.formA.vive_con_ninio) {
        let relacion = 'tutor';
        if (this.formA.relation.toLowerCase() === 'padre') {
          relacion = 'padre';
        }
        if (this.formA.relation.toLowerCase() === 'madre') {
          relacion = 'madre';
        }
        this.form.vive_con += this.form.vive_con === '' ? relacion : ', ' + relacion;
      }
      this.windowA = false;
    },
    buscaEstudiante () {
      let searchIDQuery = this.form.persona.documento_identidad && this.form.persona.lugar_documento_identidad && this.form.persona.tipo_documento !== 'CODIGO';
      let searchCodeQuery = this.form.persona.codigo && this.form.persona.tipo_documento === 'CODIGO';
      if (searchIDQuery || searchCodeQuery) {
        let ruta = `estudiantes?tipo_documento=${this.form.persona.tipo_documento}&documento_identidad=${this.form.persona.documento_identidad}&lugar_documento_identidad=${this.form.persona.lugar_documento_identidad}`;
        if (searchCodeQuery) {
          ruta = `estudiantes?codigo=${this.$route.query.codigo}`;
        }
        // if (this.form.unidadEducativa.nombre !== -1) {
        this.$service.get(ruta)
          .then(respuesta => {
            var consulta = {};
            if (!respuesta) {
              return;
            }
            if (respuesta.datos.length === 1) {
              consulta = respuesta.datos[0];
              this.searchRE = true;
            }
            // Jala datos al formulario
            // this.form.persona.carnet_discapacidad = consulta.carnet_discapacidad ? consulta.carnet_discapacidad : 'No cuenta con carnet';
            if (this.form.persona.documento_identidad !== '' && this.form.persona.documento_identidad !== undefined) {
              this.ciLoaded = true;
            }
            this.form.persona.documento_identidad = consulta.documento_identidad;
            this.form.persona.lugar_documento_identidad = consulta.lugar_documento_identidad;
            this.form.persona.nombres = consulta.nombres;
            this.form.persona.primer_apellido = consulta.primer_apellido;
            this.form.persona.segundo_apellido = consulta.segundo_apellido;
            this.form.persona.casada_apellido = consulta.casada_apellido;
            this.form.persona.genero = consulta.genero;
            this.form.salud.tiene_discapacidad = consulta.tiene_discapacidad;
            this.form.salud.carnet_discapacidad = consulta.carnet_discapacidad;
            this.form.persona.discapacidad = consulta.discapacidad ? consulta.discapacidad : '';
            // registroInscripcion
            this.form.registroInscripcion.idioma = consulta.idioma_materno ? consulta.idioma_materno : '';
            this.form.registroInscripcion.idiomas = consulta.idiomas ? consulta.idiomas : '';
            // estudiante
            this.form.persona.codrude = consulta.estudiante.rude;
            if (consulta.estudiante.registro.pioc && consulta.estudiante.registro.pioc.id_pioc) {
              this.form.persona.pioc = consulta.estudiante.registro.pioc.id_pioc;
            }
            // nacimiento
            this.form.nacimiento.fecha_nacimiento = consulta.fecha_nacimiento.substring(0, consulta.fecha_nacimiento.indexOf('T')); // get posicion T y cortar
            if (consulta.lugar_nacimiento && consulta.lugar_nacimiento.municipio) {
              this.form.nacimiento.municipio = consulta.lugar_nacimiento.municipio;
            } else if (consulta.lugar_nacimiento && consulta.lugar_nacimiento.provincia) {
              this.form.nacimiento.provincia = consulta.lugar_nacimiento.provincia;
            } else if (consulta.lugar_nacimiento && consulta.lugar_nacimiento.departamento) {
              this.form.nacimiento.departamento = consulta.lugar_nacimiento.departamento;
            } else if (consulta.lugar_nacimiento && consulta.lugar_nacimiento.pais) {
              this.form.nacimiento.pais = consulta.lugar_nacimiento.pais;
            }
            if (consulta.estudiante && consulta.estudiante.registro && consulta.estudiante.registro.oficialia) {
              this.form.nacimiento.nOficialia = consulta.estudiante.registro.oficialia;
            }
            if (consulta.estudiante && consulta.estudiante.registro && consulta.estudiante.registro.libro) {
              this.form.nacimiento.nLibro = consulta.estudiante.registro.libro;
            }
            if (consulta.estudiante && consulta.estudiante.registro && consulta.estudiante.registro.partida) {
              this.form.nacimiento.nPartida = consulta.estudiante.registro.partida;
            }
            if (consulta.estudiante && consulta.estudiante.registro && consulta.estudiante.registro.folio) {
              this.form.nacimiento.nFolio = consulta.estudiante.registro.folio;
            }
            // direccion
            if (consulta.direccion) {
              if (consulta.direccion.pais) {
                this.form.direccion.pais = consulta.direccion.pais;
              }
              if (consulta.direccion.departamento) {
                this.form.direccion.departamento = consulta.direccion.departamento;
              }
              if (consulta.direccion.provincia) {
                this.form.direccion.provincia = consulta.direccion.provincia;
              }
              if (consulta.direccion.municipio) {
                this.form.direccion.municipio = consulta.direccion.municipio;
              }
              if (consulta.direccion.localidad) {
                this.form.direccion.localidad = consulta.direccion.localidad;
              }
              if (consulta.direccion.zona) {
                this.form.direccion.zona = consulta.direccion.zona;
              }
              if (consulta.direccion.calle) {
                this.form.direccion.calle = consulta.direccion.calle;
              }
              if (consulta.direccion.numero) {
                this.form.direccion.numero = consulta.direccion.numero;
              }
              if (consulta.direccion.telefono) {
                this.form.direccion.telefono = consulta.direccion.telefono;
              }
              if (consulta.direccion.celular) {
                this.form.direccion.celular = consulta.direccion.celular;
              }
            }
            // salud
            if (consulta.estudiante) {
              if (consulta.estudiante.registro) {
                this.form.salud.centro_salud = consulta.estudiante.registro.centro_salud;
                this.form.salud.frecuencia_medica = consulta.estudiante.registro.frecuencia_medica;
                // servicios básicos
                this.form.servicios_basicos.origen_agua = consulta.estudiante.registro.origen_agua;
                this.form.servicios_basicos.acceso_electricidad = consulta.estudiante.registro.acceso_electricidad;
                this.form.servicios_basicos.destino_agua = consulta.estudiante.registro.destino_agua;
                // empleo
                this.form.empleo.actividad_laboral = consulta.estudiante.registro.actividad_laboral;
                this.form.empleo.dias_trabajo = consulta.estudiante.registro.dias_trabajo;
                this.form.empleo.salario = consulta.estudiante.registro.salario;
                // comunicacion y transporte
                this.form.comunicacion_transporte.acceso_internet = consulta.estudiante.registro.acceso_internet;
                this.form.comunicacion_transporte.frecuencia_internet = consulta.estudiante.registro.frecuencia_internet;
                this.form.comunicacion_transporte.medio_transporte = consulta.estudiante.registro.medio_transporte;
                this.form.comunicacion_transporte.duracion_transporte = consulta.estudiante.registro.duracion_transporte;
              }
              this.form.salud.discapacidad_origen = consulta.discapacidad_origen;
              if (consulta.fid_discapacidad >= 75) {
                this.form.salud.subtipo_discapacidad = consulta.fid_discapacidad;
                this.form.salud.tipo_discapacidad = this.getDisabilityFather(consulta.fid_discapacidad);
              } else {
                this.form.salud.tipo_discapacidad = consulta.fid_discapacidad;
              }
            }
            // padres
            this.form.apoderados = consulta.persona_de;
            this.padres = [];
            this.form.apoderados.forEach(function (tutor) {
              const obj = {
                id: tutor.id_parentezco,
                id_persona: tutor.fid_persona_es,
                estadoApoderado: 'cargado',
                relation: tutor.relacion,
                descripcion: tutor.descripcion,
                tipo_documento: tutor.persona_es.tipo_documento,
                documento_identidad: tutor.persona_es.documento_identidad,
                lugar_documento_identidad: tutor.persona_es.lugar_documento_identidad,
                complemento_documento: tutor.persona_es.complemento_documento,
                tipo_documento_discapacidad: tutor.persona_es.tipo_documento_discapacidad,
                carnet_discapacidad: tutor.persona_es.carnet_discapacidad,
                fecha_nacimiento: tutor.persona_es.fecha_nacimiento,
                nombres: tutor.persona_es.nombres,
                primer_apellido: tutor.persona_es.primer_apellido,
                segundo_apellido: tutor.persona_es.segundo_apellido,
                casada_apellido: tutor.persona_es.casada_apellido,
                genero: tutor.persona_es.genero,
                nombre_completo: tutor.persona_es.nombre_completo,
                idiomas: tutor.persona_es.idiomas,
                idioma_materno: tutor.persona_es.idioma_materno,
                ocupacion_actual: tutor.persona_es.ocupacion_actual,
                grado_instruccion: tutor.persona_es.grado_instruccion,
                discapacidad: tutor.persona_es.discapacidad,
                telefono: tutor.persona_es.telefono,
                src: '/static/images/' + (tutor.persona_es.genero === 'M' ? 'hombre.jpg' : 'mujer.jpg')
              };
              this.padres.push(obj);
            }, this);
            // Unidades educativas
            consulta.unidades_educativas.forEach(function (element) {
              const fechaActual = new Date();
              let mayor = 0;
              if (element.gestion === fechaActual.getFullYear()) {
                this.form.unidadEducativa.nombre = element.fid_unidad_educativa;
                this.form.registroInscripcion.nivel = element.nivel;
                this.form.registroInscripcion.grado = element.grado;
                this.form.registroInscripcion.turno = element.turno;
                this.form.registroInscripcion.paralelo = element.paralelo;
                if (this.form.unidadEducativa.nombre !== '') {
                  this.buscaUnidadEducativa('search');
                }
              } else {
                if (element.gestion > mayor) {
                  this.form.unidadEducativaAnterior.id = element.fid_unidad_educativa;
                  this.form.unidadEducativaAnterior.codSie = element.unidad_educativa.sie;
                  this.form.unidadEducativaAnterior.nombreUnidad = element.unidad_educativa.nombre;
                  mayor = element.gestion;
                }
              }
            }, this);
          });
      } else {
        this.$message.error(this.$t('inscriptionRegister.errorNameField'));
      }
    },
    reiniciaBusqueda () {
      this.searchRE = false;
      if (!this.disableOptionsUE) {
        this.disableOptionsUE = true;
      }
    },
    getDisabilityFather (sonCode) {
      let fatherCode;
      this.opcionesDiscapacidad.forEach(item => {
        if (item.id_parametro === sonCode) {
          fatherCode = item.padre;
        }
      });
      return fatherCode;
    },
    guardarInscripcion () {
      this.form.apoderados = this.padres;
      this.$service.put(`registroRude`, this.form)
      .then(respuesta => {
        if (respuesta.finalizado) {
          if (respuesta.datos.creado) {
            this.creado = this.$t('generalFollowUp.registerCreationSuccessfull').toUpperCase();
          } else {
            this.creado = this.$t('generalFollowUp.registerEditionSuccessfull').toUpperCase();
          }
          this.codigoCreado = respuesta.datos.codigo;
          this.nombreCreado = respuesta.datos.nombre;
          this.apellidoPaternoCreado = respuesta.datos.primerApellido;
          this.apellidoMaternoCreado = respuesta.datos.segundoApellido;
          this.windowFin = true;
        } else {
          this.$message.error(this.$t('generalFollowUp.registerCreationUnsuccessfull'));
        }
      });
    },
    save (date) {
      this.$refs.menu.save(date);
      this.form.nacimiento.fecha_nacimiento = date;
    },
    savePerson (date) {
      this.$refs.menuPerson.save(date);
      this.formA.fecha_nacimiento = date;
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
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
    },
    menuPerson (val) {
      val && setTimeout(() => (this.$refs.pickerPerson.activePicker = 'YEAR'));
    },
    'form.persona.tipo_documento': function () {
      if (this.form.persona.tipo_documento === 'CODIGO') {
        this.codeChosen = true;
      } else {
        this.codeChosen = false;
      }
    },
    'form.nacimiento.departamento': function () {
      this.$service.get(`dpaHijos?id_dpa=${this.form.nacimiento.departamento}`)
        .then(respuesta => {
          this.opcionesProvinciaNacimiento = respuesta.datos;
          return this.$service.get(`dpaPadre?id_dpa=${this.form.nacimiento.departamento}`);
        })
        .then(respuesta => {
          this.form.nacimiento.pais = respuesta.datos[0].id_dpa;
        });
    },
    'form.nacimiento.provincia': function () {
      this.$service.get(`dpaHijos?id_dpa=${this.form.nacimiento.provincia}`)
        .then(respuesta => {
          this.opcionesMunicipioNacimiento = respuesta.datos;
          return this.$service.get(`dpaPadre?id_dpa=${this.form.nacimiento.provincia}`);
        })
        .then(respuesta => {
          this.form.nacimiento.departamento = respuesta.datos[0].id_dpa;
        });
    },
    'form.nacimiento.municipio': function () {
      this.$service.get(`dpaPadre?id_dpa=${this.form.nacimiento.municipio}`)
      .then(respuesta => {
        this.form.nacimiento.provincia = respuesta.datos[0].id_dpa;
      });
    },
    'form.direccion.provincia': function () {
      this.$service.get(`dpaHijos?id_dpa=${this.form.direccion.provincia}`)
        .then(respuesta => {
          this.opcionesMunicipioDireccion = respuesta.datos;
        });
    },
    'form.direccion.municipio': function () {
      this.$service.get(`dpaPadre?id_dpa=${this.form.direccion.municipio}`)
      .then(respuesta => {
        this.form.direccion.provincia = respuesta.datos[0].id_dpa;
      });
    },
    'form.registroInscripcion.nivel': function () {
      switch (this.form.registroInscripcion.nivel) {
        case 'INICIAL':
          this.opcionesGrado = [
            {name: '1°', value: '1'},
            {name: '2°', value: '2'}
          ];
          break;
        case 'PRIMARIA':
          this.opcionesGrado = [
            {name: '1°', value: '1'},
            {name: '2°', value: '2'},
            {name: '3°', value: '3'},
            {name: '4°', value: '4'},
            {name: '5°', value: '5'},
            {name: '6°', value: '6'}
          ];
          break;
        case 'SECUNDARIA':
          this.opcionesGrado = [
            {name: '1°', value: '1'},
            {name: '2°', value: '2'},
            {name: '3°', value: '3'},
            {name: '4°', value: '4'},
            {name: '5°', value: '5'},
            {name: '6°', value: '6'}
          ];
          break;
        case 'REZAGO':
          this.opcionesGrado = [
            {name: '1°', value: '1'},
            {name: '2°', value: '2'},
            {name: '3°', value: '3'},
            {name: '4°', value: '4'}
          ];
          break;
        default:
          break;
      }
    },
    'form.salud.tipo_discapacidad': function () {
      this.subtipoDiscapacidad = [];
      this.opcionesDiscapacidad.forEach(function (element) {
        if (element.padre === this.form.salud.tipo_discapacidad) {
          const auxi = {
            id_parametro: element.id_parametro,
            value: element.value,
            nombre: this.$t(`disability.${element.value}`),
            padre: element.padre
          };
          this.subtipoDiscapacidad.push(auxi);
        }
      }, this);
    }
  }
};
</script>

