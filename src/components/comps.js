'use strict';

export default {
  methods: {
    hasPermission (ruta) {
      let hasPermission = false;
      let menu = this.$storage.get('menu');
      if (menu) {
        menu.forEach(function (item) {
          item.submenu.forEach(function (subitem) {
            if (subitem.url === ruta) {
              hasPermission = true;
            }
          }, this);
        }, this);
      }
      if (this.$store.state.auth === true && hasPermission) {
        this.$storage.set('actualPage', '/' + ruta);
      } else {
        if (this.$storage.get('menuEntrar')) {
          this.$router.push(this.$storage.get('menuEntrar'));
        } else {
          // logout
        }
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
    cerrarCarpeta (userData) {
      if (this.$storage.exist('menu')) {
        let nuevoMenu = this.$storage.get('menu');
        nuevoMenu[0].visible = true;
        nuevoMenu[1].visible = false;
        this.$store.state.menu = nuevoMenu;
        this.$storage.set('menu', nuevoMenu);
        this.$storage.remove('nino');
        this.$router.push('home');
      } else {
        this.$message.error(this.$t('error.wrongUrl'));
      }
    }
  }
};
