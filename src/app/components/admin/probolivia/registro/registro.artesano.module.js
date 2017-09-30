'use strict';

import RegistroArtesanoComponent from './registro.artesano.component';
import RegistroArtesanoModalComponent from './registro.artesano.modal.component';

const RegistroArt = angular
.module('app.registro', [])
.component('registroArtesano', RegistroArtesanoComponent)
.component('registroArtesanoModal', RegistroArtesanoModalComponent)
.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
  .state('registroArtesano', {
    url: '/registroArtesano',
    component: 'registroArtesano'
  })
  .state('confirmacion', {
    url: '/confirmacion',
    component: 'registroArtesanoModal'
  })
  ;
  $urlRouterProvider.otherwise('/');

})
.name;

export default RegistroArt;