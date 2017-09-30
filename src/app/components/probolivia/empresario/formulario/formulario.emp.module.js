'use strict';

import FormularioEmpComponent from './formulario.emp.component';
import './formulario.emp.css';

const User = angular
    .module('app.emp.formulario', [])
    .component('appEmpFormulario', FormularioEmpComponent)
    .config(($stateProvider, $urlRouterProvider, statePrevs) => {
        statePrevs['formulario'] = ['matricula'];//solo puede venir de matricula
        $stateProvider
            .state('formulario', {
                url: '/formulario',
                component: 'appEmpFormulario'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default User;
