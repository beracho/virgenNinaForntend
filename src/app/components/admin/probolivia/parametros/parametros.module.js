'use strict';

import ParametrosComponent from './parametros.component';

const Parametros = angular
    .module('app.parametros', [])
    .component('appParametros', ParametrosComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('configuracion', {
                url: '/configuracion',
                component: 'appParametros'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default Parametros;