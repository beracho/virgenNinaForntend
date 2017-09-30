'use strict';

import MatriculaPromueveComponent from './matricula.promueve.component';
import MatriculaPromueveService from './matricula.promueve.service';

const User = angular
    .module('app.promueve.matricula', [])
    .component('appPromueveMatricula', MatriculaPromueveComponent)
    .service('MatriculaPromueve', MatriculaPromueveService)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('matriculaPromueve', {
                url: '/matriculaPromueve',
                component: 'appPromueveMatricula'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default User;