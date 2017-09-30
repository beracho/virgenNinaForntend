'use strict';

import appSelloboliviaDdjjDetalle from './ddjjdetalle.component';

const Ddjj = angular
        .module('app.adm.sellobolivia.ddjjdetalle', [])
        .component('appSelloboliviaDdjjDetalle', appSelloboliviaDdjjDetalle)
        .config(($stateProvider, $urlRouterProvider) => {
          $stateProvider
                  .state('detalleSolicitudSello', {
                    url: '/detalleSolicitudSello',
                    component: 'appSelloboliviaDdjjDetalle'
                  })
          $urlRouterProvider.otherwise('/');

        })
        .name;

export default Ddjj;
