'use strict';

import RegistroComponent from './registro.emp.component';
import './registro.emp.scss';

const Registro = angular
    .module('app.emp.registro', [])
    .component('appEmpRegistro', RegistroComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('registro', {
                url: '/registro',
                component: 'appEmpRegistro'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default Registro;
