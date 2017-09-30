'use strict';
class BandejapagoModalController {
  constructor($uibModalInstance, data, DataService, $log, $state, Storage) {
    'ngInject';
    this.items = data;
    this.$uibModalInstance = $uibModalInstance;
    this.DataService = DataService;
    this.$log = $log;
    this.$state = $state;
    this.Storage = Storage;
  }

  $onInit() {
    this.selected = {
      item: this.items[0]
    };
//    this.urlPdf = this.items.urlPdf;

    var xdate = new Date();
    if (this.Storage.exist('dateNow')) xdate = new Date(this.Storage.get('dateNow'));

    this.conf = {
      maxDate: xdate,
      minDate: new Date(xdate.getFullYear() - 1, xdate.getMonth(), xdate.getDate()),
      startingDay: 1,
      // showWeeks: false
    };
  }

  validateFechaDeposito(form) {
    if (this.obj.fecha_deposito) {
      form.fecha_deposito.$setValidity('min_date', !(this.obj.fecha_deposito < this.conf.minDate))
      form.fecha_deposito.$setValidity('max_date', !(this.obj.fecha_deposito > this.conf.maxDate))
    }
  }

  ok() {
    this.DataService.put(`certificaciones/${this.items.id_certificacion}/pagar`, this.obj).then(response => {
      if (response) {
        this.$state.reload();
        this.$uibModalInstance.close(this.selected.item);
      }
    });
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default BandejapagoModalController;
