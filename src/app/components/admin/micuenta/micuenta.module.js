'use strict';

import MicuentaComponent from './micuenta.component';

const Micuenta = angular
    .module('app.miecuenta', [])
    .component('appMicuenta', MicuentaComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('micuenta', {
                url: '/micuenta',
                component: 'appMicuenta'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default Micuenta;