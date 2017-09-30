'use strict';

import DuplicarComponent from './duplicar.component';

const Duplicacion = angular
.module('app.duplicado', [])
.component('duplicado', DuplicarComponent)
.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
  .state('duplicado', {
    url: '/duplicado',
    component: 'duplicado'
  })
  ;
  $urlRouterProvider.otherwise('/');

})
.name;

export default Duplicacion;