'use strict';

import BandejaComponent from './bandeja.component';

const Bandeja = angular
.module('app.bandeja', [])
.component('appBandejacom', BandejaComponent)
.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
  .state('bandeja', {
    url: '/bandeja',
    component: 'appBandejacom'
  });
  $urlRouterProvider.otherwise('/');
})
.name;
export default Bandeja;