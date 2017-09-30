'use strict';

import ImpProdComponent from './impresion_prom.component';

const AprobProd = angular
        .module('impresion_prom.module', [])
        .component('appImpProdPromuevecom', ImpProdComponent)
        .config(($stateProvider, $urlRouterProvider) => {
          $stateProvider
                  .state('apro_prod_promueve', {
                    url: '/impProductoPromueve',
                    component: 'appImpProdPromuevecom'
                  });
          $urlRouterProvider.otherwise('/');
        })
        .name;

export default AprobProd;