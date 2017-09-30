'use strict';

class DashboardModalController {
  constructor($uibModalInstance, data, $log, Sidenav, DataService, Storage) {
    'ngInject';

    this.items = data;
    this.$uibModalInstance = $uibModalInstance;
    this.Sidenav = Sidenav;
    this.$log = $log;
    this.DataService = DataService;
    this.Storage = Storage;
  }

  $onInit() {
    this.user = this.Storage.getUser();
  }

  ok() {
    //realizar actualizacion
    var obj = {};
    this.DataService.put('certificaciones/' + this.items.id_certificacion + '/enviar/', obj)
    .then(response => {
      if (response) {
        this.Sidenav.path('bandeja');
        this.$uibModalInstance.close();
      }
    });
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default DashboardModalController;
