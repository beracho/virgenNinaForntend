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
    <v-card>
      <form @submit.prevent="submit">
        <v-card-title class="headline">
          <v-icon right>note_add</v-icon>
          <h2 class="headline mb-0">{{ this.$t('generalFollowUp.newStandartRegistry') }}</h2>
        </v-card-title>
        <v-container fluid v-if="maximizeDataPanel">
          <v-layout row wrap>
            <v-flex xs12>
              <b>{{ this.$t('registerView.creationDate') }}: </b> {{getDate(fechaCreacion)}} 
            </v-flex>
            <v-flex xs12>
              <v-combobox
                v-model="formularioRegistro.trabajoObject"
                :filter="filter"
                :hide-no-data="!workTypeSearch"
                :items="workTypeItems"
                :search-input.sync="workTypeSearch"
                hide-selected
                :label="$t('generalFollowUp.workOn')"
                :error="$v.formularioRegistro.trabajoObject.$error"
                @input="$v.formularioRegistro.trabajoObject.$touch()"
                :error-messages="errors.trabajoObject"
                multiple
                small-chips
                solo
              >
                <template v-slot:no-data>
                  <v-list-tile>
                    <span class="subheading">{{$t('inscriptionRegister.createNew')}}</span>
                    <v-chip
                      :color="`${colors[nonce - 1]} lighten-3`"
                      label
                      small
                    >{{ workTypeSearch }}
                    </v-chip>
                  </v-list-tile>
                </template>
                <template v-slot:selection="{ item, parent, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    :color="`${item.color} lighten-3`"
                    :selected="selected"
                    label
                    small
                  >
                    <span class="pr-2">
                      {{ item.text }}
                    </span>
                    <v-icon
                      small
                      @click="parent.selectItem(item)"
                    >close</v-icon>
                  </v-chip>
                </template>
                <template v-slot:item="{ index, item }">
                  <v-list-tile-content>
                    <v-text-field
                      v-if="workEditing === item"
                      v-model="workEditing.text"
                      autofocus
                      flat
                      background-color="transparent"
                      hide-details
                      solo
                      @keyup.enter="edit(index, item)"
                    ></v-text-field>
                    <v-chip
                      v-else
                      :color="`${item.color} lighten-3`"
                      dark
                      label
                      small
                    >{{ item.text }}
                    </v-chip>
                  </v-list-tile-content>
                  <v-spacer></v-spacer>
                  <v-list-tile-action @click.stop>
                    <v-btn
                      icon
                      @click.stop.prevent="edit(index, item)"
                    >
                      <v-icon>{{ workEditing !== item ? 'edit' : 'check' }}</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </template>
              </v-combobox>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('generalFollowUp.intervention')"
                v-model="formularioRegistro.intervencion"
                :error="$v.formularioRegistro.intervencion.$error"
                @input="$v.formularioRegistro.intervencion.$touch()"
                :error-messages="errors.intervencion"
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                :label="$t('generalFollowUp.observation')"
                v-model="formularioRegistro.observacion"
                :error="$v.formularioRegistro.observacion.$error"
                @input="$v.formularioRegistro.observacion.$touch()"
                :error-messages="errors.observacion"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs6>
              </v-flex>
              <v-flex xs3>
                <v-btn class="seccion" dark @click.native="limpiarCampos()">{{$t('common.clear')}}
                  <v-icon right>cached</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs3>
                <v-btn class="primary" dark type="submit">{{$t('common.save')}}
                  <v-icon right>done</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-actions>
      </form>
    </v-card>
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
        datosEstudiante: {},
        fechaCreacion: new Date(),
        formularioRegistro: {
          trabajo: '',
          trabajoObject: [],
          observacion: '',
          intervencion: ''
        },
        errors: {
          trabajoObject: []
        },
        colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange', 'pink', 'blue', 'red'],
        workEditing: null,
        index: -1,
        nonce: 1,
        workTypeItems: [],
        workTypeSearch: null
      }
    },
    components: {
    },
    watch: {
      'formularioRegistro.trabajoObject' (val, prev) {
        if (val.length === prev.length) return
        this.formularioRegistro.trabajoObject = val.map(trabajoObject => {
          if (typeof trabajoObject === 'string') {
            trabajoObject = {
              text: trabajoObject,
              color: this.colors[this.nonce - 1]
            };
            const paramsCategoria = {
              descripcion: trabajoObject.text,
              area: this.obtieneArea(this.$store.state.user.rol.nombre)
            };
            // Carga categoria nueva a la base de datos a la base de datos
            this.$service.post(`categoria`, paramsCategoria)
            .then(response => {
              this.$message.success(response.mensaje);
              trabajoObject.id = response.datos.id_categoria;
              this.workTypeItems.push(trabajoObject);
              this.nonce++;
              if (this.nonce >= 10) {
                this.nonce = this.nonce - 9;
              }
              return response.datos;
            })
            .then(categoriaObject => {
              if (this.$route.query.registro && this.$route.query.createNew !== true) {
                // edita relacion
                let paramsRelacion = {
                  fid_categoria: categoriaObject.id_categoria,
                  fid_registro_simple: this.$store.state.simpleRegisterEdit.registros_simple.id_registro_simple
                };
                this.$service.post(`categoriaRegistroSimple`, paramsRelacion)
              }
            })
            .catch(() => {
              this.$message.error('Error al crear categoria');
            })
          }
          return trabajoObject;
        })
        if (this.$route.query.registro && this.$route.query.createNew !== true) {
          if (val.length > prev.length) {
            let idCategoriaAgregada = -1;
            val.forEach(valElement => {
              let isInBothObjects = false;
              prev.forEach(prevElement => {
                if (valElement.id === prevElement.id) {
                  isInBothObjects = true;
                }
              });
              if (!isInBothObjects && valElement.id !== undefined) {
                idCategoriaAgregada = valElement.id
              }
            });
            if (idCategoriaAgregada !== -1) {
              let paramsRelacion = {
                fid_categoria: idCategoriaAgregada,
                fid_registro_simple: this.$store.state.simpleRegisterEdit.registros_simple.id_registro_simple
              };
              this.$service.post(`categoriaRegistroSimple`, paramsRelacion)
              .then(respuesta => {
                if (respuesta !== undefined) {
                  this.$message.success();
                } else {
                  this.$message.error(this.$t('generalFollowUp.registerEditionUnsuccessfull'));
                }
              })
            }
          }
          if (val.length < prev.length) {
            let idCategoriaAgregada = -1;
            prev.forEach(prevElement => {
              let isInBothObjects = false;
              val.forEach(valElement => {
                if (prevElement.id === valElement.id) {
                  isInBothObjects = true;
                }
              });
              if (!isInBothObjects) {
                idCategoriaAgregada = prevElement.id
              }
            });
            if (idCategoriaAgregada !== -1) {
              let paramsRelacion = {
                fid_categoria: idCategoriaAgregada,
                fid_registro_simple: this.$store.state.simpleRegisterEdit.registros_simple.id_registro_simple
              };
              this.$service.delete(`categoriaRegistroSimple`, paramsRelacion)
              .then(respuesta => {
                if (respuesta !== undefined) {
                  this.$message.success();
                } else {
                  this.$message.error(this.$t('generalFollowUp.registerEditionUnsuccessfull'));
                }
              })
            }
          }
        }
      },
      '$v.formularioRegistro.trabajoObject.$error': function (val) {
        this.errorHandler(this.$v.formularioRegistro.trabajoObject, this.errors.trabajoObject);
      },
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
      this.$service.get(`categoria?area=${this.obtieneArea(this.$store.state.user.rol.nombre)}`)
      .then(response => {
        this.workTypeItems = [];
        this.workTypeItems.push({ header: this.$t('socialWork.selectOrCreate') })
        response.datos.forEach(categoria => {
          const auxCate = {
            id: categoria.id_categoria,
            text: categoria.descripcion,
            color: this.colors[this.nonce - 1]
          }
          this.workTypeItems.push(auxCate);
          this.nonce++;
          if (this.nonce >= 10) {
            this.nonce = this.nonce - 9;
          }
        });
        if (this.$route.query.registro) {
          return this.$service.get(`categoriaRegistroSimple?idRegistroSimple=${this.$store.state.simpleRegisterEdit.registros_simple.id_registro_simple}`)
        }
      })
      .then(responseCategorias => {
        if (this.$route.query.registro) {
          responseCategorias.datos.forEach(cateItem => {
            this.workTypeItems.forEach(workItem => {
              if (cateItem.fid_categoria === workItem.id) {
                this.formularioRegistro.trabajoObject.push(workItem);
              }
            });
          });
          this.formularioRegistro.observacion = this.$store.state.simpleRegisterEdit.registros_simple.observacion;
          this.formularioRegistro.intervencion = this.$store.state.simpleRegisterEdit.registros_simple.intervencion;
          this.fechaCreacion = this.$store.state.simpleRegisterEdit._fecha_creacion;
        }
      })
    },
    validations: {
      formularioRegistro: {
        trabajoObject: {
          required
        },
        observacion: {},
        intervencion: {}
      }
    },
    methods: {
      getDate (dateString) {
        let date = dateString ? new Date(dateString) : new Date();
        return (date.getDate() + ' - ' + this.$t('months[' + date.getMonth() + ']') + ' - ' + date.getFullYear());
      },
      submit () { // Envía datos de la nueva asignación
        this.$v.formularioRegistro.$touch();
        if (!this.$v.formularioRegistro.$invalid) {
          this.formularioRegistro.trabajo = [];
          this.formularioRegistro.trabajoObject.forEach(element => {
            this.formularioRegistro.trabajo.push(element.id)
          });
          if (this.$route.query.registro && !this.$route.query.createNew) {
            // Edita registro Simple
            this.formularioRegistro.idRegistro = this.$route.query.registro;
            this.formularioRegistro.idRegistroSimple = this.$store.state.simpleRegisterEdit.registros_simple.id_registro_simple;
            this.$service.put(`registroSimple`, this.formularioRegistro)
            .then(respuesta => {
              this.dialogAsignacionCurso = false
              if (respuesta !== undefined) {
                this.limpiarCampos();
                this.$message.success(this.$t('generalFollowUp.registerEditionSuccessfull'));
              } else {
                this.$message.error(this.$t('generalFollowUp.registerEditionUnsuccessfull'));
              }
              this.$router.push('registrosArchivados');
            })
            .catch(() => {
              this.$message.error(this.$t('generalFollowUp.registerEditionUnsuccessfull'));
            });
          } else {
            // Crea registro simple
            this.formularioRegistro.codigoEstudiante = this.datosEstudiante.codigo;
            this.$service.post(`registroSimple`, this.formularioRegistro)
            .then(respuesta => {
              this.dialogAsignacionCurso = false
              if (respuesta !== undefined) {
                this.limpiarCampos();
                this.$message.success(this.$t('generalFollowUp.registerCreationSuccessfull'));
              } else {
                this.$message.error(this.$t('generalFollowUp.registerCreationUnsuccessfull'));
              }
              this.$router.push('registrosArchivados');
            })
            .catch(() => {
              this.$message.error(this.$t('generalFollowUp.registerCreationUnsuccessfull'));
            });
          }
        }
      },
      edit (index, item) {
        if (!this.workEditing) {
          this.workEditing = item
          this.index = index
        } else {
          // editar
          const paramsCategoria = {
            idCategoria: item.id,
            descripcion: item.text,
            area: this.obtieneArea(this.$store.state.user.rol.nombre)
          };
          this.$service.put(`categoria`, paramsCategoria)
          .then(response => {
            this.$message.success(response.mensaje);
          })
          .catch(() => {
            this.$message.error('Error al crear categoria');
          })
          this.workEditing = null
          this.index = -1
        }
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
      limpiarCampos () {
        this.formularioRegistro.trabajo = '';
        this.formularioRegistro.trabajoObject = {};
        this.formularioRegistro.observacion = '';
        this.formularioRegistro.intervencion = '';
      }
    }
  }
</script>
