'use strict';

import CertificadoEmpComponent from './certificado.emp.component';
import './certificado.emp.css';

const User = angular
    .module('app.emp.certificado', [])
    .component('appEmpCertificado', CertificadoEmpComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('certificado', {
                url: '/certificado',
                component: 'appEmpCertificado'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default User;