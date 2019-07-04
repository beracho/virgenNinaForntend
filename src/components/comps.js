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
    },
    obtieneArea (nombreRol) {
      let literal = '';
      switch (nombreRol) {
        case 'ADMINISTRADOR':
          literal = 'administracion';
          break;
        case 'DIRECTOR':
          literal = 'direccion';
          break;
        case 'ADMINISTRADOR_INSCRIPCIONES':
          literal = 'inscripcion';
          break;
        case 'PROF_PSICOMOTRICIDAD':
          literal = 'psicomotricidad';
          break;
        case 'PROF_FISIOTERAPIA':
          literal = 'fisioterapia';
          break;
        case 'PROF_FONOAUDIOLOGIA':
          literal = 'fonoaudiologia';
          break;
        case 'PROF_NUTRICION':
          literal = 'nutricion';
          break;
        case 'PROF_PSICOLOGIA':
          literal = 'psicologia';
          break;
        case 'PROF_ODONTOLOGIA':
          literal = 'odontologia';
          break;
        case 'PROF_PSICOPEDAGOGIA':
          literal = 'psicopedagogia';
          break;
        case 'PROF_TRABAJO_SOCIAL':
          literal = 'trabajo social';
          break;
        case 'PROF_MEDICINA_GENERAL':
          literal = 'medicina general';
          break;
        case 'PROF_TERAPIA_OCUPACIONAL':
          literal = 'terapia ocupacional';
          break;
        case 'PROF_EDUCACION':
          literal = 'educacion';
          break;
        case 'PROF_AUTISMO':
          literal = 'autismo';
          break;
        default:
          break;
      }
      return literal;
    }
  }
};
