<template>
  <div>
    <v-card-title class="headline">
      <v-icon right>book</v-icon>
      {{$t('generalFollowUp.standartRegistry') }}
      <v-spacer></v-spacer>
      <v-btn :disabled="loading" class="primary" flat v-on:click="printFile()">{{$t('generalFollowUp.print')}}
        <v-icon right>print</v-icon>
      </v-btn>
    </v-card-title>
    <v-layout row>
      <v-flex xs10 offset-xs1>
        <v-alert color="primary" icon="label" value="true">
          {{$t('generalFollowUp.generalData')}}
        </v-alert>
        <v-layout row wrap>
          <v-flex xs4 offset-xs8>
            <b>{{$t('registerView.creationDate')}}: </b>{{$store.state.occupationalTherapyRegisterView.fecha}}
          </v-flex>
          <v-flex xs12>
            <b>{{$t('registerView.area')}}: </b>{{$store.state.occupationalTherapyRegisterView.area}}
          </v-flex>
          <v-flex xs12>
            <b>{{$t('registerView.createdBy')}}: </b>{{$store.state.occupationalTherapyRegisterView.autor}}
          </v-flex>

          <v-flex xs5 offset-xs1>
            <br><b>{{$t('occupationalTherapy.shower')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.ducha_realiza"
              :label="$store.state.occupationalTherapyRegisterView.ducha_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('occupationalTherapy.sfinterControl')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.controlEsfinter_realiza"
              :label="$store.state.occupationalTherapyRegisterView.controlEsfinter_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('occupationalTherapy.dressedUndressed')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.vestidoDesvestido_realiza"
              :label="$store.state.occupationalTherapyRegisterView.vestidoDesvestido_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('occupationalTherapy.swallowAndChew')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.masticarTragar_realiza"
              :label="$store.state.occupationalTherapyRegisterView.masticarTragar_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('occupationalTherapy.eatAlone')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.comerSolo_realiza"
              :label="$store.state.occupationalTherapyRegisterView.comerSolo_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('occupationalTherapy.functionalMovility')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.movilidadFuncional_realiza"
              :label="$store.state.occupationalTherapyRegisterView.movilidadFuncional_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('occupationalTherapy.personalHygiene')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.higienePersonalAseo_realiza"
              :label="$store.state.occupationalTherapyRegisterView.higienePersonalAseo_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('occupationalTherapy.toiletHygiene')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.higieneInodoro_realiza"
              :label="$store.state.occupationalTherapyRegisterView.higieneInodoro_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('occupationalTherapy.understand')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.comprension_realiza"
              :label="$store.state.occupationalTherapyRegisterView.comprension_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('occupationalTherapy.expresion')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.expresion_realiza"
              :label="$store.state.occupationalTherapyRegisterView.expresion_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('occupationalTherapy.socialInteraction')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.interaccionSocial_realiza"
              :label="$store.state.occupationalTherapyRegisterView.interaccionSocial_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('occupationalTherapy.problemSolucion')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.solProblemas_realiza"
              :label="$store.state.occupationalTherapyRegisterView.solProblemas_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('occupationalTherapy.memory')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.memoria_realiza"
              :label="$store.state.occupationalTherapyRegisterView.memoria_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('occupationalTherapy.atention')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.atencion_realiza"
              :label="$store.state.occupationalTherapyRegisterView.atencion_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('occupationalTherapy.orentation')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.orientacion_realiza"
              :label="$store.state.occupationalTherapyRegisterView.orientacion_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('occupationalTherapy.recognizement')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.reconocimiento_realiza"
              :label="$store.state.occupationalTherapyRegisterView.reconocimiento_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('occupationalTherapy.secuence')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.secuenciacion_realiza"
              :label="$store.state.occupationalTherapyRegisterView.secuenciacion_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('occupationalTherapy.mathSkill')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.calculo_realiza"
              :label="$store.state.occupationalTherapyRegisterView.calculo_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('occupationalTherapy.language')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.lenguaje_realiza"
              :label="$store.state.occupationalTherapyRegisterView.lenguaje_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('occupationalTherapy.writting')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.escritura_realiza"
              :label="$store.state.occupationalTherapyRegisterView.escritura_observacion"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('psicomotricity.sitting')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.sedestacion_realiza"
            ></v-checkbox>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.sedestacion_equilibrio"
              :label="$t('occupationalTherapy.balance')"
            ></v-checkbox>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.sedestacion_estatico"
              :label="$t('occupationalTherapy.static')"
            ></v-checkbox>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.sedestacion_dinamico"
              :label="$t('occupationalTherapy.dinamic')"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('psicomotricity.standing')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.bipedestacion_realiza"
            ></v-checkbox>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.bipedestacion_equilibrio"
              :label="$t('occupationalTherapy.balance')"
            ></v-checkbox>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.bipedestacion_estatico"
              :label="$t('occupationalTherapy.static')"
            ></v-checkbox>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.bipedestacion_dinamico"
              :label="$t('occupationalTherapy.dinamic')"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('psicomotricity.walk')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.marcha_realiza"
            ></v-checkbox>
            {{$t('generalFollowUp.observation')}}: {{$store.state.occupationalTherapyRegisterView.marcha_observacion}}
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.marcha_dinamico"
              :label="$t('occupationalTherapy.dinamic')"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('occupationalTherapy.thickMovility')}}: </b>
            <br><b>{{$t('occupationalTherapy.cylindrical')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaGruesa_cilindricaDerecha"
              :label="$t('occupationalTherapy.right')"
            ></v-checkbox>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaGruesa_cilindricaIzquierda"
              :label="$t('occupationalTherapy.left')"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('occupationalTherapy.thickMovility')}}: </b>
            <br><b>{{$t('occupationalTherapy.spherical')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaGruesa_esfericaDerecha"
              :label="$t('occupationalTherapy.right')"
            ></v-checkbox>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaGruesa_esfericaIzquierda"
              :label="$t('occupationalTherapy.left')"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('occupationalTherapy.thickMovility')}}: </b>
            <br><b>{{$t('occupationalTherapy.coupling')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaGruesa_engancheDerecha"
              :label="$t('occupationalTherapy.right')"
            ></v-checkbox>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaGruesa_engancheIzquierda"
              :label="$t('occupationalTherapy.left')"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('generalFollowUp.observation')}}: </b>{{$store.state.occupationalTherapyRegisterView.pinzaGruesa_observaciones}}
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('occupationalTherapy.fineMovility')}}: </b>
            <br><b>{{$t('occupationalTherapy.subTerminal')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaFina_subTerminalDerecha"
              :label="$t('occupationalTherapy.right')"
            ></v-checkbox>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaFina_subTerminalIzquierda"
              :label="$t('occupationalTherapy.left')"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('occupationalTherapy.fineMovility')}}: </b>
            <br><b>{{$t('occupationalTherapy.termTerminal')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaFina_terminoTerminalDerecha"
              :label="$t('occupationalTherapy.right')"
            ></v-checkbox>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaFina_terminoTerminalIzquierda"
              :label="$t('occupationalTherapy.left')"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('occupationalTherapy.fineMovility')}}: </b>
            <br><b>{{$t('occupationalTherapy.lateral')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaFina_lateralDerecha"
              :label="$t('occupationalTherapy.right')"
            ></v-checkbox>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaFina_lateralIzquierda"
              :label="$t('occupationalTherapy.left')"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('occupationalTherapy.fineMovility')}}: </b>
            <br><b>{{$t('occupationalTherapy.tripod')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaFina_tripodeDerecha"
              :label="$t('occupationalTherapy.right')"
            ></v-checkbox>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaFina_tripodeIzquierda"
              :label="$t('occupationalTherapy.left')"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('occupationalTherapy.fineMovility')}}: </b>
            <br><b>{{$t('occupationalTherapy.interdigital')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaFina_interdigitalDerecha"
              :label="$t('occupationalTherapy.right')"
            ></v-checkbox>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaFina_interdigitalIzquierda"
              :label="$t('occupationalTherapy.left')"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('occupationalTherapy.fineMovility')}}: </b>
            <br><b>{{$t('occupationalTherapy.latLateral')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaFina_lateroLateralDerecha"
              :label="$t('occupationalTherapy.right')"
            ></v-checkbox>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaFina_lateroLateralIzquierda"
              :label="$t('occupationalTherapy.left')"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('occupationalTherapy.fineMovility')}}: </b>
            <br><b>{{$t('occupationalTherapy.multipulp')}}: </b>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaFina_multipulparDerecha"
              :label="$t('occupationalTherapy.right')"
            ></v-checkbox>
            <v-checkbox
              v-model="$store.state.occupationalTherapyRegisterView.pinzaFina_multipulparIzquierda"
              :label="$t('occupationalTherapy.left')"
            ></v-checkbox>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('generalFollowUp.observation')}}: </b>{{$store.state.occupationalTherapyRegisterView.pinzaFina_observaciones}}
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('occupationalTherapy.architecturalBarriers')}}: </b>{{$store.state.occupationalTherapyRegisterView.barrerasArquitectonicas}}
          </v-flex>
          <v-flex xs5 offset-xs1>
            <br><b>{{$t('occupationalTherapy.interventionObjectives')}}: </b>{{$store.state.occupationalTherapyRegisterView.objetivosIntervención_objetivos}}
          </v-flex>
          <v-flex xs5>
            <br><b>{{$t('generalFollowUp.observation')}}: </b>{{$store.state.occupationalTherapyRegisterView.objetivosIntervención_observaciones}}
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  export default {
    name: 'vista-terapia-ocupacional',
    // props: ['visibility'],
    data () {
      return {
        loading: false
      };
    },
    created () {
      this.headers = {'Authorization': `Bearer ${this.$storage.get('token')}`};
    },
    methods: {
      printFile () {
        this.loading = true;
        let datosEstudiante = this.$storage.get('nino');
        this.$service.get(`imprimirRegistro?idRegistro=${this.$store.state.occupationalTherapyRegisterView.idRegistro}&estudiante=${datosEstudiante.codigo}`)
        .then(response => {
          if (response && response.datos) {
            window.open('data:application/pdf;base64,' + response.datos);
          }
          this.loading = false;
        });
      }
    },
    watch: {
    }
  };
</script>
