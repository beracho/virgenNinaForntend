'use strict';
class DuplicarModalController {
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
    if (this.Storage.exist('dateNow'))
      xdate = new Date(this.Storage.get('dateNow'));

    this.conf = {
      maxDate: xdate,
      minDate: new Date(xdate.getFullYear() - 1, xdate.getMonth(), xdate.getDate()),
      startingDay: 1,
      // showWeeks: false
    };
    this.DataService.get(`certificaciones/${this.items.id_certificacion}/escala`)
    .then(response => {
      if (response) {
        this.$log.log('Monto = ', response);
        this.escalaPago = parseInt(response+"");
      }
    });
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
  
  numberFormat(amount, decimals) {

    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0)
      return parseFloat(0).toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split('.'),
    regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
      amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

    return amount_parts.join('.');
  }
  
}

export default DuplicarModalController;
