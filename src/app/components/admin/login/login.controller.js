'use strict';
import modalController from './login.modal.controller.js';
import modalTemplate from './login.modal.html';


class LoginController {

  constructor($rootScope, Storage, Message, timeSessionExpired, Auth, Modal, Filter, $location) {
    'ngInject';

    this.$rootScope = $rootScope;
    this.Storage = Storage;
    this.Message = Message;
    this.Auth = Auth;
    this.timeSessionExpired = timeSessionExpired;
    this.Modal = Modal;
    this.Filter = Filter;
    this.$location = $location;
    this.isTipoOk = true;
  }

 /* $onInit() {
    this.$rootScope.auth = false;
    this.nitCheck = true;
    this.isCorreoOk = true;

    if (this.Storage.exist('expired')) {
      this.Message.warning('Su sesión ha sido cerrada automáticamente después de ' + this.timeSessionExpired + ' minutos de inactividad.', null, 0);
      this.Storage.destroy('expired');
    }
    if (this.Storage.exist('menu') && this.Storage.existUser() && this.Storage.exist('token') && this.Storage.getUser().estado=='ACTIVO') {
      this.$rootScope.auth = true;
      this.$location.path(this.Storage.getUser().pathInicio);
    }

//    this.$log.log( '----->'+this.isValidEmail('asdasd@gmail.com')) ;
  }
  registrarCuenta() {
    this.$location.path('registroArtesano');
  }

  signinNIT() {
    this.Auth.signin({
      nit: !this.Filter.empty(this.nit) ? parseInt(this.nit, 10) + "" : this.nit,
      usuario: this.usuario,
      contrasena: this.contrasena,
      tipo: 'EMPRESARIO',
      path: 'empresa',
      pathLogin: 'login',
      menu: false,
      sidenav: false,
    });
  }*/

  signin() {
    this.Auth.signin({
      email: this.usuario2,
      usuario: this.usuario2,
      contrasena: this.contrasena2,
//    tipo: this.tipo,
      path: 'empresa',
      pathLogin: 'login',
      menu: false,
      sidenav: false,
    });
  }

  /*signinAdmin() {
    this.Auth.signin({
      usuario: this.usuario,
      contrasena: this.contrasena,
      path: 'dashboard',
      tipo: 'OPERADOR',
      pathLogin: 'loginAdmin'
    });
  }

  recovery() {
    this.flip = true;
  }

  goLogin() {
    this.flip = false;
  }

  cleanEstiloTipo() {
    this.isTipoOk = true;
  }

  validateMailKeyup() {
    if (angular.isUndefined(this.usuario2) || this.usuario2 === '') {
      this.isCorreoOk = true;
      return;
    }
    if (this.isValidEmail(this.usuario2)) {
      this.isCorreoOk = true;
    } else {
      this.isCorreoOk = false;
    }
  }

  isValidEmail(mail) {
    return     /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail);
  }
  
  olvidoContrasena() {
    this.Modal.show({
      template: modalTemplate,
      controller: modalController,
      data: {}
    });
  }




(function(window, angular, isUndefined){
  angular.module('app')
  .controller('loginCtrl',['$scope','$http'],function($scope,$http){
    $scope.login = function(user){
      $http.post('/api/user/create',user).then(function(response){
        console.log(response)
      }, function(err){
        console.error(err);
      })
    };
  })
})(window,window.angular);*/
}export default LoginController;