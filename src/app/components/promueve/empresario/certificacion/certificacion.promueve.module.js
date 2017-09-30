'use strict';

import CertificacionPromueveComponent from './certificacion.promueve.component';
import './certificacion.css';

const User = angular
    .module('app.promueve.certificacion', [])
    .component('appPromueveCertificacion', CertificacionPromueveComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('certificacion', {
                url: '/certificacion',
                component: 'appPromueveCertificacion'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default User;