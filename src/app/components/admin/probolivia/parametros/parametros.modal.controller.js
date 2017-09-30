'use strict';
class ParametrosModalController {
  constructor($uibModalInstance, data, $sce, DataService, $log, Message, $state) {
    'ngInject';
    this.items = data;
    this.$uibModalInstance = $uibModalInstance;
    this.$sce = $sce;
    this.DataService = DataService;
    this.$log = $log;
    this.Message = Message;
    this.$state = $state;
  }

  $onInit() {
    this.selected = {
      item: this.items[0]
    };
    this.$log.log('Objeto que llega = ', this.items);
    this.isEdicion = true;

    if (angular.isUndefined(this.items.objeto)) {
      this.isEdicion = false;
    }
    this.parametro = this.items.objeto;

  }

  ok() {

    if (this.isEdicion) {
      this.DataService.put('parametros/' + this.parametro.id_parametro, this.parametro)
      .then(response => {
        if (response) {
          this.$log.log('Respuesta  ACTUALIZAR PARAMETRO= ', response);
          this.$uibModalInstance.close(this.selected.item);
          this.Message.success("Registro actualizado correctamente.");
          this.$state.reload();
        }
      });
    } else {
      this.parametro.grupo = this.items.grupo;
      this.DataService.post('parametros/', this.parametro)
      .then(response => {
        if (response) {
          this.$log.log('Respuesta  AGREGAR PARAMETRO= ', response);
          this.$uibModalInstance.close(this.selected.item);
          this.Message.success("Registro actualizado correctamente.");
          this.$state.reload();
        }
      });
    }





  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default ParametrosModalController;
