'use strict';

import CorreccionesComponent from './correcciones.component';


const Correcciones = angular
.module('app.correcciones', [])
.component('correcciones', CorreccionesComponent)
.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
  .state('correcciones', {
    url: '/correcciones',
    component: 'correcciones'
  })
  ;
  $urlRouterProvider.otherwise('/');

})
.name;

export default Correcciones;