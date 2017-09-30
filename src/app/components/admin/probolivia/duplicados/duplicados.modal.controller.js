'use strict';
class DuplicadosModalController {
  constructor($uibModalInstance, data, DataService, $log, $state, Storage, Loading) {
    'ngInject';
    this.items = data;
    this.$uibModalInstance = $uibModalInstance;
    this.DataService = DataService;
    this.$log = $log;
    this.$state = $state;
    this.Storage = Storage;
    this.Loading = Loading;
  }

  $onInit() {
    this.Loading.show('Cargando', true);
    this.selected = {
      item: this.items[0]
    };
//    this.urlPdf = this.items.urlPdf;

    var xdate = new Date();
    if (this.Storage.exist('dateNow'))
      xdate = new Date(this.Storage.get('dateNow'));

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

  solicitar() {
    this.$log.log('Solicitando duplicado', this.obj);

    this.DataService.post(`certificaciones/${this.items.id_certificacion}/duplicar`, this.obj).then(response => {
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

export default DuplicadosModalController;
