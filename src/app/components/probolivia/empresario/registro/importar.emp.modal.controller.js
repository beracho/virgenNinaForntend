'use strict';

class ImportarModalController {
  constructor($uibModalInstance, data, $log, $scope, DataService, Message, Util) {
    'ngInject';

    this.data = data;
    this.conf = data.conf;
    this.onSave = data.onSave;
    this.id_certificacion = data.id_certificacion;
    this.$uibModalInstance = $uibModalInstance;
    this.$log = $log;
    this.$scope = $scope;
    this.DataService = DataService;
    this.Message = Message;
    this.Util = Util;
  }

  $onInit() {
    // this.$log.log(angular.copy(this.data));
    this.$log.log(this);
    this.url = {
      importar: this.DataService.getUrl(`certificaciones/${this.data.certificacion.id_certificacion}/activos_productivos/importar`),
    };

    this.DataService.file(`ejemplo_activos_productivos`, 'application/csv')
    .then( response => {
      this.url.csv = response;
    })

    this.csv = {
      onCompleteItem: (fileItem, response, status/*, headers, reset*/) => {
          // this.$log.log(fileItem, response, status, headers, reset);
          if (status === 200) {
            this.data.activosLoad();
            this.Message.success("El archivo CSV se importó satisfactoriamente.");
            this.cancel();
              // if(response.finalizado === true) {
              //     vm.errors = null;
              //     vm.success = true;
              //     mostrarCamposOcultos();
              //     // setTimeout(function () {
              //     //     angular.element('#btn-refresh-crudtable').click();
              //     // }, 1000);
              //     vm.cancel();
              //
              //     $state.reload();
              //     Storage.set('id_sucursal', vm.data.id_sucursal);
              // } else { // finalizado con errores
              //     setTimeout(function () {
              //         angular.element('#btn-refresh-crudtable').click();
              //     }, 500);
              //     vm.tabs = [true, true, false];
              //     vm.selectedIndex = vm.max - 1;
              //     vm.upload = false;
              //     vm.tipo_error = response.datos.tipo_error;
              //     vm.errors = response.datos.errores;
              // }
          } else {
              this.Message.error(response.mensaje? response.mensaje : 'Ocurrió un error desconocido al importar.');
              // reset();
              // vm.cancel();
              // prev();
          }
      }
    }

  }

  cancel() {
    this.$uibModalInstance.close();
    // this.$uibModalInstance.dismiss('cancel');
  }

  onAfterAddingFile() {
      // var $content = angular.element('#file-upload-step2');
      // setTimeout(function () {
      //     $content.parent().scrollTop($content.height());
      // }, 100);
  }

}

export default ImportarModalController;
