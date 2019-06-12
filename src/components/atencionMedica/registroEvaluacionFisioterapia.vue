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
      <student-data :studentCode="datosEstudiante.codigo"></student-data>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">{{$t('psicomotricity.consultationReason')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="motivoConsultaDataPanel?minimize(1):maximize(1)">
            <v-icon>{{motivoConsultaDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="motivoConsultaDataPanel">
          <v-layout row wrap>
            <v-flex xs12>
              <v-textarea
                :label="$t('physiotherapy.medicalDiagnosys')"
                v-model="formularioRegistro.diagnosticoMedico"
                :error="$v.formularioRegistro.observacionGrupoFamiliar.$error"
                @input="$v.formularioRegistro.observacionGrupoFamiliar.$touch()"
                :error-messages="errors.observacionGrupoFamiliar"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('psicomotricity.consultationReason')"
                v-model="formularioRegistro.motivoConsulta"
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
          <h2 class="headline mb-0">{{$t('physiotherapy.actualDeceaseBackground')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="antecedenteEnfermedadDataPanel?minimize(2):maximize(2)">
            <v-icon>{{antecedenteEnfermedadDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="antecedenteEnfermedadDataPanel">
          <v-layout row wrap>
            <v-flex xs12>
              <v-textarea
                :label="$t('physiotherapy.actualDeceaseBackground')"
                v-model="formularioRegistro.antecedentesEnfermedadActual"
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
          <h2 class="headline mb-0">{{$t('physiotherapy.gestationalBackground')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="antecedenteGestacionalDataPanel?minimize(3):maximize(3)">
            <v-icon>{{antecedenteGestacionalDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="antecedenteGestacionalDataPanel">
          <v-layout row wrap>
            <v-flex xs4>
              <v-text-field
                :label="$t('physiotherapy.pregnancyNumber')"
                v-model="formularioRegistro.antecedentesGestacionales.numeroEmbarazo"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                :label="$t('physiotherapy.childrenNumber')"
                v-model="formularioRegistro.antecedentesGestacionales.numeroHijos"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-switch
                v-model="formularioRegistro.antecedentesGestacionales.controlPrenatal"
                :label="$t('physiotherapy.antenatalFollowup')"
              ></v-switch>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                :label="$t('physiotherapy.hospital')"
                v-model="formularioRegistro.antecedentesGestacionales.hospital"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                :label="$t('physiotherapy.pregnancyComplications')"
                v-model="formularioRegistro.antecedentesGestacionales.problemasDuranteEmbarazo"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                :label="$t('physiotherapy.gestationalTime')"
                v-model="formularioRegistro.antecedentesGestacionales.tiempoGestacional"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                :label="$t('physiotherapy.birth')"
                v-model="formularioRegistro.antecedentesGestacionales.parto"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-radio-group 
                :label="$t('physiotherapy.birthTipe')"
                v-model="formularioRegistro.antecedentesGestacionales.tipoParto">
                <v-radio
                  key="cesarean"
                  :label="$t('physiotherapy.cesarean')"
                  value="cesarean"
                ></v-radio>
                <v-radio
                  key="eutocic"
                  :label="$t('physiotherapy.eutocic')"
                  value="eutocic"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs4>
              <v-combobox
                v-model="formularioRegistro.antecedentesGestacionales.posicion"
                :filter="filter"
                :hide-no-data="!familyTypeSearch"
                :items="familyTypeItems"
                :search-input.sync="familyTypeSearch"
                hide-selected
                :label="$t('physiotherapy.position')"
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
            <v-flex xs4>
              <v-radio-group 
                :label="$t('physiotherapy.cry')"
                v-model="formularioRegistro.antecedentesGestacionales.llanto">
                <v-radio
                  key="immediate"
                  :label="$t('physiotherapy.immediate')"
                  value="immediate"
                ></v-radio>
                <v-radio
                  key="belated"
                  :label="$t('physiotherapy.belated')"
                  value="belated"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs4>
              <v-switch
                v-model="formularioRegistro.antecedentesGestacionales.movimientos"
                :label="$t('physiotherapy.movements')"
              ></v-switch>
            </v-flex>
            <v-flex xs4>
              <v-switch
                v-model="formularioRegistro.antecedentesGestacionales.cianosis"
                :label="$t('physiotherapy.cyanosis')"
              ></v-switch>
            </v-flex>
            <v-flex xs4>
              <v-switch
                v-model="formularioRegistro.antecedentesGestacionales.oxigeno"
                :label="$t('physiotherapy.oxygen')"
              ></v-switch>
            </v-flex>
            <v-flex xs4>
              <v-switch
                v-model="formularioRegistro.antecedentesGestacionales.incubadora"
                :label="$t('physiotherapy.incubator')"
              ></v-switch>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                :label="$t('physiotherapy.incubatorTime')"
                v-model="formularioRegistro.antecedentesGestacionales.tiempoIncubadora"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                :label="$t('disability.other')"
                v-model="formularioRegistro.antecedentesGestacionales.otros"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">{{$t('physiotherapy.posturalPhysicalExploration')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="posturaFísicaDataPanel?minimize(4):maximize(4)">
            <v-icon>{{posturaFísicaDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="posturaFísicaDataPanel">
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field
                :label="$t('physiotherapy.anteriorPlan')"
                v-model="formularioRegistro.exploracionPosturalFisica.planoAnterior"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                :label="$t('physiotherapy.posteriorPlan')"
                v-model="formularioRegistro.exploracionPosturalFisica.planoPosterior"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                :label="$t('physiotherapy.lateralPlan')"
                v-model="formularioRegistro.exploracionPosturalFisica.planoLateral"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                :label="$t('disability.other')"
                v-model="formularioRegistro.exploracionPosturalFisica.otros"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <h3 class="headline mb-0">{{$t('physiotherapy.respiration')}}</h3>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                :label="$t('physiotherapy.type')"
                v-model="formularioRegistro.exploracionPosturalFisica.tipoRespiracion"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                :label="$t('physiotherapy.pattern')"
                v-model="formularioRegistro.exploracionPosturalFisica.patronRespiracion"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <h3 class="headline mb-0">{{$t('psicomotricity.walk')}}</h3>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('psicomotricity.walk')"
                v-model="formularioRegistro.exploracionPosturalFisica.marcha"
                :error="$v.formularioRegistro.observacionGrupoFamiliar.$error"
                @input="$v.formularioRegistro.observacionGrupoFamiliar.$touch()"
                :error-messages="errors.observacionGrupoFamiliar"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <h3 class="headline mb-0">{{$t('physiotherapy.orthopedicTest')}}</h3>
            </v-flex>
              <v-text-field
                label="THOMAS"
                v-model="formularioRegistro.exploracionPosturalFisica.pruebaOrtopedica.thomas"
              ></v-text-field>
              <v-text-field
                label="GALEAZI"
                v-model="formularioRegistro.exploracionPosturalFisica.pruebaOrtopedica.galeazi"
              ></v-text-field>
              <v-text-field
                label="OBER "
                v-model="formularioRegistro.exploracionPosturalFisica.pruebaOrtopedica.ober"
              ></v-text-field>
              <v-text-field
                label="ORTOLANI"
                v-model="formularioRegistro.exploracionPosturalFisica.pruebaOrtopedica.ortolani"
              ></v-text-field>
              <v-text-field
                label="BARLOW"
                v-model="formularioRegistro.exploracionPosturalFisica.pruebaOrtopedica.barlow"
              ></v-text-field>
              <v-text-field
                :label="$t('physiotherapy.foldAsymmetry')"
                v-model="formularioRegistro.exploracionPosturalFisica.pruebaOrtopedica.asimetriaPliegues"
              ></v-text-field>
              <v-text-field
                :label="$t('disability.other')"
                v-model="formularioRegistro.exploracionPosturalFisica.pruebaOrtopedica.otros"
              ></v-text-field>
            <v-flex xs12>
              <h3 class="headline mb-0">{{$t('physiotherapy.tone')}}</h3>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('physiotherapy.tone')"
                v-model="formularioRegistro.exploracionPosturalFisica.tono"
                :error="$v.formularioRegistro.observacionGrupoFamiliar.$error"
                @input="$v.formularioRegistro.observacionGrupoFamiliar.$touch()"
                :error-messages="errors.observacionGrupoFamiliar"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <h3 class="headline mb-0">{{$t('physiotherapy.trophism')}}</h3>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('physiotherapy.trophism')"
                v-model="formularioRegistro.exploracionPosturalFisica.trofismo"
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
          <h2 class="headline mb-0">{{$t('physiotherapy.modifiedAshworthScale')}}</h2>
          <v-btn icon dark color="primary" @click.native="openView(0)">
            <v-icon>visibility</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="ashworthScaleDataPanel?minimize(5):maximize(5)">
            <v-icon>{{ashworthScaleDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="ashworthScaleDataPanel">
          <v-layout row wrap>
            <v-flex xs12>
              <v-radio-group 
                :label="$t('physiotherapy.modifiedAshworthScale')"
                v-model="formularioRegistro.escalaAshworth">
                <v-radio
                  key="00"
                  label="Tono muscular normal. No hay espasticidad."
                  value="00"
                ></v-radio>
                <v-radio
                  key="10"
                  label="Leve incremento del tono muscular. Resistencia mínima al final del arco articular al estirar pasivamente el grupo muscular considerado."
                  value="10"
                ></v-radio>
                <v-radio
                  key="11"
                  label="Leve incremento del tono muscular. Resistencia a la elongación en menos de la  mitad del arco."
                  value="11"
                ></v-radio>
                <v-radio
                  key="20"
                  label="Incremento del tono mayor. Resistencia a la elongación en casi todo el arco articular. Extremidad movilizable fácilmente."
                  value="20"
                ></v-radio>
                <v-radio
                  key="30"
                  label="Considerable incremento del tono. Es difícil la movilización pasiva de la extremidad."
                  value="30"
                ></v-radio>
                <v-radio
                  key="40"
                  label="Hipertonía de las extremidades en flexión  o en extensión.(aducción, abducción etc.)"
                  value="40"
                ></v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">{{$t('physiotherapy.reflexes')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="reflejosDataPanel?minimize(6):maximize(6)">
            <v-icon>{{reflejosDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="reflejosDataPanel">
          <v-layout row wrap>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.reflejos.suctionReflection"
                :label="$t('physiotherapy.suctionReflection')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.reflejos.suctionReflectionText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.reflejos.TRIPLEEXTFLX"
                :label="$t('physiotherapy.TRIPLEEXTFLX')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.reflejos.TRIPLEEXTFLXText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.reflejos.RTCA"
                :label="$t('physiotherapy.RTCA')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.reflejos.RTCAText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.reflejos.RTCS"
                :label="$t('physiotherapy.RTCS')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.reflejos.RTCSText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.reflejos.RTL"
                :label="$t('physiotherapy.RTL')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.reflejos.RTLText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.reflejos.RMORO"
                :label="$t('physiotherapy.RMORO')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.reflejos.RMOROText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.reflejos.RBABINSKI"
                :label="$t('physiotherapy.RBABINSKI')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.reflejos.RBABINSKIText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.reflejos.REXTCRUZADA"
                :label="$t('physiotherapy.REXTCRUZADA')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.reflejos.REXTCRUZADAText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.reflejos.GALANT"
                :label="$t('physiotherapy.GALANT')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.reflejos.GALANTText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.reflejos.LANDAU"
                :label="$t('physiotherapy.LANDAU')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.reflejos.LANDAUText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.reflejos.DEFENSA"
                :label="$t('physiotherapy.DEFENSA')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.reflejos.DEFENSAText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.reflejos.RPALMAR"
                :label="$t('physiotherapy.RPALMAR')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.reflejos.RPALMARText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.reflejos.RPLANTAR"
                :label="$t('physiotherapy.RPLANTAR')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.reflejos.RPLANTARText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.reflejos.RPOSITIVODEAPOYO"
                :label="$t('physiotherapy.RPOSITIVODEAPOYO')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.reflejos.RPOSITIVODEAPOYOText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.reflejos.RPARACAIDAS"
                :label="$t('physiotherapy.RPARACAIDAS')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.reflejos.RPARACAIDASText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">{{$t('physiotherapy.straighteningReactions')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="reaccionEnderezamientoDataPanel?minimize(7):maximize(7)">
            <v-icon>{{reaccionEnderezamientoDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="reaccionEnderezamientoDataPanel">
          <v-layout row wrap>
            <v-flex xs4>
              <v-switch
                v-model="formularioRegistro.reaccionesEnderezamiento.laberintico"
                :label="$t('physiotherapy.laberinthStraighteningReaction')"
              ></v-switch>
            </v-flex>
            <v-flex xs8>
              <v-text-field
                v-model="formularioRegistro.reaccionesEnderezamiento.laberinticoText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-switch
                v-model="formularioRegistro.reaccionesEnderezamiento.sobreOjos"
                :label="$t('physiotherapy.straighteningReactionsOnEyes')"
              ></v-switch>
            </v-flex>
            <v-flex xs8>
              <v-text-field
                v-model="formularioRegistro.reaccionesEnderezamiento.sobreOjosText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">{{$t('physiotherapy.spontaneousMotorActivity')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="actividadMotrizDataPanel?minimize(8):maximize(8)">
            <v-icon>{{actividadMotrizDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="actividadMotrizDataPanel">
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field
                v-model="formularioRegistro.actividadMotoraEspontanea.decubitoDorsal"
                :label="$t('physiotherapy.dorsalDecubitus')"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="formularioRegistro.actividadMotoraEspontanea.decubitoVentral"
                :label="$t('physiotherapy.ventralDecubitus')"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="formularioRegistro.actividadMotoraEspontanea.cambioPosicion"
                :label="$t('physiotherapy.positionChanges')"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="formularioRegistro.actividadMotoraEspontanea.rolido"
                :label="$t('physiotherapy.rolido')"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="formularioRegistro.actividadMotoraEspontanea.arrastre"
                :label="$t('physiotherapy.drag')"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="formularioRegistro.actividadMotoraEspontanea.sedente"
                :label="$t('physiotherapy.sedentary')"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="formularioRegistro.actividadMotoraEspontanea.gateo"
                :label="$t('physiotherapy.crawl')"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="formularioRegistro.actividadMotoraEspontanea.arrodillado"
                :label="$t('physiotherapy.kneeBended')"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="formularioRegistro.actividadMotoraEspontanea.bipedo"
                :label="$t('physiotherapy.biped')"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">{{$t('psicomotricity.psychomotorEvaluation')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="evaluacionPsicomotorDataPanel?minimize(9):maximize(9)">
            <v-icon>{{evaluacionPsicomotorDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="evaluacionPsicomotorDataPanel">
          <v-layout row wrap>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('psicomotricity.bodyOutline')"
                v-model="formularioRegistro.evaluacionPsicomotriz.esquemaCorporal">
                <v-radio
                  key="structured"
                  :label="$t('physiotherapy.structured')"
                  value="structured"
                ></v-radio>
                <v-radio
                  key="inProgress"
                  :label="$t('physiotherapy.inProgress')"
                  value="inProgress"
                ></v-radio>
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.evaluacionPsicomotriz.esquemaCorporalText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('psicomotricity.bodyImage')"
                v-model="formularioRegistro.evaluacionPsicomotriz.imagenCorporal">
                <v-radio
                  key="structured"
                  :label="$t('physiotherapy.structured')"
                  value="structured"
                ></v-radio>
                <v-radio
                  key="inProgress"
                  :label="$t('physiotherapy.inProgress')"
                  value="inProgress"
                ></v-radio>
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.evaluacionPsicomotriz.imagenCorporalText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.corporalConcept')"
                v-model="formularioRegistro.evaluacionPsicomotriz.conceptoCorporal">
                <v-radio
                  key="structured"
                  :label="$t('physiotherapy.structured')"
                  value="structured"
                ></v-radio>
                <v-radio
                  key="inProgress"
                  :label="$t('physiotherapy.inProgress')"
                  value="inProgress"
                ></v-radio>
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.evaluacionPsicomotriz.conceptoCorporalText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.spatialEstructuration')"
                v-model="formularioRegistro.evaluacionPsicomotriz.estructuracionEspacial">
                <v-radio
                  key="structured"
                  :label="$t('physiotherapy.structured')"
                  value="structured"
                ></v-radio>
                <v-radio
                  key="inProgress"
                  :label="$t('physiotherapy.inProgress')"
                  value="inProgress"
                ></v-radio>
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.evaluacionPsicomotriz.estructuracionEspacialText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.temporalEstructuration')"
                v-model="formularioRegistro.evaluacionPsicomotriz.estructuracionTemporal">
                <v-radio
                  key="structured"
                  :label="$t('physiotherapy.structured')"
                  value="structured"
                ></v-radio>
                <v-radio
                  key="inProgress"
                  :label="$t('physiotherapy.inProgress')"
                  value="inProgress"
                ></v-radio>
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.evaluacionPsicomotriz.estructuracionTemporalText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('psicomotricity.staticBalance')"
                v-model="formularioRegistro.evaluacionPsicomotriz.equilibrioEstatico">
                <v-radio
                  key="good"
                  :label="$t('physiotherapy.good')"
                  value="good"
                ></v-radio>
                <v-radio
                  key="deficient"
                  :label="$t('physiotherapy.deficient')"
                  value="deficient"
                ></v-radio>
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.evaluacionPsicomotriz.equilibrioEstaticoText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.dinamicBalance')"
                v-model="formularioRegistro.evaluacionPsicomotriz.equilibrioDinamico">
                <v-radio
                  key="good"
                  :label="$t('physiotherapy.good')"
                  value="good"
                ></v-radio>
                <v-radio
                  key="deficient"
                  :label="$t('physiotherapy.deficient')"
                  value="deficient"
                ></v-radio>
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.evaluacionPsicomotriz.equilibrioDinamicoText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.thickCoordination')"
                v-model="formularioRegistro.evaluacionPsicomotriz.coordinacionGruesa">
                <v-radio
                  key="good"
                  :label="$t('physiotherapy.good')"
                  value="good"
                ></v-radio>
                <v-radio
                  key="deficient"
                  :label="$t('physiotherapy.deficient')"
                  value="deficient"
                ></v-radio>
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.evaluacionPsicomotriz.coordinacionGruesaText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.thinCoordination')"
                v-model="formularioRegistro.evaluacionPsicomotriz.coordinacionFina">
                <v-radio
                  key="good"
                  :label="$t('physiotherapy.good')"
                  value="good"
                ></v-radio>
                <v-radio
                  key="deficient"
                  :label="$t('physiotherapy.deficient')"
                  value="deficient"
                ></v-radio>
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.evaluacionPsicomotriz.coordinacionFinaText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.eyeHandCoordination')"
                v-model="formularioRegistro.evaluacionPsicomotriz.coordinacionOjoMano">
                <v-radio
                  key="good"
                  :label="$t('physiotherapy.good')"
                  value="good"
                ></v-radio>
                <v-radio
                  key="deficient"
                  :label="$t('physiotherapy.deficient')"
                  value="deficient"
                ></v-radio>
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.evaluacionPsicomotriz.coordinacionOjoManoText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.eyeFeetCoordination')"
                v-model="formularioRegistro.evaluacionPsicomotriz.coordinacionOjoPie">
                <v-radio
                  key="good"
                  :label="$t('physiotherapy.good')"
                  value="good"
                ></v-radio>
                <v-radio
                  key="deficient"
                  :label="$t('physiotherapy.deficient')"
                  value="deficient"
                ></v-radio>
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.evaluacionPsicomotriz.coordinacionOjoPieText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs5></v-flex>
            <v-flex xs4>
              <v-combobox
                v-model="formularioRegistro.evaluacionPsicomotriz.lateralidad"
                :filter="filter"
                :hide-no-data="!familyTypeSearch"
                :items="familyTypeItems"
                :search-input.sync="familyTypeSearch"
                hide-selected
                :label="$t('psicomotricity.laterality')"
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
            <v-flex xs8>
              <v-textarea
                :label="$t('generalFollowUp.observation')"
                v-model="formularioRegistro.evaluacionPsicomotriz.observacion"
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
          <h2 class="headline mb-0">{{$t('physiotherapy.dailyLifeActivities')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="actividadesDiariasDataPanel?minimize(10):maximize(10)">
            <v-icon>{{actividadesDiariasDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="actividadesDiariasDataPanel">
          <v-layout row wrap>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.hygiene')"
                v-model="formularioRegistro.actividadesVidaDiaria.higiene">
                <v-radio
                  key="independent"
                  :label="$t('physiotherapy.independent')"
                  value="independent"
                ></v-radio>
                <v-radio
                  key="withHelp"
                  :label="$t('physiotherapy.withHelp')"
                  value="withHelp"
                ></v-radio>
                <v-radio
                  key="dependent"
                  :label="$t('physiotherapy.dependent')"
                  value="dependent"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.actividadesVidaDiaria.higieneText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.feeding')"
                v-model="formularioRegistro.actividadesVidaDiaria.alimentacion">
                <v-radio
                  key="independent"
                  :label="$t('physiotherapy.independent')"
                  value="independent"
                ></v-radio>
                <v-radio
                  key="withHelp"
                  :label="$t('physiotherapy.withHelp')"
                  value="withHelp"
                ></v-radio>
                <v-radio
                  key="dependent"
                  :label="$t('physiotherapy.dependent')"
                  value="dependent"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.actividadesVidaDiaria.alimentacionText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.clothing')"
                v-model="formularioRegistro.actividadesVidaDiaria.vestimenta">
                <v-radio
                  key="independent"
                  :label="$t('physiotherapy.independent')"
                  value="independent"
                ></v-radio>
                <v-radio
                  key="withHelp"
                  :label="$t('physiotherapy.withHelp')"
                  value="withHelp"
                ></v-radio>
                <v-radio
                  key="dependent"
                  :label="$t('physiotherapy.dependent')"
                  value="dependent"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.actividadesVidaDiaria.vestimentaText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">{{$t('psicomotricity.socioAffectiveArea')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="areaSocioAfectivaDataPanel?minimize(11):maximize(11)">
            <v-icon>{{areaSocioAfectivaDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="areaSocioAfectivaDataPanel">
          <v-layout row wrap>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.affectivePattern')"
                v-model="formularioRegistro.areaSocioAfectiva.muestrasAfectivas">
                <v-radio
                  key="present"
                  :label="$t('physiotherapy.present')"
                  value="present"
                ></v-radio>
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
                <v-radio
                  key="deficient"
                  :label="$t('physiotherapy.deficient')"
                  value="deficient"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.areaSocioAfectiva.muestrasAfectivasText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.oralCommunication')"
                v-model="formularioRegistro.areaSocioAfectiva.comunicacionOral">
                <v-radio
                  key="present"
                  :label="$t('physiotherapy.present')"
                  value="present"
                ></v-radio>
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
                <v-radio
                  key="deficient"
                  :label="$t('physiotherapy.deficient')"
                  value="deficient"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.areaSocioAfectiva.comunicacionOralText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.alternateCommunication')"
                v-model="formularioRegistro.areaSocioAfectiva.comunicacionAlternativa">
                <v-radio
                  key="present"
                  :label="$t('physiotherapy.present')"
                  value="present"
                ></v-radio>
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
                <v-radio
                  key="deficient"
                  :label="$t('physiotherapy.deficient')"
                  value="deficient"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.areaSocioAfectiva.comunicacionAlternativaText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.socialRelationship')"
                v-model="formularioRegistro.areaSocioAfectiva.relacionamientoSocial">
                <v-radio
                  key="present"
                  :label="$t('physiotherapy.present')"
                  value="present"
                ></v-radio>
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
                <v-radio
                  key="deficient"
                  :label="$t('physiotherapy.deficient')"
                  value="deficient"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.areaSocioAfectiva.relacionamientoSocialText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">{{$t('psicomotricity.cognitiveArea')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="areaCognitivaDataPanel?minimize(12):maximize(12)">
            <v-icon>{{areaCognitivaDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="areaCognitivaDataPanel">
          <v-layout row wrap>
            <v-flex xs4>
              <v-radio-group 
                :label="$t('psicomotricity.cognitiveArea')"
                v-model="formularioRegistro.areaCognitiva">
                <v-radio
                  key="collaborate"
                  :label="$t('physiotherapy.collaborate')"
                  value="collaborate"
                ></v-radio>
                <v-radio
                  key="doesntCollaborate"
                  :label="$t('physiotherapy.doesntCollaborate')"
                  value="doesntCollaborate"
                ></v-radio>
                <v-radio
                  key="understand"
                  :label="$t('physiotherapy.understand')"
                  value="understand"
                ></v-radio>
                <v-radio
                  key="doesntUnderstand"
                  :label="$t('physiotherapy.doesntUnderstand')"
                  value="doesntUnderstand"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs7>
              <v-text-field
                v-model="formularioRegistro.areaCognitivaText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">{{$t('physiotherapy.associatedAlterations')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="alteracionAsociadaDataPanel?minimize(13):maximize(13)">
            <v-icon>{{alteracionAsociadaDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="alteracionAsociadaDataPanel">
          <v-layout row wrap>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.vision')"
                v-model="formularioRegistro.alteracionesAsociadas.vision">
                <v-radio
                  key="normal"
                  :label="$t('physiotherapy.normal')"
                  value="normal"
                ></v-radio>
                <v-radio
                  key="altered"
                  :label="$t('physiotherapy.altered')"
                  value="altered"
                ></v-radio>
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.alteracionesAsociadas.visionText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.audition')"
                v-model="formularioRegistro.alteracionesAsociadas.audicion">
                <v-radio
                  key="normal"
                  :label="$t('physiotherapy.normal')"
                  value="normal"
                ></v-radio>
                <v-radio
                  key="hearingLoss"
                  :label="$t('physiotherapy.hearingLoss')"
                  value="hearingLoss"
                ></v-radio>
                <v-radio
                  key="deafness"
                  :label="$t('physiotherapy.deafness')"
                  value="deafness"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.alteracionesAsociadas.audicionText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('occupationalTherapy.language')"
                v-model="formularioRegistro.alteracionesAsociadas.lenguaje">
                <v-radio
                  key="normal"
                  :label="$t('physiotherapy.normal')"
                  value="normal"
                ></v-radio>
                <v-radio
                  key="understandable"
                  :label="$t('physiotherapy.understandable')"
                  value="understandable"
                ></v-radio>
                <v-radio
                  key="notUnderstandable"
                  :label="$t('physiotherapy.notUnderstandable')"
                  value="notUnderstandable"
                ></v-radio>
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
                <v-radio
                  key="alternative"
                  :label="$t('physiotherapy.alternative')"
                  value="alternative"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.alteracionesAsociadas.lenguajeText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.convulsiveSyndrome')"
                v-model="formularioRegistro.alteracionesAsociadas.sindromeConvulsivo">
                <v-radio
                  key="absent"
                  :label="$t('physiotherapy.absent')"
                  value="absent"
                ></v-radio>
                <v-radio
                  key="present"
                  :label="$t('physiotherapy.present')"
                  value="present"
                ></v-radio>
                <v-radio
                  key="withTreatment"
                  :label="$t('physiotherapy.withTreatment')"
                  value="withTreatment"
                ></v-radio>
                <v-radio
                  key="withoutTreatment"
                  :label="$t('physiotherapy.withoutTreatment')"
                  value="withoutTreatment"
                ></v-radio>
                <!-- <v-radio
                  key="type"
                  :label="$t('physiotherapy.type')"
                  value="type"
                ></v-radio> -->
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.alteracionesAsociadas.sindromeConvulsivoText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.longTermMemory')"
                v-model="formularioRegistro.alteracionesAsociadas.memoriaLargoPlazo">
                <v-radio
                  key="good"
                  :label="$t('physiotherapy.good')"
                  value="good"
                ></v-radio>
                <v-radio
                  key="regular"
                  :label="$t('physiotherapy.regular')"
                  value="regular"
                ></v-radio>
                <v-radio
                  key="bad"
                  :label="$t('physiotherapy.bad')"
                  value="bad"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.alteracionesAsociadas.memoriaLargoPlazoText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.shortTermMemory')"
                v-model="formularioRegistro.alteracionesAsociadas.memoriaCortoPlazo">
                <v-radio
                  key="good"
                  :label="$t('physiotherapy.good')"
                  value="good"
                ></v-radio>
                <v-radio
                  key="regular"
                  :label="$t('physiotherapy.regular')"
                  value="regular"
                ></v-radio>
                <v-radio
                  key="bad"
                  :label="$t('physiotherapy.bad')"
                  value="bad"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.alteracionesAsociadas.memoriaCortoPlazoText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.emotionalStatus')"
                v-model="formularioRegistro.alteracionesAsociadas.estadoEmocional">
                <v-radio
                  key="stable"
                  :label="$t('physiotherapy.stable')"
                  value="stable"
                ></v-radio>
                <v-radio
                  key="quiet"
                  :label="$t('physiotherapy.quiet')"
                  value="quiet"
                ></v-radio>
                <v-radio
                  key="changing"
                  :label="$t('physiotherapy.changing')"
                  value="changing"
                ></v-radio>
                <v-radio
                  key="aggressive"
                  :label="$t('physiotherapy.aggressive')"
                  value="aggressive"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.alteracionesAsociadas.estadoEmocionalText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.nutritionalStatus')"
                v-model="formularioRegistro.alteracionesAsociadas.estadoNutricional">
                <v-radio
                  key="normal"
                  :label="$t('physiotherapy.normal')"
                  value="normal"
                ></v-radio>
                <v-radio
                  key="overweight"
                  :label="$t('physiotherapy.overweight')"
                  value="overweight"
                ></v-radio>
                <v-radio
                  key="obesity"
                  :label="$t('physiotherapy.obesity')"
                  value="obesity"
                ></v-radio>
                <v-radio
                  key="undernourished"
                  :label="$t('physiotherapy.undernourished')"
                  value="undernourished"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.alteracionesAsociadas.estadoNutricionalText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-radio-group 
                :label="$t('physiotherapy.sensitivity')"
                v-model="formularioRegistro.alteracionesAsociadas.sensibilidad">
                <v-radio
                  key="normal"
                  :label="$t('physiotherapy.normal')"
                  value="normal"
                ></v-radio>
                <v-radio
                  key="hyposensitive"
                  :label="$t('physiotherapy.hyposensitive')"
                  value="hyposensitive"
                ></v-radio>
                <v-radio
                  key="hypersensitive"
                  :label="$t('physiotherapy.hypersensitive')"
                  value="hypersensitive"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.alteracionesAsociadas.sensibilidadText"
                :hint="$t('generalFollowUp.observation')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs5>
              <v-text-field
                v-model="formularioRegistro.alteracionesAsociadas.estereotipos"
                :label="$t('physiotherapy.esteriotypes')"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">{{$t('physiotherapy.conclusions')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="conclusionesDataPanel?minimize(14):maximize(14)">
            <v-icon>{{conclusionesDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="conclusionesDataPanel">
          <v-layout row wrap>
            <v-flex xs12>
              <v-textarea
                :label="$t('physiotherapy.conclusions')"
                v-model="formularioRegistro.conclusiones"
                :error="$v.formularioRegistro.observacionGrupoFamiliar.$error"
                @input="$v.formularioRegistro.observacionGrupoFamiliar.$touch()"
                :error-messages="errors.observacionGrupoFamiliar"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('physiotherapy.diagnosis')"
                v-model="formularioRegistro.diagnostico"
                :error="$v.formularioRegistro.observacionGrupoFamiliar.$error"
                @input="$v.formularioRegistro.observacionGrupoFamiliar.$touch()"
                :error-messages="errors.observacionGrupoFamiliar"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <h3 class="headline mb-0">{{$t('physiotherapy.treatment')}}</h3>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('physiotherapy.objectives')"
                v-model="formularioRegistro.objetivos"
                :error="$v.formularioRegistro.observacionGrupoFamiliar.$error"
                @input="$v.formularioRegistro.observacionGrupoFamiliar.$touch()"
                :error-messages="errors.observacionGrupoFamiliar"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('physiotherapy.treatmentPlan')"
                v-model="formularioRegistro.planTratamiento"
                :error="$v.formularioRegistro.observacionGrupoFamiliar.$error"
                @input="$v.formularioRegistro.observacionGrupoFamiliar.$touch()"
                :error-messages="errors.observacionGrupoFamiliar"
                counter
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-container fluid>
            <v-layout row wrap>
              <v-spacer></v-spacer>
              <v-flex 4>
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
    <v-layout row>
      <v-dialog v-model="ashworthView">
        <v-card>
          <v-card-title class="headline">
            <v-icon right>account_circle</v-icon>
            {{$t('physiotherapy.modifiedAshworthScale')}}
          </v-card-title>
          <v-layout row>
            <v-flex xs8 offset-xs2>
              <table>
                <tr>
                  <td>0</td>
                  <td>{{$t('physiotherapy.ashworthOption1')}}</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>{{$t('physiotherapy.ashworthOption2')}}</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>{{$t('physiotherapy.ashworthOption3')}}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>{{$t('physiotherapy.ashworthOption4')}}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>{{$t('physiotherapy.ashworthOption5')}}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>{{$t('physiotherapy.ashworthOption6')}}</td>
                </tr>
              </table>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="true" class="seccion" dark @click.native="ashworthView = false">{{$t('common.close')}}
              <v-icon right>cancel</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
  // import { required } from 'vuelidate/lib/validators';
  import errorsHandler from '@/common/mixins/errorsHandler';
  import FamilyMember from '@/common/util/FamilyMember.vue';
  import StudentData from '@/common/util/StudentData.vue';
  import Comps from '../comps';
  /* eslint-disable semi */
  export default {
    mixins: [ Comps, errorsHandler ],
    data () {
      return {
        headers: {'access-token': '<your-token>'},
        motivoConsultaDataPanel: true,
        antecedenteEnfermedadDataPanel: true,
        antecedenteGestacionalDataPanel: true,
        posturaFísicaDataPanel: true,
        ashworthScaleDataPanel: true,
        reflejosDataPanel: true,
        reaccionEnderezamientoDataPanel: true,
        actividadMotrizDataPanel: true,
        evaluacionPsicomotorDataPanel: true,
        actividadesDiariasDataPanel: true,
        areaSocioAfectivaDataPanel: true,
        areaCognitivaDataPanel: true,
        alteracionAsociadaDataPanel: true,
        conclusionesDataPanel: true,
        fechaCreacion: new Date(),
        ashworthView: false,
        datosEstudiante: {},
        formularioRegistro: {
          diagnosticoMedico: '',
          motivoConsulta: '',
          antecedentesEnfermedadActual: '',
          antecedentesGestacionales: {
            numeroEmbarazo: '',
            numeroHijos: '',
            controlPrenatal: false,
            hospital: '',
            problemasDuranteEmbarazo: '',
            tiempoGestacional: '',
            parto: '',
            tipoParto: '',
            posicion: '',
            llanto: '',
            movimientos: false,
            cianosis: false,
            oxigeno: false,
            incubadora: false,
            tiempoIncubadora: '',
            otros: ''
          },
          exploracionPosturalFisica: {
            planoAnterior: '',
            planoPosterior: '',
            planoLateral: '',
            otros: '',
            tipoRespiracion: '',
            patronRespiracion: '',
            marcha: '',
            pruebaOrtopedica: {
              thomas: '',
              galeazi: '',
              ober: '',
              ortolani: '',
              barlow: '',
              asimetriaPliegues: '',
              otros: ''
            },
            tono: '',
            trofismo: ''
          },
          escalaAshworth: '',
          reflejos: {
            suctionReflection: false,
            suctionReflectionText: '',
            TRIPLEEXTFLX: false,
            TRIPLEEXTFLXText: '',
            RTCA: false,
            RTCAText: '',
            RTCS: false,
            RTCSText: '',
            RTL: false,
            RTLText: '',
            RMORO: false,
            RMOROText: '',
            RBABINSKI: false,
            RBABINSKIText: '',
            REXTCRUZADA: false,
            REXTCRUZADAText: '',
            GALANT: false,
            GALANTText: '',
            LANDAU: false,
            LANDAUText: '',
            DEFENSA: false,
            DEFENSAText: '',
            RPALMAR: false,
            RPALMARText: '',
            RPLANTAR: false,
            RPLANTARText: '',
            RPOSITIVODEAPOYO: false,
            RPOSITIVODEAPOYOText: '',
            RPARACAIDAS: false,
            RPARACAIDASText: ''
          },
          reaccionesEnderezamiento: {
            laberintico: false,
            laberinticoText: '',
            sobreOjos: false,
            sobreOjosText: ''
          },
          actividadMotoraEspontanea: {
            decubitoDorsal: '',
            decubitoVentral: '',
            cambioPosicion: '',
            rolido: '',
            arrastre: '',
            sedente: '',
            gateo: '',
            arrodillado: '',
            bipedo: ''
          },
          evaluacionPsicomotriz: {
            esquemaCorporal: false,
            esquemaCorporalText: '',
            imagenCorporal: false,
            imagenCorporalText: '',
            conceptoCorporal: false,
            conceptoCorporalText: '',
            estructuracionEspacial: false,
            estructuracionEspacialText: '',
            estructuracionTemporal: false,
            estructuracionTemporalText: '',
            equilibrioEstatico: false,
            equilibrioEstaticoText: '',
            equilibrioDinamico: false,
            equilibrioDinamicoText: '',
            coordinacionGruesa: false,
            coordinacionGruesaText: '',
            coordinacionFina: false,
            coordinacionFinaText: '',
            coordinacionOjoMano: false,
            coordinacionOjoManoText: '',
            coordinacionOjoPie: false,
            coordinacionOjoPieText: '',
            lateralidad: '',
            observacion: ''
          },
          actividadesVidaDiaria: {
            higiene: false,
            higieneText: '',
            alimentacion: false,
            alimentacionText: '',
            vestimenta: false,
            vestimentaText: ''
          },
          areaSocioAfectiva: {
            muestrasAfectivas: false,
            muestrasAfectivasText: '',
            comunicacionOral: false,
            comunicacionOralText: '',
            comunicacionAlternativa: false,
            comunicacionAlternativaText: '',
            relacionamientoSocial: false,
            relacionamientoSocialText: ''
          },
          areaCognitiva: '',
          areaCognitivaText: '',
          alteracionesAsociadas: {
            vision: '',
            visionText: '',
            audicion: '',
            audicionText: '',
            lenguaje: '',
            lenguajeText: '',
            sindromeConvulsivo: '',
            sindromeConvulsivoText: '',
            memoriaLargoPlazo: '',
            memoriaLargoPlazoText: '',
            memoriaCortoPlazo: '',
            memoriaCortoPlazoText: '',
            estadoEmocional: '',
            estadoEmocionalText: '',
            estadoNutricional: '',
            estadoNutricionalText: '',
            sensibilidad: '',
            sensibilidadText: '',
            estereotipos: ''
          },
          conclusiones: '',
          diagnostico: '',
          objetivos: '',
          planTratamiento: ''
        },
        errors: {
          // tipoDeFamiliaObject: [],
          // observacionGrupoFamiliar: [],
          // dinamicaFamiliar: [],
          // procesoSocial: [],
          // relatoDiscapacidad: [],
          // diagnosticoSocial: [],
          // conclusionSugerencia: []
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
      'family-members': FamilyMember,
      'student-data': StudentData
    },
    watch: {
      // 'formularioRegistro.tipoDeFamiliaObject': function (val, prev) {
      //   if (typeof this.formularioRegistro.tipoDeFamiliaObject === 'string') {
      //     this.formularioRegistro.tipoDeFamiliaObject = {
      //       text: this.formularioRegistro.tipoDeFamiliaObject,
      //       color: this.colors[this.nonce - 1]
      //     };
      //     this.familyTypeItems.push(this.formularioRegistro.tipoDeFamilia);
      //     this.nonce++;
      //   }
      //   // this.formRelative.civil_state = this.formularioRegistro.tipoDeFamilia.text;
      //   return this.formularioRegistro.tipoDeFamiliaObject;
      // },
      // '$v.formularioRegistro.tipoDeFamiliaObject.$error': function (val) {
      //   this.errorHandler(this.$v.formularioRegistro.tipoDeFamiliaObject, this.errors.tipoDeFamiliaObject);
      // },
      // '$v.formularioRegistro.observacionGrupoFamiliar.$error': function (val) {
      //   this.errorHandler(this.$v.formularioRegistro.observacionGrupoFamiliar, this.errors.observacionGrupoFamiliar);
      // },
      // '$v.formularioRegistro.dinamicaFamiliar.$error': function (val) {
      //   this.errorHandler(this.$v.formularioRegistro.dinamicaFamiliar, this.errors.dinamicaFamiliar);
      // },
      // '$v.formularioRegistro.procesoSocial.$error': function (val) {
      //   this.errorHandler(this.$v.formularioRegistro.procesoSocial, this.errors.procesoSocial);
      // },
      // '$v.formularioRegistro.relatoDiscapacidad.$error': function (val) {
      //   this.errorHandler(this.$v.formularioRegistro.relatoDiscapacidad, this.errors.relatoDiscapacidad);
      // },
      // '$v.formularioRegistro.diagnosticoSocial.$error': function (val) {
      //   this.errorHandler(this.$v.formularioRegistro.diagnosticoSocial, this.errors.diagnosticoSocial);
      // },
      // '$v.formularioRegistro.conclusionSugerencia.$error': function (val) {
      //   this.errorHandler(this.$v.formularioRegistro.conclusionSugerencia, this.errors.conclusionSugerencia);
      // }
    },
    created () {
      this.headers = {'Authorization': `Bearer ${this.$storage.get('token')}`};
      this.datosEstudiante = this.$storage.get('nino');
      if (this.$route.query.registro) {
        const physiotherapyAux = this.$store.state.physiotherapyRegisterEdit.reg_ft;
        this.formularioRegistro.diagnosticoMedico = physiotherapyAux.diagnosticoMedico ? physiotherapyAux.diagnosticoMedico : null;
        this.formularioRegistro.motivoConsulta = physiotherapyAux.motivoConsulta ? physiotherapyAux.motivoConsulta : null;
        this.formularioRegistro.antecedentesEnfermedadActual = physiotherapyAux.antecedentesEnfermedadActual ? physiotherapyAux.antecedentesEnfermedadActual : null;
        this.formularioRegistro.antecedentesGestacionales.numeroEmbarazo = physiotherapyAux.ag_numeroEmbarazo ? physiotherapyAux.ag_numeroEmbarazo : null;
        this.formularioRegistro.antecedentesGestacionales.numeroHijos = physiotherapyAux.ag_numeroHijos ? physiotherapyAux.ag_numeroHijos : null;
        this.formularioRegistro.antecedentesGestacionales.controlPrenatal = physiotherapyAux.ag_controlPrenatal ? physiotherapyAux.ag_controlPrenatal : null;
        this.formularioRegistro.antecedentesGestacionales.hospital = physiotherapyAux.ag_hospital ? physiotherapyAux.ag_hospital : null;
        this.formularioRegistro.antecedentesGestacionales.problemasDuranteEmbarazo = physiotherapyAux.ag_problemasDuranteEmbarazo ? physiotherapyAux.ag_problemasDuranteEmbarazo : null;
        this.formularioRegistro.antecedentesGestacionales.tiempoGestacional = physiotherapyAux.ag_tiempoGestacional ? physiotherapyAux.ag_tiempoGestacional : null;
        this.formularioRegistro.antecedentesGestacionales.parto = physiotherapyAux.ag_parto ? physiotherapyAux.ag_parto : null;
        this.formularioRegistro.antecedentesGestacionales.tipoParto = physiotherapyAux.ag_tipoParto ? physiotherapyAux.ag_tipoParto : null;
        this.formularioRegistro.antecedentesGestacionales.posicion = physiotherapyAux.ag_posicion ? {
          text: physiotherapyAux.ag_posicion,
          color: this.colors[this.nonce - 1]} : null;
        this.formularioRegistro.antecedentesGestacionales.llanto = physiotherapyAux.ag_llanto ? physiotherapyAux.ag_llanto : null;
        this.formularioRegistro.antecedentesGestacionales.movimientos = physiotherapyAux.ag_movimientos ? physiotherapyAux.ag_movimientos : null;
        this.formularioRegistro.antecedentesGestacionales.cianosis = physiotherapyAux.ag_cianosis ? physiotherapyAux.ag_cianosis : null;
        this.formularioRegistro.antecedentesGestacionales.oxigeno = physiotherapyAux.ag_oxigeno ? physiotherapyAux.ag_oxigeno : null;
        this.formularioRegistro.antecedentesGestacionales.incubadora = physiotherapyAux.ag_incubadora ? physiotherapyAux.ag_incubadora : null;
        this.formularioRegistro.antecedentesGestacionales.tiempoIncubadora = physiotherapyAux.ag_tiempoIncubadora ? physiotherapyAux.ag_tiempoIncubadora : null;
        this.formularioRegistro.antecedentesGestacionales.otros = physiotherapyAux.ag_otros ? physiotherapyAux.ag_otros : null;
        this.formularioRegistro.exploracionPosturalFisica.planoAnterior = physiotherapyAux.epf_planoAnterior ? physiotherapyAux.epf_planoAnterior : null;
        this.formularioRegistro.exploracionPosturalFisica.planoPosterior = physiotherapyAux.epf_planoPosterior ? physiotherapyAux.epf_planoPosterior : null;
        this.formularioRegistro.exploracionPosturalFisica.planoLateral = physiotherapyAux.epf_planoLateral ? physiotherapyAux.epf_planoLateral : null;
        this.formularioRegistro.exploracionPosturalFisica.otros = physiotherapyAux.epf_otros ? physiotherapyAux.epf_otros : null;
        this.formularioRegistro.exploracionPosturalFisica.tipoRespiracion = physiotherapyAux.epf_tipoRespiracion ? physiotherapyAux.epf_tipoRespiracion : null;
        this.formularioRegistro.exploracionPosturalFisica.patronRespiracion = physiotherapyAux.epf_patronRespiracion ? physiotherapyAux.epf_patronRespiracion : null;
        this.formularioRegistro.exploracionPosturalFisica.marcha = physiotherapyAux.epf_marcha ? physiotherapyAux.epf_marcha : null;
        this.formularioRegistro.exploracionPosturalFisica.pruebaOrtopedica.thomas = physiotherapyAux.epf_Po_thomas ? physiotherapyAux.epf_Po_thomas : null;
        this.formularioRegistro.exploracionPosturalFisica.pruebaOrtopedica.galeazi = physiotherapyAux.epf_Po_galeazi ? physiotherapyAux.epf_Po_galeazi : null;
        this.formularioRegistro.exploracionPosturalFisica.pruebaOrtopedica.ober = physiotherapyAux.epf_Po_ober ? physiotherapyAux.epf_Po_ober : null;
        this.formularioRegistro.exploracionPosturalFisica.pruebaOrtopedica.ortolani = physiotherapyAux.epf_Po_ortolani ? physiotherapyAux.epf_Po_ortolani : null;
        this.formularioRegistro.exploracionPosturalFisica.pruebaOrtopedica.barlow = physiotherapyAux.epf_Po_barlow ? physiotherapyAux.epf_Po_barlow : null;
        this.formularioRegistro.exploracionPosturalFisica.pruebaOrtopedica.asimetriaPliegues = physiotherapyAux.epf_Po_asimetriaPliegues ? physiotherapyAux.epf_Po_asimetriaPliegues : null;
        this.formularioRegistro.exploracionPosturalFisica.pruebaOrtopedica.otros = physiotherapyAux.epf_Po_otros ? physiotherapyAux.epf_Po_otros : null;
        this.formularioRegistro.exploracionPosturalFisica.tono = physiotherapyAux.epf_tono ? physiotherapyAux.epf_tono : null;
        this.formularioRegistro.exploracionPosturalFisica.trofismo = physiotherapyAux.epf_trofismo ? physiotherapyAux.epf_trofismo : null;
        this.formularioRegistro.escalaAshworth = physiotherapyAux.escalaAshworth ? physiotherapyAux.escalaAshworth : null;
        this.formularioRegistro.reflejos.suctionReflection = physiotherapyAux.ref_suctionReflection ? physiotherapyAux.ref_suctionReflection : null;
        this.formularioRegistro.reflejos.suctionReflectionText = physiotherapyAux.ref_suctionReflectionText ? physiotherapyAux.ref_suctionReflectionText : null;
        this.formularioRegistro.reflejos.TRIPLEEXTFLX = physiotherapyAux.ref_TRIPLEEXTFLX ? physiotherapyAux.ref_TRIPLEEXTFLX : null;
        this.formularioRegistro.reflejos.TRIPLEEXTFLXText = physiotherapyAux.ref_TRIPLEEXTFLXText ? physiotherapyAux.ref_TRIPLEEXTFLXText : null;
        this.formularioRegistro.reflejos.RTCA = physiotherapyAux.ref_RTCA ? physiotherapyAux.ref_RTCA : null;
        this.formularioRegistro.reflejos.RTCAText = physiotherapyAux.ref_RTCAText ? physiotherapyAux.ref_RTCAText : null;
        this.formularioRegistro.reflejos.RTCS = physiotherapyAux.ref_RTCS ? physiotherapyAux.ref_RTCS : null;
        this.formularioRegistro.reflejos.RTCSText = physiotherapyAux.ref_RTCSText ? physiotherapyAux.ref_RTCSText : null;
        this.formularioRegistro.reflejos.RTL = physiotherapyAux.ref_RTL ? physiotherapyAux.ref_RTL : null;
        this.formularioRegistro.reflejos.RTLText = physiotherapyAux.ref_RTLText ? physiotherapyAux.ref_RTLText : null;
        this.formularioRegistro.reflejos.RMORO = physiotherapyAux.ref_RMORO ? physiotherapyAux.ref_RMORO : null;
        this.formularioRegistro.reflejos.RMOROText = physiotherapyAux.ref_RMOROText ? physiotherapyAux.ref_RMOROText : null;
        this.formularioRegistro.reflejos.RBABINSKI = physiotherapyAux.ref_RBABINSKI ? physiotherapyAux.ref_RBABINSKI : null;
        this.formularioRegistro.reflejos.RBABINSKIText = physiotherapyAux.ref_RBABINSKIText ? physiotherapyAux.ref_RBABINSKIText : null;
        this.formularioRegistro.reflejos.REXTCRUZADA = physiotherapyAux.ref_REXTCRUZADA ? physiotherapyAux.ref_REXTCRUZADA : null;
        this.formularioRegistro.reflejos.REXTCRUZADAText = physiotherapyAux.ref_REXTCRUZADAText ? physiotherapyAux.ref_REXTCRUZADAText : null;
        this.formularioRegistro.reflejos.GALANT = physiotherapyAux.ref_GALANT ? physiotherapyAux.ref_GALANT : null;
        this.formularioRegistro.reflejos.GALANTText = physiotherapyAux.ref_GALANTText ? physiotherapyAux.ref_GALANTText : null;
        this.formularioRegistro.reflejos.LANDAU = physiotherapyAux.ref_LANDAU ? physiotherapyAux.ref_LANDAU : null;
        this.formularioRegistro.reflejos.LANDAUText = physiotherapyAux.ref_LANDAUText ? physiotherapyAux.ref_LANDAUText : null;
        this.formularioRegistro.reflejos.DEFENSA = physiotherapyAux.ref_DEFENSA ? physiotherapyAux.ref_DEFENSA : null;
        this.formularioRegistro.reflejos.DEFENSAText = physiotherapyAux.ref_DEFENSAText ? physiotherapyAux.ref_DEFENSAText : null;
        this.formularioRegistro.reflejos.RPALMAR = physiotherapyAux.ref_RPALMAR ? physiotherapyAux.ref_RPALMAR : null;
        this.formularioRegistro.reflejos.RPALMARText = physiotherapyAux.ref_RPALMARText ? physiotherapyAux.ref_RPALMARText : null;
        this.formularioRegistro.reflejos.RPLANTAR = physiotherapyAux.ref_RPLANTAR ? physiotherapyAux.ref_RPLANTAR : null;
        this.formularioRegistro.reflejos.RPLANTARText = physiotherapyAux.ref_RPLANTARText ? physiotherapyAux.ref_RPLANTARText : null;
        this.formularioRegistro.reflejos.RPOSITIVODEAPOYO = physiotherapyAux.ref_RPOSITIVODEAPOYO ? physiotherapyAux.ref_RPOSITIVODEAPOYO : null;
        this.formularioRegistro.reflejos.RPOSITIVODEAPOYOText = physiotherapyAux.ref_RPOSITIVODEAPOYOText ? physiotherapyAux.ref_RPOSITIVODEAPOYOText : null;
        this.formularioRegistro.reflejos.RPARACAIDAS = physiotherapyAux.ref_RPARACAIDAS ? physiotherapyAux.ref_RPARACAIDAS : null;
        this.formularioRegistro.reflejos.RPARACAIDASText = physiotherapyAux.ref_RPARACAIDASText ? physiotherapyAux.ref_RPARACAIDASText : null;
        this.formularioRegistro.reaccionesEnderezamiento.laberintico = physiotherapyAux.re_laberintico ? physiotherapyAux.re_laberintico : null;
        this.formularioRegistro.reaccionesEnderezamiento.laberinticoText = physiotherapyAux.re_laberinticoText ? physiotherapyAux.re_laberinticoText : null;
        this.formularioRegistro.reaccionesEnderezamiento.sobreOjos = physiotherapyAux.re_sobreOjos ? physiotherapyAux.re_sobreOjos : null;
        this.formularioRegistro.reaccionesEnderezamiento.sobreOjosText = physiotherapyAux.re_sobreOjosText ? physiotherapyAux.re_sobreOjosText : null;
        this.formularioRegistro.actividadMotoraEspontanea.decubitoDorsal = physiotherapyAux.ame_decubitoDorsal ? physiotherapyAux.ame_decubitoDorsal : null;
        this.formularioRegistro.actividadMotoraEspontanea.decubitoVentral = physiotherapyAux.ame_decubitoVentral ? physiotherapyAux.ame_decubitoVentral : null;
        this.formularioRegistro.actividadMotoraEspontanea.cambioPosicion = physiotherapyAux.ame_cambioPosicion ? physiotherapyAux.ame_cambioPosicion : null;
        this.formularioRegistro.actividadMotoraEspontanea.rolido = physiotherapyAux.ame_rolido ? physiotherapyAux.ame_rolido : null;
        this.formularioRegistro.actividadMotoraEspontanea.arrastre = physiotherapyAux.ame_arrastre ? physiotherapyAux.ame_arrastre : null;
        this.formularioRegistro.actividadMotoraEspontanea.sedente = physiotherapyAux.ame_sedente ? physiotherapyAux.ame_sedente : null;
        this.formularioRegistro.actividadMotoraEspontanea.gateo = physiotherapyAux.ame_gateo ? physiotherapyAux.ame_gateo : null;
        this.formularioRegistro.actividadMotoraEspontanea.arrodillado = physiotherapyAux.ame_arrodillado ? physiotherapyAux.ame_arrodillado : null;
        this.formularioRegistro.actividadMotoraEspontanea.bipedo = physiotherapyAux.ame_bipedo ? physiotherapyAux.ame_bipedo : null;
        this.formularioRegistro.evaluacionPsicomotriz.esquemaCorporal = physiotherapyAux.ep_esquemaCorporal ? physiotherapyAux.ep_esquemaCorporal : null;
        this.formularioRegistro.evaluacionPsicomotriz.esquemaCorporalText = physiotherapyAux.ep_esquemaCorporalText ? physiotherapyAux.ep_esquemaCorporalText : null;
        this.formularioRegistro.evaluacionPsicomotriz.imagenCorporal = physiotherapyAux.ep_imagenCorporal ? physiotherapyAux.ep_imagenCorporal : null;
        this.formularioRegistro.evaluacionPsicomotriz.imagenCorporalText = physiotherapyAux.ep_imagenCorporalText ? physiotherapyAux.ep_imagenCorporalText : null;
        this.formularioRegistro.evaluacionPsicomotriz.conceptoCorporal = physiotherapyAux.ep_conceptoCorporal ? physiotherapyAux.ep_conceptoCorporal : null;
        this.formularioRegistro.evaluacionPsicomotriz.conceptoCorporalText = physiotherapyAux.ep_conceptoCorporalText ? physiotherapyAux.ep_conceptoCorporalText : null;
        this.formularioRegistro.evaluacionPsicomotriz.estructuracionEspacial = physiotherapyAux.ep_estructuracionEspacial ? physiotherapyAux.ep_estructuracionEspacial : null;
        this.formularioRegistro.evaluacionPsicomotriz.estructuracionEspacialText = physiotherapyAux.ep_estructuracionEspacialText ? physiotherapyAux.ep_estructuracionEspacialText : null;
        this.formularioRegistro.evaluacionPsicomotriz.estructuracionTemporal = physiotherapyAux.ep_estructuracionTemporal ? physiotherapyAux.ep_estructuracionTemporal : null;
        this.formularioRegistro.evaluacionPsicomotriz.estructuracionTemporalText = physiotherapyAux.ep_estructuracionTemporalText ? physiotherapyAux.ep_estructuracionTemporalText : null;
        this.formularioRegistro.evaluacionPsicomotriz.equilibrioEstatico = physiotherapyAux.ep_equilibrioEstatico ? physiotherapyAux.ep_equilibrioEstatico : null;
        this.formularioRegistro.evaluacionPsicomotriz.equilibrioEstaticoText = physiotherapyAux.ep_equilibrioEstaticoText ? physiotherapyAux.ep_equilibrioEstaticoText : null;
        this.formularioRegistro.evaluacionPsicomotriz.equilibrioDinamico = physiotherapyAux.ep_equilibrioDinamico ? physiotherapyAux.ep_equilibrioDinamico : null;
        this.formularioRegistro.evaluacionPsicomotriz.equilibrioDinamicoText = physiotherapyAux.ep_equilibrioDinamicoText ? physiotherapyAux.ep_equilibrioDinamicoText : null;
        this.formularioRegistro.evaluacionPsicomotriz.coordinacionGruesa = physiotherapyAux.ep_coordinacionGruesa ? physiotherapyAux.ep_coordinacionGruesa : null;
        this.formularioRegistro.evaluacionPsicomotriz.coordinacionGruesaText = physiotherapyAux.ep_coordinacionGruesaText ? physiotherapyAux.ep_coordinacionGruesaText : null;
        this.formularioRegistro.evaluacionPsicomotriz.coordinacionFina = physiotherapyAux.ep_coordinacionFina ? physiotherapyAux.ep_coordinacionFina : null;
        this.formularioRegistro.evaluacionPsicomotriz.coordinacionFinaText = physiotherapyAux.ep_coordinacionFinaText ? physiotherapyAux.ep_coordinacionFinaText : null;
        this.formularioRegistro.evaluacionPsicomotriz.coordinacionOjoMano = physiotherapyAux.ep_coordinacionOjoMano ? physiotherapyAux.ep_coordinacionOjoMano : null;
        this.formularioRegistro.evaluacionPsicomotriz.coordinacionOjoManoText = physiotherapyAux.ep_coordinacionOjoManoText ? physiotherapyAux.ep_coordinacionOjoManoText : null;
        this.formularioRegistro.evaluacionPsicomotriz.coordinacionOjoPie = physiotherapyAux.ep_coordinacionOjoPie ? physiotherapyAux.ep_coordinacionOjoPie : null;
        this.formularioRegistro.evaluacionPsicomotriz.coordinacionOjoPieText = physiotherapyAux.ep_coordinacionOjoPieText ? physiotherapyAux.ep_coordinacionOjoPieText : null;
        this.formularioRegistro.evaluacionPsicomotriz.lateralidad = physiotherapyAux.ep_lateralidad ? {
          text: physiotherapyAux.ep_lateralidad,
          color: this.colors[this.nonce - 1]} : null;
        this.formularioRegistro.evaluacionPsicomotriz.observacion = physiotherapyAux.ep_observacion ? physiotherapyAux.ep_observacion : null;
        this.formularioRegistro.actividadesVidaDiaria.higiene = physiotherapyAux.avd_higiene ? physiotherapyAux.avd_higiene : null;
        this.formularioRegistro.actividadesVidaDiaria.higieneText = physiotherapyAux.avd_higieneText ? physiotherapyAux.avd_higieneText : null;
        this.formularioRegistro.actividadesVidaDiaria.alimentacion = physiotherapyAux.avd_alimentacion ? physiotherapyAux.avd_alimentacion : null;
        this.formularioRegistro.actividadesVidaDiaria.alimentacionText = physiotherapyAux.avd_alimentacionText ? physiotherapyAux.avd_alimentacionText : null;
        this.formularioRegistro.actividadesVidaDiaria.vestimenta = physiotherapyAux.avd_vestimenta ? physiotherapyAux.avd_vestimenta : null;
        this.formularioRegistro.actividadesVidaDiaria.vestimentaText = physiotherapyAux.avd_vestimentaText ? physiotherapyAux.avd_vestimentaText : null;
        this.formularioRegistro.areaSocioAfectiva.muestrasAfectivas = physiotherapyAux.asa_muestrasAfectivas ? physiotherapyAux.asa_muestrasAfectivas : null;
        this.formularioRegistro.areaSocioAfectiva.muestrasAfectivasText = physiotherapyAux.asa_muestrasAfectivasText ? physiotherapyAux.asa_muestrasAfectivasText : null;
        this.formularioRegistro.areaSocioAfectiva.comunicacionOral = physiotherapyAux.asa_comunicacionOral ? physiotherapyAux.asa_comunicacionOral : null;
        this.formularioRegistro.areaSocioAfectiva.comunicacionOralText = physiotherapyAux.asa_comunicacionOralText ? physiotherapyAux.asa_comunicacionOralText : null;
        this.formularioRegistro.areaSocioAfectiva.comunicacionAlternativa = physiotherapyAux.asa_comunicacionAlternativa ? physiotherapyAux.asa_comunicacionAlternativa : null;
        this.formularioRegistro.areaSocioAfectiva.comunicacionAlternativaText = physiotherapyAux.asa_comunicacionAlternativaText ? physiotherapyAux.asa_comunicacionAlternativaText : null;
        this.formularioRegistro.areaSocioAfectiva.relacionamientoSocial = physiotherapyAux.asa_relacionamientoSocial ? physiotherapyAux.asa_relacionamientoSocial : null;
        this.formularioRegistro.areaSocioAfectiva.relacionamientoSocialText = physiotherapyAux.asa_relacionamientoSocialText ? physiotherapyAux.asa_relacionamientoSocialText : null;
        this.formularioRegistro.areaCognitiva = physiotherapyAux.areaCognitiva ? physiotherapyAux.areaCognitiva : null;
        this.formularioRegistro.areaCognitivaText = physiotherapyAux.areaCognitivaText ? physiotherapyAux.areaCognitivaText : null;
        this.formularioRegistro.alteracionesAsociadas.vision = physiotherapyAux.aa_vision ? physiotherapyAux.aa_vision : null;
        this.formularioRegistro.alteracionesAsociadas.visionText = physiotherapyAux.aa_visionText ? physiotherapyAux.aa_visionText : null;
        this.formularioRegistro.alteracionesAsociadas.audicion = physiotherapyAux.aa_audicion ? physiotherapyAux.aa_audicion : null;
        this.formularioRegistro.alteracionesAsociadas.audicionText = physiotherapyAux.aa_audicionText ? physiotherapyAux.aa_audicionText : null;
        this.formularioRegistro.alteracionesAsociadas.lenguaje = physiotherapyAux.aa_lenguaje ? physiotherapyAux.aa_lenguaje : null;
        this.formularioRegistro.alteracionesAsociadas.lenguajeText = physiotherapyAux.aa_lenguajeText ? physiotherapyAux.aa_lenguajeText : null;
        this.formularioRegistro.alteracionesAsociadas.sindromeConvulsivo = physiotherapyAux.aa_sindromeConvulsivo ? physiotherapyAux.aa_sindromeConvulsivo : null;
        this.formularioRegistro.alteracionesAsociadas.sindromeConvulsivoText = physiotherapyAux.aa_sindromeConvulsivoText ? physiotherapyAux.aa_sindromeConvulsivoText : null;
        this.formularioRegistro.alteracionesAsociadas.memoriaLargoPlazo = physiotherapyAux.aa_memoriaLargoPlazo ? physiotherapyAux.aa_memoriaLargoPlazo : null;
        this.formularioRegistro.alteracionesAsociadas.memoriaLargoPlazoText = physiotherapyAux.aa_memoriaLargoPlazoText ? physiotherapyAux.aa_memoriaLargoPlazoText : null;
        this.formularioRegistro.alteracionesAsociadas.memoriaCortoPlazo = physiotherapyAux.aa_memoriaCortoPlazo ? physiotherapyAux.aa_memoriaCortoPlazo : null;
        this.formularioRegistro.alteracionesAsociadas.memoriaCortoPlazoText = physiotherapyAux.aa_memoriaCortoPlazoText ? physiotherapyAux.aa_memoriaCortoPlazoText : null;
        this.formularioRegistro.alteracionesAsociadas.estadoEmocional = physiotherapyAux.aa_estadoEmocional ? physiotherapyAux.aa_estadoEmocional : null;
        this.formularioRegistro.alteracionesAsociadas.estadoEmocionalText = physiotherapyAux.aa_estadoEmocionalText ? physiotherapyAux.aa_estadoEmocionalText : null;
        this.formularioRegistro.alteracionesAsociadas.estadoNutricional = physiotherapyAux.aa_estadoNutricional ? physiotherapyAux.aa_estadoNutricional : null;
        this.formularioRegistro.alteracionesAsociadas.estadoNutricionalText = physiotherapyAux.aa_estadoNutricionalText ? physiotherapyAux.aa_estadoNutricionalText : null;
        this.formularioRegistro.alteracionesAsociadas.sensibilidad = physiotherapyAux.aa_sensibilidad ? physiotherapyAux.aa_sensibilidad : null;
        this.formularioRegistro.alteracionesAsociadas.sensibilidadText = physiotherapyAux.aa_sensibilidadText ? physiotherapyAux.aa_sensibilidadText : null;
        this.formularioRegistro.alteracionesAsociadas.estereotipos = physiotherapyAux.aa_estereotipos ? physiotherapyAux.aa_estereotipos : null;
        this.formularioRegistro.conclusiones = physiotherapyAux.conclusiones ? physiotherapyAux.conclusiones : null;
        this.formularioRegistro.diagnostico = physiotherapyAux.diagnostico ? physiotherapyAux.diagnostico : null;
        this.formularioRegistro.objetivos = physiotherapyAux.objetivos ? physiotherapyAux.objetivos : null;
        this.formularioRegistro.planTratamiento = physiotherapyAux.planTratamiento ? physiotherapyAux.planTratamiento : null;
        // this.fechaCreacion = this.$store.state.physiotherapyRegisterEdit._fecha_creacion;
      }
    },
    validations: {
      formularioRegistro: {
        tipoDeFamiliaObject: {},
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
          case 1:
            this.motivoConsultaDataPanel = false;
            break;
          case 2:
            this.antecedenteEnfermedadDataPanel = false;
            break;
          case 3:
            this.antecedenteGestacionalDataPanel = false;
            break;
          case 4:
            this.posturaFísicaDataPanel = false;
            break;
          case 5:
            this.ashworthScaleDataPanel = false;
            break;
          case 6:
            this.reflejosDataPanel = false;
            break;
          case 7:
            this.reaccionEnderezamientoDataPanel = false;
            break;
          case 8:
            this.actividadMotrizDataPanel = false;
            break;
          case 9:
            this.evaluacionPsicomotorDataPanel = false;
            break;
          case 10:
            this.actividadesDiariasDataPanel = false;
            break;
          case 11:
            this.areaSocioAfectivaDataPanel = false;
            break;
          case 12:
            this.areaCognitivaDataPanel = false;
            break;
          case 13:
            this.alteracionAsociadaDataPanel = false;
            break;
          case 14:
            this.conclusionesDataPanel = false;
            break;
          default:
            break;
        }
      },
      maximize (cardNumber) {
        switch (cardNumber) {
          case 1:
            this.motivoConsultaDataPanel = true;
            break;
          case 2:
            this.antecedenteEnfermedadDataPanel = true;
            break;
          case 3:
            this.antecedenteGestacionalDataPanel = true;
            break;
          case 4:
            this.posturaFísicaDataPanel = true;
            break;
          case 5:
            this.ashworthScaleDataPanel = true;
            break;
          case 6:
            this.reflejosDataPanel = true;
            break;
          case 7:
            this.reaccionEnderezamientoDataPanel = true;
            break;
          case 8:
            this.actividadMotrizDataPanel = true;
            break;
          case 9:
            this.evaluacionPsicomotorDataPanel = true;
            break;
          case 10:
            this.actividadesDiariasDataPanel = true;
            break;
          case 11:
            this.areaSocioAfectivaDataPanel = true;
            break;
          case 12:
            this.areaCognitivaDataPanel = true;
            break;
          case 13:
            this.alteracionAsociadaDataPanel = true;
            break;
          case 14:
            this.conclusionesDataPanel = true;
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
          this.formularioRegistro.antecedentesGestacionales.posicion = this.formularioRegistro.antecedentesGestacionales.posicion.text;
          this.formularioRegistro.evaluacionPsicomotriz.lateralidad = this.formularioRegistro.evaluacionPsicomotriz.lateralidad.text;
          if (this.$route.query.registro) {
            // Edita registro Simple
            this.formularioRegistro.idRegistro = this.$route.query.registro;
            this.formularioRegistro.idRegistroFisioterapia = this.$store.state.physiotherapyRegisterEdit.reg_ft.id_reg_ft;
            this.$service.put(`registroEvalFisioterapia`, this.formularioRegistro)
            .then(respuesta => {
              if (respuesta !== undefined) {
                this.limpiarCampos();
                this.$message.success(this.$t('generalFollowUp.registerEditionSuccessfull'));
                this.$router.push('registrosArchivados');
              } else {
                this.$message.error(this.$t('generalFollowUp.registerEditionUnsuccessfull'));
              }
            })
            .catch(() => {
              this.$message.error(this.$t('generalFollowUp.registerEditionUnsuccessfull'));
            });
          } else {
            // Crea registro simple
            this.formularioRegistro.codigoEstudiante = this.datosEstudiante.codigo;
            this.$service.post(`registroEvalFisioterapia`, this.formularioRegistro)
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
        // this.formularioRegistro.tipoDeFamilia = '';
        // this.formularioRegistro.tipoDeFamiliaObject = {};
        // this.formularioRegistro.observacionGrupoFamiliar = '';
        // this.formularioRegistro.dinamicaFamiliar = '';
        // this.formularioRegistro.procesoSocial = '';
        // this.formularioRegistro.relatoDiscapacidad = '';
        // this.formularioRegistro.diagnosticoSocial = '';
        // this.formularioRegistro.conclusionSugerencia = '';
      },
      openView (numeroImagen) {
        this.ashworthView = true;
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
      }
    }
  }
</script>
