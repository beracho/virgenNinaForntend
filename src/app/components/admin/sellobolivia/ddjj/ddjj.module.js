'use strict';

import appSelloboliviaDdjj from './ddjj.component';

const Ddjj = angular
        .module('app.adm.sellobolivia.ddjj', [])
        .component('appSelloboliviaDdjj', appSelloboliviaDdjj)
        .config(($stateProvider, $urlRouterProvider) => {
          $stateProvider
                  .state('bandejaSolSello', {
                    url: '/bandejaSolSello',
                    component: 'appSelloboliviaDdjj'
                  })
          $urlRouterProvider.otherwise('/');

        })
        .name;

export default Ddjj;
