'use strict';

class DuplicaracreditarController {
  constructor(NgTableParams, $log, Modal, Storage, DataService, Sidenav, $sce, Util, Message, $window, Loading) {
    'ngInject';
    this.NgTableParams = NgTableParams;
    this.$log = $log;
    this.Modal = Modal;
    this.Storage = Storage;
    this.DataService = DataService;
    this.Sidenav = Sidenav;
    this.$sce = $sce;
    this.Util = Util;
    this.Message = Message;
    this.$window = $window;
    this.Loading = Loading;
  }
  $onInit() {
    this.Loading.show('Cargando', true);
    this.$log.log(this);
    this.titulo = 'Nombre de página';
    this.unidad_productiva = this.Storage.get('unidad_productiva');
    this.certificacion = this.Storage.get('certificacion');
    this.datos_factura = this.Storage.get('datos_factura');
    this.datos_factura.fecha_factura = new Date(this.datos_factura.fecha_factura);


    this.pagos = this.Storage.get('pagos');
    this.duplicados = this.Storage.get('duplicados');
    this.lote_duplicado = this.Storage.get('lote_duplicado');

    this.$log.log('-CERTIFICACION = ', this.certificacion);
    this.$log.log('-UNIDAD PRODUCTIVA = ', this.unidad_productiva);
    this.$log.log('-DUPLICADOS = ', this.duplicados);

    this.usuario_ddjj_con_nit = this.unidad_productiva.usuario.nit != null;
    this.monto = this.pagos[0].monto;

    if (this.duplicados.length > 0) {
      this.certificacion.estado = this.duplicados[0].estado;
      if (this.certificacion.estado === 'APROBADO' || this.certificacion.estado === 'PAGADO') {

          if (angular.isUndefined(this.datos_factura.numero_autorizacion) || angular.isUndefined(this.datos_factura.nro_factura) || angular.isUndefined(this.datos_factura.fecha_factura)) {
              this.certificadoDuplicado=false;
            }else{
              this.cargarPdfCertificado(this.duplicados[0].id_certificacion, this.duplicados[0].estado);
          }

      }
    }

    //---------------
    this.DataService.get('certificaciones/' + this.Storage.get('certificacion').id_certificacion)
    .then(response => {
      if (response) {

        this.rubro = this.Storage.get('rubro');
        this.deposito = {};
        this.initConf();
        this.depositoLoad(this.pagos);
      }
    });
  }

  cargarPdfCertificado(idCertificacion, estado) {
    var ruta = `certificaciones/generar_certificado/` + idCertificacion;
    if (estado === 'APROBADO') {
      ruta = `certificaciones/mostrar_certificado/` + idCertificacion;
    }
    this.$log.log('Url de descarga = ', ruta);
    this.DataService.pdfO(ruta, {})
    .then((response) => {
      if (response) {
        this.$log.log('Documento = ', response);
        this.urlPdf = response;
        // this.Message.success("El certificado se generó correctamente.");
        this.certificadoDuplicado=true;
        //       this.$window.navigator.msSaveOrOpenBlob(response, 'PdfGenerado' + '.pdf');
//        var fileName = "file_name.pdf";
//        var a = document.createElement("a");
//        document.body.appendChild(a);
//        var file = new Blob([response.datos], {type: 'application/pdf'});
//        var fileURL = window.URL.createObjectURL(file);
//        a.href = fileURL;
//        a.download = fileName;
//        a.click();
      }
    });

  }

  descargarCertificado(duplicado) {
    var ruta = `certificaciones/generar_certificado/` + duplicado.id_certificacion;
    if (duplicado.estado === 'APROBADO') {
      ruta = `certificaciones/mostrar_certificado/` + duplicado.id_certificacion;
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

  volver() {
    this.Sidenav.path('bandejaDuplicados');
  }

  depositoLoad(response) {
    this.initConfFechaDepositoDate();
    if (angular.isArray(response) && response.length > 0) {
      response.forEach(it => {
        it.fecha_deposito = new Date(it.fecha_deposito);
      })
      this.deposito = response[0];
    }
  }

  finalizarAcreditacion(form) {
    form;
    var obj = {
      fecha_factura: this.datos_factura.fecha_factura,
      numero_autorizacion: this.datos_factura.numero_autorizacion,
      nro_factura: this.datos_factura.nro_factura,
      nombre_razon_social: this.datos_factura.nombre_razon_social,
      nit: this.datos_factura.nit,
      lote_duplicado: this.lote_duplicado
    };

    this.$log.log('- Objeto finalizar = ', obj);
    if (angular.isUndefined(this.datos_factura.numero_autorizacion) || angular.isUndefined(this.datos_factura.nro_factura) || angular.isUndefined(this.datos_factura.fecha_factura)) {
      this.Message.error("Debe llenar los datos de facturación.");
      return;
    }
    //Confirmacion antes de finalizar
    this.Modal.confirm('¿Está seguro de finalizar?', () => {

      this.DataService.put('certificaciones/' + this.certificacion.id_certificacion + '/duplicados/', obj)
      .then(response => {
        if (response) {
          this.Message.success("Se realizó la aprobación correctamente.");
          this.certificacion = response.certificacion;
          if (response.duplicados.length > 0) {
            if (this.certificacion.estado === 'APROBADO' || this.certificacion.estado === 'PAGADO') {
              this.cargarPdfCertificado(response.duplicados[0].id_certificacion, response.duplicados[0].estado);
            }
          }
//          this.Sidenav.path('bandejaDuplicados');
        }
      });

//      //Validamos si no hay deposito y el usuario tiene NIT
//      if (angular.isUndefined(this.deposito.id_pago) && this.usuario_ddjj_con_nit) {
//        this.Message.error("El usuario no lleno datos de depósito. Aún no puede finalizar la acreditación.");
//        return;
//      }
//      //Finalizamos acreditacion
//      var pago;
//      form = form.depositos_form;
//      if (form.$valid) {
//        pago = angular.copy(this.deposito);
//        pago.factura_razon_social = this.certificacion.nombre_razon_social;
//        pago.nit = this.certificacion.nit;
//        if (this.certificacion.estado == 'PENDIENTE_PAGO') {
//          this.DataService.put(`certificaciones/${this.certificacion.id_certificacion}/pagar/`, pago)
//          .then(response => {
//            if (response) {
//              this.finalizar();
//            }
//          })
//        } else if (this.certificacion.estado == 'PAGADO') {
//          this.finalizar();
//        }
//      } else {
//        if (this.usuario_ddjj_con_nit) {
//          this.Message.warning('El depósito debe ser llenado por el usuario que hizo la declaración.')
//        } else {
//          this.Util.setTouchedForm(form, true, null, true);
//        }
//      }
    })

  }

  finalizar() {
    this.$log.log('---Realizamos la aprobacion de duplicacion');


    var obj = {
      fecha_factura: this.datos_factura.fecha_factura,
      numero_autorizacion: this.datos_factura.numero_autorizacion,
      nro_factura: this.datos_factura.nro_factura,
      nombre_razon_social: this.datos_factura.nombre_razon_social,
      nit: this.datos_factura.nit
    };


    this.$log.log('-Objeto a enviar = ', obj);



//    this.DataService.put('certificaciones/' + this.certificacion.id_certificacion + '/aprobar/', obj)
//    .then(response => {
//      if (response) {
//        this.$log.log('Respuesta aprobacion***= ', response);
//
//        this.certificacion.estado = 'APROBADO';
//
//      }
//    });
  }

  validateFechaDeposito(form) {
    if (this.deposito.fecha_deposito) {
      form.fecha_deposito.$setValidity('min_date', !(this.deposito.fecha_deposito < this.conf.pag.fecha_deposito.options.minDate))
      form.fecha_deposito.$setValidity('max_date', !(this.deposito.fecha_deposito > this.conf.pag.fecha_deposito.options.maxDate))
    }
  }
  validateFechaFactura(form) {
    if (this.certificacion.fecha_factura) {
      form.fecha_factura.$setValidity('min_date', !(this.certificacion.fecha_factura < this.conf.fac.fecha_factura.options.minDate))
      form.fecha_factura.$setValidity('max_date', !(this.certificacion.fecha_factura > this.conf.fac.fecha_factura.options.maxDate))
    }
  }

  habilitarFac() {
    return (this.certificacion.estado === 'PENDIENTE_PAGO' && !this.usuario_ddjj_con_nit) || (this.certificacion.estado === 'PAGADO');
  }

  initConf() {
    this.conf = {
      fac: angular.copy(this.certificacion.formulario.secciones[0].factura),
      pag: angular.copy(this.certificacion.formulario.secciones[0].pagos)
    };

    this.$log.log('--- Conf factura = ', this.conf);

    this.conf.fac.fecha_factura.requerido = true;
    this.conf.fac.numero_autorizacion.requerido = true;
    //emulamos datos de factura NRO BORRAR


    this.conf.fac.numero_factura.requerido = true;
//    this.conf.fac.numero_factura.visible = true;
//    this.conf.fac.numero_factura.label = 'Nro Factura';
//    this.conf.fac.numero_factura.min_length = 2;
//    this.conf.fac.numero_factura.max_length = 12;

    delete this.certificacion.formulario.secciones;
  }

  initConfFechaDepositoDate() {
    var xdate = new Date(this.Storage.get('dateNow'));
    this.conf.pag.fecha_deposito.options = {
      maxDate: xdate,
      minDate: new Date(xdate.getFullYear() - 1, xdate.getMonth(), xdate.getDate()),
      startingDay: 1,
      // showWeeks: false
    };
    this.conf.fac.fecha_factura.options = angular.copy(this.conf.pag.fecha_deposito.options);
  }

  esEdge() {
    var userAgent = this.$window.navigator.userAgent;
    var ieEDGE = userAgent.match(/Edge/g);
    var ie = userAgent.match(/.NET/g); // IE 11+
    var oldIE = userAgent.match(/MSIE/g);
    return ie || oldIE || ieEDGE;
  }

  cambiarTab(duplicado) {
    this.$log.log("Cambiamos de tab****", duplicado);
    this.cargarPdfCertificado(duplicado.id_certificacion, duplicado.estado);
  }

}

export default DuplicaracreditarController;
