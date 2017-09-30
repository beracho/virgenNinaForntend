'use strict';

import DdjjCertProdComponent from './certificacion_prom.component';

const DdjjProd = angular
        .module('app.ddjj_prodpromueve', [])
        .component('appDdjjProdPromuevecom', DdjjCertProdComponent)
        .config(($stateProvider, $urlRouterProvider) => {
          $stateProvider
                  .state('ddjj_prod_promueve', {
                    url: '/decDdjjProductoPromueve',
                    component: 'appDdjjProdPromuevecom'
                  })
          $urlRouterProvider.otherwise('/');
        })
        .name;

export default DdjjProd;