'use strict';

import InscripcionEmpComponent from './inscripcion.emp.component';
import './inscripcion.emp.css';

const User = angular
    .module('app.emp.inscripcion', [])
    .component('appEmpInscripcion', InscripcionEmpComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('inscripcion', {
                url: '/inscripcion',
                component: 'appEmpInscripcion'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default User;