'use strict';

import modalController from './ddjjdetalle.modal.controller.js';
import modalTemplate from './ddjjdetalle.modal.html';

import modalobsController from './ddjjdetalle.modal.obs.controller.js';
import modalobsTemplate from './ddjjdetalle.modal.obs.html';

class DdjjdetalleController {
  constructor(NgTableParams, $log, Modal, Storage, DataService, Sidenav, $window, Loading, Message) {
    'ngInject';
    this.NgTableParams = NgTableParams;
    this.$log = $log;
    this.Modal = Modal;
    this.Storage = Storage;
    this.DataService = DataService;
    this.Sidenav = Sidenav;
    this.$window = $window;
    this.Loading = Loading;
    this.Message = Message;
  }

  $onInit() {
    this.Loading.show('Cargando', true);
    var cargar_vista = true;
    this.titulo = 'Nombre de página';
    this.isDdjj = true;
//    this.isActEconomica = false;
    this.isCategorizacion = true;
    this.item = {};
    this.item2 = {};

    this.unidad_productiva = this.Storage.get('unidad_productiva');


    this.certificacion = this.Storage.get('certificacion');

    if (this.certificacion && this.certificacion.fecha_vigencia_anterior) {
      this.fechaVigenciaAnterior = new Date(this.certificacion.fecha_vigencia_anterior);
    }

    if (this.Storage.get('sw_detalle_certificacion') && (this.certificacion.estado=='PENDIENTE_PAGO' || this.certificacion.estado=='PAGADO')) {
      this.Storage.remove('sw_detalle_certificacion');
      cargar_vista = false;
    }
    if (cargar_vista) {
      if (angular.isDefined(this.certificacion.observaciones_secciones) && this.certificacion.observaciones_secciones !== null) {
        var observacionesSecciones = this.certificacion.observaciones_secciones.split("#");
        this.$log.log('Observaciones secciones = ', observacionesSecciones);
        for (var j = 0; j < observacionesSecciones.length; j++) {

          var obj = observacionesSecciones[j];
          if (obj.indexOf('registro') > 0) {
            this.isDdjj = false;
          } else if (obj.indexOf('ategorizaci') > 0) {
            this.isCategorizacion = false;
          }
        }
      }
      //filtro

      if (this.certificacion.formulario.tipo === 'ICAP') {
        this.cargarServicios(this.certificacion.id_certificacion);
      } else {
        this.cargarCaeb();
        this.cargarActividadesEconomicas(this.certificacion.id_certificacion);
      }


//      this.cargarPagos(this.certificacion.id_certificacion);

      if (this.certificacion.estado === 'APROBADO') {
        this.Ddjj = true;
        this.isCategorizacion = true;
      }


    } else {
      this.siguiente();
    }

  }

  cargarCaeb() {
    var padre;
    this.listadoCaeb = [];
    this.DataService.get(`clasificadores/subclases`)
    .then(response => {
      this.$log.log(this);
      if (response) {
        this.getListadoCaeb = response;
        this.getListadoCaeb.forEach( it => {
          it.xdescripcion = it.codigo.toLowerCase() + ' - ' + it.descripcion.toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u');
          padre = it.padre;
          it.xdescripcion2 = padre.codigo.toLowerCase() + ' - ' + padre.descripcion.toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u');
          padre = padre.padre;
          it.xdescripcion3 = padre.codigo.toLowerCase() + ' - ' + padre.descripcion.toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u');
          padre = padre.padre;
          it.xdescripcion4 = padre.codigo.toLowerCase() + ' - ' + padre.descripcion.toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u');
          padre = padre.padre;
          it.xdescripcion5 = padre.codigo.toLowerCase() + ' - ' + padre.descripcion.toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u');
        })
        this.refreshResult();
      }
    });
  }

  refreshResult (textSearch) {
    var arrCaebs;
    if (this.getListadoCaeb) {
      // this.$log.log('textSearch='+textSearch);
      arrCaebs = angular.copy(this.getListadoCaeb);
      if (textSearch) {
        textSearch = textSearch.toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u');
        arrCaebs = arrCaebs.filter( it => {
          return it.xdescripcion.indexOf(textSearch)!=-1 ||
          it.xdescripcion5.indexOf(textSearch)!=-1 ||
          it.xdescripcion4.indexOf(textSearch)!=-1 ||
          it.xdescripcion3.indexOf(textSearch)!=-1 ||
          it.xdescripcion2.indexOf(textSearch)!=-1;
        })
      }
      if (arrCaebs.length > 20) {
        arrCaebs = arrCaebs.splice(0, 20);
      }
      this.listadoCaeb = arrCaebs;
    }
  }

  cargarCaebByid(posicion, idCaeb) {
    if (idCaeb !== null && angular.isDefined(idCaeb)) {
      this.DataService.get(`clasificadores/` + idCaeb)
      .then(response => {
        if (response) {
          this.$log.log('Caeb by id resp = ', response);
          // 1 = item2.selected
          if (posicion === 1) {
            this.item.selected = response;
          } else {
            this.item2.selected = response;
          }
        }
      });
    }
  }

  cargarServicios(idCertificacion) {
    this.DataService.get('certificaciones/' + idCertificacion + '/ddjj_servicios')
    .then(response => {
      if (response) {
        this.servicios = response;
      }
    });
  }

  cargarActividadesEconomicas(idCertificacion) {
    this.DataService.get('certificaciones/' + idCertificacion + '/actividades_economicas/')
    .then(response => {
      if (response) {
//        this.$log.log('RESPUESTAAAA---actividades economicas', response);
        this.actividadesEconomicas = response;
        for (var i = 0; i < this.actividadesEconomicas.length; i++) {
          var oo = this.actividadesEconomicas[i];
          this.cargarCaebByid((i + 1), oo.fid_parametro_caeb);
        }
      }
    });
  }

  cargarPagos(idCertificacion) {
    this.DataService.get('certificaciones/' + idCertificacion + '/pagos/')
    .then(response => {
      if (response) {
        this.pagos = response;
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

  verPdf() {
    this.$log.log('---Vemos pdf');
    var ruta = `certificaciones/` + this.certificacion.id_certificacion + '/reporte';
    if (this.certificacion.estado == 'APROBADO') {
      ruta = `certificaciones/mostrar_reporte/` + this.certificacion.id_certificacion
    }

    if (this.esEdge()) {
      this.descargarPdf(ruta, 'reporte_generado');
    } else {

      this.DataService.pdfO(ruta, {})
      .then((response) => {
        if (response) {
          var obj = {
            "urlPdf": response
          };
          this.Modal.show({
            template: modalTemplate,
            controller: modalController,
            data: obj,
            size: 'extra-large'
          });
        }
      });
    }
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

  observar() {
//    this.Modal.confirm('¿Está seguro de continuar?', () => {
//      this.$log.log('---Realizamos la observacion');
//    });

    var arrayObs = [];

    if (!this.isDdjj) {
      arrayObs.push("Declaración jurada para el registro y acreditación nacional.");
    }
    if (!this.isSeccionCaebOk()) {
//      this.certificacion.formulario.tipo !== 'PROVEEDOR'
      arrayObs.push("Actividad económica (CAEB).");
    }
    if (!this.isCategorizacion) {
      arrayObs.push("Categorización.");
    }

    this.Modal.show({
      template: modalobsTemplate,
      controller: modalobsController,
      data: {
        "arrayObs": arrayObs,
        "id_certificacion": this.certificacion.id_certificacion
      },
      size: 'lg'
    });
  }

  aprobar() {

    if((this.certificacion.fid_certificacion_origen === null && this.certificacion.tipo === 'RENOVACION') || this.certificacion.fid_certificacion_origen === null && this.certificacion.tipo === 'RENOVACION_EXPIRADA'){

      if(!this.fechaVigenciaAnterior){
        this.Message.error("Debe ingresar la 'Fecha de Vigencia del Anterior Certificado'.");
        return ;
      }

    }

    //Comentando metodo de aprobar, por si se aprueba en esta instancia
    this.Modal.confirm('¿Está seguro de continuar?', () => {
      //Almacenamos el RUBRO si es distinto de ICAP
      if (this.certificacion.formulario.tipo !== 'ICAP') {
        this.Storage.set('rubro', this.item.selected.padre.padre.padre.descripcion);
      }


         var objEnviar = {
          fecha_vigencia_anterior : this.fechaVigenciaAnterior
        };

      //Pasamos a pantalla, en la siguiente pantalla se aprueba
      if (this.isDdjj && this.isSeccionCaebOk() && this.isCategorizacion) {
        this.DataService.put(`certificaciones/${this.certificacion.id_certificacion}/notificar`, objEnviar)
        .then(response => {
          if (response) {
            response.certificacion.monto_sugerido = response.pago;
            this.Storage.set('certificacion', response.certificacion);
            this.Storage.set('unidad_productiva', response.unidad_productiva);
            this.siguiente();
          }
        });
      } else {
        this.Message.error("Debe seleccionar/aprobar todas las secciones antes de pasar a la siguiente pantalla.");
      }

    });
  }

  volver() {
    this.Sidenav.path('declaracionesJuradas');
  }

  siguiente() {
    this.Sidenav.path('declaracionAcreditar');
  }

  asignarCaeb(producto, caeb) {
    this.$log.log('Producto a actualizar= ', producto);
    this.$log.log('CAEB SELECT= ', caeb);
    var obj = {
      id_caeb: caeb.id_caeb
    };

    this.DataService.put('certificaciones/' + this.certificacion.id_certificacion + '/actividades_economicas/' + producto.id_producto + '/caeb', obj)
    .then(response => {
      if (response) {
        this.$log.log('Respuesta* ACTUALIZAR CAEB= ', response);
      }
    });

  }

  isSeccionCaebOk() {
    //Si es ICAP no validamos CAEB
    if (this.certificacion.formulario.tipo === 'ICAP') {
      return true;
    }
    //Validamos CAEB
    if (angular.isDefined(this.actividadesEconomicas)) {
      var nro = this.actividadesEconomicas.length;
      if (nro === 1) {
        return angular.isDefined(this.item.selected);
      } else if (nro === 2) {
        return (angular.isDefined(this.item.selected) && angular.isDefined(this.item2.selected));
      } else {
        return false;
      }
    } else {
      return false;
    }

  }

  actualizarDdjj() {
    this.isDdjj = !this.isDdjj;
  }
//  actualizarActEconomica() {
//    this.isActEconomica = !this.isActEconomica;
//  }
  actualizarCategorizacion() {
    this.isCategorizacion = !this.isCategorizacion;
  }

}

export default DdjjdetalleController;
