
<template>
  <section>
    <v-card class="login-form">
      <form @submit.prevent="submit">
        <v-card-title primary-title>
          <h4>{{$t('newPassword.title') }}</h4>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  name="email"
                  :label="$t('newPassword.email')"
                  id="email"
                  append-icon="email"
                  v-model="form.email"
                  autofocus
                  maxlength="50"
                  :error="$v.form.email.$error"
                  @input="$v.form.email.$touch()"
                  :error-messages="errors.email"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-title>
        <v-card-actions>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-btn color="primary" block large type="submit">{{$t('newPassword.send') }}</v-btn>
              </v-flex>
              <v-flex xs12>
                <div class="text-xs-right">
                  <a href="/#/login"><v-icon>lock_outline</v-icon>{{$t('newPassword.backToLogin') }}</a>
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

import { required, email } from 'vuelidate/lib/validators';
// import Auth from './mixins/auth';
import AppLang from '@/common/layout/AppLang';
import errorsHandler from '@/common/mixins/errorsHandler';

export default {
  mixins: [ errorsHandler ],
  data () {
    return {
      form: {
        email: ''
      },
      errors: {
        email: []
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
        this.$http.post(this.$noApiUrl + 'usuarios/restore', {
          email: this.form.email
        })
        .then(response => {
          console.log(JSON.stringify(response.data.mensaje));
          this.$message.success(response.data.mensaje);
        });
      }
    }
  },
  components: { AppLang },
  validations: {
    form: {
      email: {
        required,
        email
      }
    }
  },
  computed: {
  },
  watch: {
    '$v.form.email.$error': function (val) {
      this.errorHandler(this.$v.form.email, this.errors.email);
    }
  }
};
</script>

<style src="../auth/login.scss" lang="scss"></style>
