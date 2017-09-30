'use strict';

// import modalControllerC from './registro.artesano.modal.controller.js';
// import modalTemplateC from './registro.artesano.modal.html';

class BancoUnionController {
  constructor($log, Modal, Storage, $http, Sidenav, Util, Message, rdxUrl) {
    'ngInject';
    this.$log = $log;
    this.Modal = Modal;
    this.Storage = Storage;
    this.$http = $http;
    this.Sidenav = Sidenav;
    this.Util = Util;
    this.Message = Message;
    this.rdxUrl = rdxUrl;
    this.data = {}; //datos de formluario
  }

  $onInit() {
    // this.$log.log(this);
    this.loadConfForm();
  }

  loadConfForm() {
    this.conf = {
      nro_cuenta: {
        visible: true,
        // label: 'Nro. de cuenta',
        label: 'N° de Usuario o Tarjeta ',
        requerido: true
      },
      contrasena: {
        visible: true,
        // label: 'Contraseña',
        label: 'Clave de Acceso',
        requerido: true
      },
      rdx: {
        visible: true,
        label: 'Código RDX generado',
        requerido: true,
        disabled: true
      }
    }
  }

  // atras() {

  // }

  enviar(form) {
      // console.log(form);
      if (form.$valid) {
        this.Modal.confirm('¿Esta seguro de enviar los datos?', () => {
          var dataSend = {
            usuario: this.data.nro_cuenta,
            clave: this.data.contrasena,
            rdx: this.Util.generarRdxBancoUnion(this.data.nro_cuenta, this.data.contrasena)
          };
          this.$http.post(this.rdxUrl, dataSend)
          .then( function (response) {
            if (response.status == 201) {
              this.Message.success();
            }
          })
          .catch( function (error) {
            if (error.status==400) {
              this.Message.error('Hubo un error en la petición');
            } else if (error.status==500) {
              this.Message.error(this.errorMessage[error.status]);
            }
          })
        })
      } else {
        this.Message.warning('Debe corregir los errores de los campos marcados con rojo.');
      }
    }



}
export default BancoUnionController;
