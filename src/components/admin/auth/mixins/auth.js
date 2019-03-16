'use strict';

export default {
  methods: {
    login (data) {
      this.$http.post(this.$authUrl, data.tipo ? {
        tipo: data.tipo,
        usuario: data.username,
        contrasena: data.password
      } : {
        nit: data.nit,
        usuario: data.username,
        contrasena: data.password
      }).then(response => {
        if (response.data) {
          let menu = response.data.menu;
          let menuEntrar = response.data.menuEntrar;
          let usuario = response.data.user;
          let token = response.data.token;
          let sidenav = data.sidenav === undefined ? true : data.sidenav;

          this.$storage.setUser(usuario);
          this.$storage.set('menu', menu);
          this.$storage.set('menuEntrar', menuEntrar);
          this.$storage.set('token', token);
          this.$storage.set('sidenav', sidenav);

          this.$store.state.menu = menu;
          this.$store.state.sidenav = sidenav;

          this.$store.state.auth = true;
          this.timerSession();

          this.$router.push(menuEntrar);
        }
      }).catch(() => {
        this.$message.error('Usuario y/o contraseña inválida');
      });
    },

    logout (store, router) {
      store = store || this.$store;
      router = router || this.$router;

      if (store.state.sessionInterval) {
        window.clearInterval(store.state.sessionInterval);
        store.state.sessionInterval = null;
      }

      this.$storage.removeUser();
      this.$storage.remove('menu');
      this.$storage.remove('token');
      this.$storage.remove('sidenav');
      this.$storage.remove('actualPage');

      store.commit('setDefault');
      let route = this.$router.currentRoute.path;
      let redirect = 'login';
      if (['/newPassword', '/loginAdmin', '/confirmarCuenta', '/restaurar'].indexOf(route) !== -1) {
        if (this.$router.currentRoute.query !== {}) {
          redirect = this.$router.currentRoute.fullPath;
        } else {
          redirect = route.substring(1);
        }
      }
      router.push(redirect);
    },

    timerSession () {
      // Definiendo el tiempo en el que dura una sesión sin actividad
      this.$store.commit('SET_TIME', process.env.TIME_SESSION_EXPIRED * 60);
      this.$store.state.sessionInterval = window.setInterval(() => {
        this.$store.commit('TIME_DECREASE');
        if (this.$store.state.time && this.$store.state.time <= 0) {
          this.$message.warning('Su sesión ha sido cerrada automáticamente después de ' + process.env.TIME_SESSION_EXPIRED + ' minutos de inactividad.', '¡Sesión cerrada!', { timeout: 30000 });
          this.logout();
          this.$store.state.time = undefined;
        }
      }, 1000);
    }
  }
};
