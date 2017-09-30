'use strict';

import SolicitudSelloboliviaComponent from './solicitud.sellobolivia.component';

const User = angular
    .module('app.sellobolivia.solicitud', [])
    .component('appSelloboliviaSolicitud', SolicitudSelloboliviaComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('nuevoRegistroSello', {
                url: '/nuevoRegistroSello',
                component: 'appSelloboliviaSolicitud'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default User;