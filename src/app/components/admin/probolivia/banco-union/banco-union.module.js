'use strict';

import BancoUnionComponent from './banco-union.component';

const BancoUnion = angular
.module('app.banco-union', [])
.component('bancoUnion', BancoUnionComponent)
.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
  .state('actualizarBancoUnion', {
    url: '/actualizarBancoUnion',
    component: 'bancoUnion'
  })
  .state('actualizarBancoUnionPromueve', {
    url: '/actualizarBancoUnionPromueve',
    component: 'bancoUnion'
  });
  $urlRouterProvider.otherwise('/');
})
.name;

export default BancoUnion;