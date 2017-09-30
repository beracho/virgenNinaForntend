'use strict';

class RegistroModalController {
  constructor($uibModalInstance, data, $log, Storage, DataService) {
    'ngInject';

    this.empresa = data.empresa;
    this.sucursales = this.empresa.hist_sucursales;
    this.$uibModalInstance = $uibModalInstance;
    this.$log = $log;
    this.Storage = Storage;
    this.DataService = DataService;
  }

  $onInit() {

  }

  ok() {
    this.$uibModalInstance.close();
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  seleccionarSucursal(tab) {
    this.sucursal = tab;
  }

}

export default RegistroModalController;
