<template>
<div>
  <v-layout justify-space-around>
    <v-flex xs12>
      <v-toolbar color="secondary" dark>
        <v-icon>sentiment_satisfied_alt</v-icon>
        <v-toolbar-title>{{$t('common.welcome') + ' ' + primeraLetraMayuscula(this.$store.state.user.nombres)}}</v-toolbar-title>
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
        cards: []
        // cards: [
        //   { title: 'Buscar archivo', text: 'Buscar niño para ver sus registros asociados.', icon: 'search', src: '../../../static/images/archivosMedicos.jpeg', flex: 6 },
        //   { title: 'Mis estadisticas', text: 'Ver estadísticas de mis reportes generados.', icon: 'trending_up', src: '../../../static/images/estadisticasMedicas.jpeg', flex: 6 }
        // ]
      }
    },
    components: {
    },
    watch: {
      pagination: {
      }
    },
    mounted () {
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
      },
      abrirCarpeta (userData) {
        if (this.$storage.exist('menu')) {
          this.$storage.set('nino', userData);
          let nuevoMenu = this.$storage.get('menu');
          nuevoMenu[0].visible = false;
          nuevoMenu[1].visible = true;
          this.$storage.set('menu', nuevoMenu);
          this.$store.state.menu = nuevoMenu;
          this.$router.push('registrosArchivados');
        } else {
          this.$message.error(this.$t('error.wrongUrl'));
        }
      }
    }
  }
</script>
