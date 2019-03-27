<template>
  <section>
    <v-card class="confirmation-form">
      <form>
        <v-container fluid>
          <v-card-title primary-title>
            <h4>{{$t('confirm.title') }}</h4>
          </v-card-title primary-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field 
                :label="$t('confirm.password')" 
                :type="hidePass ? 'password' : 'text'" 
                append-icon="lock" 
                :append-icon="getIcon" 
                @click:append="changeIcon" 
                v-model="contrasena" 
                :error-messages="contrasenaErrors" 
                :counter="20" 
                @input="$v.contrasena.$touch()" 
                @blur="$v.contrasena.$touch()" 
                required>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field 
                :label="$t('confirm.confirmPassword')" 
                :type="hidePass1 ? 'password' : 'text'" 
                append-icon="lock" 
                :append-icon="getIcon1" 
                @click:append="changeIcon1" 
                v-model="repiteContrasena" 
                :error-messages="repiteContrasenaErrors" 
                :counter="20" @input="$v.repiteContrasena.$touch()" 
                @blur="$v.repiteContrasena.$touch()" 
                required>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn :dark="!$v.$invalid" block color="primary" @click="setPassword" :disabled="$v.$invalid">{{$t('confirm.accept') }}
              <v-icon right dark>check</v-icon>
            </v-btn>
          </v-card-actions>
        </v-container>
      </form>
    </v-card>
    <div class="login-lang">
      <app-lang></app-lang>
    </div>
  </section>
</template>

<script>
  // import { validationMixin } from 'vuelidate';
  import AppLang from '@/common/layout/AppLang';
  import { required, maxLength, minLength, sameAs } from 'vuelidate/lib/validators';
  import Auth from '../auth/mixins/auth';

  export default {
    mixins: [Auth],
    validations: {
      contrasena: {
        required,
        maxLength: maxLength(20),
        minLength: minLength(8)
      },
      repiteContrasena: {
        sameAsPassword: sameAs('contrasena'),
        required
      }
    },
    data () {
      return {
        contrasena: '',
        repiteContrasena: '',
        hidePass: true,
        hidePass1: true
      };
    },
    methods: {
      submit () {
        this.$v.$touch();
      },
      clear () {
        this.$v.$reset();
        this.contrasena = '';
        this.repiteContrasena = '';
      },
      changeIcon () {
        if (this.contrasena.length) {
          this.hidePass = !this.hidePass;
        }
      },
      changeIcon1 () {
        if (this.repiteContrasena.length) {
          this.hidePass1 = !this.hidePass1;
        }
      },
      setPassword () {
        // Validar formulario
        if (this.contrasena !== '' && this.repiteContrasena !== '') {
          if (this.contrasena === this.repiteContrasena) {
            this.$http.post(this.$noApiUrl + 'usuarios/activar', {
              codigo: this.$router.currentRoute.query.codigo,
              contrasena: this.contrasena,
              usuario: this.$router.currentRoute.query.usuario
            })
            .then(respuesta => {
              this.$message.success(this.$router.currentRoute.path === '/restaurar' ? 'Contraseña actualizada' : respuesta.data.mensaje);
              if (respuesta.data.finalizado) {
                this.login({
                  password: this.contrasena,
                  username: this.$router.currentRoute.query.usuario
                });
              }
            })
            .catch(error => {
              if (this.$t('error.' + error.response.data.mensaje) !== undefined) {
                this.$message.error(this.$t('error.' + error.response.data.mensaje));
              } else {
                this.$message.error('error.' + error.response.data.mensaje);
              }
            });
          } else {
            this.$message.error(this.$t('confirm.errorFieldsNotEqual'));
          }
        } else {
          this.$message.error(this.$t('confirm.errorFieldRequired'));
        }
      }
    },
    components: { AppLang },
    computed: {
      getIcon () {
        return this.contrasena.length === 0 ? 'lock' : this.hidePass ? 'visibility' : 'visibility_off';
      },
      getIcon1 () {
        return this.repiteContrasena.length === 0 ? 'lock' : this.hidePass1 ? 'visibility' : 'visibility_off';
      },
      contrasenaErrors () {
        const errors = [];
        if (!this.$v.contrasena.$dirty) return errors;
        !this.$v.contrasena.minLength && errors.push(this.$t('confirm.errorFieldMinLength'));
        !this.$v.contrasena.maxLength && errors.push(this.$t('confirm.errorFieldMaxLength'));
        !this.$v.contrasena.required && errors.push(this.$t('confirm.errorFieldRequired'));
        return errors;
      },
      repiteContrasenaErrors () {
        const errors = [];
        if (!this.$v.repiteContrasena.$dirty) return errors;
        !this.$v.repiteContrasena.sameAsPassword && errors.push(this.$t('confirm.errorFieldsNotEqual'));
        !this.$v.repiteContrasena.required && errors.push(this.$t('confirm.errorFieldRequired'));
        return errors;
      }
    }
  };
</script>

<style src="./confirmation.scss" lang="scss"></style>
