'use strict';

import appRechazadosImpPromuevecom from './rechazados.component_promueve';

const Ddjj = angular
        .module('app.rechazados_promueve', [])
        .component('appRechazadosImpPromuevecom', appRechazadosImpPromuevecom)
        .config(($stateProvider, $urlRouterProvider) => {
          $stateProvider
                  .state('rechazados_imp_promueve', {
                    url: '/tramitesRechazados',
                    component: 'appRechazadosImpPromuevecom'
                  })
          $urlRouterProvider.otherwise('/');

        })
        .name;

export default Ddjj;
