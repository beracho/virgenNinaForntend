'use strict';

import BandejaComponent from './bandeja.promueve.component';

const Bandeja = angular
.module('app.promueve.bandeja', [])
.component('appBandejaPromueve', BandejaComponent)
.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
  .state('bandejaPromueve', {
    url: '/bandejaPromueve',
    component: 'appBandejaPromueve'
  });
  $urlRouterProvider.otherwise('/');
})
.name;
export default Bandeja;