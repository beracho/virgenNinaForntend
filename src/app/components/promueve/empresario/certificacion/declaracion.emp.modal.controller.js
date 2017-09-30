'use strict';

class DashboardModalController {
  constructor($uibModalInstance, data, $log, Sidenav, DataService, CrudTable, Message) {
    'ngInject';

    this.items = data;
    this.$uibModalInstance = $uibModalInstance;
    this.Sidenav = Sidenav;
    this.Message = Message;
    this.$log = $log;
    this.DataService = DataService;

    this.data = angular.copy(data.data);
    this.id_unidad_productiva = data.id_unidad_productiva;
  }

  $onInit() {
    // this.$log.log(this);
    this.items.numero_dias = 2;
  }

  ok() {
    this.data.total_costo_bruto = this.data.total_costo_bruto || 0;
    this.data.total_valor_costo_bruto = this.data.total_valor_costo_bruto || 0;
    this.data.total_distribucion_nacional = 0;
    this.data.total_distribucion_extranjera = 0;

    delete this.data.pagos;
    delete this.data.insumos;
    delete this.data.certificacion;
    delete this.data.unidad_productiva;

    //realizar actualizacion
    this.DataService.put(`certificacion_promueve/${this.id_unidad_productiva}/producto/${this.data.id_producto}/enviar`, this.data)
    .then(response => {
      if (response) {
        // this.$log.log('Respuesta update certificacion= ', response);
        this.Message.success("Su solicitud fue enviada correctamente.");
        this.Sidenav.path('bandejaPromueve');
        this.$uibModalInstance.close();
      }
    });
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default DashboardModalController;