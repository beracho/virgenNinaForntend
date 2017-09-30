'use strict';

import VerificacionComponent from './certificacion.verificacion.component';


// modulo para verificacion de certificacion PM y SHB
const Verificacion = angular
.module('app.certificacion.verificacion', [])
.component('certificacionVerificacion', VerificacionComponent)
.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
  .state('certificacionVerificacion', {
    url: '/certificacion/verificar',
    component: 'certificacionVerificacion'
  })
  ;
  $urlRouterProvider.otherwise('/');

})
.name;

export default Verificacion;