'use strict';

import modalobsController from './modal_input/ddjjdetalle.modal.obs.controller.js';
import modalobsTemplate from './modal_input/ddjjdetalle.modal.obs.html';

class CertificacionProdController {
  constructor(NgTableParams, $log, Modal, Storage, DataService, $location, $sce) {
    'ngInject';
    this.NgTableParams = NgTableParams;
    this.$log = $log;
    this.Modal = Modal;
    this.Storage = Storage;
    this.DataService = DataService;
    this.$location = $location;
    this.$sce = $sce;
  }

  $onInit() {
    this.titulo = 'Nombre de página';
    this.prod = this.Storage.get('cert_prod');
    this.nombres_insumos_nacionales = (this.prod.insumos.map(function (x) {
      return x.descripcion;
    })).join(",");
    this.$log.log('Ingresandoooooooooooooooo', this.prod);
  }

  verDDJJProducto() {
    this.Modal.pdf("certificacion_promueve/" + this.prod.unidad_productiva.id_unidad_productiva + "/certificacion/" + this.prod.id_producto + "/ddjj_pdf");
  }

  volver() {
    this.$log.log('---Volvemos');
    this.$location.path('declaracionesJuradasPromueve');
  }

  aprobar() {
    this.Modal.confirm('¿Está seguro de aprobar la solicitud?', () => {
      this.$log.log('---Realizamos la aprobacion');
      var obj = {
        id_producto: this.prod.id_producto,
        evualuacion: "APROBADO",
        observacion: "",
      };

      this.DataService.post('certificacion_promueve/' + this.prod.fid_unidad_productiva + '/producto/evaluacion_solicitud', obj)
              .then(response => {
                if (response) {
                  this.$log.log('Respuesta***= ', response);
                  this.$location.path('declaracionesJuradasPromueve');
                }
              });
    });
//    this.$location.path('aprobProductoPromueve');
  }

  rechazar() {
    this.Modal.show({
      template: modalobsTemplate,
      controller: modalobsController,
      data: {
        titulo: "Rechazar",
        accion: "RECHAZADO",
        detalle_campo: "INGRESAR MOTIVO POR LA CUAL SE RECHAZA LA SOLICITUD",
        id_producto: this.prod.id_producto,
        id_unidad_productiva: this.prod.fid_unidad_productiva
      },
      size: 'lg'
    });
  }

  observar()
  {
    this.Modal.show({
      template: modalobsTemplate,
      controller: modalobsController,
      data: {
        titulo: "Observar",
        accion: "OBSERVADO",
        detalle_campo: "INGRESAR OBSERVACIÓN",
        id_producto: this.prod.id_producto,
        id_unidad_productiva: this.prod.fid_unidad_productiva
      },
      size: 'lg'
    });
  }
}

export default CertificacionProdController;