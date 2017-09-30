'use strict';

import appSolicitudesImpPromuevecom from './solicitudes.component_promueve';

const Ddjj = angular
        .module('app.sol_imp_promueve', [])
        .component('appSolicitudesImpPromuevecom', appSolicitudesImpPromuevecom)
        .config(($stateProvider, $urlRouterProvider) => {
          $stateProvider
                  .state('solicitudes_imp_promueve', {
                    url: '/certificaciones',
                    component: 'appSolicitudesImpPromuevecom'
                  })
          $urlRouterProvider.otherwise('/');

        })
        .name;

export default Ddjj;
