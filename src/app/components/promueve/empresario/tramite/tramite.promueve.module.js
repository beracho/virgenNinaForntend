'use strict';

import TramitePromueveComponent from './tramite.promueve.component';

const User = angular
    .module('app.promueve.tramite', [])
    .component('appPromueveTramite', TramitePromueveComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('tramite', {
                url: '/tramite',
                component: 'appPromueveTramite'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default User;