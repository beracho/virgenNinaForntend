<template>
<div>
  <v-layout justify-space-around>
    <v-flex xs12>
      <v-toolbar color="secondary" dark>
        <v-icon>{{this.$storage.get('nino') !== null ? 'folder_shared' : 'sentiment_satisfied_alt'}}</v-icon>
        <v-toolbar-title v-if="this.$storage.get('nino') !== null">{{$t('registerView.folderBelongs') + ': ' + primeraLetraMayuscula(this.datosEstudiante.nombre_completo)}}</v-toolbar-title>
        <v-toolbar-title v-else>{{$t('common.welcome') + ' ' + primeraLetraMayuscula(this.$store.state.user.nombres)}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <span class="grey--text">{{$t('user.crud.role') + ': ' + this.$store.state.user.rol.nombre}}</span>
      </v-toolbar>
      <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex
              v-for="card in cards"
              :key="card.title"
              v-bind="{ [`xs${card.flex}`]: true }"
            >
              <v-card>
                <v-img
                  :src="card.src"
                  height="200px"
                ></v-img>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{card.title}}</div>
                    <span class="grey--text">{{card.text}}</span>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" icon @click.native="$router.push(card.ruta)">
                    <v-icon>{{card.icon}}</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
  /* eslint-disable semi */
  export default {
    data () {
      return {
        cards: [],
        datosEstudiante: {}
      }
    },
    components: {
    },
    watch: {
      pagination: {
      }
    },
    mounted () {
      this.datosEstudiante = this.$storage.get('nino');
      this.$store.state.menu.forEach(menuItem => {
        if (menuItem.visible) {
          // let cardAux = {}
          menuItem.submenu.forEach(submenuItem => {
            if (submenuItem.url !== 'home') {
              const cardAux = {
                title: this.$t(`menu.${submenuItem.url.replace('/', '')}`),
                text: this.$t(`menu.text.${submenuItem.url.replace('/', '')}`),
                icon: submenuItem.icon,
                src: this.$t(`menu.images.${submenuItem.url.replace('/', '')}`),
                ruta: submenuItem.url,
                flex: 6
              }
              this.cards.push(cardAux);
            }
          });
        }
      });
    },
    methods: {
      buscaEstudiante () {
        if (this.busqueda.aBuscar !== undefined && this.busqueda.aBuscar !== '') {
          let rutaEstudiantes = '';
          if (this.pagination.rowsPerPage === -1) {
            rutaEstudiantes = `estudiantes?tipobusqueda=${JSON.stringify(this.tiposBusqueda[this.busqueda.tipo].valor)}&buscar=${this.busqueda.aBuscar}`;
          } else {
            if (this.busqueda.tipo === 'nombres') {
              rutaEstudiantes = `estudiantes?limit=${this.pagination.rowsPerPage}&page=${this.pagination.page}&nombres=${this.busqueda.aBuscar}`;
            } else {
              rutaEstudiantes = `estudiantes?limit=${this.pagination.rowsPerPage}&page=${this.pagination.page}&tipobusqueda=${this.busqueda.tipo}&buscar=${this.busqueda.aBuscar}`;
            }
          }
          this.$service.get(rutaEstudiantes)
          .then(response => {
            this.asignaciones = response.datos.rows;
            this.count = response.datos.count;
          })
        } else {
          this.$message.error(this.$t('error.mustAddSearchInformation'));
        }
      },
      cerrarCarpeta (userData) {
        if (this.$storage.exist('menu')) {
          let nuevoMenu = this.$storage.get('menu');
          nuevoMenu[0].visible = true;
          nuevoMenu[1].visible = false;
          this.$storage.set('menu', nuevoMenu);
          this.$store.state.menu = nuevoMenu;
          this.$storage.remove('nino');
          this.$router.push('home');
        } else {
          this.$message.error(this.$t('error.wrongUrl'));
        }
      },
      primeraLetraMayuscula (nombres) {
        nombres = nombres.trim();
        const nombresSeparados = nombres.split(' ');
        let nombresModificados = '';
        nombresSeparados.forEach(nombre => {
          if (nombresModificados !== '') {
            nombresModificados += ' ';
          }
          nombresModificados += nombre.charAt(0).toUpperCase() + nombre.slice(1);
        });
        return nombresModificados;
      }
    }
  }
</script>
