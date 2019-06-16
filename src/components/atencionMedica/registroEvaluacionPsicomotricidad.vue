<template>
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
            <!-- <v-flex xs6 offset-xs3>
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
            </v-flex> -->
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
                  key="always"
                  :label="$t('frecuency.always')"
                  value="always"
                ></v-radio>
                <v-radio
                  key="frequently"
                  :label="$t('frecuency.frequently')"
                  value="frequently"
                ></v-radio>
                <v-radio
                  key="ocasionally"
                  :label="$t('frecuency.ocasionally')"
                  value="ocasionally"
                ></v-radio>
                <v-radio
                  key="never"
                  :label="$t('frecuency.never')"
                  value="never"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.proposeGame')"
                v-model="formularioRegistro.areaSocioAfectiva.proposeGame">
                <v-radio
                  key="always"
                  :label="$t('frecuency.always')"
                  value="always"
                ></v-radio>
                <v-radio
                  key="frequently"
                  :label="$t('frecuency.frequently')"
                  value="frequently"
                ></v-radio>
                <v-radio
                  key="ocasionally"
                  :label="$t('frecuency.ocasionally')"
                  value="ocasionally"
                ></v-radio>
                <v-radio
                  key="never"
                  :label="$t('frecuency.never')"
                  value="never"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.leaderInGames')"
                v-model="formularioRegistro.areaSocioAfectiva.leaderInGames">
                <v-radio
                  key="always"
                  :label="$t('frecuency.always')"
                  value="always"
                ></v-radio>
                <v-radio
                  key="frequently"
                  :label="$t('frecuency.frequently')"
                  value="frequently"
                ></v-radio>
                <v-radio
                  key="ocasionally"
                  :label="$t('frecuency.ocasionally')"
                  value="ocasionally"
                ></v-radio>
                <v-radio
                  key="never"
                  :label="$t('frecuency.never')"
                  value="never"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.acceptAnothersGame')"
                v-model="formularioRegistro.areaSocioAfectiva.acceptAnothersGame">
                <v-radio
                  key="always"
                  :label="$t('frecuency.always')"
                  value="always"
                ></v-radio>
                <v-radio
                  key="frequently"
                  :label="$t('frecuency.frequently')"
                  value="frequently"
                ></v-radio>
                <v-radio
                  key="ocasionally"
                  :label="$t('frecuency.ocasionally')"
                  value="ocasionally"
                ></v-radio>
                <v-radio
                  key="never"
                  :label="$t('frecuency.never')"
                  value="never"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('disability.other')"
                v-model="formularioRegistro.areaSocioAfectiva.otherGame">
                <v-radio
                  key="always"
                  :label="$t('frecuency.always')"
                  value="always"
                ></v-radio>
                <v-radio
                  key="frequently"
                  :label="$t('frecuency.frequently')"
                  value="frequently"
                ></v-radio>
                <v-radio
                  key="ocasionally"
                  :label="$t('frecuency.ocasionally')"
                  value="ocasionally"
                ></v-radio>
                <v-radio
                  key="never"
                  :label="$t('frecuency.never')"
                  value="never"
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
                  key="always"
                  :label="$t('frecuency.always')"
                  value="always"
                ></v-radio>
                <v-radio
                  key="frequently"
                  :label="$t('frecuency.frequently')"
                  value="frequently"
                ></v-radio>
                <v-radio
                  key="ocasionally"
                  :label="$t('frecuency.ocasionally')"
                  value="ocasionally"
                ></v-radio>
                <v-radio
                  key="never"
                  :label="$t('frecuency.never')"
                  value="never"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.searchIt')"
                v-model="formularioRegistro.areaSocioAfectiva.searchIt">
                <v-radio
                  key="always"
                  :label="$t('frecuency.always')"
                  value="always"
                ></v-radio>
                <v-radio
                  key="frequently"
                  :label="$t('frecuency.frequently')"
                  value="frequently"
                ></v-radio>
                <v-radio
                  key="ocasionally"
                  :label="$t('frecuency.ocasionally')"
                  value="ocasionally"
                ></v-radio>
                <v-radio
                  key="never"
                  :label="$t('frecuency.never')"
                  value="never"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.provokesIt')"
                v-model="formularioRegistro.areaSocioAfectiva.provokesIt">
                <v-radio
                  key="always"
                  :label="$t('frecuency.always')"
                  value="always"
                ></v-radio>
                <v-radio
                  key="frequently"
                  :label="$t('frecuency.frequently')"
                  value="frequently"
                ></v-radio>
                <v-radio
                  key="ocasionally"
                  :label="$t('frecuency.ocasionally')"
                  value="ocasionally"
                ></v-radio>
                <v-radio
                  key="never"
                  :label="$t('frecuency.never')"
                  value="never"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.thanksHim')"
                v-model="formularioRegistro.areaSocioAfectiva.thanksHim">
                <v-radio
                  key="always"
                  :label="$t('frecuency.always')"
                  value="always"
                ></v-radio>
                <v-radio
                  key="frequently"
                  :label="$t('frecuency.frequently')"
                  value="frequently"
                ></v-radio>
                <v-radio
                  key="ocasionally"
                  :label="$t('frecuency.ocasionally')"
                  value="ocasionally"
                ></v-radio>
                <v-radio
                  key="never"
                  :label="$t('frecuency.never')"
                  value="never"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.waitGrownUpApprovation')"
                v-model="formularioRegistro.areaSocioAfectiva.waitGrownUpApprovation">
                <v-radio
                  key="always"
                  :label="$t('frecuency.always')"
                  value="always"
                ></v-radio>
                <v-radio
                  key="frequently"
                  :label="$t('frecuency.frequently')"
                  value="frequently"
                ></v-radio>
                <v-radio
                  key="ocasionally"
                  :label="$t('frecuency.ocasionally')"
                  value="ocasionally"
                ></v-radio>
                <v-radio
                  key="never"
                  :label="$t('frecuency.never')"
                  value="never"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.waitOrders')"
                v-model="formularioRegistro.areaSocioAfectiva.waitOrders">
                <v-radio
                  key="always"
                  :label="$t('frecuency.always')"
                  value="always"
                ></v-radio>
                <v-radio
                  key="frequently"
                  :label="$t('frecuency.frequently')"
                  value="frequently"
                ></v-radio>
                <v-radio
                  key="ocasionally"
                  :label="$t('frecuency.ocasionally')"
                  value="ocasionally"
                ></v-radio>
                <v-radio
                  key="never"
                  :label="$t('frecuency.never')"
                  value="never"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('psicomotricity.collaborateWithAdult')"
                v-model="formularioRegistro.areaSocioAfectiva.collaborateWithAdult">
                <v-radio
                  key="always"
                  :label="$t('frecuency.always')"
                  value="always"
                ></v-radio>
                <v-radio
                  key="frequently"
                  :label="$t('frecuency.frequently')"
                  value="frequently"
                ></v-radio>
                <v-radio
                  key="ocasionally"
                  :label="$t('frecuency.ocasionally')"
                  value="ocasionally"
                ></v-radio>
                <v-radio
                  key="never"
                  :label="$t('frecuency.never')"
                  value="never"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <v-radio-group 
                :label="$t('disability.other')"
                v-model="formularioRegistro.areaSocioAfectiva.otherAdult">
                <v-radio
                  key="always"
                  :label="$t('frecuency.always')"
                  value="always"
                ></v-radio>
                <v-radio
                  key="frequently"
                  :label="$t('frecuency.frequently')"
                  value="frequently"
                ></v-radio>
                <v-radio
                  key="ocasionally"
                  :label="$t('frecuency.ocasionally')"
                  value="ocasionally"
                ></v-radio>
                <v-radio
                  key="never"
                  :label="$t('frecuency.never')"
                  value="never"
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
      if (this.$route.query.registro) {
        const psychomotorAux = this.$store.state.psychomotorRegisterEdit.reg_pm;
        this.formularioRegistro.anamnesia.antecedentesFamiliares = psychomotorAux.anam_antecedentesFamiliares ? psychomotorAux.anam_antecedentesFamiliares : null;
        this.formularioRegistro.anamnesia.antecedentesPatologicos = psychomotorAux.anam_antecedentesPatologicos ? psychomotorAux.anam_antecedentesPatologicos : null;
        this.formularioRegistro.anamnesia.perinatal = psychomotorAux.anam_perinatal ? psychomotorAux.anam_perinatal : null;
        this.formularioRegistro.anamnesia.prenatal = psychomotorAux.anam_prenatal ? psychomotorAux.anam_prenatal : null;
        this.formularioRegistro.anamnesia.postnatal = psychomotorAux.anam_postnatal ? psychomotorAux.anam_postnatal : null;
        this.formularioRegistro.anamnesia.controlCefálico = psychomotorAux.anam_controlCefálico ? psychomotorAux.anam_controlCefálico : null;
        this.formularioRegistro.anamnesia.Sedestación = psychomotorAux.anam_Sedestación ? psychomotorAux.anam_Sedestación : null;
        this.formularioRegistro.anamnesia.Arrastre = psychomotorAux.anam_Arrastre ? psychomotorAux.anam_Arrastre : null;
        this.formularioRegistro.anamnesia.Gateo = psychomotorAux.anam_Gateo ? psychomotorAux.anam_Gateo : null;
        this.formularioRegistro.anamnesia.Bipedestación = psychomotorAux.anam_Bipedestación ? psychomotorAux.anam_Bipedestación : null;
        this.formularioRegistro.anamnesia.Marcha = psychomotorAux.anam_Marcha ? psychomotorAux.anam_Marcha : null;
        this.formularioRegistro.anamnesia.razonConsulta = psychomotorAux.anam_razonConsulta ? psychomotorAux.anam_razonConsulta : null;
        this.formularioRegistro.evaluacionPsicomotriz.headUpright = psychomotorAux.psico_headUpright ? psychomotorAux.psico_headUpright : null;
        this.formularioRegistro.evaluacionPsicomotriz.movesHead = psychomotorAux.psico_movesHead ? psychomotorAux.psico_movesHead : null;
        this.formularioRegistro.evaluacionPsicomotriz.holdsObjects = psychomotorAux.psico_holdsObjects ? psychomotorAux.psico_holdsObjects : null;
        this.formularioRegistro.evaluacionPsicomotriz.playsFeetAndHands = psychomotorAux.psico_playsFeetAndHands ? psychomotorAux.psico_playsFeetAndHands : null;
        this.formularioRegistro.evaluacionPsicomotriz.locateSounds = psychomotorAux.psico_locateSounds ? psychomotorAux.psico_locateSounds : null;
        this.formularioRegistro.evaluacionPsicomotriz.babbles = psychomotorAux.psico_babbles ? psychomotorAux.psico_babbles : null;
        this.formularioRegistro.evaluacionPsicomotriz.gutturalSounds = psychomotorAux.psico_gutturalSounds ? psychomotorAux.psico_gutturalSounds : null;
        this.formularioRegistro.evaluacionPsicomotriz.stimulusSmile = psychomotorAux.psico_stimulusSmile ? psychomotorAux.psico_stimulusSmile : null;
        this.formularioRegistro.evaluacionPsicomotriz.recognicesMother = psychomotorAux.psico_recognicesMother ? psychomotorAux.psico_recognicesMother : null;
        this.formularioRegistro.evaluacionPsicomotriz.mouthSounds = psychomotorAux.psico_mouthSounds ? psychomotorAux.psico_mouthSounds : null;
        this.formularioRegistro.evaluacionPsicomotriz.liftHead = psychomotorAux.psico_liftHead ? psychomotorAux.psico_liftHead : null;
        this.formularioRegistro.evaluacionPsicomotriz.ulnaChange = psychomotorAux.psico_ulnaChange ? psychomotorAux.psico_ulnaChange : null;
        this.formularioRegistro.evaluacionPsicomotriz.picksCloseObjects = psychomotorAux.psico_picksCloseObjects ? psychomotorAux.psico_picksCloseObjects : null;
        this.formularioRegistro.evaluacionPsicomotriz.makesSounds = psychomotorAux.psico_makesSounds ? psychomotorAux.psico_makesSounds : null;
        this.formularioRegistro.evaluacionPsicomotriz.callsForAttention = psychomotorAux.psico_callsForAttention ? psychomotorAux.psico_callsForAttention : null;
        this.formularioRegistro.evaluacionPsicomotriz.repeatsSyllables = psychomotorAux.psico_repeatsSyllables ? psychomotorAux.psico_repeatsSyllables : null;
        this.formularioRegistro.evaluacionPsicomotriz.smilesToExtrangers = psychomotorAux.psico_smilesToExtrangers ? psychomotorAux.psico_smilesToExtrangers : null;
        this.formularioRegistro.evaluacionPsicomotriz.recognicesCaretaker = psychomotorAux.psico_recognicesCaretaker ? psychomotorAux.psico_recognicesCaretaker : null;
        this.formularioRegistro.evaluacionPsicomotriz.sitsWithoutSupport = psychomotorAux.psico_sitsWithoutSupport ? psychomotorAux.psico_sitsWithoutSupport : null;
        this.formularioRegistro.evaluacionPsicomotriz.drags = psychomotorAux.psico_drags ? psychomotorAux.psico_drags : null;
        this.formularioRegistro.evaluacionPsicomotriz.picksAndHitsObjects = psychomotorAux.psico_picksAndHitsObjects ? psychomotorAux.psico_picksAndHitsObjects : null;
        this.formularioRegistro.evaluacionPsicomotriz.takesFoodToMouth = psychomotorAux.psico_takesFoodToMouth ? psychomotorAux.psico_takesFoodToMouth : null;
        this.formularioRegistro.evaluacionPsicomotriz.likesSongs = psychomotorAux.psico_likesSongs ? psychomotorAux.psico_likesSongs : null;
        this.formularioRegistro.evaluacionPsicomotriz.searchsSounds = psychomotorAux.psico_searchsSounds ? psychomotorAux.psico_searchsSounds : null;
        this.formularioRegistro.evaluacionPsicomotriz.recognicesObjects = psychomotorAux.psico_recognicesObjects ? psychomotorAux.psico_recognicesObjects : null;
        this.formularioRegistro.evaluacionPsicomotriz.criesBeforeExtrangers = psychomotorAux.psico_criesBeforeExtrangers ? psychomotorAux.psico_criesBeforeExtrangers : null;
        this.formularioRegistro.evaluacionPsicomotriz.imitatesMovements = psychomotorAux.psico_imitatesMovements ? psychomotorAux.psico_imitatesMovements : null;
        this.formularioRegistro.evaluacionPsicomotriz.sitsWithSupport = psychomotorAux.psico_sitsWithSupport ? psychomotorAux.psico_sitsWithSupport : null;
        this.formularioRegistro.evaluacionPsicomotriz.crawl = psychomotorAux.psico_crawl ? psychomotorAux.psico_crawl : null;
        this.formularioRegistro.evaluacionPsicomotriz.discoversObjects = psychomotorAux.psico_discoversObjects ? psychomotorAux.psico_discoversObjects : null;
        this.formularioRegistro.evaluacionPsicomotriz.walksWithSupport = psychomotorAux.psico_walksWithSupport ? psychomotorAux.psico_walksWithSupport : null;
        this.formularioRegistro.evaluacionPsicomotriz.wordsWithMeaning = psychomotorAux.psico_wordsWithMeaning ? psychomotorAux.psico_wordsWithMeaning : null;
        this.formularioRegistro.evaluacionPsicomotriz.embraceAdultChild = psychomotorAux.psico_embraceAdultChild ? psychomotorAux.psico_embraceAdultChild : null;
        this.formularioRegistro.evaluacionPsicomotriz.answersToName = psychomotorAux.psico_answersToName ? psychomotorAux.psico_answersToName : null;
        this.formularioRegistro.evaluacionPsicomotriz.meetsSimpleOrders = psychomotorAux.psico_meetsSimpleOrders ? psychomotorAux.psico_meetsSimpleOrders : null;
        this.formularioRegistro.evaluacionPsicomotriz.jumpsWithBothFeet = psychomotorAux.psico_jumpsWithBothFeet ? psychomotorAux.psico_jumpsWithBothFeet : null;
        this.formularioRegistro.evaluacionPsicomotriz.throwsBall = psychomotorAux.psico_throwsBall ? psychomotorAux.psico_throwsBall : null;
        this.formularioRegistro.evaluacionPsicomotriz.UndressHimself = psychomotorAux.psico_UndressHimself ? psychomotorAux.psico_UndressHimself : null;
        this.formularioRegistro.evaluacionPsicomotriz.useForkCup = psychomotorAux.psico_useForkCup ? psychomotorAux.psico_useForkCup : null;
        this.formularioRegistro.evaluacionPsicomotriz.makesNounVerbPhrases = psychomotorAux.psico_makesNounVerbPhrases ? psychomotorAux.psico_makesNounVerbPhrases : null;
        this.formularioRegistro.evaluacionPsicomotriz.useNegatives = psychomotorAux.psico_useNegatives ? psychomotorAux.psico_useNegatives : null;
        this.formularioRegistro.evaluacionPsicomotriz.answerQuestions = psychomotorAux.psico_answerQuestions ? psychomotorAux.psico_answerQuestions : null;
        this.formularioRegistro.evaluacionPsicomotriz.bigAndSmallDifferences = psychomotorAux.psico_bigAndSmallDifferences ? psychomotorAux.psico_bigAndSmallDifferences : null;
        this.formularioRegistro.evaluacionPsicomotriz.singChildrenSongs = psychomotorAux.psico_singChildrenSongs ? psychomotorAux.psico_singChildrenSongs : null;
        this.formularioRegistro.evaluacionPsicomotriz.exploreEnvironment = psychomotorAux.psico_exploreEnvironment ? psychomotorAux.psico_exploreEnvironment : null;
        this.formularioRegistro.evaluacionPsicomotriz.recognicesPhotographs = psychomotorAux.psico_recognicesPhotographs ? psychomotorAux.psico_recognicesPhotographs : null;
        this.formularioRegistro.evaluacionPsicomotriz.playsSmallGroups = psychomotorAux.psico_playsSmallGroups ? psychomotorAux.psico_playsSmallGroups : null;
        this.formularioRegistro.evaluacionPsicomotriz.greetsOnCommand = psychomotorAux.psico_greetsOnCommand ? psychomotorAux.psico_greetsOnCommand : null;
        this.formularioRegistro.evaluacionPsicomotriz.performManualActivities = psychomotorAux.psico_performManualActivities ? psychomotorAux.psico_performManualActivities : null;
        this.formularioRegistro.evaluacionPsicomotriz.runsJumps = psychomotorAux.psico_runsJumps ? psychomotorAux.psico_runsJumps : null;
        this.formularioRegistro.evaluacionPsicomotriz.copyLinesAndCircles = psychomotorAux.psico_copyLinesAndCircles ? psychomotorAux.psico_copyLinesAndCircles : null;
        this.formularioRegistro.evaluacionPsicomotriz.identifiesEspatialConcepts = psychomotorAux.psico_identifiesEspatialConcepts ? psychomotorAux.psico_identifiesEspatialConcepts : null;
        this.formularioRegistro.evaluacionPsicomotriz.acknowledgeHisSex = psychomotorAux.psico_acknowledgeHisSex ? psychomotorAux.psico_acknowledgeHisSex : null;
        this.formularioRegistro.evaluacionPsicomotriz.gerundPluralArticleDifference = psychomotorAux.psico_gerundPluralArticleDifference ? psychomotorAux.psico_gerundPluralArticleDifference : null;
        this.formularioRegistro.evaluacionPsicomotriz.articlePhonemes = psychomotorAux.psico_articlePhonemes ? psychomotorAux.psico_articlePhonemes : null;
        this.formularioRegistro.evaluacionPsicomotriz.gestureCommunication = psychomotorAux.psico_gestureCommunication ? psychomotorAux.psico_gestureCommunication : null;
        this.formularioRegistro.evaluacionPsicomotriz.talksFirstPerson = psychomotorAux.psico_talksFirstPerson ? psychomotorAux.psico_talksFirstPerson : null;
        this.formularioRegistro.evaluacionPsicomotriz.useOralLanguage = psychomotorAux.psico_useOralLanguage ? psychomotorAux.psico_useOralLanguage : null;
        this.formularioRegistro.evaluacionPsicomotriz.showsPersonalPreferences = psychomotorAux.psico_showsPersonalPreferences ? psychomotorAux.psico_showsPersonalPreferences : null;
        this.formularioRegistro.evaluacionPsicomotriz.likesChildAndAnimals = psychomotorAux.psico_likesChildAndAnimals ? psychomotorAux.psico_likesChildAndAnimals : null;
        this.formularioRegistro.evaluacionPsicomotriz.joinsSmallTeams = psychomotorAux.psico_joinsSmallTeams ? psychomotorAux.psico_joinsSmallTeams : null;
        this.formularioRegistro.areaMotora.run = psychomotorAux.motor_run ? psychomotorAux.motor_run : null;
        this.formularioRegistro.areaMotora.jump = psychomotorAux.motor_jump ? psychomotorAux.motor_jump : null;
        this.formularioRegistro.areaMotora.throw = psychomotorAux.motor_throw ? psychomotorAux.motor_throw : null;
        this.formularioRegistro.areaMotora.kick = psychomotorAux.motor_kick ? psychomotorAux.motor_kick : null;
        this.formularioRegistro.areaMotora.staticDinamicBalance = psychomotorAux.motor_staticDinamicBalance ? psychomotorAux.motor_staticDinamicBalance : null;
        this.formularioRegistro.areaMotora.staticBalance = psychomotorAux.motor_staticBalance ? psychomotorAux.motor_staticBalance : null;
        this.formularioRegistro.areaMotora.partialDisociation = psychomotorAux.motor_partialDisociation ? psychomotorAux.motor_partialDisociation : null;
        this.formularioRegistro.areaMotora.generalCoordination = psychomotorAux.motor_generalCoordination ? psychomotorAux.motor_generalCoordination : null;
        this.formularioRegistro.areaMotora.eye.right = psychomotorAux.motor_eye_right ? psychomotorAux.motor_eye_right : null;
        this.formularioRegistro.areaMotora.eye.left = psychomotorAux.motor_eye_left ? psychomotorAux.motor_eye_left : null;
        this.formularioRegistro.areaMotora.ear.right = psychomotorAux.motor_ear_right ? psychomotorAux.motor_ear_right : null;
        this.formularioRegistro.areaMotora.ear.left = psychomotorAux.motor_ear_left ? psychomotorAux.motor_ear_left : null;
        this.formularioRegistro.areaMotora.hand.right = psychomotorAux.motor_hand_right ? psychomotorAux.motor_hand_right : null;
        this.formularioRegistro.areaMotora.hand.left = psychomotorAux.motor_hand_left ? psychomotorAux.motor_hand_left : null;
        this.formularioRegistro.areaMotora.feet.right = psychomotorAux.motor_feet_right ? psychomotorAux.motor_feet_right : null;
        this.formularioRegistro.areaMotora.feet.left = psychomotorAux.motor_feet_left ? psychomotorAux.motor_feet_left : null;
        this.formularioRegistro.areaMotora.scrash = psychomotorAux.motor_scrash ? psychomotorAux.motor_scrash : null;
        this.formularioRegistro.areaMotora.button = psychomotorAux.motor_button ? psychomotorAux.motor_button : null;
        this.formularioRegistro.areaMotora.cut = psychomotorAux.motor_cut ? psychomotorAux.motor_cut : null;
        this.formularioRegistro.areaMotora.makeTower = psychomotorAux.motor_makeTower ? psychomotorAux.motor_makeTower : null;
        this.formularioRegistro.areaMotora.threadingNeedle = psychomotorAux.motor_threadingNeedle ? psychomotorAux.motor_threadingNeedle : null;
        this.formularioRegistro.areaMotora.observaciones = psychomotorAux.motor_observaciones ? psychomotorAux.motor_observaciones : null;
        this.formularioRegistro.areaCognitiva.drawsHumanFigure = psychomotorAux.cogni_drawsHumanFigure ? psychomotorAux.cogni_drawsHumanFigure : null;
        this.formularioRegistro.areaCognitiva.nameHumanParts = psychomotorAux.cogni_nameHumanParts ? psychomotorAux.cogni_nameHumanParts : null;
        this.formularioRegistro.areaCognitiva.compleateHumanFigure = psychomotorAux.cogni_compleateHumanFigure ? psychomotorAux.cogni_compleateHumanFigure : null;
        this.formularioRegistro.areaCognitiva.bodyImage = psychomotorAux.cogni_bodyImage ? psychomotorAux.cogni_bodyImage : null;
        this.formularioRegistro.areaCognitiva.urlPhoto = psychomotorAux.cogni_urlPhoto ? psychomotorAux.cogni_urlPhoto : null;
        this.formularioRegistro.areaCognitiva.headersPhoto = psychomotorAux.cogni_headersPhoto ? psychomotorAux.cogni_headersPhoto : null;
        this.formularioRegistro.areaCognitiva.arriba = psychomotorAux.cogni_arriba ? psychomotorAux.cogni_arriba : null;
        this.formularioRegistro.areaCognitiva.abajo = psychomotorAux.cogni_abajo ? psychomotorAux.cogni_abajo : null;
        this.formularioRegistro.areaCognitiva.delante = psychomotorAux.cogni_delante ? psychomotorAux.cogni_delante : null;
        this.formularioRegistro.areaCognitiva.detras = psychomotorAux.cogni_detras ? psychomotorAux.cogni_detras : null;
        this.formularioRegistro.areaCognitiva.dentro = psychomotorAux.cogni_dentro ? psychomotorAux.cogni_dentro : null;
        this.formularioRegistro.areaCognitiva.fuera = psychomotorAux.cogni_fuera ? psychomotorAux.cogni_fuera : null;
        this.formularioRegistro.areaCognitiva.izquierda = psychomotorAux.cogni_izquierda ? psychomotorAux.cogni_izquierda : null;
        this.formularioRegistro.areaCognitiva.derecha = psychomotorAux.cogni_derecha ? psychomotorAux.cogni_derecha : null;
        this.formularioRegistro.areaCognitiva.inflaGlobo = psychomotorAux.cogni_inflaGlobo ? psychomotorAux.cogni_inflaGlobo : null;
        this.formularioRegistro.areaCognitiva.encubaHuevos = psychomotorAux.cogni_encubaHuevos ? psychomotorAux.cogni_encubaHuevos : null;
        this.formularioRegistro.areaCognitiva.plantaFlores = psychomotorAux.cogni_plantaFlores ? psychomotorAux.cogni_plantaFlores : null;
        this.formularioRegistro.areaCognitiva.undifferentiatedCrying = psychomotorAux.cogni_undifferentiatedCrying ? psychomotorAux.cogni_undifferentiatedCrying : null;
        this.formularioRegistro.areaCognitiva.socialSmile = psychomotorAux.cogni_socialSmile ? psychomotorAux.cogni_socialSmile : null;
        this.formularioRegistro.areaCognitiva.vocalGame = psychomotorAux.cogni_vocalGame ? psychomotorAux.cogni_vocalGame : null;
        this.formularioRegistro.areaCognitiva.babbleReflection = psychomotorAux.cogni_babbleReflection ? psychomotorAux.cogni_babbleReflection : null;
        this.formularioRegistro.areaCognitiva.gutturalSound = psychomotorAux.cogni_gutturalSound ? psychomotorAux.cogni_gutturalSound : null;
        this.formularioRegistro.areaCognitiva.gestures = psychomotorAux.cogni_gestures ? psychomotorAux.cogni_gestures : null;
        this.formularioRegistro.areaCognitiva.intentionalSyllable = psychomotorAux.cogni_intentionalSyllable ? psychomotorAux.cogni_intentionalSyllable : null;
        this.formularioRegistro.areaCognitiva.juxtaposedWord = psychomotorAux.cogni_juxtaposedWord ? psychomotorAux.cogni_juxtaposedWord : null;
        this.formularioRegistro.areaCognitiva.simplePhrase = psychomotorAux.cogni_simplePhrase ? psychomotorAux.cogni_simplePhrase : null;
        this.formularioRegistro.areaCognitiva.phraseWord = psychomotorAux.cogni_phraseWord ? psychomotorAux.cogni_phraseWord : null;
        this.formularioRegistro.areaCognitiva.languageInteriorization = psychomotorAux.cogni_languageInteriorization ? psychomotorAux.cogni_languageInteriorization : null;
        this.formularioRegistro.areaCognitiva.waitTurn = psychomotorAux.cogni_waitTurn ? psychomotorAux.cogni_waitTurn : null;
        this.formularioRegistro.areaCognitiva.completePhrase = psychomotorAux.cogni_completePhrase ? psychomotorAux.cogni_completePhrase : null;
        this.formularioRegistro.areaCognitiva.gramaticalElemmentUse = psychomotorAux.cogni_gramaticalElemmentUse ? psychomotorAux.cogni_gramaticalElemmentUse : null;
        this.formularioRegistro.areaCognitiva.makeComplexeSentences = psychomotorAux.cogni_makeComplexeSentences ? psychomotorAux.cogni_makeComplexeSentences : null;
        this.formularioRegistro.areaCognitiva.fullfillComplexOrder = psychomotorAux.cogni_fullfillComplexOrder ? psychomotorAux.cogni_fullfillComplexOrder : null;
        this.formularioRegistro.areaCognitiva.beginReadingWriting = psychomotorAux.cogni_beginReadingWriting ? psychomotorAux.cogni_beginReadingWriting : null;
        this.formularioRegistro.areaCognitiva.usePreposition = psychomotorAux.cogni_usePreposition ? psychomotorAux.cogni_usePreposition : null;
        this.formularioRegistro.areaCognitiva.useAdjectives = psychomotorAux.cogni_useAdjectives ? psychomotorAux.cogni_useAdjectives : null;
        this.formularioRegistro.areaCognitiva.slangLanguage = psychomotorAux.cogni_slangLanguage ? psychomotorAux.cogni_slangLanguage : null;
        this.formularioRegistro.areaCognitiva.useAdjectivesAdverbs = psychomotorAux.cogni_useAdjectivesAdverbs ? psychomotorAux.cogni_useAdjectivesAdverbs : null;
        this.formularioRegistro.areaCognitiva.verbUse = psychomotorAux.cogni_verbUse ? psychomotorAux.cogni_verbUse : null;
        this.formularioRegistro.areaCognitiva.fluidCommunication = psychomotorAux.cogni_fluidCommunication ? psychomotorAux.cogni_fluidCommunication : null;
        this.formularioRegistro.areaCognitiva.observaciones = psychomotorAux.cogni_observaciones ? psychomotorAux.cogni_observaciones : null;
        this.formularioRegistro.areaSocioAfectiva.plays = psychomotorAux.socio_plays ? psychomotorAux.socio_plays : null;
        this.formularioRegistro.areaSocioAfectiva.proposeGame = psychomotorAux.socio_proposeGame ? psychomotorAux.socio_proposeGame : null;
        this.formularioRegistro.areaSocioAfectiva.leaderInGames = psychomotorAux.socio_leaderInGames ? psychomotorAux.socio_leaderInGames : null;
        this.formularioRegistro.areaSocioAfectiva.acceptAnothersGame = psychomotorAux.socio_acceptAnothersGame ? psychomotorAux.socio_acceptAnothersGame : null;
        this.formularioRegistro.areaSocioAfectiva.otherGame = psychomotorAux.socio_otherGame ? psychomotorAux.socio_otherGame : null;
        this.formularioRegistro.areaSocioAfectiva.acceptIt = psychomotorAux.socio_acceptIt ? psychomotorAux.socio_acceptIt : null;
        this.formularioRegistro.areaSocioAfectiva.searchIt = psychomotorAux.socio_searchIt ? psychomotorAux.socio_searchIt : null;
        this.formularioRegistro.areaSocioAfectiva.provokesIt = psychomotorAux.socio_provokesIt ? psychomotorAux.socio_provokesIt : null;
        this.formularioRegistro.areaSocioAfectiva.thanksHim = psychomotorAux.socio_thanksHim ? psychomotorAux.socio_thanksHim : null;
        this.formularioRegistro.areaSocioAfectiva.waitGrownUpApprovation = psychomotorAux.socio_waitGrownUpApprovation ? psychomotorAux.socio_waitGrownUpApprovation : null;
        this.formularioRegistro.areaSocioAfectiva.waitOrders = psychomotorAux.socio_waitOrders ? psychomotorAux.socio_waitOrders : null;
        this.formularioRegistro.areaSocioAfectiva.collaborateWithAdult = psychomotorAux.socio_collaborateWithAdult ? psychomotorAux.socio_collaborateWithAdult : null;
        this.formularioRegistro.areaSocioAfectiva.otherAdult = psychomotorAux.socio_otherAdult ? psychomotorAux.socio_otherAdult : null;
        this.formularioRegistro.areaSocioAfectiva.observaciones = psychomotorAux.socio_observaciones ? psychomotorAux.socio_observaciones : null;
        this.formularioRegistro.diagnosticoPsicomotriz = psychomotorAux.diagnosticoPsicomotriz ? psychomotorAux.diagnosticoPsicomotriz : null;
        this.formularioRegistro.recomendaciones = psychomotorAux.recomendaciones ? psychomotorAux.recomendaciones : null;
        // this.fechaCreacion = this.$store.state.psychomotorRegisterEdit._fecha_creacion;
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
          if (this.$route.query.registro !== undefined && !this.$route.query.createNew) {
            // Edita registro Simple
            this.formularioRegistro.idRegistro = this.$route.query.registro;
            this.formularioRegistro.idRegistroPsicomotricidad = this.$store.state.psychomotorRegisterEdit.reg_pm.id_reg_pm;
            this.$service.put(`registroEvalPsicomotricidad`, this.formularioRegistro)
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
            this.$service.post(`registroEvalPsicomotricidad`, this.formularioRegistro)
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
