'use strict';

import modalControllerT from './terminos.emp.modal.controller.js';
import modalTemplateT from './terminos.emp.modal.html';

import modalControllerC from './codigo-activacion.emp.modal.controller.js';
import modalTemplateC from './codigo-activacion.emp.modal.html';

class InscripcionEmpController {
    constructor(Modal, Auth, DataService, Storage, SidenavFactory, Message) {
        'ngInject';

        this.Modal = Modal;
        this.Auth = Auth;
        this.Storage = Storage;
        this.Message = Message;
        this.DataService = DataService;
        this.SidenavFactory = SidenavFactory;

        this.usuario = this.Storage.getUser();
        this.correo = this.usuario.email;
    }

    $onInit() {
        this.autofocus = true;
    }

    verTerminos () {
        this.Modal.show({
            template: modalTemplateT,
            controller: modalControllerT,
            data: {},
            size: 'lg'
        });
    }

    registrar() {
      this.DataService.put(`usuarios/${this.usuario.id_usuario}/confirmar_correo`, {
          email: this.correo
      }).then(response => {
          if (response) {
              // this.Message.success('¡Correo electrónico registrado!');
              this.Modal.show({
                  template: modalTemplateC,
                  controller: modalControllerC,
                  data: {
                      correo: this.correo,
                      usuario: this.usuario
                  },
                  keyboard: false
              });
          }
      });
    }

}

export default InscripcionEmpController;
