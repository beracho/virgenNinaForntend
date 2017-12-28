<template>
  <section>
    <v-layout>
      <v-flex xs10 lg4 offset-lg4>
        <v-card>
          <form @submit.prevent="submit">

            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12 sm12>
                  <h4>{{$t('loginAdmin.title') }}</h4>
                  <v-flex xs12 sm12>
                    <v-text-field
                      name="username"
                      :label="$t('loginAdmin.user')"
                      id="username"
                      append-icon="person"
                      v-model="form.username"
                      autofocus
                      maxlength="25"
                      :error="$v.form.username.$error"
                      @input="$v.form.username.$touch()"
                      :error-messages="errors.username"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12>
                    <v-text-field
                      name="password"
                      :label="$t('loginAdmin.password')"
                      id="password"
                      append-icon="lock"
                      :append-icon="getIcon"
                      :append-icon-cb="changeIcon"
                      :type="hidePass ? 'password' : 'text'"
                      v-model="form.password"
                      maxlength="100"
                      :error="$v.form.password.$error"
                      @input="$v.form.password.$touch()"
                      :error-messages="errors.password"
                    ></v-text-field>
                    <v-layout row wrap>
                      <v-flex xs12 sm12>
                        <v-btn primary block large @click="submit" >{{$t('loginAdmin.login') }}</v-btn>
                      </v-flex>
                        <v-flex xs6 sm6>
                          <v-checkbox :label="$t('loginAdmin.rememberMe')" v-model="remember"
                                      color="primary"></v-checkbox>
                        </v-flex>
                        <v-flex xs6 sm6>
                          <a href="">
                            {{$t('loginAdmin.forgotPass') }}
                            <v-icon>lock_outline</v-icon></a>
                        </v-flex>
                    </v-layout>
                  </v-flex>
                </v-flex>
              </v-layout>

            </v-container>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
    <div class="login-lang">
      <app-lang></app-lang>
    </div>
  </section>
</template>

<script>
  import {required} from 'vuelidate/lib/validators';
  import Auth from './mixins/auth';
  import AppLang from '@/common/layout/AppLang';
  import errorsHandler from '@/common/mixins/errorsHandler';

  export default {
    mixins: [Auth, errorsHandler],
    data: function () {
      return {
        dialog: false,
        form: {
          tipo: 'OPERADOR',
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
        this.login(this.form);
      }
    },
    components: {AppLang},
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
