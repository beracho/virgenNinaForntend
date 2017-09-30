'use strict';

class NavbarController {
    constructor($state, Util, Auth, $log, Sidenav) {
        "ngInject";

        this.$state = $state;
        this.Util = Util;
        this.Auth = Auth;
        this.$log = $log;
        this.Sidenav = Sidenav;
    }

    $onInit() {
        this.empresas = [
            {value: 1, text: '1232123 - Empresa uno'},
            {value: 2, text: '1232124 - Empresa dos'}
        ];
    }

    toggleSidenav() {
        document.querySelector('#app-sidenav').classList.toggle('sidenav-close');
    }

    fullscreen() {
        document.querySelector('body').classList.toggle('fullscreen');
        this.Util.fullscreen();
    }

    refresh() {
        this.$state.reload();
    }

    toggled(open) {
        this.$log.log('open', open);
    }

    logout() {
        this.Auth.logout();
    }
    
    miCuenta() {
        this.Sidenav.path("micuenta");
    }
}

export default NavbarController;