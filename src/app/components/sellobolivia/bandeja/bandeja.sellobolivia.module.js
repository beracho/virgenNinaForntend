'use strict';

import BandejaComponent from './bandeja.sellobolivia.component';

const Bandeja = angular
.module('app.sellobolivia.bandeja', [])
.component('appBandejaSello', BandejaComponent)
.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
  .state('bandejaSello', {
    url: '/bandejaSello',
    component: 'appBandejaSello'
  });
  $urlRouterProvider.otherwise('/');
})
.name;
export default Bandeja;