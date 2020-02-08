<template>
  <section>
    <v-card class="login-form">
      <form @submit.prevent="submit">
        <v-card-title primary-title>
          <h4>{{$t('login.title') }}</h4>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-autocomplete
                  v-bind:items="opcionesRol"
                  item-text="nombre"
                  item-value="idRol"
                  v-model="form.username"
                  :label="$t('login.user')"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="password"
                  :label="$t('login.password')"
                  id="password"
                  append-icon="lock"
                  :append-icon="getIcon"
                  @click:append="changeIcon"
                  :type="hidePass ? 'password' : 'text'"
                  v-model="form.password"
                  maxlength="100"
                  :error="$v.form.password.$error"
                  @input="$v.form.password.$touch()"
                  :error-messages="errors.password"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 v-if="form.username">
                <b>{{$t('common.description') + ': '}}</b>
                {{$t(`descripcionRol.${this.form.username}`)}}
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-title>
        <v-card-actions>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-btn color="primary" block large type="submit">{{$t('login.login') }}</v-btn>
              </v-flex>
              <v-flex xs12>
                <div class="text-xs-right">
                  <a href="/#/newPassword"><v-icon>lock_outline</v-icon>{{$t('login.forgotPass') }}</a>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-actions>
        <v-card-title class="primary">
        </v-card-title>
      </form>
    </v-card>
    <div class="login-lang">
      <app-lang></app-lang>
    </div>
  </section>
</template>

<script>

import { required } from 'vuelidate/lib/validators';
import Auth from './mixins/auth';
import AppLang from '@/common/layout/AppLang';
import errorsHandler from '@/common/mixins/errorsHandler';

export default {
  mixins: [ Auth, errorsHandler ],
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
      remember: false,
      opcionesRol: [
        {
          idRol: 'admin',
          nombre: this.$t('rol.admin')
        }, {
          idRol: 'inscripciones',
          nombre: this.$t('rol.inscripciones')
        }, {
          idRol: 'director',
          nombre: this.$t('rol.director')
        }, {
          idRol: 'psicomotricidad',
          nombre: this.$t('rol.psicomotricidad')
        }, {
          idRol: 'fisioterapia',
          nombre: this.$t('rol.fisioterapia')
        }, {
          idRol: 'fonoaudiologia',
          nombre: this.$t('rol.fonoaudiologia')
        }, {
          idRol: 'nutricion',
          nombre: this.$t('rol.nutricion')
        }, {
          idRol: 'psicologia',
          nombre: this.$t('rol.psicologia')
        }, {
          idRol: 'odontologia',
          nombre: this.$t('rol.odontologia')
        }, {
          idRol: 'psicopedagogia',
          nombre: this.$t('rol.psicopedagogia')
        }, {
          idRol: 'trabajosocial',
          nombre: this.$t('rol.trabajosocial')
        }, {
          idRol: 'medicinaGeneral',
          nombre: this.$t('rol.medicinaGeneral')
        }, {
          idRol: 'profesor',
          nombre: this.$t('rol.profesor')
        }, {
          idRol: 'terapiaocupacional',
          nombre: this.$t('rol.terapiaocupacional')
        }
      ]
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
        this.form.password = 'Developer';
        this.$storage.remove('nino');
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

<style src="./login.scss" lang="scss"></style>
