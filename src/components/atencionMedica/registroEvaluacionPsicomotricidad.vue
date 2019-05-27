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
          <h2 class="headline mb-0">I. {{$t('psicomotricity.anamnesis')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="anamnesisDataPanel?minimize(1):maximize(1)">
            <v-icon>{{anamnesisDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="anamnesisDataPanel">
          <v-layout row wrap>
            <v-flex xs12>
              <family-members :studentCode="datosEstudiante.codigo" :createRelation="false" :editRelation="false"></family-members>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('psicomotricity.familyBackground')"
                v-model="formularioRegistro.anamnesia.antecedentesFamiliares"
                :error="$v.formularioRegistro.observacionGrupoFamiliar.$error"
                @input="$v.formularioRegistro.observacionGrupoFamiliar.$touch()"
                :error-messages="errors.observacionGrupoFamiliar"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('psicomotricity.pathologicalBackground')"
                v-model="formularioRegistro.anamnesia.antecedentesPatologicos"
                :error="$v.formularioRegistro.observacionGrupoFamiliar.$error"
                @input="$v.formularioRegistro.observacionGrupoFamiliar.$touch()"
                :error-messages="errors.observacionGrupoFamiliar"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <h3 class="headline mb-0">{{$t('psicomotricity.gynecologicalBackground')}}</h3>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('psicomotricity.perinatal')"
                v-model="formularioRegistro.anamnesia.perinatal"
                :error="$v.formularioRegistro.observacionGrupoFamiliar.$error"
                @input="$v.formularioRegistro.observacionGrupoFamiliar.$touch()"
                :error-messages="errors.observacionGrupoFamiliar"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('psicomotricity.prenatal')"
                v-model="formularioRegistro.anamnesia.prenatal"
                :error="$v.formularioRegistro.observacionGrupoFamiliar.$error"
                @input="$v.formularioRegistro.observacionGrupoFamiliar.$touch()"
                :error-messages="errors.observacionGrupoFamiliar"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('psicomotricity.postnatal')"
                v-model="formularioRegistro.anamnesia.postnatal"
                :error="$v.formularioRegistro.observacionGrupoFamiliar.$error"
                @input="$v.formularioRegistro.observacionGrupoFamiliar.$touch()"
                :error-messages="errors.observacionGrupoFamiliar"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <h3 class="headline mb-0">{{$t('psicomotricity.developmentBackground')}}</h3>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                :label="$t('psicomotricity.cephalicControl')"
                v-model="formularioRegistro.anamnesia.controlCefálico"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                :label="$t('psicomotricity.sitting')"
                v-model="formularioRegistro.anamnesia.Sedestación"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                :label="$t('psicomotricity.drag')"
                v-model="formularioRegistro.anamnesia.Arrastre"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                :label="$t('psicomotricity.crawl')"
                v-model="formularioRegistro.anamnesia.Gateo"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                :label="$t('psicomotricity.standing')"
                v-model="formularioRegistro.anamnesia.Bipedestación"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                :label="$t('psicomotricity.walk')"
                v-model="formularioRegistro.anamnesia.Marcha"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('psicomotricity.consultationReason')"
                v-model="formularioRegistro.anamnesia.razonConsulta"
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
          <h2 class="headline mb-0">II. {{$t('psicomotricity.psicomotrizEvaluation')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="evaluationDataPanel?minimize(2):maximize(2)">
            <v-icon>{{evaluationDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="evaluationDataPanel">
          <v-layout row wrap>
            <v-flex xs3>
              Edad
            </v-flex>
            <v-flex xs3>
              Motor
            </v-flex>
            <v-flex xs3>
              Cognitivo
            </v-flex>
            <v-flex xs3>
              Socio - Afectivo
            </v-flex>
            <v-flex xs3>
              0 - 3 meses
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.headUpright"
                :label="$t('psicomotricity.headUpright')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.movesHead"
                :label="$t('psicomotricity.movesHead')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.holdsObjects"
                :label="$t('psicomotricity.holdsObjects')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.playsFeetAndHands"
                :label="$t('psicomotricity.playsFeetAndHands')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.locateSounds"
                :label="$t('psicomotricity.locateSounds')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.babbles"
                :label="$t('psicomotricity.babbles')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.gutturalSounds"
                :label="$t('psicomotricity.gutturalSounds')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.stimulusSmile"
                :label="$t('psicomotricity.stimulusSmile')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.recognicesMother"
                :label="$t('psicomotricity.recognicesMother')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.mouthSounds"
                :label="$t('psicomotricity.mouthSounds')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              3 - 6 meses
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.liftHead"
                :label="$t('psicomotricity.liftHead')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.ulnaChange"
                :label="$t('psicomotricity.ulnaChange')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.picksCloseObjects"
                :label="$t('psicomotricity.picksCloseObjects')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.makesSounds"
                :label="$t('psicomotricity.makesSounds')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.callsForAttention"
                :label="$t('psicomotricity.callsForAttention')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.repeatsSyllables"
                :label="$t('psicomotricity.repeatsSyllables')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.smilesToExtrangers"
                :label="$t('psicomotricity.smilesToExtrangers')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.recognicesCaretaker"
                :label="$t('psicomotricity.recognicesCaretaker')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              6 - 9 meses
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.sitsWithoutSupport"
                :label="$t('psicomotricity.sitsWithoutSupport')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.drags"
                :label="$t('psicomotricity.drags')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.picksAndHitsObjects"
                :label="$t('psicomotricity.picksAndHitsObjects')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.takesFoodToMouth"
                :label="$t('psicomotricity.takesFoodToMouth')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.likesSongs"
                :label="$t('psicomotricity.likesSongs')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.searchsSounds"
                :label="$t('psicomotricity.searchsSounds')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.recognicesObjects"
                :label="$t('psicomotricity.recognicesObjects')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.criesBeforeExtrangers"
                :label="$t('psicomotricity.criesBeforeExtrangers')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.imitatesMovements"
                :label="$t('psicomotricity.imitatesMovements')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              9 - 12 meses
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.sitsWithSupport"
                :label="$t('psicomotricity.sitsWithSupport')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.crawl"
                :label="$t('psicomotricity.crawl')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.discoversObjects"
                :label="$t('psicomotricity.discoversObjects')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.walksWithSupport"
                :label="$t('psicomotricity.walksWithSupport')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.wordsWithMeaning"
                :label="$t('psicomotricity.wordsWithMeaning')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.embraceAdultChild"
                :label="$t('psicomotricity.embraceAdultChild')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.answersToName"
                :label="$t('psicomotricity.answersToName')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.meetsSimpleOrders"
                :label="$t('psicomotricity.meetsSimpleOrders')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              24 - 30 meses
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.jumpsWithBothFeet"
                :label="$t('psicomotricity.jumpsWithBothFeet')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.throwsBall"
                :label="$t('psicomotricity.throwsBall')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.UndressHimself"
                :label="$t('psicomotricity.UndressHimself')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.useForkCup"
                :label="$t('psicomotricity.useForkCup')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.makesNounVerbPhrases"
                :label="$t('psicomotricity.makesNounVerbPhrases')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.useNegatives"
                :label="$t('psicomotricity.useNegatives')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.answerQuestions"
                :label="$t('psicomotricity.answerQuestions')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.bigAndSmallDifferences"
                :label="$t('psicomotricity.bigAndSmallDifferences')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.singChildrenSongs"
                :label="$t('psicomotricity.singChildrenSongs')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.exploreEnvironment"
                :label="$t('psicomotricity.exploreEnvironment')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.recognicesPhotographs"
                :label="$t('psicomotricity.recognicesPhotographs')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.playsSmallGroups"
                :label="$t('psicomotricity.playsSmallGroups')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.greetsOnCommand"
                :label="$t('psicomotricity.greetsOnCommand')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              30 - 36 meses
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.performManualActivities"
                :label="$t('psicomotricity.performManualActivities')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.runsJumps"
                :label="$t('psicomotricity.runsJumps')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.copyLinesAndCircles"
                :label="$t('psicomotricity.copyLinesAndCircles')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.identifiesEspatialConcepts"
                :label="$t('psicomotricity.identifiesEspatialConcepts')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.acknowledgeHisSex"
                :label="$t('psicomotricity.acknowledgeHisSex')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.gerundPluralArticleDifference"
                :label="$t('psicomotricity.gerundPluralArticleDifference')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.articlePhonemes"
                :label="$t('psicomotricity.articlePhonemes')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.gestureCommunication"
                :label="$t('psicomotricity.gestureCommunication')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.talksFirstPerson"
                :label="$t('psicomotricity.talksFirstPerson')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.useOralLanguage"
                :label="$t('psicomotricity.useOralLanguage')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.showsPersonalPreferences"
                :label="$t('psicomotricity.showsPersonalPreferences')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.likesChildAndAnimals"
                :label="$t('psicomotricity.likesChildAndAnimals')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.evaluacionPsicomotriz.joinsSmallTeams"
                :label="$t('psicomotricity.joinsSmallTeams')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs12>
              <h3 class="headline mb-0">{{$t('psicomotricity.motorArea')}}</h3>
            </v-flex>
            <v-flex xs12>
              <h4 class="headline mb-0">{{$t('psicomotricity.movementPatterns')}}</h4>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.run')"
                v-model="formularioRegistro.areaMotora.run">
                <v-radio
                  key="initial"
                  :label="$t('psicomotricity.initial')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('psicomotricity.elementary')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('psicomotricity.mature')"
                  value="mature"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.jump')"
                v-model="formularioRegistro.areaMotora.jump">
                <v-radio
                  key="initial"
                  :label="$t('psicomotricity.initial')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('psicomotricity.elementary')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('psicomotricity.mature')"
                  value="mature"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.throw')"
                v-model="formularioRegistro.areaMotora.throw">
                <v-radio
                  key="initial"
                  :label="$t('psicomotricity.initial')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('psicomotricity.elementary')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('psicomotricity.mature')"
                  value="mature"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.kick')"
                v-model="formularioRegistro.areaMotora.kick">
                <v-radio
                  key="initial"
                  :label="$t('psicomotricity.initial')"
                  value="initial"
                ></v-radio>
                <v-radio
                  key="elementary"
                  :label="$t('psicomotricity.elementary')"
                  value="elementary"
                ></v-radio>
                <v-radio
                  key="mature"
                  :label="$t('psicomotricity.mature')"
                  value="mature"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12>
              <h4 class="headline mb-0">{{$t('psicomotricity.thickMotricity')}}</h4>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.staticDinamicBalance')"
                v-model="formularioRegistro.areaMotora.staticDinamicBalance">
                <v-radio
                  key="achievement"
                  :label="$t('psicomotricity.achievement')"
                  value="achievement"
                ></v-radio>
                <v-radio
                  key="process"
                  :label="$t('psicomotricity.process')"
                  value="process"
                ></v-radio>
                <v-radio
                  key="start"
                  :label="$t('psicomotricity.start')"
                  value="start"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.staticBalance')"
                v-model="formularioRegistro.areaMotora.staticBalance">
                <v-radio
                  key="achievement"
                  :label="$t('psicomotricity.achievement')"
                  value="achievement"
                ></v-radio>
                <v-radio
                  key="process"
                  :label="$t('psicomotricity.process')"
                  value="process"
                ></v-radio>
                <v-radio
                  key="start"
                  :label="$t('psicomotricity.start')"
                  value="start"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.partialDisociation')"
                v-model="formularioRegistro.areaMotora.partialDisociation">
                <v-radio
                  key="achievement"
                  :label="$t('psicomotricity.achievement')"
                  value="achievement"
                ></v-radio>
                <v-radio
                  key="process"
                  :label="$t('psicomotricity.process')"
                  value="process"
                ></v-radio>
                <v-radio
                  key="start"
                  :label="$t('psicomotricity.start')"
                  value="start"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.generalCoordination')"
                v-model="formularioRegistro.areaMotora.generalCoordination">
                <v-radio
                  key="achievement"
                  :label="$t('psicomotricity.achievement')"
                  value="achievement"
                ></v-radio>
                <v-radio
                  key="process"
                  :label="$t('psicomotricity.process')"
                  value="process"
                ></v-radio>
                <v-radio
                  key="start"
                  :label="$t('psicomotricity.start')"
                  value="start"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12>
              <h4 class="headline mb-0">{{$t('psicomotricity.laterality')}}</h4>
            </v-flex>
            <v-flex xs3>
              <h5 class="headline mb-0">{{$t('psicomotricity.eye')}}</h5>
              <v-checkbox
                v-model="formularioRegistro.areaMotora.eye.right"
                :label="$t('occupationalTherapy.right')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.areaMotora.eye.left"
                :label="$t('occupationalTherapy.left')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <h5 class="headline mb-0">{{$t('psicomotricity.ear')}}</h5>
              <v-checkbox
                v-model="formularioRegistro.areaMotora.ear.right"
                :label="$t('occupationalTherapy.right')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.areaMotora.ear.left"
                :label="$t('occupationalTherapy.left')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3><h5 class="headline mb-0">{{$t('psicomotricity.hand')}}</h5>
              <v-checkbox
                v-model="formularioRegistro.areaMotora.hand.right"
                :label="$t('occupationalTherapy.right')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.areaMotora.hand.left"
                :label="$t('occupationalTherapy.left')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3><h5 class="headline mb-0">{{$t('psicomotricity.feet')}}</h5>
              <v-checkbox
                v-model="formularioRegistro.areaMotora.feet.right"
                :label="$t('occupationalTherapy.right')"
              ></v-checkbox>
              <v-checkbox
                v-model="formularioRegistro.areaMotora.feet.left"
                :label="$t('occupationalTherapy.left')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs12>
              <h4 class="headline mb-0">{{$t('psicomotricity.thinMotricity')}}</h4>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.scrash')"
                v-model="formularioRegistro.areaMotora.scrash">
                <v-radio
                  key="achievement"
                  :label="$t('psicomotricity.achievement')"
                  value="achievement"
                ></v-radio>
                <v-radio
                  key="process"
                  :label="$t('psicomotricity.process')"
                  value="process"
                ></v-radio>
                <v-radio
                  key="start"
                  :label="$t('psicomotricity.start')"
                  value="start"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.button')"
                v-model="formularioRegistro.areaMotora.button">
                <v-radio
                  key="achievement"
                  :label="$t('psicomotricity.achievement')"
                  value="achievement"
                ></v-radio>
                <v-radio
                  key="process"
                  :label="$t('psicomotricity.process')"
                  value="process"
                ></v-radio>
                <v-radio
                  key="start"
                  :label="$t('psicomotricity.start')"
                  value="start"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.cut')"
                v-model="formularioRegistro.areaMotora.cut">
                <v-radio
                  key="achievement"
                  :label="$t('psicomotricity.achievement')"
                  value="achievement"
                ></v-radio>
                <v-radio
                  key="process"
                  :label="$t('psicomotricity.process')"
                  value="process"
                ></v-radio>
                <v-radio
                  key="start"
                  :label="$t('psicomotricity.start')"
                  value="start"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.makeTower')"
                v-model="formularioRegistro.areaMotora.makeTower">
                <v-radio
                  key="achievement"
                  :label="$t('psicomotricity.achievement')"
                  value="achievement"
                ></v-radio>
                <v-radio
                  key="process"
                  :label="$t('psicomotricity.process')"
                  value="process"
                ></v-radio>
                <v-radio
                  key="start"
                  :label="$t('psicomotricity.start')"
                  value="start"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.threadingNeedle')"
                v-model="formularioRegistro.areaMotora.threadingNeedle">
                <v-radio
                  key="achievement"
                  :label="$t('psicomotricity.achievement')"
                  value="achievement"
                ></v-radio>
                <v-radio
                  key="process"
                  :label="$t('psicomotricity.process')"
                  value="process"
                ></v-radio>
                <v-radio
                  key="start"
                  :label="$t('psicomotricity.start')"
                  value="start"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('generalFollowUp.observation')"
                v-model="formularioRegistro.areaMotora.observaciones"
                :error="$v.formularioRegistro.observacionGrupoFamiliar.$error"
                @input="$v.formularioRegistro.observacionGrupoFamiliar.$touch()"
                :error-messages="errors.observacionGrupoFamiliar"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <h3 class="headline mb-0">{{$t('psicomotricity.cognitiveArea')}}</h3>
            </v-flex>
            <v-flex xs12>
              <h4 class="headline mb-0">{{$t('psicomotricity.bodyOutline')}}</h4>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.drawsHumanFigure')"
                v-model="formularioRegistro.areaCognitiva.drawsHumanFigure">
                <v-radio
                  key="achievement"
                  :label="$t('psicomotricity.achievement')"
                  value="achievement"
                ></v-radio>
                <v-radio
                  key="process"
                  :label="$t('psicomotricity.process')"
                  value="process"
                ></v-radio>
                <v-radio
                  key="start"
                  :label="$t('psicomotricity.start')"
                  value="start"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.nameHumanParts')"
                v-model="formularioRegistro.areaCognitiva.nameHumanParts">
                <v-radio
                  key="achievement"
                  :label="$t('psicomotricity.achievement')"
                  value="achievement"
                ></v-radio>
                <v-radio
                  key="process"
                  :label="$t('psicomotricity.process')"
                  value="process"
                ></v-radio>
                <v-radio
                  key="start"
                  :label="$t('psicomotricity.start')"
                  value="start"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.compleateHumanFigure')"
                v-model="formularioRegistro.areaCognitiva.compleateHumanFigure">
                <v-radio
                  key="achievement"
                  :label="$t('psicomotricity.achievement')"
                  value="achievement"
                ></v-radio>
                <v-radio
                  key="process"
                  :label="$t('psicomotricity.process')"
                  value="process"
                ></v-radio>
                <v-radio
                  key="start"
                  :label="$t('psicomotricity.start')"
                  value="start"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.bodyImage')"
                v-model="formularioRegistro.areaCognitiva.bodyImage">
                <v-radio
                  key="achievement"
                  :label="$t('psicomotricity.achievement')"
                  value="achievement"
                ></v-radio>
                <v-radio
                  key="process"
                  :label="$t('psicomotricity.process')"
                  value="process"
                ></v-radio>
                <v-radio
                  key="start"
                  :label="$t('psicomotricity.start')"
                  value="start"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs6 offset-xs3>
              <file-upload
                :url='formularioRegistro.areaCognitiva.urlPhoto'
                :thumb-url='thumbUrl'
                :headers="formularioRegistro.areaCognitiva.headersPhoto"
                @success="onSuccess"
                @error="onError"
                accept='.jpg'
                :btn-label="$t('psicomotricity.loadPhoto')"
                :btn-uploading-label="$t('psicomotricity.uploadingPhoto')">
              </file-upload>
            </v-flex>
            <v-flex xs12>
              <h3 class="headline mb-0">{{$t('psicomotricity.spatialNotions')}}</h3>
              <v-btn icon dark color="primary" @click.native="openView(0)">
                <v-icon>visibility</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs3>
              <v-switch
                v-model="formularioRegistro.areaCognitiva.arriba"
                :label="$t('spatialUbication.up')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-switch
                v-model="formularioRegistro.areaCognitiva.abajo"
                :label="$t('spatialUbication.down')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-switch
                v-model="formularioRegistro.areaCognitiva.delante"
                :label="$t('spatialUbication.front')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-switch
                v-model="formularioRegistro.areaCognitiva.detras"
                :label="$t('spatialUbication.back')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-switch
                v-model="formularioRegistro.areaCognitiva.dentro"
                :label="$t('spatialUbication.inside')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-switch
                v-model="formularioRegistro.areaCognitiva.fuera"
                :label="$t('spatialUbication.outside')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-switch
                v-model="formularioRegistro.areaCognitiva.izquierda"
                :label="$t('spatialUbication.left')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-switch
                v-model="formularioRegistro.areaCognitiva.derecha"
                :label="$t('spatialUbication.right')"
              ></v-switch>
            </v-flex>
            <v-flex xs12>
              <h3 class="headline mb-0">{{$t('psicomotricity.timeNotions')}}</h3>
            </v-flex>
            <v-flex xs1>
              <v-btn icon dark color="primary" @click.native="openView(1)">
                <v-icon>visibility</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs3>
              <v-switch
                v-model="formularioRegistro.areaCognitiva.inflaGlobo"
                :label="$t('psicomotricity.inflateBalloon')"
              ></v-switch>
            </v-flex>
            <v-flex xs1>
              <v-btn icon dark color="primary" @click.native="openView(2)">
                <v-icon>visibility</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs3>
              <v-switch
                v-model="formularioRegistro.areaCognitiva.encubaHuevos"
                :label="$t('psicomotricity.incubateEggs')"
              ></v-switch>
            </v-flex>
            <v-flex xs1>
              <v-btn icon dark color="primary" @click.native="openView(3)">
                <v-icon>visibility</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs3>
              <v-switch
                v-model="formularioRegistro.areaCognitiva.plantaFlores"
                :label="$t('psicomotricity.seedFlower')"
              ></v-switch>
            </v-flex>
            <v-flex xs12>
              <h3 class="headline mb-0">{{$t('psicomotricity.communication')}}</h3>
            </v-flex>
            <v-flex xs12>
              <h4 class="headline mb-0">{{$t('psicomotricity.prelinguisticLevel')}} 0 - 1 {{$t('common.year')}}</h4>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.undifferentiatedCrying"
                :label="$t('psicomotricity.undifferentiatedCrying')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.socialSmile"
                :label="$t('psicomotricity.socialSmile')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.vocalGame"
                :label="$t('psicomotricity.vocalGame')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.babbleReflection"
                :label="$t('psicomotricity.babbleReflection')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.gutturalSound"
                :label="$t('psicomotricity.gutturalSound')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.gestures"
                :label="$t('psicomotricity.gestures')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.phraseWord"
                :label="$t('psicomotricity.phraseWord')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs12>
              <h4 class="headline mb-0">{{$t('psicomotricity.linguisticLevel')}} 1 - 5 {{$t('common.years')}}</h4>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.intentionalSyllable"
                :label="$t('psicomotricity.intentionalSyllable')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.juxtaposedWord"
                :label="$t('psicomotricity.juxtaposedWord')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.simplePhrase"
                :label="$t('psicomotricity.simplePhrase')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.phraseWord"
                :label="$t('psicomotricity.phraseWord')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.languageInteriorization"
                :label="$t('psicomotricity.languageInteriorization')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.verbUse"
                :label="$t('psicomotricity.verbUse')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.waitTurn"
                :label="$t('psicomotricity.waitTurn')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.completePhrase"
                :label="$t('psicomotricity.completePhrase')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs12>
              <h4 class="headline mb-0">{{$t('psicomotricity.firstStage')}} 5 - 7 {{$t('common.years')}}</h4>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.gramaticalElemmentUse"
                :label="$t('psicomotricity.gramaticalElemmentUse')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.makeComplexeSentences"
                :label="$t('psicomotricity.makeComplexeSentences')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.fullfillComplexOrder"
                :label="$t('psicomotricity.fullfillComplexOrder')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.beginReadingWriting"
                :label="$t('psicomotricity.beginReadingWriting')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.usePreposition"
                :label="$t('psicomotricity.usePreposition')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.useAdjectives"
                :label="$t('psicomotricity.useAdjectives')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs12>
              <h4 class="headline mb-0">{{$t('psicomotricity.secondeStage')}} 7 - 12 {{$t('common.years')}}</h4>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.gramaticalElemmentUse"
                :label="$t('psicomotricity.gramaticalElemmentUse')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.slangLanguage"
                :label="$t('psicomotricity.slangLanguage')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.useAdjectivesAdverbs"
                :label="$t('psicomotricity.useAdjectivesAdverbs')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.fullfillComplexOrder"
                :label="$t('psicomotricity.fullfillComplexOrder')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.verbUse"
                :label="$t('psicomotricity.verbUse')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="formularioRegistro.areaCognitiva.fluidCommunication"
                :label="$t('psicomotricity.fluidCommunication')"
              ></v-checkbox>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('generalFollowUp.observation')"
                v-model="formularioRegistro.areaCognitiva.observaciones"
                :error="$v.formularioRegistro.observacionGrupoFamiliar.$error"
                @input="$v.formularioRegistro.observacionGrupoFamiliar.$touch()"
                :error-messages="errors.observacionGrupoFamiliar"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <h3 class="headline mb-0">{{$t('psicomotricity.socioAffectiveArea')}}</h3>
            </v-flex>
            <v-flex xs12>
              <h4 class="headline mb-0">{{$t('psicomotricity.attitudeBeforeGame')}}</h4>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.plays')"
                v-model="formularioRegistro.areaSocioAfectiva.plays">
                <v-radio
                  key="plays"
                  :label="$t('frecuency.always')"
                  value="plays"
                ></v-radio>
                <v-radio
                  key="proposeGame"
                  :label="$t('frecuency.frequently')"
                  value="proposeGame"
                ></v-radio>
                <v-radio
                  key="leaderInGames"
                  :label="$t('frecuency.ocasionally')"
                  value="leaderInGames"
                ></v-radio>
                <v-radio
                  key="acceptAnothersGame"
                  :label="$t('frecuency.never')"
                  value="acceptAnothersGame"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.proposeGame')"
                v-model="formularioRegistro.areaSocioAfectiva.proposeGame">
                <v-radio
                  key="plays"
                  :label="$t('frecuency.always')"
                  value="plays"
                ></v-radio>
                <v-radio
                  key="proposeGame"
                  :label="$t('frecuency.frequently')"
                  value="proposeGame"
                ></v-radio>
                <v-radio
                  key="leaderInGames"
                  :label="$t('frecuency.ocasionally')"
                  value="leaderInGames"
                ></v-radio>
                <v-radio
                  key="acceptAnothersGame"
                  :label="$t('frecuency.never')"
                  value="acceptAnothersGame"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.leaderInGames')"
                v-model="formularioRegistro.areaSocioAfectiva.leaderInGames">
                <v-radio
                  key="plays"
                  :label="$t('frecuency.always')"
                  value="plays"
                ></v-radio>
                <v-radio
                  key="proposeGame"
                  :label="$t('frecuency.frequently')"
                  value="proposeGame"
                ></v-radio>
                <v-radio
                  key="leaderInGames"
                  :label="$t('frecuency.ocasionally')"
                  value="leaderInGames"
                ></v-radio>
                <v-radio
                  key="acceptAnothersGame"
                  :label="$t('frecuency.never')"
                  value="acceptAnothersGame"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.acceptAnothersGame')"
                v-model="formularioRegistro.areaSocioAfectiva.acceptAnothersGame">
                <v-radio
                  key="plays"
                  :label="$t('frecuency.always')"
                  value="plays"
                ></v-radio>
                <v-radio
                  key="proposeGame"
                  :label="$t('frecuency.frequently')"
                  value="proposeGame"
                ></v-radio>
                <v-radio
                  key="leaderInGames"
                  :label="$t('frecuency.ocasionally')"
                  value="leaderInGames"
                ></v-radio>
                <v-radio
                  key="acceptAnothersGame"
                  :label="$t('frecuency.never')"
                  value="acceptAnothersGame"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('disability.other')"
                v-model="formularioRegistro.areaSocioAfectiva.otherGame">
                <v-radio
                  key="plays"
                  :label="$t('frecuency.always')"
                  value="plays"
                ></v-radio>
                <v-radio
                  key="proposeGame"
                  :label="$t('frecuency.frequently')"
                  value="proposeGame"
                ></v-radio>
                <v-radio
                  key="leaderInGames"
                  :label="$t('frecuency.ocasionally')"
                  value="leaderInGames"
                ></v-radio>
                <v-radio
                  key="acceptAnothersGame"
                  :label="$t('frecuency.never')"
                  value="acceptAnothersGame"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12>
              <h4 class="headline mb-0">{{$t('psicomotricity.relationTowardsAdult')}}</h4>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.acceptIt')"
                v-model="formularioRegistro.areaSocioAfectiva.acceptIt">
                <v-radio
                  key="plays"
                  :label="$t('frecuency.always')"
                  value="plays"
                ></v-radio>
                <v-radio
                  key="proposeGame"
                  :label="$t('frecuency.frequently')"
                  value="proposeGame"
                ></v-radio>
                <v-radio
                  key="leaderInGames"
                  :label="$t('frecuency.ocasionally')"
                  value="leaderInGames"
                ></v-radio>
                <v-radio
                  key="acceptAnothersGame"
                  :label="$t('frecuency.never')"
                  value="acceptAnothersGame"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.searchIt')"
                v-model="formularioRegistro.areaSocioAfectiva.searchIt">
                <v-radio
                  key="plays"
                  :label="$t('frecuency.always')"
                  value="plays"
                ></v-radio>
                <v-radio
                  key="proposeGame"
                  :label="$t('frecuency.frequently')"
                  value="proposeGame"
                ></v-radio>
                <v-radio
                  key="leaderInGames"
                  :label="$t('frecuency.ocasionally')"
                  value="leaderInGames"
                ></v-radio>
                <v-radio
                  key="acceptAnothersGame"
                  :label="$t('frecuency.never')"
                  value="acceptAnothersGame"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.provokesIt')"
                v-model="formularioRegistro.areaSocioAfectiva.provokesIt">
                <v-radio
                  key="plays"
                  :label="$t('frecuency.always')"
                  value="plays"
                ></v-radio>
                <v-radio
                  key="proposeGame"
                  :label="$t('frecuency.frequently')"
                  value="proposeGame"
                ></v-radio>
                <v-radio
                  key="leaderInGames"
                  :label="$t('frecuency.ocasionally')"
                  value="leaderInGames"
                ></v-radio>
                <v-radio
                  key="acceptAnothersGame"
                  :label="$t('frecuency.never')"
                  value="acceptAnothersGame"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.thanksHim')"
                v-model="formularioRegistro.areaSocioAfectiva.thanksHim">
                <v-radio
                  key="plays"
                  :label="$t('frecuency.always')"
                  value="plays"
                ></v-radio>
                <v-radio
                  key="proposeGame"
                  :label="$t('frecuency.frequently')"
                  value="proposeGame"
                ></v-radio>
                <v-radio
                  key="leaderInGames"
                  :label="$t('frecuency.ocasionally')"
                  value="leaderInGames"
                ></v-radio>
                <v-radio
                  key="acceptAnothersGame"
                  :label="$t('frecuency.never')"
                  value="acceptAnothersGame"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.waitGrownUpApprovation')"
                v-model="formularioRegistro.areaSocioAfectiva.waitGrownUpApprovation">
                <v-radio
                  key="plays"
                  :label="$t('frecuency.always')"
                  value="plays"
                ></v-radio>
                <v-radio
                  key="proposeGame"
                  :label="$t('frecuency.frequently')"
                  value="proposeGame"
                ></v-radio>
                <v-radio
                  key="leaderInGames"
                  :label="$t('frecuency.ocasionally')"
                  value="leaderInGames"
                ></v-radio>
                <v-radio
                  key="acceptAnothersGame"
                  :label="$t('frecuency.never')"
                  value="acceptAnothersGame"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.waitOrders')"
                v-model="formularioRegistro.areaSocioAfectiva.waitOrders">
                <v-radio
                  key="plays"
                  :label="$t('frecuency.always')"
                  value="plays"
                ></v-radio>
                <v-radio
                  key="proposeGame"
                  :label="$t('frecuency.frequently')"
                  value="proposeGame"
                ></v-radio>
                <v-radio
                  key="leaderInGames"
                  :label="$t('frecuency.ocasionally')"
                  value="leaderInGames"
                ></v-radio>
                <v-radio
                  key="acceptAnothersGame"
                  :label="$t('frecuency.never')"
                  value="acceptAnothersGame"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.collaborateWithAdult')"
                v-model="formularioRegistro.areaSocioAfectiva.collaborateWithAdult">
                <v-radio
                  key="plays"
                  :label="$t('frecuency.always')"
                  value="plays"
                ></v-radio>
                <v-radio
                  key="proposeGame"
                  :label="$t('frecuency.frequently')"
                  value="proposeGame"
                ></v-radio>
                <v-radio
                  key="leaderInGames"
                  :label="$t('frecuency.ocasionally')"
                  value="leaderInGames"
                ></v-radio>
                <v-radio
                  key="acceptAnothersGame"
                  :label="$t('frecuency.never')"
                  value="acceptAnothersGame"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('disability.other')"
                v-model="formularioRegistro.areaSocioAfectiva.otherAdult">
                <v-radio
                  key="plays"
                  :label="$t('frecuency.always')"
                  value="plays"
                ></v-radio>
                <v-radio
                  key="proposeGame"
                  :label="$t('frecuency.frequently')"
                  value="proposeGame"
                ></v-radio>
                <v-radio
                  key="leaderInGames"
                  :label="$t('frecuency.ocasionally')"
                  value="leaderInGames"
                ></v-radio>
                <v-radio
                  key="acceptAnothersGame"
                  :label="$t('frecuency.never')"
                  value="acceptAnothersGame"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('generalFollowUp.observation')"
                v-model="formularioRegistro.areaSocioAfectiva.observaciones"
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
          <h2 class="headline mb-0">{{$t('psicomotricity.psychomotorDiagnosis')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="diagnosticoDataPanel?minimize(3):maximize(3)">
            <v-icon>{{diagnosticoDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="diagnosticoDataPanel">
          <v-layout row wrap>
            <v-flex xs12>
              <v-textarea
                :label="$t('psicomotricity.psychomotorDiagnosis')"
                v-model="formularioRegistro.diagnosticoPsicomotriz"
                :error="$v.formularioRegistro.dinamicaFamiliar.$error"
                @input="$v.formularioRegistro.dinamicaFamiliar.$touch()"
                :error-messages="errors.dinamicaFamiliar"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('psicomotricity.recomendation')"
                v-model="formularioRegistro.recomendaciones"
                :error="$v.formularioRegistro.dinamicaFamiliar.$error"
                @input="$v.formularioRegistro.dinamicaFamiliar.$touch()"
                :error-messages="errors.dinamicaFamiliar"
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
    <v-layout row>
      <v-dialog v-model="imageView">
        <v-card>
          <v-card-title class="headline">
            <v-icon right>account_circle</v-icon>
            {{$t('inscriptions.loadCsv')}}
          </v-card-title>
          <v-layout row>
            <v-flex xs8 offset-xs2>
              <v-img
                :src="rutaImagen"
                :lazy-src="rutaImagen"
                aspect-ratio="2"
                class="grey lighten-2"
                contain
              >
              </v-img>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="true" class="seccion" dark @click.native="imageView = false">{{$t('common.close')}}
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
        anamnesisDataPanel: true,
        evaluationDataPanel: true,
        diagnosticoDataPanel: true,
        fechaCreacion: new Date(),
        datosEstudiante: {},
        imageView: false,
        rutaImagen: '/static/images/ubicacionEspacial.jpg',
        formularioRegistro: {
          anamnesia: {
            antecedentesFamiliares: '',
            antecedentesPatologicos: '',
            perinatal: '',
            prenatal: '',
            postnatal: '',
            controlCefálico: '',
            Sedestación: '',
            Arrastre: '',
            Gateo: '',
            Bipedestación: '',
            Marcha: '',
            razonConsulta: ''
          },
          evaluacionPsicomotriz: {
            headUpright: false,
            movesHead: false,
            holdsObjects: false,
            playsFeetAndHands: false,
            locateSounds: false,
            babbles: false,
            gutturalSounds: false,
            stimulusSmile: false,
            recognicesMother: false,
            mouthSounds: false,
            liftHead: false,
            ulnaChange: false,
            picksCloseObjects: false,
            makesSounds: false,
            callsForAttention: false,
            repeatsSyllables: false,
            smilesToExtrangers: false,
            recognicesCaretaker: false,
            sitsWithoutSupport: false,
            drags: false,
            picksAndHitsObjects: false,
            takesFoodToMouth: false,
            likesSongs: false,
            searchsSounds: false,
            recognicesObjects: false,
            criesBeforeExtrangers: false,
            imitatesMovements: false,
            sitsWithSupport: false,
            crawl: false,
            discoversObjects: false,
            walksWithSupport: false,
            wordsWithMeaning: false,
            embraceAdultChild: false,
            answersToName: false,
            meetsSimpleOrders: false,
            jumpsWithBothFeet: false,
            throwsBall: false,
            UndressHimself: false,
            useForkCup: false,
            makesNounVerbPhrases: false,
            useNegatives: false,
            answerQuestions: false,
            bigAndSmallDifferences: false,
            singChildrenSongs: false,
            exploreEnvironment: false,
            recognicesPhotographs: false,
            playsSmallGroups: false,
            greetsOnCommand: false,
            performManualActivities: false,
            runsJumps: false,
            copyLinesAndCircles: false,
            identifiesEspatialConcepts: false,
            acknowledgeHisSex: false,
            gerundPluralArticleDifference: false,
            articlePhonemes: false,
            gestureCommunication: false,
            talksFirstPerson: false,
            useOralLanguage: false,
            showsPersonalPreferences: false,
            likesChildAndAnimals: false,
            joinsSmallTeams: false
          },
          areaMotora: {
            run: '',
            jump: '',
            throw: '',
            kick: '',
            staticDinamicBalance: '',
            staticBalance: '',
            partialDisociation: '',
            generalCoordination: '',
            eye: {
              right: false,
              left: false
            },
            ear: {
              right: false,
              left: false
            },
            hand: {
              right: false,
              left: false
            },
            feet: {
              right: false,
              left: false
            },
            scrash: '',
            button: '',
            cut: '',
            makeTower: '',
            threadingNeedle: '',
            observaciones: ''
          },
          areaCognitiva: {
            drawsHumanFigure: '',
            nameHumanParts: '',
            compleateHumanFigure: '',
            bodyImage: '',
            urlPhoto: '',
            headersPhoto: {'access-token': '<your-token>'},
            arriba: false,
            abajo: false,
            delante: false,
            detras: false,
            dentro: false,
            fuera: false,
            izquierda: false,
            derecha: false,
            inflaGlobo: false,
            encubaHuevos: false,
            plantaFlores: false,
            undifferentiatedCrying: false,
            socialSmile: false,
            vocalGame: false,
            babbleReflection: false,
            gutturalSound: false,
            gestures: false,
            intentionalSyllable: false,
            juxtaposedWord: false,
            simplePhrase: false,
            phraseWord: false,
            languageInteriorization: false,
            waitTurn: false,
            completePhrase: false,
            gramaticalElemmentUse: false,
            makeComplexeSentences: false,
            fullfillComplexOrder: false,
            beginReadingWriting: false,
            usePreposition: false,
            useAdjectives: false,
            slangLanguage: false,
            useAdjectivesAdverbs: false,
            verbUse: false,
            fluidCommunication: false,
            observaciones: ''
          },
          areaSocioAfectiva: {
            plays: '',
            proposeGame: '',
            leaderInGames: '',
            acceptAnothersGame: '',
            otherGame: '',
            acceptIt: '',
            searchIt: '',
            provokesIt: '',
            thanksHim: '',
            waitGrownUpApprovation: '',
            waitOrders: '',
            collaborateWithAdult: '',
            otherAdult: '',
            observaciones: ''
          },
          diagnosticoPsicomotriz: '',
          recomendaciones: ''
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
      this.formularioRegistro.areaMotora.headersPhoto = {'Authorization': `Bearer ${this.$storage.get('token')}`};
      this.datosEstudiante = this.$storage.get('nino');
      // if (this.$route.query.registro) {
      //   const socialWorkAux = this.$store.state.socialWorkRegisterEdit.reg_tb;
      //   this.formularioRegistro = {
      //     tipoDeFamilia: socialWorkAux.tipo_de_familia ? socialWorkAux.tipo_de_familia : null,
      //     tipoDeFamiliaObject: socialWorkAux.tipo_de_familia ? {
      //       text: socialWorkAux.tipo_de_familia,
      //       color: this.colors[this.nonce - 1]} : null,
      //     observacionGrupoFamiliar: socialWorkAux.observacion_grupo_familiar ? socialWorkAux.observacion_grupo_familiar : null,
      //     dinamicaFamiliar: socialWorkAux.dinamica_familiar ? socialWorkAux.dinamica_familiar : null,
      //     procesoSocial: socialWorkAux.proceso_social ? socialWorkAux.proceso_social : null,
      //     relatoDiscapacidad: socialWorkAux.relato_discapacidad ? socialWorkAux.relato_discapacidad : null,
      //     diagnosticoSocial: socialWorkAux.diagnostico_social ? socialWorkAux.diagnostico_social : null,
      //     conclusionSugerencia: socialWorkAux.conclusion_sugerencia ? socialWorkAux.conclusion_sugerencia : null
      //   }
      //   // this.fechaCreacion = this.$store.state.socialWorkRegisterEdit._fecha_creacion;
      // }
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
            this.anamnesisDataPanel = false;
            break;
          case 2:
            this.evaluationDataPanel = false;
            break;
          case 3:
            this.diagnosticoDataPanel = false;
            break;
          default:
            break;
        }
      },
      maximize (cardNumber) {
        switch (cardNumber) {
          case 1:
            this.anamnesisDataPanel = true;
            break;
          case 2:
            this.evaluationDataPanel = true;
            break;
          case 3:
            this.diagnosticoDataPanel = true;
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
            this.formularioRegistro.idRegistroTrabajoSocial = this.$store.state.socialWorkRegisterEdit.reg_tb.id_reg_tb;
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
      },
      openView (numeroImagen) {
        this.imageView = true;
        switch (numeroImagen) {
          case 0:
            this.rutaImagen = '/static/images/ubicacionEspacial.jpg';
            break;
          case 1:
            this.rutaImagen = '/static/images/inflaGlobo.jpg';
            break;
          case 2:
            this.rutaImagen = '/static/images/empollaHuevos.jpg';
            break;
          case 3:
            this.rutaImagen = '/static/images/siembraFlor.jpg';
            break;
          default:
            break;
        }
      },
      // Funciones de cargado de foto
      onError (error) {
        console.log('error: ' + error);
        this.$message.error('Error al cargar el archivo.');
      },
      onSuccess (success) {
        this.$message.success('Datos cargados correctamente.');
        this.cargarAsignaciones();
        this.csvWindow = false;
      },
      // onProgress (progress) {
      //   console.log('progress: ' + JSON.stringify(progress));
      //   // Handdle the progress
      // },
      thumbUrl (file) {
        return file.myThumbUrlProperty
      }
    }
  }
</script>
