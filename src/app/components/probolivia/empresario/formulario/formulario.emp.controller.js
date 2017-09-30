'use strict';

import modalController from './formulario.emp.modal.controller.js';
import modalTemplate from './formulario.emp.modal.html';
import modalRegController from './formulario.emp.reg.modal.controller.js';
import modalRegTemplate from './formulario.emp.reg.modal.html';

class FormularioEmpController {
  constructor(DataService, Storage, Sidenav, Modal, $log, apiUrl) {
    'ngInject';

    this.DataService = DataService;
    this.Storage = Storage;
    this.Modal = Modal;
    this.Sidenav = Sidenav;
    this.$log = $log;
    this.apiUrl = apiUrl;
    this.usuario = this.Storage.getUser();
  }

  $onInit() {
    // this.$log.log(this.usuario);
    this.matricula = this.Storage.get('matricula');
    this.show_actualizar_matricula = this.Storage.get('not_found_matricula');
    this.show_button_back = this.usuario.nit != null;

    // if (!this.matricula) {
    //   this.Sidenav.path('matricula');
    // }
    this.DataService.get('formularios?ambito=PROBOLIVIA')
    .then(response => {
      if (response) {
        this.formularios = response.map(el => {
          el.nombre = el.nombre.replace('DECLARACIÓN JURADA PARA EL REGISTRO Y ACREDITACIÓN NACIONAL DE', '');
          return el;
        });
      }
    });
  }

  seleccionar(formulario) {
    var preg, data;
    if (formulario.estado === 'ACTIVO') {
      preg = 'Clic en <strong>aceptar</strong> para crear la declaración jurada.';
      if (this.matricula) {
        `¿Realmente desea <strong>crear</strong> este formulario de <strong>Declaración Jurada</strong> para la matrícula: <strong>${ this.matricula.matricula } - ${ this.matricula.razon_social }</strong>?`
      }
      this.Modal.confirm(preg, () => {
        data = {};
        data.fid_formulario = formulario.id_formulario;
        if (this.matricula) {
          data.matricula_comercio = this.matricula.matricula;
        }
        this.DataService.post(`certificaciones`, data)
        .then(response => {
          if (response) {
            this.Storage.setSession('certificacion', response.certificacion.id_certificacion);
            this.Sidenav.path('registro');
          }
        });
      });
    } else {
      var fecha = new Date(formulario.fecha_inicio);
      preg = 'El formulario ' + formulario.nombre + ' estará disponible desde el ' + fecha.getDate() + '/' + (fecha.getMonth() + 1 < 10 ? '0' : '') + (fecha.getMonth() + 1) + '/' + fecha.getFullYear() + '.';
      this.Modal.alert(preg, null, "Información", null, 'md');
    }
  }

  seleccionarOpcion(formulario) {
    var preg;
    if (formulario.estado === 'ACTIVO') {
      var data = {};
      data.fid_formulario = formulario.id_formulario;
      if (this.matricula) {
        data.matricula_comercio = this.matricula.matricula;
      }
      this.Modal.show({
        template: modalRegTemplate,
        controller: modalRegController,
        data: data,
        size: 'medium'
      });
    } else {
      var fecha = new Date(formulario.fecha_inicio);
      preg = 'El formulario ' + formulario.nombre + ' estará disponible desde el ' + fecha.getDate() + '/' + (fecha.getMonth() + 1 < 10 ? '0' : '') + (fecha.getMonth() + 1) + '/' + fecha.getFullYear() + '.';
      this.Modal.alert(preg, null, "Información", null, 'md');
    }
  }

  atras() {
    this.Storage.remove('formulario');
    this.Sidenav.path('matricula');
  }

  verTablaCostos() {
    this.Modal.show({
      template: modalTemplate,
      controller: modalController,
      data: {}
//      ,
//      size: 'sm'
    });
  }

  descargarManual(tipoDocumento){
    this.$log.log("Descargamos manual de usuario*** ", tipoDocumento);
    const urlDownload = `${this.apiUrl}certificaciones/descargas?formulario=${tipoDocumento}`;
    this.$log.log("Descargamos manual de usuario*** ", urlDownload);
    //var urlDownload = `${this.apiUrl}probolivia/${idOng}/descargas/?tipo=ruta_marco_cooperacion`;
    this.DataService.pdfOfile(urlDownload, {})
    .then((response) => {
      if (response) {
        var fileName = `guia-${tipoDocumento.toLowerCase()}.pdf`;
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = response;
        a.download = fileName;
        a.click();
        this.Message.success('Su documento está siendo descargado.');
      }
    });

  }

}

export default FormularioEmpController;
