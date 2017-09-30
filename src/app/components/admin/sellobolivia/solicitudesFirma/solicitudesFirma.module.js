'use strict';

import appSelloboliviaSolicitudesFirma from './solicitudesFirma.component';

const SolicitudesFirma = angular
        .module('app.adm.sellobolivia.solicitudesfirma', [])
        .component('appSelloboliviaSolicitudesFirma', appSelloboliviaSolicitudesFirma)
        .config(($stateProvider, $urlRouterProvider) => {
          $stateProvider
                  .state('solicitudesFirmaSHB', {
                    url: '/solicitudesFirmaSHB',
                    component: 'appSelloboliviaSolicitudesFirma'
                  })
          $urlRouterProvider.otherwise('/');

        })
        .name;

export default SolicitudesFirma;
