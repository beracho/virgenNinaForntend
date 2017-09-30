'use strict';

class CertificacionModalController {
  constructor($uibModalInstance, data, $log, $scope, DataService, Message, Util, Loading, Modal, Storage, Sidenav) {
    'ngInject';

    this.producto = data.producto;
    this.$uibModalInstance = $uibModalInstance;
    this.$log = $log;
    this.DataService = DataService;
    this.Message = Message;
    this.Util = Util;
    this.Loading = Loading;
    this.opciones_lugar = ['Etiquetas', 'Envases', 'Carteles', 'Videos', 'Películas'];
    this.Modal = Modal;
    this.Storage = Storage;
    this.Sidenav = Sidenav;
    this.usuario = this.Storage.getUser();
  }

  $onInit() {
    // this.$log.log(angular.copy(this.data));
    // this.$log.log(this);
    this.DataService.get(`cert_sello_bolivia/unidades`)
    .then( response => {
      if (response && response.results.length) {
        // this.cargarConfCertificados();
        this.unidades = response.results;
      } else {
        this.modo_solo_shb = 1;
        if (this.usuario.nit) {
            this.DataService.get(`servicios/matriculas/${this.usuario.nit}`)
            .then(response => {
                if (response && response.matriculas && response.matriculas.length) {
                    this.matriculas = response.matriculas;
                }
            });
        }
      }
    })
  }

  crearSolicitudSello(item) {
    this.$log.log(item);
    this.Modal.confirm(
        'Usted va a crear una solicitud de sello Hecho en Bolivia para un nuevo producto, ¿desea continuar?',
        () => {
            this.DataService.post(`certificacion_promueve/${item.id_unidad_productiva}/producto`, {
                tipo_producto: 'BIEN_PRODUCIDO',
                nombre_producto: 'PRODUCTO PARA SELLO',
                shb: true
            }).then(response => {
                if (response) {
                    this.Storage.set('matriculaPromueve', { id_unidad_productiva:item.id_unidad_productiva });
                    this.Storage.set('producto', response);
                    this.Sidenav.path('certificacion');
                    this.cancel();
                }
            });
        }
    );
  }

  crearSolicitud(matricula) {
    // crear form 7
    var data = { fid_formulario: 7, tipo: 'REGISTRO', ambito: 'SELLO_BOLIVIA' };
    if (matricula) data.matricula_comercio = matricula;
    this.DataService.post(`certificaciones`, data)
    .then( response => {
        if (response) {
            this.Storage.setSession('certificacion', response.certificacion.id_certificacion);
            this.Sidenav.path('registro');
            this.cancel();
        }
    });
  }

  cancel() {
    this.$uibModalInstance.close();
    // this.$uibModalInstance.dismiss('cancel');
  }

}

export default CertificacionModalController;
