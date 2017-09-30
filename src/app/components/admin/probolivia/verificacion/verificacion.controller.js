'use strict';

// import modalControllerC from './registro.artesano.modal.controller.js';
// import modalTemplateC from './registro.artesano.modal.html';

class VerificacionController {
  constructor(NgTableParams, $log, Modal, Storage, DataService, Auth, $location, Util, Message, authUrl, $http, Sidenav, $sce, baseUrl, $window) {
    'ngInject';
    this.NgTableParams = NgTableParams;
    this.$log = $log;
    this.Modal = Modal;
    this.Storage = Storage;
    this.DataService = DataService;
    this.Auth = Auth;
    this.$location = $location;
    this.Util = Util;
    this.Message = Message;
    this.$http = $http;
    this.Sidenav = Sidenav;
    this.$sce = $sce;
    this.baseUrl = baseUrl;
    this.$window = $window;
  }

  $onInit() {
    this.titulo = 'Nombre de página';
    this.codigo = this.$location.search().codigo;
    this.isCorrecto = false;
    //get para identificar datos del certificado

    this.DataService.post(this.baseUrl + 'certificaciones/datos_certificado' + '?codigo=' + this.codigo, {})
    .then((response) => {
      if (response) {
        this.informacion = response;

        //get pdf
        this.DataService.pdfO(this.baseUrl + 'certificaciones/generar_certificado' + '?codigo=' + this.codigo, {})
        .then((response) => {
          if (response) {
            this.urlPdf = response;
            this.isCorrecto = true;
            this.$log.log('numero', this.informacion.ubicacion.numero);
            if (angular.isUndefined(this.informacion.ubicacion.numero) || this.informacion.ubicacion.numero === null) {
              this.isNro = false;
            } else {
              this.isNro = true;
            }

          }
        });


      }
    });
  }

  descargarCertificado() {
    var ruta = this.baseUrl + 'certificaciones/generar_certificado' + '?codigo=' + this.codigo;
    this.DataService.pdfOfile(ruta, {})
    .then((response) => {
      if (response) {
        var fileName = "certificado_generado.pdf";
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = response;
        a.download = fileName;
        a.click();
      }
    });
  }

  esEdge() {
    var userAgent = this.$window.navigator.userAgent;
    var ieEDGE = userAgent.match(/Edge/g);
    var ie = userAgent.match(/.NET/g); // IE 11+
    var oldIE = userAgent.match(/MSIE/g);
    return ie || oldIE || ieEDGE;
  }

}
export default VerificacionController;
