'use strict';
class DdjjdetalleobsModalController {
  constructor($rootScope ,$uibModalInstance, data, $log, DataService) {
    'ngInject';
    this.$rootScope = $rootScope;
    this.$uibModalInstance = $uibModalInstance;
    this.data = data;
    this.$log = $log;
    this.DataService = DataService;
    // this.Loading = Loading;
  }

  $onInit() {
    this.$log.log(this);    
    // this.Loading.show('Cargando', true);
    // this.selected = {
    //   item: this.items[0]
    // };
  }

  ok() {
    var dataEnv = {
      estado: this.data.accion? 'RECHAZADO':'OBSERVADO',
      id_sello_bolivia: this.data.id_sello_bolivia,
      observacion: this.observacion
    };

    this.DataService.put(`cert_sello_bolivia/evaluar_shb`,dataEnv)
    .then(response => {
      if (response) {
        this.cancel();
        this.$rootScope.$broadcast('app_adm_sello_modal_obs_success');
        // this.siguiente();
      }
    });
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default DdjjdetalleobsModalController;
