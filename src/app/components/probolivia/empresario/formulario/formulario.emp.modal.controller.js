'use strict';

class CodigoRegArtModalController {
  constructor($uibModalInstance, data, Modal, Auth, DataService, $location, Storage, SidenavFactory, Message, $log) {
    'ngInject';

    this.items = data;
    this.usuario = data.usuario;
    this.correo = data.correo;
    this.$uibModalInstance = $uibModalInstance;
    this.$location = $location;
    this.Modal = Modal;
    this.Auth = Auth;
    this.DataService = DataService;
    this.SidenavFactory = SidenavFactory;
    this.Storage = Storage;
    this.Message = Message;
    this.$log = $log;
  }

  $onInit() {
    this.focus = true;
    this.nroCuenta = '';
    this.DataService.get(`escalas_pagos?ambito=PROBOLIVIA`)
    .then(response => {
      if (response) {
        this.escalas = response;
        if (angular.isDefined(this.escalas) && this.escalas.length > 1){
          this.nroCuenta = this.escalas[0].formulario.nro_cuenta;
        }
      }
    });
  }

  cancel() {
    this.focus = false;
    this.$uibModalInstance.dismiss('cancel');
  }

}

export default CodigoRegArtModalController;