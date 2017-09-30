'use strict';

class MicuentaController {
  constructor(apiUrl, Message, Modal, $log, Storage, DataService, Sidenav) {
    'ngInject';

    this.dt = new Date();
    this.Message = Message;
    this.Modal = Modal;
    this.apiUrl = apiUrl;
    this.$log = $log;
    this.Storage = Storage;
    this.DataService = DataService;
    this.Sidenav = Sidenav;
  }

  $onInit() {
    this.usuario = this.Storage.getUser();
    this.isPass = true;
    this.isCoinciden = false;
    this.autChange = false;
    if (angular.isUndefined(this.usuario.nit)) {
      this.autChange = true;
    } else {
      this.autChange = false;
    }
  }

  validarCampos(data) {
//    this.$log.log('validar campos = ', data);
    if (angular.isDefined(data)) {
      if (data.length < 8) {
        //no mostramos mensaje
        return true;
      } else {
        return false;
      }
    }
  }

  coincidenciaCampos() {
    if (this.validarCampos(this.contrasenaNueva)) {
      return;
    }
    if (this.validarCampos(this.contrasenaConfirmacion)) {
      return;
    }
    if (this.contrasenaNueva === this.contrasenaConfirmacion) {
      this.isCoinciden = true;
    } else {
      this.isCoinciden = false;
    }
  }

  cambiarContrasena() {
    var obj = {
      "contrasena": this.contrasena,
      "contrasena_nueva": this.contrasenaNueva
    };
    this.DataService.put('mypass', obj)
    .then(response => {
      if (response) {
        this.$log.log('Respuesta ---- ', response);
        // this.Sidenav.path("bandeja");
        this.Message.success('Su contraseña fue cambiada correctamente.');
      }
    });
  }

  openMessage(type) {
    this.Message[type]();
  }

  openAlert() {
    this.Modal.alert('¡Hola mundo!');
  }

  openConfirm() {
    this.Modal.confirm('¿Está seguro de continuar?', () => {
      this.Modal.alert("Hola!!!");
    });
  }
}

export default MicuentaController;
