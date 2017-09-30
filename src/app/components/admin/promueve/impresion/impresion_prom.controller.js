'use strict';

class ImpresionProdController {
  constructor($log, Modal, Storage, DataService, $location,$window) {
    'ngInject';
    this.$log = $log;
    this.Modal = Modal;
    this.Storage = Storage;
    this.DataService = DataService;
    this.$location = $location;
    this.$window = $window;
  }

  $onInit() {
    // this.$log.log(this);
    this.titulo = 'Nombre de página';
    
    this.solicitud = this.Storage.get('print_prod');
    // Iteramos las solicitudes de certificado para obtener su PDF
    var index = 0;
    var this_ = this;
    
    function obtenerPDF()
    {
      this_.$log.log("INDICE -->",index);
      if(index < this_.solicitud.certificaciones_pagos.length)
      {
        var cert = this_.solicitud.certificaciones_pagos[index];
        // Obteniendo vista previa de PDF del certificado
        this_.DataService.pdfO('certificacion_promueve/' + this_.solicitud.unidad_productiva.id_unidad_productiva + '/producto/' + cert.certificacion.producto.id_producto + '/previsualizar_solicitud', {}).then((response) => {
          if (response) {
            cert.certificacion.producto.pdf_certificado = response;
            this_.$log.log("FINALIZADO");
            index++;
            obtenerPDF();
          }
        });
      }
    }
    obtenerPDF();
  }
  
  atras() {
    this.$location.path('certificaciones');
  }
  
  imprimir(producto)
  {
    var printwWindow = this.$window.open(producto.pdf_certificado);
    printwWindow.print();
    
    var this_ = this;
    setTimeout(function()
    {
      this_.confirmarImpresion(producto);
    }, 2000);
  }

  confirmarImpresion(cert) {
    var this_ = this;
    this.Modal.confirm('¿La impresión se realizó correctamente?',function()
    {
      this_.$log.log('---Realizamos la aprobacion');
      var obj = {
        id_producto: cert.certificacion.producto.id_producto
      };

      this_.DataService.put('certificacion_promueve/'+this_.solicitud.unidad_productiva.id_unidad_productiva+'/producto/imprimir_certificado', obj)
        .then(response => {
          if (response) {
            cert.certificacion.impreso = true;
          }
        });
    },
    null,
    "Confirmar impresión",
    "SI",
    "NO",
    "print");
  }
  
  registrarFactura(form){
    if (form.$valid) {
      var this_ = this;
      var obj=
      {
        nro_autorizacion:this.numero_autorizacion,
        nro_factura:this.numero_factura,
        fecha_factura:this.fecha_factura,
        codigo_control:this.codigo_control,
        nit:this.solicitud.unidad_productiva.nit,
        id_pago:this.solicitud.id_pago
      };
      this_.DataService.put('certificacion_promueve/pagos/finalizar', obj)
        .then(response => {
          if (response) {
            this_.$location.path('certificaciones');
          }
        });
    } else {
      form.$setSubmitted();
    }
  }
}

export default ImpresionProdController;