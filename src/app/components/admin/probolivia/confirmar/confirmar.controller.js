'use strict';

// import modalControllerC from './registro.artesano.modal.controller.js';
// import modalTemplateC from './registro.artesano.modal.html';

class ConfirmarController {
  constructor(NgTableParams, $log, Modal, Storage, DataService, Auth, $location, Util, Message, authUrl,  $http, Sidenav, baseUrl) {
    'ngInject';
    this.NgTableParams = NgTableParams;
    this.$log = $log;
    this.Modal = Modal;
    this.Storage = Storage;
    this.DataService = DataService;
    this.Auth = Auth;
    this.$location = $location;
    this.Util = Util;
    this.Message = Message;
    this.$http = $http;
    this.baseUrl = baseUrl;
    this.Sidenav = Sidenav;
  }

  $onInit() {
    this.titulo = 'Nombre de página';
    this.isContrasenaIgual = false;
    this.isContrasenaMinor = true;

    //has-value has-success has-warning
    this.cssInput = 'has-value';
    this.cssInput1 = 'has-value';
    this.cantidadCaracteres = 8;

    //datos de registro por get
    this.codigo = this.$location.search().codigo;
    this.nombreUsuario = this.$location.search().usuario;
  }

  cleanEstiloGenero() {
    this.isGeneroOk = true;
  }

  compararContrasenas() {
    //validaciones
    if ((angular.isUndefined(this.usuario.contrasena)) || (this.usuario.contrasena === '')
    ) {
//        || (angular.isUndefined(this.usuario.contrasenaConfirmacion)) || (this.usuario.contrasenaConfirmacion === '')
      this.isContrasenaIgual = false;
      this.cssInput = 'has-value';
      this.cssInput1 = 'has-value';
      return;
    }

    if (angular.isDefined(this.usuario.contrasena)) {

      if (this.usuario.contrasena.length < this.cantidadCaracteres) {
        this.cssInput = 'has-warning';
        return;
      }
    }

    if (angular.isDefined(this.usuario.contrasenaConfirmacion)) {
      if (this.usuario.contrasenaConfirmacion.length < this.cantidadCaracteres) {
        this.cssInput1 = 'has-warning';
        return;
      }
    }
    //validaion de contrasenas
    if (this.usuario.contrasena === this.usuario.contrasenaConfirmacion) {
      this.isContrasenaIgual = true;
      this.cssInput = 'has-success';
      this.cssInput1 = 'has-success';
    } else {
      this.isContrasenaIgual = false;
      this.cssInput = 'has-value';
      this.cssInput1 = 'has-value';
    }

  }

  actualizarContrasena() {
    this.$log.log('actualizamos contrasena:');
    var obj = {
      "usuario": this.nombreUsuario,
      "codigo": this.codigo,
      "contrasena": this.usuario.contrasena
    };
    this.$log.log('Objeto para actualizar:', obj);
    this.DataService.post(this.baseUrl+'usuarios/activar', obj)
    .then(response => {
      if (response) {
        this.$log.log('respuesta del post:', response);

//        this.Sidenav.path("login");
        //logueamos al usuario

        this.usuariologin = {};
        this.usuariologin.usuario = this.nombreUsuario;
//        this.usuariologin.usuario = response.email;
        this.usuariologin.email = response.email;
        this.usuariologin.tipo = 'OPERADOR';
        this.usuariologin.path = 'dashboard',
        this.usuariologin.pathLogin = 'loginAdmin',
        this.usuariologin.menu = false,
        this.usuariologin.sidenav = false,
        this.usuariologin.contrasena = this.usuario.contrasena

        this.$log.log('enviaando a autenticacion: ', this.usuariologin);

        this.Auth.signin(this.usuariologin);

      }
    });

  }

}
export default ConfirmarController;
