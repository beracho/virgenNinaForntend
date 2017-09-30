'use strict';

import MatriculaEmpComponent from './matricula.emp.component';
import './matricula.emp.css';

const User = angular
    .module('app.emp.matricula', [])
    .component('appEmpMatricula', MatriculaEmpComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('matricula', {
                url: '/matricula',
                component: 'appEmpMatricula'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default User;