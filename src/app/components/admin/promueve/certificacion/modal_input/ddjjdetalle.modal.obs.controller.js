'use strict';
class DdjjProddetalleobsModalController {
  constructor($uibModalInstance, data, $sce, $log, DataService, $state, $location) {
    'ngInject';
    this.data = data;
    this.$uibModalInstance = $uibModalInstance;
    this.$sce = $sce;
    this.$log = $log;
    this.DataService = DataService;
    this.$state = $state;
    this.$location = $location;
  }

  $onInit() {
  }

  ok() {
    var request=
    {
      id_producto:this.data.id_producto,
      evualuacion:this.data.accion,
      observacion:this.observacion
    };
    this.DataService.post('certificacion_promueve/'+this.data.id_unidad_productiva+'/producto/evaluacion_solicitud', request).then(response => {
      if (response) {
        this.$uibModalInstance.close();
        this.$location.path('declaracionesJuradasPromueve');
      }
    });

    this.$uibModalInstance.close();
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default DdjjProddetalleobsModalController;