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
                v-model="formularioRegistro.anamnesia.postnatal"
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
          </v-layout>
        </v-container>
      </v-card>
      <!-- <v-card-actions>
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
      </v-card-actions> -->
    </form>
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
        fechaCreacion: new Date(),
        datosEstudiante: {},
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
            Marcha: ''
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
          }
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
            this.anamnesisDataPanel = false;
            break;
          case 2:
            this.evaluationDataPanel = false;
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
          case 1:
            this.anamnesisDataPanel = true;
            break;
          case 2:
            this.evaluation = true;
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
      }
    }
  }
</script>
