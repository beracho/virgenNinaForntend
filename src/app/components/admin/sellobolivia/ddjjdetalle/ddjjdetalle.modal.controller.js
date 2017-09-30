'use strict';
class DdjjdetalleModalController {
  constructor($uibModalInstance, data, $sce, DataService, $log) {
    'ngInject';
    this.items = data;
    this.$uibModalInstance = $uibModalInstance;
    this.$sce = $sce;
    this.DataService = DataService;
    this.$log = $log;
  }

  $onInit() {
    this.selected = {
      item: this.items[0]
    };
    this.urlPdf = this.items.urlPdf;
  }

  ok() {
    this.$uibModalInstance.close(this.selected.item);
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default DdjjdetalleModalController;
