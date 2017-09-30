'use strict';

import DdjjPromueveComponent from './ddjj.component_promueve';

const Ddjj = angular
        .module('app.ddjjpromueve', [])
        .component('appDdjjPromuevecom', DdjjPromueveComponent)
        .config(($stateProvider, $urlRouterProvider) => {
          $stateProvider
                  .state('ddjj_promueve', {
                    url: '/declaracionesJuradasPromueve',
                    component: 'appDdjjPromuevecom'
                  })
          $urlRouterProvider.otherwise('/');

        })
        .name;

export default Ddjj;
