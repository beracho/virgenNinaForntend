'use strict';

import SolicitudPromueveComponent from './solicitud.promueve.component';
import './solicitud.css';

const User = angular
    .module('app.promueve.solicitud', [])
    .component('appPromueveSolicitud', SolicitudPromueveComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('solicitud', {
                url: '/solicitud',
                component: 'appPromueveSolicitud'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default User;