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
          <v-btn dark block color="red" @click.native="cerrarCarpeta()">{{$t('socialWork.closeFolder')}}</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <form @submit.prevent="submit">
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">I. {{$t('occupationalTherapy.avd')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="avdDataPanel?minimize(1):maximize(1)">
            <v-icon>{{avdDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="avdDataPanel">
          <v-layout row wrap>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.ducha.realiza"
                :label="$t('occupationalTherapy.shower')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.ducha.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.controlEsfinter.realiza"
                :label="$t('occupationalTherapy.sfinterControl')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.controlEsfinter.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.vestidoDesvestido.realiza"
                :label="$t('occupationalTherapy.dressedUndressed')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.vestidoDesvestido.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.masticarTragar.realiza"
                :label="$t('occupationalTherapy.swallowAndChew')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.masticarTragar.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.comerSolo.realiza"
                :label="$t('occupationalTherapy.eatAlone')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.comerSolo.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.movilidadFuncional.realiza"
                :label="$t('occupationalTherapy.functionalMovility')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.movilidadFuncional.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.higienePersonalAseo.realiza"
                :label="$t('occupationalTherapy.personalHygiene')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.higienePersonalAseo.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.higieneInodoro.realiza"
                :label="$t('occupationalTherapy.toiletHygiene')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.higieneInodoro.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">II. {{$t('occupationalTherapy.comunicacionSocialCognitivo')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="avdDataPanel?minimize(2):maximize(2)">
            <v-icon>{{avdDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="avdDataPanel">
          <v-layout row wrap>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.comprension.realiza"
                :label="$t('occupationalTherapy.understand')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.ducha.comprension"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.expresion.realiza"
                :label="$t('occupationalTherapy.expresion')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.expresion.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.interaccionSocial.realiza"
                :label="$t('occupationalTherapy.socialInteraction')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.interaccionSocial.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.solProblemas.realiza"
                :label="$t('occupationalTherapy.problemSolucion')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.solProblemas.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.memoria.realiza"
                :label="$t('occupationalTherapy.memory')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.memoria.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.atencion.realiza"
                :label="$t('occupationalTherapy.atention')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.atencion.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.orientacion.realiza"
                :label="$t('occupationalTherapy.orentation')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.orientacion.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.reconocimiento.realiza"
                :label="$t('occupationalTherapy.recognizement')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.reconocimiento.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.secuenciacion.realiza"
                :label="$t('occupationalTherapy.secuence')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.secuenciacion.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.calculo.realiza"
                :label="$t('occupationalTherapy.mathSkill')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.calculo.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.lenguaje.realiza"
                :label="$t('occupationalTherapy.language')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.lenguaje.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
              <v-switch
                v-model="formularioRegistro.escritura.realiza"
                :label="$t('occupationalTherapy.writting')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="formularioRegistro.escritura.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">III. {{$t('occupationalTherapy.functionalMovility')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="physicalExamDataPanel?minimize(3):maximize(3)">
            <v-icon>{{physicalExamDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="physicalExamDataPanel">
          <v-layout row wrap>
            <v-flex xs3>
              <v-switch
                v-model="formularioRegistro.sedestacion.realiza"
                :label="$t('psicomotricity.sitting')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-switch v-if="formularioRegistro.sedestacion.realiza"
                v-model="formularioRegistro.sedestacion.equilibrio"
                :label="$t('occupationalTherapy.balance')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-switch v-if="formularioRegistro.sedestacion.realiza"
                v-model="formularioRegistro.sedestacion.estatico"
                :label="$t('occupationalTherapy.static')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-switch v-if="formularioRegistro.sedestacion.realiza"
                v-model="formularioRegistro.sedestacion.dinamico"
                :label="$t('occupationalTherapy.dinamic')"
              ></v-switch>
            </v-flex>
            <hr>
            <v-flex xs3>
              <v-switch
                v-model="formularioRegistro.bipedestacion.realiza"
                :label="$t('psicomotricity.standing')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-switch v-if="formularioRegistro.bipedestacion.realiza"
                v-model="formularioRegistro.bipedestacion.equilibrio"
                :label="$t('occupationalTherapy.balance')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-switch v-if="formularioRegistro.bipedestacion.realiza"
                v-model="formularioRegistro.bipedestacion.estatico"
                :label="$t('occupationalTherapy.static')"
              ></v-switch>
            </v-flex>
            <v-flex xs3>
              <v-switch v-if="formularioRegistro.bipedestacion.realiza"
                v-model="formularioRegistro.bipedestacion.dinamico"
                :label="$t('occupationalTherapy.dinamic')"
              ></v-switch>
            </v-flex>
            <hr>
            <v-flex xs3>
              <v-switch
                v-model="formularioRegistro.marcha.realiza"
                :label="$t('psicomotricity.walk')"
              ></v-switch>
            </v-flex>
            <v-flex xs4>
              <v-text-field v-if="formularioRegistro.marcha.realiza"
                :label="$t('generalFollowUp.observation')"
                v-model="formularioRegistro.marcha.observacion"
                hint="Observacion"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-switch v-if="formularioRegistro.marcha.realiza"
                v-model="formularioRegistro.marcha.dinamico"
                :label="$t('occupationalTherapy.dinamic')"
              ></v-switch>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('generalFollowUp.observation')"
                v-model="formularioRegistro.observacionesMovilidadFuncional"
                :error="$v.formularioRegistro.observacion.$error"
                @input="$v.formularioRegistro.observacion.$touch()"
                :error-messages="errors.observacion"
                counter
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">IV. {{$t('occupationalTherapy.manualFunction')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="manualFunctionDataPanel?minimize(4):maximize(4)">
            <v-icon>{{manualFunctionDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="manualFunctionDataPanel">
          <v-layout row wrap>
            <v-flex xs12>
              <h3 class="headline mb-0">{{$t('occupationalTherapy.thickMovility')}}</h3>
            </v-flex>
            <v-flex xs2>
              <h4 class="headline mb-0">{{$t('occupationalTherapy.cylindrical')}}</h4>
              <v-switch
                v-model="formularioRegistro.pinzaGruesa.cilindricaDerecha"
                :label="$t('occupationalTherapy.right')"
              ></v-switch>
              <v-switch
                v-model="formularioRegistro.pinzaGruesa.cilindricaIzquierda"
                :label="$t('occupationalTherapy.left')"
              ></v-switch>
            </v-flex>
            <v-flex xs2>
              <h4 class="headline mb-0">{{$t('occupationalTherapy.spherical')}}</h4>
              <v-switch
                v-model="formularioRegistro.pinzaGruesa.esfericaDerecha"
                :label="$t('occupationalTherapy.right')"
              ></v-switch>
              <v-switch
                v-model="formularioRegistro.pinzaGruesa.esfericaIzquierda"
                :label="$t('occupationalTherapy.left')"
              ></v-switch>
            </v-flex>
            <v-flex xs2>
              <h4 class="headline mb-0">{{$t('occupationalTherapy.coupling')}}</h4>
              <v-switch
                v-model="formularioRegistro.pinzaGruesa.engancheDerecha"
                :label="$t('occupationalTherapy.right')"
              ></v-switch>
              <v-switch
                v-model="formularioRegistro.pinzaGruesa.engancheIzquierda"
                :label="$t('occupationalTherapy.left')"
              ></v-switch>
            </v-flex>
            <v-flex xs6>
              <v-textarea
                :label="$t('generalFollowUp.observation')"
                v-model="formularioRegistro.pinzaGruesa.observaciones"
                :error="$v.formularioRegistro.observacion.$error"
                @input="$v.formularioRegistro.observacion.$touch()"
                :error-messages="errors.observacion"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <h3 class="headline mb-0">{{$t('occupationalTherapy.fineMovility')}}</h3>
            </v-flex>
            <v-flex xs2>
              <h4 class="headline mb-0">{{$t('occupationalTherapy.subTerminal')}}</h4>
              <v-switch
                v-model="formularioRegistro.pinzaFina.subTerminalDerecha"
                :label="$t('occupationalTherapy.right')"
              ></v-switch>
              <v-switch
                v-model="formularioRegistro.pinzaFina.subTerminalIzquierda"
                :label="$t('occupationalTherapy.left')"
              ></v-switch>
            </v-flex>
            <v-flex xs2>
              <h4 class="headline mb-0">{{$t('occupationalTherapy.termTerminal')}}</h4>
              <v-switch
                v-model="formularioRegistro.pinzaFina.terminoTerminalDerecha"
                :label="$t('occupationalTherapy.right')"
              ></v-switch>
              <v-switch
                v-model="formularioRegistro.pinzaFina.terminoTerminalIzquierda"
                :label="$t('occupationalTherapy.left')"
              ></v-switch>
            </v-flex>
            <v-flex xs2>
              <h4 class="headline mb-0">{{$t('occupationalTherapy.lateral')}}</h4>
              <v-switch
                v-model="formularioRegistro.pinzaFina.lateralDerecha"
                :label="$t('occupationalTherapy.right')"
              ></v-switch>
              <v-switch
                v-model="formularioRegistro.pinzaFina.lateralIzquierda"
                :label="$t('occupationalTherapy.left')"
              ></v-switch>
            </v-flex>
            <v-flex xs2>
              <h4 class="headline mb-0">{{$t('occupationalTherapy.tripod')}}</h4>
              <v-switch
                v-model="formularioRegistro.pinzaFina.tripodeDerecha"
                :label="$t('occupationalTherapy.right')"
              ></v-switch>
              <v-switch
                v-model="formularioRegistro.pinzaFina.tripodeIzquierda"
                :label="$t('occupationalTherapy.left')"
              ></v-switch>
            </v-flex>
            <v-flex xs2>
              <h4 class="headline mb-0">{{$t('occupationalTherapy.interdigital')}}</h4>
              <v-switch
                v-model="formularioRegistro.pinzaFina.interdigitalDerecha"
                :label="$t('occupationalTherapy.right')"
              ></v-switch>
              <v-switch
                v-model="formularioRegistro.pinzaFina.interdigitalIzquierda"
                :label="$t('occupationalTherapy.left')"
              ></v-switch>
            </v-flex>
            <v-flex xs2>
              <h4 class="headline mb-0">{{$t('occupationalTherapy.latLateral')}}</h4>
              <v-switch
                v-model="formularioRegistro.pinzaFina.lateroLateralDerecha"
                :label="$t('occupationalTherapy.right')"
              ></v-switch>
              <v-switch
                v-model="formularioRegistro.pinzaFina.lateroLateralIzquierda"
                :label="$t('occupationalTherapy.left')"
              ></v-switch>
            </v-flex>
            <v-flex xs2>
              <h4 class="headline mb-0">{{$t('occupationalTherapy.multipulp')}}</h4>
              <v-switch
                v-model="formularioRegistro.pinzaFina.multipulparDerecha"
                :label="$t('occupationalTherapy.right')"
              ></v-switch>
              <v-switch
                v-model="formularioRegistro.pinzaFina.multipulparIzquierda"
                :label="$t('occupationalTherapy.left')"
              ></v-switch>
            </v-flex>
            <v-flex xs10>
              <v-textarea
                :label="$t('generalFollowUp.observation')"
                v-model="formularioRegistro.pinzaFina.observaciones"
                :error="$v.formularioRegistro.observacion.$error"
                @input="$v.formularioRegistro.observacion.$touch()"
                :error-messages="errors.observacion"
                counter
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">V. {{$t('occupationalTherapy.architecturalBarriers')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="barriersFunctionDataPanel?minimize(5):maximize(5)">
            <v-icon>{{barriersFunctionDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="barriersFunctionDataPanel">
          <v-layout row wrap>
            <v-flex xs12>
              <v-textarea
                v-model="formularioRegistro.barrerasArquitectonicas"
                :error="$v.formularioRegistro.observacion.$error"
                @input="$v.formularioRegistro.observacion.$touch()"
                :error-messages="errors.observacion"
                counter
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          <v-icon right>subject</v-icon>
          <h2 class="headline mb-0">VI. {{$t('occupationalTherapy.interventionObjectives')}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click.native="objectivesFunctionDataPanel?minimize(6):maximize(6)">
            <v-icon>{{objectivesFunctionDataPanel?"remove":"add"}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid v-if="objectivesFunctionDataPanel">
          <v-layout row wrap>
            <v-flex xs12>
              <v-textarea
                v-model="formularioRegistro.objetivosIntervención.objetivos"
                :error="$v.formularioRegistro.observacion.$error"
                @input="$v.formularioRegistro.observacion.$touch()"
                :error-messages="errors.observacion"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('generalFollowUp.observation')"
                v-model="formularioRegistro.objetivosIntervención.observaciones"
                :error="$v.formularioRegistro.observacion.$error"
                @input="$v.formularioRegistro.observacion.$touch()"
                :error-messages="errors.observacion"
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
        maximizeDataPanel: true,
        avdDataPanel: true,
        physicalExamDataPanel: true,
        manualFunctionDataPanel: true,
        barriersFunctionDataPanel: true,
        objectivesFunctionDataPanel: true,
        datosEstudiante: {},
        formularioRegistro: {
          ducha: {
            realiza: false,
            observacion: ''
          },
          controlEsfinter: {
            realiza: false,
            observacion: ''
          },
          vestidoDesvestido: {
            realiza: false,
            observacion: ''
          },
          masticarTragar: {
            realiza: false,
            observacion: ''
          },
          comerSolo: {
            realiza: false,
            observacion: ''
          },
          movilidadFuncional: {
            realiza: false,
            observacion: ''
          },
          higienePersonalAseo: {
            realiza: false,
            observacion: ''
          },
          higieneInodoro: {
            realiza: false,
            observacion: ''
          },
          comprension: {
            realiza: false,
            observacion: ''
          },
          expresion: {
            realiza: false,
            observacion: ''
          },
          interaccionSocial: {
            realiza: false,
            observacion: ''
          },
          solProblemas: {
            realiza: false,
            observacion: ''
          },
          memoria: {
            realiza: false,
            observacion: ''
          },
          atencion: {
            realiza: false,
            observacion: ''
          },
          orientacion: {
            realiza: false,
            observacion: ''
          },
          reconocimiento: {
            realiza: false,
            observacion: ''
          },
          secuenciacion: {
            realiza: false,
            observacion: ''
          },
          calculo: {
            realiza: false,
            observacion: ''
          },
          lenguaje: {
            realiza: false,
            observacion: ''
          },
          escritura: {
            realiza: false,
            observacion: ''
          },
          sedestacion: {
            realiza: false,
            equilibrio: false,
            estatico: false,
            dinamico: false
          },
          bipedestacion: {
            realiza: false,
            equilibrio: false,
            estatico: false,
            dinamico: false
          },
          marcha: {
            realiza: false,
            observacion: '',
            dinamico: false
          },
          observacionesMovilidadFuncional: '',
          pinzaGruesa: {
            cilindricaDerecha: false,
            cilindricaIzquierda: false,
            esfericaDerecha: false,
            esfericaIzquierda: false,
            engancheDerecha: false,
            engancheIzquierda: false,
            observaciones: ''
          },
          pinzaFina: {
            subTerminalDerecha: false,
            subTerminalIzquierda: false,
            terminoTerminalDerecha: false,
            terminoTerminalIzquierda: false,
            lateralDerecha: false,
            lateralIzquierda: false,
            tripodeDerecha: false,
            tripodeIzquierda: false,
            interdigitalDerecha: false,
            interdigitalIzquierda: false,
            lateroLateralDerecha: false,
            lateroLateralIzquierda: false,
            multipulparDerecha: false,
            multipulparIzquierda: false,
            observaciones: ''
          },
          barrerasArquitectonicas: '',
          objetivosIntervención: {
            objetivos: '',
            observaciones: ''
          }
        },
        errors: {
          observacion: [],
          intervencion: []
        }
      }
    },
    components: {
    },
    watch: {
      '$v.formularioRegistro.observacion.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.observacion, this.errors.observacion);
      },
      '$v.formularioRegistro.intervencion.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.intervencion, this.errors.intervencion);
      }
    },
    created () {
      this.headers = {'Authorization': `Bearer ${this.$storage.get('token')}`};
      this.datosEstudiante = this.$storage.get('nino');
    },
    validations: {
      formularioRegistro: {
        observacion: {
          required
        },
        intervencion: {
          required
        }
      }
    },
    methods: {
      minimize (cardNumber) {
        switch (cardNumber) {
          case 1:
            this.avdDataPanel = false;
            break;
          case 2:
            this.maximizeDataPanel = false;
            break;
          case 3:
            this.physicalExamDataPanel = false;
            break;
          case 4:
            this.manualFunctionDataPanel = false;
            break;
          case 5:
            this.barriersFunctionDataPanel = false;
            break;
          case 6:
            this.objectivesFunctionDataPanel = false;
            break;
          default:
            break;
        }
      },
      maximize (cardNumber) {
        switch (cardNumber) {
          case 1:
            this.avdDataPanel = true;
            break;
          case 2:
            this.maximizeDataPanel = true;
            break;
          case 3:
            this.physicalExamDataPanel = true;
            break;
          case 4:
            this.manualFunctionDataPanel = true;
            break;
          case 5:
            this.barriersFunctionDataPanel = true;
            break;
          case 6:
            this.objectivesFunctionDataPanel = true;
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
      limpiarCampos () {
        this.formularioRegistro.observacion = '';
        this.formularioRegistro.intervencion = '';
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
