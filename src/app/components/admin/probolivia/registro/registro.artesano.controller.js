'use strict';

class RegistroArtesanoController {
  constructor(NgTableParams, $log, Modal, Storage, DataService, Auth, $location, Util, Message, authUrl, baseUrl, $http, Sidenav) {
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
    this.isGeneroOk = true;
    this.isTipoOk = true;
    this.isContrasenaOk = false;

    this.cantidadCaracteres = 8;
  }

  cleanEstiloGenero() {
    this.isGeneroOk = true;
  }

  cleanEstiloTipo() {
    this.isTipoOk = true;
  }

  registrarUsuario() {
//    if (angular.isUndefined(this.usuario.tipo)) {
//      this.Message.warning("Debe seleccionar tipo de usuario");
//      this.isTipoOk = false;
//      return;
//    }
    if (angular.isUndefined(this.usuario.email)) {
      this.Message.warning("Debe seleccionar un correo electrónico");
      return;
    }
    if (angular.isUndefined(this.usuario.contrasena)) {
      this.Message.warning("Debe seleccionar una contraseña");
      return;
    }
    if (this.usuario.contrasena.length < this.cantidadCaracteres || this.usuario.contrasenaConfirmacion.length < this.cantidadCaracteres) {
      this.Message.warning("Debe seleccionar una contraseña con " + this.cantidadCaracteres + " caracteres por lo menos.");
      return;
    }
    if (this.usuario.contrasena !== this.usuario.contrasenaConfirmacion) {
      this.Message.warning("Su confirmación de contraseña no coincide. Por favor, revise sus datos.");
      return;
    }
    this.usuario.usuario = this.usuario.email;
//    this.usuario.tipo = this.usuario.tipo;
    this.usuario.path = 'dashboard',
    this.usuario.pathLogin = 'login',
    this.usuario.menu = false,
    this.usuario.sidenav = false
    this.$log.log(this.usuario);
    this.Storage.set('usuarioartesano', this.usuario);

    this.DataService.post(this.baseUrl + 'crear_cuenta/', this.usuario)
    .then(response => {
      if (response) {
        this.Auth.signin(this.usuario);
      }
    })


  }

  validarInputs() {
    this.isContrasenaOk = false;

    if (angular.isUndefined(this.usuario.contrasena)) {
      this.mensaje1 = '';
      return;
    }

    if (this.usuario.contrasena.length < this.cantidadCaracteres) {
      this.mensaje1 = 'La contraseña debe tener como mínimo ' + this.cantidadCaracteres + ' dígitos';
      return;
    }

    this.mensaje1 = '';


    if (angular.isUndefined(this.usuario.contrasenaConfirmacion)) {
      this.mensaje2 = '';
      return;
    }
    if (this.usuario.contrasenaConfirmacion.length < this.cantidadCaracteres) {
      this.mensaje2 = 'La confirmación de contraseña debe tener como mínimo ' + this.cantidadCaracteres + ' dígitos';
      return;
    }
    this.mensaje2 = '';

    if (this.usuario.contrasena === this.usuario.contrasenaConfirmacion) {
      this.isContrasenaOk = true;
    }


  }

  volverLogin() {
    this.Modal.confirm('¿Desea volver al inicio de sesión?', () => {
      this.Sidenav.path("login");
    });
  }

}
export default RegistroArtesanoController;
