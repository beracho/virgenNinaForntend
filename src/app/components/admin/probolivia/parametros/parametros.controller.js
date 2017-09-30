'use strict';
import modalController from './parametros.modal.controller.js';
import modalTemplate from './parametros.modal.html';

class ParametrosController {
  constructor(NgTableParams, $log, Modal, Storage, DataService, Util, Message, $state) {
    'ngInject';
    this.NgTableParams = NgTableParams;
    this.$log = $log;
    this.Modal = Modal;
    this.Storage = Storage;
    this.DataService = DataService;
    this.Util = Util;
    this.Message = Message;
    this.$state = $state;
  }

  $onInit() {
    this.titulo = 'Nombre de página';
    this.grupo = '';
    this.cargarParametros('UNIDAD_MEDIDA');

  }

  cargarParametros(grupo) {
    this.grupo = grupo;
//    this.DataService.get("parametros/?grupo=UNIDAD_MEDIDA")
    this.DataService.get("parametros/?grupo=" + grupo)
    .then(response => {
      if (response) {
        this.tableParams1 = new this.NgTableParams({count: 10}, {dataset: response});
      }
    });
  }
  
  add() {
    this.Modal.show({
      template: modalTemplate,
      controller: modalController,
      data: {
        grupo: this.grupo,
        objeto: undefined
      }
    });
  }

  editar(item) {
    this.Modal.show({
      template: modalTemplate,
      controller: modalController,
      data: {
        grupo: this.grupo,
        objeto: angular.copy(item)
      }
    });
  }
  
  eliminar(item) {
    this.Modal.confirm('¿Desea eliminar este registro?', () => {
      this.DataService.delete('parametros/', item.id_parametro)
      .then(() => {
        this.Message.success('Su registro fue eliminado correctamente.');
        this.$state.reload();
      });
    });
  }

}

export default ParametrosController;