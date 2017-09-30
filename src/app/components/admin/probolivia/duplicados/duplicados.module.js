'use strict';

import DuplicadosComponent from './duplicados.component';
import DuplicadosacreditarComponent from './duplicaracreditar.component';

const Duplicados = angular
.module('app.duplicados', [])
.component('bandejaDuplicados', DuplicadosComponent)
.component('duplicarAcreditar', DuplicadosacreditarComponent)
.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
  .state('bandejaDuplicados', {
    url: '/bandejaDuplicados',
    component: 'bandejaDuplicados'
  })
  .state('duplicarAcreditar', {
    url: '/duplicarAcreditar',
    component: 'duplicarAcreditar'
  })
  ;
  $urlRouterProvider.otherwise('/');

})
.name;

export default Duplicados;