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
                v-model="formularioRegistro.comprension.observacion"
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
                :error="$v.formularioRegistro.objetivosIntervención.objetivos.$error"
                @input="$v.formularioRegistro.objetivosIntervención.objetivos.$touch()"
                :error-messages="errors.objetivosIntervenciónObjetivos"
                counter
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('generalFollowUp.observation')"
                v-model="formularioRegistro.objetivosIntervención.observaciones"
                :error="$v.formularioRegistro.objetivosIntervención.observaciones.$error"
                @input="$v.formularioRegistro.objetivosIntervención.observaciones.$touch()"
                :error-messages="errors.objetivosIntervenciónObservaciones"
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
          objetivosIntervenciónObjetivos: [],
          objetivosIntervenciónObservaciones: []
        }
      }
    },
    components: {
    },
    watch: {
      '$v.formularioRegistro.objetivosIntervención.objetivos.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.objetivosIntervención.objetivos, this.errors.observacion);
      },
      '$v.formularioRegistro.objetivosIntervención.observaciones.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.objetivosIntervención.observaciones, this.errors.intervencion);
      }
    },
    created () {
      this.headers = {'Authorization': `Bearer ${this.$storage.get('token')}`};
      this.datosEstudiante = this.$storage.get('nino');
      if (this.$route.query.registro) {
        const occupationalTherapyAux = this.$store.state.occupationalTherapyRegisterEdit.reg_to;
        this.formularioRegistro = {
          ducha: {
            realiza: occupationalTherapyAux.ducha_realiza ? occupationalTherapyAux.ducha_realiza : null,
            observacion: occupationalTherapyAux.ducha_observacion ? occupationalTherapyAux.ducha_observacion : null
          },
          controlEsfinter: {
            realiza: occupationalTherapyAux.controlEsfinter_realiza ? occupationalTherapyAux.controlEsfinter_realiza : null,
            observacion: occupationalTherapyAux.controlEsfinter_observacion ? occupationalTherapyAux.controlEsfinter_observacion : null
          },
          vestidoDesvestido: {
            realiza: occupationalTherapyAux.vestidoDesvestido_realiza ? occupationalTherapyAux.vestidoDesvestido_realiza : null,
            observacion: occupationalTherapyAux.vestidoDesvestido_observacion ? occupationalTherapyAux.vestidoDesvestido_observacion : null
          },
          masticarTragar: {
            realiza: occupationalTherapyAux.masticarTragar_realiza ? occupationalTherapyAux.masticarTragar_realiza : null,
            observacion: occupationalTherapyAux.masticarTragar_observacion ? occupationalTherapyAux.masticarTragar_observacion : null
          },
          comerSolo: {
            realiza: occupationalTherapyAux.comerSolo_realiza ? occupationalTherapyAux.comerSolo_realiza : null,
            observacion: occupationalTherapyAux.comerSolo_observacion ? occupationalTherapyAux.comerSolo_observacion : null
          },
          movilidadFuncional: {
            realiza: occupationalTherapyAux.movilidadFuncional_realiza ? occupationalTherapyAux.movilidadFuncional_realiza : null,
            observacion: occupationalTherapyAux.movilidadFuncional_observacion ? occupationalTherapyAux.movilidadFuncional_observacion : null
          },
          higienePersonalAseo: {
            realiza: occupationalTherapyAux.higienePersonalAseo_realiza ? occupationalTherapyAux.higienePersonalAseo_realiza : null,
            observacion: occupationalTherapyAux.higienePersonalAseo_observacion ? occupationalTherapyAux.higienePersonalAseo_observacion : null
          },
          higieneInodoro: {
            realiza: occupationalTherapyAux.higieneInodoro_realiza ? occupationalTherapyAux.higieneInodoro_realiza : null,
            observacion: occupationalTherapyAux.higieneInodoro_observacion ? occupationalTherapyAux.higieneInodoro_observacion : null
          },
          comprension: {
            realiza: occupationalTherapyAux.comprension_realiza ? occupationalTherapyAux.comprension_realiza : null,
            observacion: occupationalTherapyAux.comprension_observacion ? occupationalTherapyAux.comprension_observacion : null
          },
          expresion: {
            realiza: occupationalTherapyAux.expresion_realiza ? occupationalTherapyAux.expresion_realiza : null,
            observacion: occupationalTherapyAux.expresion_observacion ? occupationalTherapyAux.expresion_observacion : null
          },
          interaccionSocial: {
            realiza: occupationalTherapyAux.interaccionSocial_realiza ? occupationalTherapyAux.interaccionSocial_realiza : null,
            observacion: occupationalTherapyAux.interaccionSocial_observacion ? occupationalTherapyAux.interaccionSocial_observacion : null
          },
          solProblemas: {
            realiza: occupationalTherapyAux.solProblemas_realiza ? occupationalTherapyAux.solProblemas_realiza : null,
            observacion: occupationalTherapyAux.solProblemas_observacion ? occupationalTherapyAux.solProblemas_observacion : null
          },
          memoria: {
            realiza: occupationalTherapyAux.memoria_realiza ? occupationalTherapyAux.memoria_realiza : null,
            observacion: occupationalTherapyAux.memoria_observacion ? occupationalTherapyAux.memoria_observacion : null
          },
          atencion: {
            realiza: occupationalTherapyAux.atencion_realiza ? occupationalTherapyAux.atencion_realiza : null,
            observacion: occupationalTherapyAux.atencion_observacion ? occupationalTherapyAux.atencion_observacion : null
          },
          orientacion: {
            realiza: occupationalTherapyAux.orientacion_realiza ? occupationalTherapyAux.orientacion_realiza : null,
            observacion: occupationalTherapyAux.orientacion_observacion ? occupationalTherapyAux.orientacion_observacion : null
          },
          reconocimiento: {
            realiza: occupationalTherapyAux.reconocimiento_realiza ? occupationalTherapyAux.reconocimiento_realiza : null,
            observacion: occupationalTherapyAux.reconocimiento_observacion ? occupationalTherapyAux.reconocimiento_observacion : null
          },
          secuenciacion: {
            realiza: occupationalTherapyAux.secuenciacion_realiza ? occupationalTherapyAux.secuenciacion_realiza : null,
            observacion: occupationalTherapyAux.secuenciacion_observacion ? occupationalTherapyAux.secuenciacion_observacion : null
          },
          calculo: {
            realiza: occupationalTherapyAux.calculo_realiza ? occupationalTherapyAux.calculo_realiza : null,
            observacion: occupationalTherapyAux.calculo_observacion ? occupationalTherapyAux.calculo_observacion : null
          },
          lenguaje: {
            realiza: occupationalTherapyAux.lenguaje_realiza ? occupationalTherapyAux.lenguaje_realiza : null,
            observacion: occupationalTherapyAux.lenguaje_observacion ? occupationalTherapyAux.lenguaje_observacion : null
          },
          escritura: {
            realiza: occupationalTherapyAux.escritura_realiza ? occupationalTherapyAux.escritura_realiza : null,
            observacion: occupationalTherapyAux.escritura_observacion ? occupationalTherapyAux.escritura_observacion : null
          },
          sedestacion: {
            realiza: occupationalTherapyAux.sedestacion_realiza ? occupationalTherapyAux.sedestacion_realiza : null,
            equilibrio: occupationalTherapyAux.sedestacion_equilibrio ? occupationalTherapyAux.sedestacion_equilibrio : null,
            estatico: occupationalTherapyAux.sedestacion_estatico ? occupationalTherapyAux.sedestacion_estatico : null,
            dinamico: occupationalTherapyAux.sedestacion_dinamico ? occupationalTherapyAux.sedestacion_dinamico : null
          },
          bipedestacion: {
            realiza: occupationalTherapyAux.bipedestacion_realiza ? occupationalTherapyAux.bipedestacion_realiza : null,
            equilibrio: occupationalTherapyAux.bipedestacion_equilibrio ? occupationalTherapyAux.bipedestacion_equilibrio : null,
            estatico: occupationalTherapyAux.bipedestacion_estatico ? occupationalTherapyAux.bipedestacion_estatico : null,
            dinamico: occupationalTherapyAux.bipedestacion_dinamico ? occupationalTherapyAux.bipedestacion_dinamico : null
          },
          marcha: {
            realiza: occupationalTherapyAux.marcha_realiza ? occupationalTherapyAux.marcha_realiza : null,
            observacion: occupationalTherapyAux.marcha_observacion ? occupationalTherapyAux.marcha_observacion : null,
            dinamico: occupationalTherapyAux.marcha_dinamico ? occupationalTherapyAux.marcha_dinamico : null
          },
          observacionesMovilidadFuncional: occupationalTherapyAux.observacionesMovilidadFuncional ? occupationalTherapyAux.observacionesMovilidadFuncional : null,
          pinzaGruesa: {
            cilindricaDerecha: occupationalTherapyAux.pinzaGruesa_cilindricaDerecha ? occupationalTherapyAux.pinzaGruesa_cilindricaDerecha : null,
            cilindricaIzquierda: occupationalTherapyAux.pinzaGruesa_cilindricaIzquierda ? occupationalTherapyAux.pinzaGruesa_cilindricaIzquierda : null,
            esfericaDerecha: occupationalTherapyAux.pinzaGruesa_esfericaDerecha ? occupationalTherapyAux.pinzaGruesa_esfericaDerecha : null,
            esfericaIzquierda: occupationalTherapyAux.pinzaGruesa_esfericaIzquierda ? occupationalTherapyAux.pinzaGruesa_esfericaIzquierda : null,
            engancheDerecha: occupationalTherapyAux.pinzaGruesa_engancheDerecha ? occupationalTherapyAux.pinzaGruesa_engancheDerecha : null,
            engancheIzquierda: occupationalTherapyAux.pinzaGruesa_engancheIzquierda ? occupationalTherapyAux.pinzaGruesa_engancheIzquierda : null,
            observaciones: occupationalTherapyAux.pinzaGruesa_observaciones ? occupationalTherapyAux.pinzaGruesa_observaciones : null
          },
          pinzaFina: {
            subTerminalDerecha: occupationalTherapyAux.pinzaFina_subTerminalDerecha ? occupationalTherapyAux.pinzaFina_subTerminalDerecha : null,
            subTerminalIzquierda: occupationalTherapyAux.pinzaFina_subTerminalIzquierda ? occupationalTherapyAux.pinzaFina_subTerminalIzquierda : null,
            terminoTerminalDerecha: occupationalTherapyAux.pinzaFina_terminoTerminalDerecha ? occupationalTherapyAux.pinzaFina_terminoTerminalDerecha : null,
            terminoTerminalIzquierda: occupationalTherapyAux.pinzaFina_terminoTerminalIzquierda ? occupationalTherapyAux.pinzaFina_terminoTerminalIzquierda : null,
            lateralDerecha: occupationalTherapyAux.pinzaFina_lateralDerecha ? occupationalTherapyAux.pinzaFina_lateralDerecha : null,
            lateralIzquierda: occupationalTherapyAux.pinzaFina_lateralIzquierda ? occupationalTherapyAux.pinzaFina_lateralIzquierda : null,
            tripodeDerecha: occupationalTherapyAux.pinzaFina_tripodeDerecha ? occupationalTherapyAux.pinzaFina_tripodeDerecha : null,
            tripodeIzquierda: occupationalTherapyAux.pinzaFina_tripodeIzquierda ? occupationalTherapyAux.pinzaFina_tripodeIzquierda : null,
            interdigitalDerecha: occupationalTherapyAux.pinzaFina_interdigitalDerecha ? occupationalTherapyAux.pinzaFina_interdigitalDerecha : null,
            interdigitalIzquierda: occupationalTherapyAux.pinzaFina_interdigitalIzquierda ? occupationalTherapyAux.pinzaFina_interdigitalIzquierda : null,
            lateroLateralDerecha: occupationalTherapyAux.pinzaFina_lateroLateralDerecha ? occupationalTherapyAux.pinzaFina_lateroLateralDerecha : null,
            lateroLateralIzquierda: occupationalTherapyAux.pinzaFina_lateroLateralIzquierda ? occupationalTherapyAux.pinzaFina_lateroLateralIzquierda : null,
            multipulparDerecha: occupationalTherapyAux.pinzaFina_multipulparDerecha ? occupationalTherapyAux.pinzaFina_multipulparDerecha : null,
            multipulparIzquierda: occupationalTherapyAux.pinzaFina_multipulparIzquierda ? occupationalTherapyAux.pinzaFina_multipulparIzquierda : null,
            observaciones: occupationalTherapyAux.pinzaFina_observaciones ? occupationalTherapyAux.pinzaFina_observaciones : null
          },
          barrerasArquitectonicas: occupationalTherapyAux.barrerasArquitectonicas ? occupationalTherapyAux.barrerasArquitectonicas : null,
          objetivosIntervención: {
            objetivos: occupationalTherapyAux.objetivosIntervención_objetivos ? occupationalTherapyAux.objetivosIntervención_objetivos : null,
            observaciones: occupationalTherapyAux.objetivosIntervención_observaciones ? occupationalTherapyAux.objetivosIntervención_observaciones : null
          }
        }
        // this.fechaCreacion = this.$store.state.occupationalTherapyRegisterEdit._fecha_creacion;
      }
    },
    validations: {
      formularioRegistro: {
        objetivosIntervención: {
          objetivos: {
            required
          },
          observaciones: {
            required
          }
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
          // this.formularioRegistro.tipoDeFamilia = this.formularioRegistro.tipoDeFamiliaObject.text;
          if (this.$route.query.registro && !this.$route.query.createNew) {
            // Edita registro Simple
            this.formularioRegistro.idRegistro = this.$route.query.registro;
            this.formularioRegistro.idRegistroTerapiaOcupacional = this.$store.state.occupationalTherapyRegisterEdit.reg_to.id_reg_to;
            this.$service.put(`registroEvalTerapiaOcupacional`, this.formularioRegistro)
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
            this.$service.post(`registroEvalTerapiaOcupacional`, this.formularioRegistro)
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
        // this.formularioRegistro.observacion = '';
        // this.formularioRegistro.intervencion = '';
      }
    }
  }
</script>
