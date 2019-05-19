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
                  key="initial"
                  :label="$t('physiotherapy.cesarean')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.eutocic')"
                  value="elementary"
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
            <v-flex xs4>
              <v-radio-group 
                :label="$t('physiotherapy.cry')"
                v-model="formularioRegistro.antecedentesGestacionales.llanto">
                <v-radio
                  key="initial"
                  :label="$t('physiotherapy.immediate')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.belated')"
                  value="elementary"
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
              <v-text-field
                :label="$t('physiotherapy.modifiedAshworthScale')"
                v-model="formularioRegistro.escalaAshworth"
              ></v-text-field>
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
                  key="initial"
                  :label="$t('physiotherapy.structured')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.inProgress')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.absent')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.structured')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.inProgress')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.absent')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.structured')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.inProgress')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.absent')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.structured')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.inProgress')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.absent')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.structured')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.inProgress')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.absent')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.good')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.deficient')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.absent')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.good')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.deficient')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.absent')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.good')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.deficient')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.absent')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.good')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.deficient')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.absent')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.good')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.deficient')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.absent')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.good')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.deficient')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.absent')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.independent')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.withHelp')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.dependent')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.independent')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.withHelp')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.dependent')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.independent')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.withHelp')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.dependent')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.present')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.absent')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.deficient')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.present')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.absent')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.deficient')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.present')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.absent')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.deficient')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.present')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.absent')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.deficient')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.collaborate')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.doesntCollaborate')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.understand')"
                  value="mature"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.doesntUnderstand')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.normal')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.altered')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.absent')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.normal')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.hearingLoss')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.deafness')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.normal')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.understandable')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.notUnderstandable')"
                  value="mature"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.absent')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.alternative')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.absent')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.present')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.withTreatment')"
                  value="mature"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.withoutTreatment')"
                  value="mature"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.type')"
                  value="mature"
                ></v-radio>
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
                  key="initial"
                  :label="$t('physiotherapy.good')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.regular')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.bad')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.good')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.regular')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.bad')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.stable')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.quiet')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.changing')"
                  value="mature"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.aggressive')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.normal')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="initial"
                  :label="$t('physiotherapy.overweight')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.obesity')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.undernourished')"
                  value="mature"
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
                  key="initial"
                  :label="$t('physiotherapy.normal')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('physiotherapy.hyposensitive')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('physiotherapy.hypersensitive')"
                  value="mature"
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
  import { required } from 'vuelidate/lib/validators';
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
      'family-members': FamilyMember,
      'student-data': StudentData
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
          this.formularioRegistro.tipoDeFamilia = this.formularioRegistro.tipoDeFamiliaObject.text;
          if (this.$route.query.registro) {
            // Edita registro Simple
            this.formularioRegistro.idRegistro = this.$route.query.registro;
            this.formularioRegistro.idRegistroTrabajoSocial = this.$store.state.socialWorkRegisterEdit.registro_eval_trabajo_social.id_registro_eval_trabajo_social;
            this.$service.put(`registroEvalTrabajoSocial`, this.formularioRegistro)
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
          this.$router.push('busquedaNino');
        } else {
          this.$message.error(this.$t('error.wrongUrl'));
        }
      }
    }
  }
</script>
