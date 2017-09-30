'use strict';

import VerificacionComponent from './verificacion.component';

const Verificacion = angular
.module('app.verificacion', [])
.component('verificacion', VerificacionComponent)
.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
  .state('verificacion', {
    url: '/verificacion',
    component: 'verificacion'
  })
  ;
  $urlRouterProvider.otherwise('/');

})
.name;

export default Verificacion;