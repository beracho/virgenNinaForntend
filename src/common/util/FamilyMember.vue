<template>
  <div>
    <v-layout row wrap>
      <v-flex xs3
        v-for="padre in padres"
        :key="padre.relacion"
      >
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{padre.relation.toUpperCase()}}</h3>
            </div>
          </v-card-title>
          <v-img
            :src="padre.src"
            height="200px"
          ></v-img>
          <v-card-actions class="white">
            <v-spacer></v-spacer>
            <v-btn icon v-on:click="windowEdicion = true, formRelative = padre, editaView = true, modelRelation = padre.relationItem">
              <v-icon>{{editarRelacion ? 'edit' : 'visibility'}}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3
        v-if="crearRelacion"
        text-xs-center
        layout
        align-center
        justify-center
      >
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{$t('socialWork.addFamilyMember')}}</h3>
            </div>
          </v-card-title>
          <v-img
            src="/static/images/unknown.png"
            height="200px"
          ></v-img>
          <v-card-actions class="white">
            <v-spacer></v-spacer>
            <v-btn icon v-on:click="windowEdicion = true, formRelative = formAux">
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- VENTANA DE CREACIÓN DE PERSONAS -->
    <v-dialog v-model="windowEdicion" max-width="800px" persistent>
      <v-card>
        <v-card-title>
          {{$t('inscriptionRegister.tutorData')}}
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs4>
              <v-text-field :disabled="!editarRelacion && editaView" :label="$t('inscriptionRegister.firstLastName')" v-model="formRelative.primer_apellido"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field :disabled="!editarRelacion && editaView" :label="$t('inscriptionRegister.secondLastName')" v-model="formRelative.segundo_apellido"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field :disabled="!editarRelacion && editaView" :label="$t('inscriptionRegister.names')" v-model="formRelative.nombres"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field :disabled="editaView" type="number" :label="$t('inscriptionRegister.ci')" v-model="formRelative.documento_identidad"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-select
                :disabled="editaView"
                v-bind:items="lugarCI"
                item-text="nombre"
                item-value="codigo"
                v-model="formRelative.lugar_documento_identidad"
                :label="$t('inscriptionRegister.documentPlace')"
              ></v-select>
            </v-flex>
            <v-flex xs4>
              <v-radio-group :disabled="!editarRelacion && editaView" v-model="formRelative.genero" row><br>
                <v-radio :label="$t('usuarios.male')" :value="'M'"></v-radio>
                <v-radio :label="$t('usuarios.female')" :value="'F'"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs4>
              <v-menu
                ref="menu"
                v-model="menuNacimiento"
                lazy
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :disabled="!editarRelacion && editaView" 
                    slot="activator"
                    :label="$t('inscriptionRegister.bornDate')"
                    v-model="formRelative.fecha_nacimiento"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker 
                  v-model="formRelative.fecha_nacimiento" 
                  locale="es" 
                  no-title scrollable actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menuNacimiento = false">{{$t('common.cancel')}}</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(formRelative.fecha_nacimiento)">{{$t('common.accept')}}</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs4>
              <v-text-field :disabled="(!editarRelacion && editaView) || formRelative.fecha_nacimiento != undefined" :label="$t('generalFollowUp.age')" v-model="formRelative.age"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-combobox
                v-model="modelRelation"
                :disabled="!editarRelacion && editaView"
                :filter="filter"
                :hide-no-data="!relationSearch"
                :items="relationItems"
                :search-input.sync="relationSearch"
                hide-selected
                :label="$t('inscriptionRegister.relation')"
                small-chips
              >
                <template v-slot:no-data>
                  <v-list-tile>
                    <span class="subheading">{{$t('inscriptionRegister.createNew')}}</span>
                    <v-chip
                      :color="`${colors[nonce - 1]} lighten-3`"
                      label
                      small
                    >
                      {{ relationSearch }}
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
                    <v-chip
                      :color="`${item.color} lighten-3`"
                      dark
                      label
                      small
                    >
                      {{ item.text }}
                    </v-chip>
                  </v-list-tile-content>
                </template>
              </v-combobox>
            </v-flex>
            <v-flex xs4>
              <v-combobox
                v-model="modelCivilState"
                :disabled="!editarRelacion && editaView"
                :filter="filter"
                :hide-no-data="!civilStateSearch"
                :items="civilStateItems"
                :search-input.sync="civilStateSearch"
                hide-selected
                :label="$t('socialWork.civilState')"
                small-chips
              >
                <template v-slot:no-data>
                  <v-list-tile>
                    <span class="subheading">{{$t('inscriptionRegister.createNew')}}</span>
                    <v-chip
                      :color="`${colors[nonce - 1]} lighten-3`"
                      label
                      small
                    >
                      {{ civilStateSearch }}
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
                    <v-chip
                      :color="`${item.color} lighten-3`"
                      dark
                      label
                      small
                    >
                      {{ item.text }}
                    </v-chip>
                  </v-list-tile-content>
                </template>
              </v-combobox>
            </v-flex>
            <v-flex xs4>
              <v-text-field :disabled="!editarRelacion && editaView" :label="$t('inscriptionRegister.language')" v-model="formRelative.idioma_materno"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field :disabled="!editarRelacion && editaView" :label="$t('inscriptionRegister.profession')" v-model="formRelative.ocupacion_actual"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-combobox
                v-model="modelInstructionLevel"
                :disabled="!editarRelacion && editaView"
                :filter="filter"
                :hide-no-data="!instructionLevelSearch"
                :items="instructionLevelItems"
                :search-input.sync="instructionLevelSearch"
                hide-selected
                :label="$t('inscriptionRegister.maxEducation')"
                small-chips
              >
                <template v-slot:no-data>
                  <v-list-tile>
                    <span class="subheading">{{$t('inscriptionRegister.createNew')}}</span>
                    <v-chip
                      :color="`${colors[nonce - 1]} lighten-3`"
                      label
                      small
                    >
                      {{ instructionLevelSearch }}
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
                    <v-chip
                      :color="`${item.color} lighten-3`"
                      dark
                      label
                      small
                    >
                      {{ item.text }}
                    </v-chip>
                  </v-list-tile-content>
                </template>
              </v-combobox>
            </v-flex>
            <v-flex xs4>
              <v-text-field :disabled="!editarRelacion && editaView" type="number" :label="$t('socialWork.monthSalary')" v-model="formRelative.salario_mensual"></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.stop="cerrarTutor()">{{$t('common.close')}}</v-btn>
        <v-btn v-if="editaView" color="primary" @click.stop="agregaTutor('edita')">{{$t('common.save')}}</v-btn>
        <v-btn v-else color="primary" @click.stop="agregaTutor('nuevo')">{{$t('common.save')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    name: 'family-members',
    props: ['studentCode', 'editRelation', 'createRelation'],
    data () {
      return {
        // Propiedades de componente
        codigo: this.studentCode,
        editarRelacion: !!this.editRelation,
        crearRelacion: !!this.createRelation,
        // Variables de vistas
        padres: [],
        formAux: {},
        formRelative: {
          primer_apellido: '',
          segundo_apellido: '',
          nombres: '',
          documento_identidad: '',
          lugar_documento_identidad: '',
          relation: '',
          civil_state: '',
          idioma_materno: '',
          ocupacion_actual: '',
          grado_instruccion: '',
          genero: '',
          fecha_nacimiento: '',
          age: '',
          salario_mensual: ''
        },
        // Edicion
        menuNacimiento: false,
        editaView: false,
        windowEdicion: false,
        // Campos formulario
        lugarCI: [{
          nombre: 'La Paz',
          codigo: 'LP'
        }, {
          nombre: 'Cochabamba',
          codigo: 'CBBA'
        }, {
          nombre: 'Santa Cruz',
          codigo: 'SC'
        }, {
          nombre: 'Oruro',
          codigo: 'OR'
        }, {
          nombre: 'Chuquisaca',
          codigo: 'CH'
        }, {
          nombre: 'Beni',
          codigo: 'BE'
        }, {
          nombre: 'Potosí',
          codigo: 'PO'
        }, {
          nombre: 'Tarija',
          codigo: 'TA'
        }, {
          nombre: 'Pando',
          codigo: 'PA'
        }],
        colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
        nonce: 1,
        relationItems: [
          { header: this.$t('socialWork.selectOrCreate') },
          {
            text: 'Padre',
            color: 'blue'
          },
          {
            text: 'Madre',
            color: 'red'
          },
          {
            text: 'Abuelo paterno',
            color: 'orange'
          },
          {
            text: 'Abuela paterna',
            color: 'blue'
          },
          {
            text: 'Abuelo materno',
            color: 'green'
          },
          {
            text: 'Abuela materna',
            color: 'purple'
          },
          {
            text: 'Hermano',
            color: 'teal'
          },
          {
            text: 'Hermana',
            color: 'cyan'
          },
          {
            text: 'Tutor',
            color: 'indigo'
          }
        ],
        relationSearch: null,
        modelRelation: '',
        civilStateItems: [
          { header: this.$t('socialWork.selectOrCreate') },
          {
            text: 'Soltero',
            color: 'blue'
          },
          {
            text: 'Casado',
            color: 'red'
          },
          {
            text: 'Separado',
            color: 'orange'
          },
          {
            text: 'Divorciado',
            color: 'blue'
          },
          {
            text: 'Concubino',
            color: 'green'
          },
          {
            text: 'Viudo',
            color: 'purple'
          }
        ],
        civilStateSearch: null,
        modelCivilState: '',
        instructionLevelItems: [
          { header: this.$t('socialWork.selectOrCreate') },
          {
            text: 'Sin instrucción',
            color: 'orange'
          },
          {
            text: 'Primaria',
            color: 'blue'
          },
          {
            text: 'Secundaria',
            color: 'red'
          },
          {
            text: 'Tecnico superior',
            color: 'cyan'
          },
          {
            text: 'Superior',
            color: 'green'
          }
        ],
        instructionLevelSearch: null,
        modelInstructionLevel: ''
      };
    },
    created () {
      this.headers = {'Authorization': `Bearer ${this.$storage.get('token')}`};
      this.$service.get(`estudiantes?codigo=${this.codigo}`)
      .then(respuesta => {
        if (!respuesta) {
          return;
        }
        let consulta = {};
        if (respuesta.datos.length === 1) {
          consulta = respuesta.datos[0];
          this.searchRE = true;
        }
        this.formRelative.apoderados = consulta.persona_de;
        this.padres = [];
        this.formRelative.apoderados.forEach(function (tutor) {
          let relacionAuxiliar = {text: '', color: this.colors[this.nonce - 1]};
          this.relationItems.forEach(function (relation) {
            if (relation.text && relation.text.toUpperCase() === tutor.relacion.toUpperCase()) {
              relacionAuxiliar = relation;
            }
          });
          if (relacionAuxiliar.text === '') {
            relacionAuxiliar = {
              text: this.formRelative.relation,
              color: this.colors[this.nonce - 1]
            };
            this.relationItems.push(relacionAuxiliar);
          }
          const obj = {
            id: tutor.id_parentezco,
            id_persona: tutor.fid_persona_es,
            cargado: true,
            relation: tutor.relacion,
            relationItem: relacionAuxiliar,
            descripcion: tutor.descripcion,
            civil_state: tutor.persona_es.civil_state,
            tipo_documento: tutor.persona_es.tipo_documento,
            documento_identidad: tutor.persona_es.documento_identidad,
            lugar_documento_identidad: tutor.persona_es.lugar_documento_identidad,
            complemento_documento: tutor.persona_es.complemento_documento,
            tipo_documento_discapacidad: tutor.persona_es.tipo_documento_discapacidad,
            carnet_discapacidad: tutor.persona_es.carnet_discapacidad,
            fecha_nacimiento: tutor.persona_es.fecha_nacimiento ? tutor.persona_es.fecha_nacimiento.substr(0, 10) : '',
            nombres: tutor.persona_es.nombres,
            primer_apellido: tutor.persona_es.primer_apellido,
            segundo_apellido: tutor.persona_es.segundo_apellido,
            casada_apellido: tutor.persona_es.casada_apellido,
            genero: tutor.persona_es.genero,
            nombre_completo: tutor.persona_es.nombre_completo,
            idiomas: tutor.persona_es.idiomas,
            idioma_materno: tutor.persona_es.idioma_materno,
            ocupacion_actual: tutor.persona_es.ocupacion_actual,
            grado_instruccion: tutor.persona_es.grado_instruccion,
            salario_mensual: tutor.persona_es.salario_mensual,
            discapacidad: tutor.persona_es.discapacidad,
            src: this.getImage(tutor.persona_es.genero, this.getAge(tutor.persona_es.fecha_nacimiento))
          };
          this.padres.push(obj);
        }, this);
      });
    },
    methods: {
      filter (item, queryText, itemText) {
        if (item.header) return false;

        const hasValue = val => val != null ? val : '';

        const text = hasValue(itemText);
        const query = hasValue(queryText);

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1;
      },
      agregaTutor (accion) {
        let obj = {};
        switch (accion) {
          case 'edita':
            this.padres.forEach(function (tutor) {
              if (this.formRelative.id === tutor.id) {
                tutor.id = this.formRelative.id;
                tutor.cargado = true;
                tutor.relation = this.formRelative.relation;
                tutor.relationItem = this.modelRelation;
                tutor.descripcion = null;
                tutor.civil_state = this.formRelative.civil_state;
                tutor.tipo_documento = 'CARNET_IDENTIDAD';
                tutor.documento_identidad = this.formRelative.documento_identidad;
                tutor.lugar_documento_identidad = this.formRelative.lugar_documento_identidad;
                tutor.fecha_nacimiento = this.formRelative.fecha_nacimiento ? this.formRelative.fecha_nacimiento : '';
                tutor.age = this.formRelative.age;
                tutor.nombres = this.formRelative.nombres;
                tutor.primer_apellido = this.formRelative.primer_apellido;
                tutor.segundo_apellido = this.formRelative.segundo_apellido;
                tutor.casada_apellido = null;
                tutor.genero = this.formRelative.genero;
                tutor.idioma_materno = this.formRelative.idioma_materno;
                tutor.ocupacion_actual = this.formRelative.ocupacion_actual;
                tutor.grado_instruccion = this.formRelative.grado_instruccion;
                tutor.salario_mensual = this.formRelative.salario_mensual;
                tutor.discapacidad = false;
                tutor.src = this.getImage(this.formRelative.genero, this.getAge(this.formRelative.fecha_nacimiento));
                obj = tutor;
              }
            }, this);
            this.editaView = false;
            break;
          case 'nuevo':
            obj = {
              cargado: false,
              relation: this.formRelative.relation,
              civil_state: this.formRelative.civil_state,
              tipo_documento: 'CARNET_IDENTIDAD',
              documento_identidad: this.formRelative.documento_identidad,
              lugar_documento_identidad: this.formRelative.lugar_documento_identidad,
              fecha_nacimiento: this.formRelative.fecha_nacimiento ? this.formRelative.fecha_nacimiento : undefined,
              age: this.formRelative.age,
              nombres: this.formRelative.nombres,
              primer_apellido: this.formRelative.primer_apellido,
              segundo_apellido: this.formRelative.segundo_apellido,
              genero: this.formRelative.genero,
              idioma_materno: this.formRelative.idioma_materno,
              ocupacion_actual: this.formRelative.ocupacion_actual,
              grado_instruccion: this.formRelative.grado_instruccion,
              salario_mensual: Number(this.formRelative.salario_mensual),
              src: this.getImage(this.formRelative.genero, this.getAge(this.formRelative.fecha_nacimiento))
            };
            this.padres.push(obj);
            break;
          default:
            break;
        }
        this.$service.put(`parentezco`, {codigo: this.codigo, busqueda: 'codigo', accion: accion, padre: obj})
        .then(respuesta => {
          this.$message.success('Familiar agregado exitosamente');
        })
        .catch(() => {
          this.$message.error('Error al crear familiar');
        });
        this.windowEdicion = false;
      },
      cerrarTutor () {
        this.windowEdicion = false;
        if (!this.editaView) {
          this.formAux = this.formRelative;
        }
        this.editaView = false;
      },
      getAge (dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      },
      getImage (genero, edad) {
        let source = '/static/images/unknown.png';
        if (genero === 'M') {
          source = '/static/images/hombre.jpg';
          if (edad && edad < 18) {
            source = '/static/images/boy.jpg';
          }
        }
        if (genero === 'F') {
          source = '/static/images/mujer.jpg';
          if (edad && edad < 18) {
            source = '/static/images/girl.jpg';
          }
        }
        return source;
      }
    },
    watch: {
      'formRelative.fecha_nacimiento': function () {
        if (this.formRelative.fecha_nacimiento !== '' && this.formRelative.fecha_nacimiento !== undefined) {
          this.formRelative.age = this.getAge(this.formRelative.fecha_nacimiento);
        }
      },
      'modelRelation': function (val, prev) {
        if (typeof this.modelRelation === 'string') {
          this.modelRelation = {
            text: this.modelRelation,
            color: this.colors[this.nonce - 1]
          };
          // padre.relationItem = this.modelRelation;
          this.relationItems.push(this.modelRelation);
          this.nonce++;
        }
        this.formRelative.relation = this.modelRelation.text;
        return this.modelRelation;
      },
      'modelCivilState': function (val, prev) {
        if (typeof this.modelCivilState === 'string') {
          this.modelCivilState = {
            text: this.modelCivilState,
            color: this.colors[this.nonce - 1]
          };
          this.civilStateItems.push(this.modelCivilState);
          this.nonce++;
        }
        this.formRelative.civil_state = this.modelCivilState.text;
        return this.modelCivilState;
      },
      'modelInstructionLevel': function (val, prev) {
        if (typeof this.modelInstructionLevel === 'string') {
          this.modelInstructionLevel = {
            text: this.modelInstructionLevel,
            color: this.colors[this.nonce - 1]
          };
          this.instructionLevelItems.push(this.modelInstructionLevel);
          this.nonce++;
        }
        this.formRelative.grado_instruccion = this.modelInstructionLevel.text;
        return this.modelInstructionLevel;
      }
    }
  };
</script>
