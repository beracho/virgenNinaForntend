'use strict';
class DdjjPromueveController {
  constructor(NgTableParams, Modal, Storage, DataService, $location, Util, baseUrl) {
    'ngInject';
    this.NgTableParams = NgTableParams;
    this.Modal = Modal;
    this.Storage = Storage;
    this.DataService = DataService;
    this.$location = $location;
    this.Util = Util;
    this.baseUrl = baseUrl;
  }

  $onInit() {
    this.titulo = 'Nombre de página';
    this.cargarTabla();
  }

  refresh() {
    this.cargarTabla();
  }
  
  cargarTabla()
  {
    this.DataService.get('certificacion_promueve/certificaciones/impresiones').then(response => {
      this.items = response;
    });
  }

  verDetalleSolicitud(item) {
    this.Storage.set('print_prod', item);
    this.$location.path('impProductoPromueve');
  }
}
export default DdjjPromueveController;