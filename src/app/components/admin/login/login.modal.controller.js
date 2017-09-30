'use strict';
class ProgramaModalController {
  constructor($uibModalInstance, data, $log, $scope, DataService, Message, Util, Loading, Sidenav, baseUrl) {
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
    this.Loading = Loading;
    this.Sidenav = Sidenav;
    this.baseUrl = baseUrl;
  }

  $onInit() {
    this.$log.log("Data recibido = ", this.data);


  }

  cancel() {
    this.$uibModalInstance.close();
  }

  enviar() {
    this.$log.log("--> Enviamos los datos");
//    this.DataService.put(`ong/${this.data.id_ong}/enviar`)
    var obj = {
      usuario: this.email
    };
    this.DataService.post(this.baseUrl + 'usuarios/restore', obj)
    .then(response => {
      if (response) {
        this.$uibModalInstance.close();
        this.Message.success("Se envío un correo a: " + this.email + "");
//        this.Sidenav.path("login");
        this.$uibModalInstance.close();
      }
    });
  }

}
export default ProgramaModalController;
