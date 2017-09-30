'use strict';

// import modalController from './ddjjdetalle.modal.controller.js';
// import modalTemplate from './ddjjdetalle.modal.html';

import modalobsController from './ddjjdetalle.modal.obs.controller.js';
import modalobsTemplate from './ddjjdetalle.modal.obs.html';

class DdjjdetalleController {
  constructor(Message, $scope, $log, Modal, Storage, DataService, Sidenav, $window, Loading) {
    'ngInject';
    this.Message = Message;
    this.$scope = $scope;
    this.$log = $log;
    this.Modal = Modal;
    this.Storage = Storage;
    this.DataService = DataService;
    this.Sidenav = Sidenav;
    this.$window = $window;
    this.Loading = Loading;
  }

  $onInit() {
    // this.$log.log(this)
    this.data = this.Storage.get('selloBolivia');
    if (!this.data && !angular.isObject(this.data)) {
      this.volver();
    }

    this.urls = {};

    this.DataService.pdfO(`cert_sello_bolivia/productos_shb/ddjj_sello_bolivia/${this.data.id_sello_bolivia}`)
    .then( response => {
      if (response) {
        this.urls.producto = response;
        this.iframe_url = response;
        this.cargarCertificado();
      }
    });
    
    this.$scope.$on('app_adm_sello_modal_obs_success', () => { this.volver(); });

  }

  cargarCertificado() {
    this.DataService.pdfO(`cert_sello_bolivia/productos_shb/ddjj_sello_bolivia/${this.data.id_sello_bolivia}/previsualizar_certificado`)
    .then( response => {
      if (response) {
        this.urls.certificado = response;
        // this.data.estado = 'APROBADO';
        // this.Storage.Set('selloBolivia', this.data);
        // this.iframe_url = response;      
        // this.urls.sw = true;
      }
    });
  }

  changePdf() {
    if (this.urls.sw) {
      this.urls.sw = false;
      this.iframe_url = this.urls.producto;
    } else {
      this.urls.sw = true;
      this.iframe_url = this.urls.certificado;
    }
    
  }

  esEdge() {
    var userAgent = this.$window.navigator.userAgent;
    var ieEDGE = userAgent.match(/Edge/g);
    var ie = userAgent.match(/.NET/g); // IE 11+
    var oldIE = userAgent.match(/MSIE/g);
    return ie || oldIE || ieEDGE;
  }

  descargarPdf(ruta, nombre) {
    this.DataService.pdfOfile(ruta, {})
    .then((response) => {
      if (response) {
        nombre = nombre.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_');//todos los caracteres
        //let nombreEmpresa = string = string.replace(/[^a-zA-Z0-9]/g,'_');//Solo numeros o letras
        var fileName = "" + nombre + ".pdf";
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = response;
        a.download = fileName;
        a.click();
        this.Message.success('Su documento esta siendo descargado.');
      }
    });
  }

  isEstado(cad) {
    cad = cad.split(', ')
    for (var i = 0; i < cad.length; i++) {
      if (cad[i]===this.data.estado)
        return true;
    }
    return false;
  }

   descargarCertificado() {
    var ruta = `certificaciones/generar_certificado/` + this.certificacion.id_certificacion;
    if (this.certificacion.estado === 'APROBADO') {
      ruta = `certificaciones/mostrar_certificado/` + this.certificacion.id_certificacion;
    }
    this.$log.log('Url de descarga file = ', ruta);
    this.DataService.pdfOfile(ruta, {})
    .then((response) => {
      if (response) {
        let nombreEmpresa = angular.copy(this.unidad_productiva.razon_social);
        nombreEmpresa = nombreEmpresa.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_');//todos los caracteres
//        let nombreEmpresa = string = string.replace(/[^a-zA-Z0-9]/g,'_');//Solo numeros o letras
        var fileName = "certificado_" + nombreEmpresa + ".pdf";
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = response;
        a.download = fileName;
        a.click();
      }
    });
  }

  observar(rechazar) {
    this.data.accion = rechazar||0;
    this.Modal.show({
      template: modalobsTemplate,
      controller: modalobsController,
      data: this.data,
      size: 'lg'
    });
  }

  aprobar() {
    // this.$log.log('aprobar sello');
    //Comentando metodo de aprobar, por si se aprueba en esta instancia
    this.Modal.confirm('¿Está seguro de aprobar el producto?', () => {
      var dataEnv = {
        estado: 'APROBADO',
        id_sello_bolivia: this.data.id_sello_bolivia,
        observacion: ''
      };
      this.DataService.put(`cert_sello_bolivia/evaluar_shb`,dataEnv)
      .then( response => {
        if (response) {
          this.Message.success();
          this.data.estado = 'APROBADO';
          this.Storage.set('selloBolivia', this.data);
        }
      });
    });
  }

  volver() {
    this.Sidenav.path('bandejaSolSello');
  }

}

export default DdjjdetalleController;
