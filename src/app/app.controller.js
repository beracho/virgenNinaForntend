'use strict';

class AppController {

    constructor($rootScope, $location, Storage, Auth, PageNoLogin, timeSessionExpired, SidenavFactory, $log, PageNoRedirectLogin) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$location = $location;
        this.Auth = Auth;
        this.Storage = Storage;
        this.PageNoLogin = PageNoLogin;
        this.PageNoRedirectLogin = PageNoRedirectLogin;
        this.SidenavFactory = SidenavFactory;
        this.timeSessionExpired = timeSessionExpired;
        this.$log = $log;
    }

    $onInit () {

        // this.$rootScope.auth = this.Auth.isAuthenticated(); // Descomentar cuando exista el backend
        this.$rootScope.auth = this.Storage.existUser(); // Comentar cuando ya no se use el fake de autenticación

        // Verificando si se está logueado
        // this.$log.log('auth', this.$rootScope.auth);

        if (this.PageNoRedirectLogin.indexOf(this.$location.path())!=-1) {
            // console.log(this.$location);
            this.Storage.set('path', this.$location.path().replace('/', ''));
        } else {
            if (this.$rootScope.auth) {
                this.Auth.timerSession();
            } else {
                let path = this.$location.path();
                // this.$log.log('path', path);
                // this.$log.log('exist', this.exist(path));

                // Verificando si el path actual esa una página de excepción que no require autenticación
                if (!this.exist(path)) {
                    if (path.length) {
                        this.Storage.set('path', path.replace('/', ''));
                    }
                    this.$location.path('login');
                }
            }
        }
    }

    exist(path) {
        var paths = this.PageNoLogin;
        for (var i in paths) {
            if (path.indexOf('/' + paths[i]) === 0 || path.indexOf('/' + paths[i] + '/') === 0) {
                return true;
            }
        }
        return false;
    }

    getSidenav() {
        return this.SidenavFactory.getSidenav();
    }

}

export default AppController;