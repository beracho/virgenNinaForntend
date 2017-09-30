'use strict';
class DdjjdetalleobsModalController {
  constructor($uibModalInstance, data, $sce, $log, DataService, $state, $location) {
    'ngInject';
    this.items = data;
    this.$uibModalInstance = $uibModalInstance;
    this.$sce = $sce;
    this.$log = $log;
    this.DataService = DataService;
    this.$state = $state;
    this.$location = $location;
    // this.Loading = Loading;
  }

  $onInit() {
    // this.Loading.show('Cargando', true);
    this.selected = {
      item: this.items[0]
    };
  }

  ok() {
    var obj = {
      "observaciones_secciones": this.items.arrayObs,
      "observaciones": this.observacion
    };
    this.DataService.put('certificaciones/' + this.items.id_certificacion + '/observar/', obj)
    .then(response => {
      if (response) {
        this.$location.path('declaracionesJuradas');
        this.$uibModalInstance.close(this.selected.item);
      }
    });

    this.$uibModalInstance.close(this.selected.item);
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default DdjjdetalleobsModalController;
