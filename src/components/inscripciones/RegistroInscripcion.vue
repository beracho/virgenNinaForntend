<template>
  <v-layout row wrap align-center>
    <v-dialog v-model="dialog" persistent width="1200px">
      <!-- <v-btn dark class="seccion" slot="activator">
        Nuevo Usuario
        <v-icon right dark>add_circle</v-icon>
      </v-btn> -->
      <v-card>
        <v-card-title class="headline">
          <v-icon right>account_circle</v-icon>
          {{$t('usuarios.adding') }}
        </v-card-title>
        <v-layout row>
          <v-flex xs10 offset-xs1>
            <v-alert color="primary" icon="account_box" value="true">
              <strong>{{$t('usuarios.personalData') }}</strong><br>
              {{$t('usuarios.enterPersonalData') }}
            </v-alert>
            <v-form v-model="validForm" ref="form" lazy-validation>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-text-field :label="$t('usuarios.firstLastName')" v-model="form.persona.primer_apellido"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('usuarios.secondLastName')" v-model="form.persona.segundo_apellido"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('usuarios.names')" v-model="form.persona.nombres"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :label="$t('usuarios.id')" v-model="form.persona.ci" @keydown.native="$filter.numeric($event)" required></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-select v-bind:items="lugarCi" v-model="form.persona.lugar" :label="$t('usuarios.place')" item-text="abreviacion" item-value="abreviacion"></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-radio-group v-model="form.persona.genero" :label="$t('usuarios.gender')" :mandatory="true" row>
                    <v-radio :label="$t('usuarios.male')" value="M"></v-radio>
                    <v-radio :label="$t('usuarios.female')" value="F"></v-radio>
                  </v-radio-group>
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
                      :label="$t('usuarios.bornDate')"
                      v-model="form.persona.fecha_nacimiento"
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
                  <v-alert color="primary" icon="label" value="true">
                    <strong>{{$t('usuarios.userData')}}</strong><br>
                    {{$t('usuarios.enterUserData')}}
                  </v-alert>
                </v-flex>
                <v-flex xs6>
                  <v-text-field :label="$t('usuarios.email')" v-model="form.email" :rules="emailRules"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-select v-bind:items="roles" v-model="form.tipo" :label="$t('usuarios.rol')" item-text="nombre" item-value="id_rol"></v-select>
                </v-flex>
              </v-layout>
            </v-form>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="cancel" dark @click.native="dialog = false">{{$t('usuarios.cancel')}}
            <v-icon right>cancel</v-icon>
          </v-btn>
          <v-btn class="primary" flat :disabled="!validForm" @click="agregaUsuario">{{$t('usuarios.save')}}
            <v-icon right>done</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

import { required } from 'vuelidate/lib/validators';
import AppLang from '@/common/layout/AppLang';
import errorsHandler from '@/common/mixins/errorsHandler';

export default {
  mixins: [ errorsHandler ],
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      errors: {
        username: [],
        password: []
      },
      hidePass: true,
      remember: false
    };
  },
  methods: {
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

