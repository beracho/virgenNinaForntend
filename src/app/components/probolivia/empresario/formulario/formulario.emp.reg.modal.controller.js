'use strict';

class CodigoRegArtModalController {
  constructor($uibModalInstance, data, Modal, Auth, DataService, $location, Storage, SidenavFactory, Message, $log, Sidenav) {
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
    this.Sidenav = Sidenav;
  }

  $onInit() {
    this.focus = true;
    this.$log.log('--->Modal pregunta', this.items);

  }

  renovacion() {
    this.items.tipo = 'RENOVACION';
    this.DataService.post(`certificaciones`, this.items)
    .then(response => {
      if (response) {
        this.Storage.setSession('certificacion', response.certificacion.id_certificacion);
        this.Sidenav.path('registro');
        this.$uibModalInstance.dismiss('cancel');
      }
    });
  }

  nuevo() {
    this.items.tipo = 'REGISTRO';
    this.DataService.post(`certificaciones`, this.items)
    .then(response => {
      if (response) {
        this.Storage.setSession('certificacion', response.certificacion.id_certificacion);
        this.Sidenav.path('registro');
        this.$uibModalInstance.dismiss('cancel');
      }
    });
  }

  cancel() {
    this.focus = false;
    this.$uibModalInstance.dismiss('cancel');
  }

}

export default CodigoRegArtModalController;
