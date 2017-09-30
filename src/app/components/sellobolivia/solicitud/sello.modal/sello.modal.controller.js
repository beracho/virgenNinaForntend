'use strict';

class SelloModalController {
  constructor($rootScope, $uibModalInstance, data, $log, DataService, Message, Loading) {
    'ngInject';

    this.producto = data.producto;
    this.$rootScope = $rootScope;
    this.$uibModalInstance = $uibModalInstance;
    this.$log = $log;
    this.DataService = DataService;
    this.Message = Message;
    this.Loading = Loading;
    this.opciones_lugar = ['Etiquetas', 'Envases', 'Carteles', 'Videos', 'Películas'];
  }

  $onInit() {
    // this.$log.log(angular.copy(this.data));
    // this.$log.log(this);
    
    if (this.producto.lugar_sello) {
      this.producto.lugar_sello = this.producto.lugar_sello.split('|');
      this.opciones_lugar.forEach( (it, i) => {
        if (this.producto.lugar_sello.indexOf(it)+1) {
          this.producto['lugar_sello'+i] = true;
        }
      })
      if (!(this.opciones_lugar.indexOf(this.producto.lugar_sello[this.producto.lugar_sello.length-1])+1)) {
        this.producto.lugar_sello_otro = this.producto.lugar_sello[this.producto.lugar_sello.length-1];
      } 
    }
  }

  save() {
    // this.$log.log(form);
    var data = {};
    data.id_producto = this.producto.id_producto;
    data.lugar_sello = [];
    this.opciones_lugar.forEach( (it, i) => {
      if (this.producto['lugar_sello'+i]) {
        data.lugar_sello.push(it);  
      }
    })
    if (this.producto.lugar_sello_otro) {
      data.lugar_sello.push(this.producto.lugar_sello_otro);
    }  

    if (data.lugar_sello.length) {
      data.lugar_sello = data.lugar_sello.join('|');
      this.Loading.show('Cargando', true);
      this.DataService.post(`cert_sello_bolivia/generar_sello_de_promueve`, data)
      .then(response => {
        if (response) {
          this.Message.success();         
          this.cancel();
          this.Loading.show('Cargando', false);
          this.$rootScope.$broadcast('app_sello_modal_success');
        }
      });
    } else {
      this.Message.error('Debe especificar al menos un lugar de aplicación del sello.')
    }
  }

  cancel() {
    this.$uibModalInstance.close();
    // this.$uibModalInstance.dismiss('cancel');
  }
}

export default SelloModalController;
