'use strict';
//import modalController from './parametros.modal.controller.js';
//import modalTemplate from './parametros.modal.html';

class CorreccionesController {
  constructor(NgTableParams, $log, Modal, Storage, DataService, Util, Message, $state) {
    'ngInject';
    this.NgTableParams = NgTableParams;
    this.$log = $log;
    this.Modal = Modal;
    this.Storage = Storage;
    this.DataService = DataService;
    this.Util = Util;
    this.Message = Message;
    this.$state = $state;
  }
  $onInit() {


    this.titulo = 'Nombre de página';
    this.tim = {};
    this.cargarTabla();
    //Borrando Storage en: 'On init'

    this.Storage.remove('certificacion');
    this.Storage.remove('unidad_productiva');
    this.Storage.remove('sw_detalle_certificacion');


  }

  changeFilter() {
    if (this.tableParams) {
      this.Util.funcDelay(this.tim, 1000, () => {
        this.tableParams.reload();
      })
    }
  }

  cargarTabla() {
    this.tableParams = new this.NgTableParams({count: 10},
    {
      getData: params => {
        let data = params.url();

        let query = {
          limit: data.count,
          page: data.page,
        };
        let sort = this.getSorting(data);
        if (sort) {
          query.order = sort;
        }
        let filters = this.getFilters(data);
        if (filters.length) {
          if (filters[0].crudtable_search_term) {
            query.filter = filters[0].crudtable_search_term;
          } else {
            for (let i in filters) {
              let key = Object.keys(filters[i])[0];
              query[key] = filters[i][key];
            }
            // query.filter = JSON.stringify(filters);
          }
        }
        query.ambito = "PROBOLIVIA";
        query.filter = this.filtro_bandeja || '';
        return this.DataService.list('certificaciones', query)
        .then(response => {
          if (response) {
            this.$log.log('RESPUESTA CERTIFICACIONES ===== ', response);
            params.total(response.count);
            let items = this.filterItems(response.rows);
            this.renderLabels({
              ini: (query.page - 1) * query.limit + 1,
              end: query.page * query.limit < response.count ? query.page * query.limit : response.count,
              total: response.count
            });
            return items;
          }
        });
      }
    }
    );
  }

  refresh() {
    this.cargarTabla();
  }

  cleanSearch() {
    this.searchTerm = '';
    this.refresh();
  }

  enviarFirma() {
    for (var i = 0; i < this.listado.length; i++) {
      var obj = this.listado[i];
      if (obj.isRowSelected) {
        this.$log.log('Seleccionado = ', obj.organizacion);
      }
    }
  }

  toggleSelection(item) {
    item.isRowSelected = !item.isRowSelected;
  }

  regenerarCertificado(item) {
    this.Modal.confirm('¿Desea regenerar este certificado?', () => {
      const parametros = {
        regenerar: true,
        devolver: true,
      };
      var ruta = 'certificaciones/generar_certificado/' + item.certificacion.id_certificacion;
      var nombre = "certificado";
      this.DataService.pdfOfile(ruta, parametros)
      .then((response) => {
        if (response) {
          nombre = nombre.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_');//todos los caracteres
          var fileName = "" + nombre + ".pdf";
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.href = response;
          a.download = fileName;
          a.click();
          this.Message.success('Su documento está siendo descargado.');
        }
      });
    });




  }

  regenerarReporte(item) {
    this.Modal.confirm('¿Desea regenerar este reporte?', () => {
      const parametros = {
        regenerar: true,
        devolver: true,
      };
      var ruta = 'certificaciones/' + item.certificacion.id_certificacion + '/reporte';
      var nombre = "reporte";
      this.DataService.pdfOfile(ruta, parametros)
      .then((response) => {
        if (response) {
          nombre = nombre.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_');//todos los caracteres
          var fileName = "" + nombre + ".pdf";
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.href = response;
          a.download = fileName;
          a.click();
          this.Message.success('Su documento está siendo descargado.');
        }
      });
    });
  }

  anularEliminar(item) {

    this.$log.log('Anular = ', item);

    this.Modal.confirm('Al eliminar este registro no podrá recuperar la información asociada. ¿Está seguro de continuar?', () => {
      this.DataService.post('certificaciones/' + item.certificacion.id_certificacion + '/anular', {})
      .then(response => {
        if (response) {
          this.Message.success('Se procesó la acción correctamente.');
          this.cargarTabla();
        }
      });
    });
  }

  orderItem(data, fields, pos) {
    if (fields === undefined || fields.length === 0) {
      return data;
    }
    let item = {};
    for (let i in fields) {
      let field = fields[i].key;
      if (data[field] !== undefined) {
        if (this.editable) {
          if (typeof data[field] == 'string' && !/[a-zA-Z]+/g.test(data[field]) && /^-?[0-9.]+\-?[0-9]+\-?[0-9]*$/g.test(data[field]) && data[field].length == 10) {
            let date = data[field].split('-');
            this.dataGrid[pos + '_' + field] = new Date(date[0], date[1] - 1, date[2]);
          } else {
            this.dataGrid[pos + '_' + field] = data[field];
          }
          item[field] = pos + '_' + field;
        } else {
          item[field] = data[field];
        }
      }
    }
    return item;
  }

  removeCorchete(string, search) {
    return string.replace(`${search}[`, '').replace(']', '');
  }

  renderLabels(params) {
//        setTimeout(() => {
//            document.querySelector('.ng-table-counts').setAttribute('data-content', 'Filas: ');
//            document.querySelector('.ng-table-pagination').setAttribute('data-content', `${params.ini} al ${params.end} de ${params.total} Registros.`);
//            document.querySelector('.ng-table-filters .filter:last-child').setAttribute('data-content', 'Acciones');
//        }, 100);
    params;
  }

  filterItems(data) {
    let fields = this.fields !== undefined;
    let fks = this.fks !== undefined;
    let relations = this.relations !== undefined;
    let array = [];
    for (let i in data) {
      for (let j in data[i]) {
        if (fields && this.fields.indexOf(j) == -1) {
          delete data[i][j];
        } else {
          if (this.editable === undefined) {
            if (typeof data[i][j] == 'boolean') {
              data[i][j] = data[i][j] ? 'check_circle_success' : 'check_circle_gray';
            } else if (relations && this.relations[j]) {
              data[i][j] = this.CrudTable.searchFieldData(this.relations[j], data[i][j]);
            } else if (fks && this.fks.indexOf(j) != -1) {
              if (this.Util.toType(data[i][j]) == 'array') {
                let l = this.CrudTable.lengthOptions(this.fieldsData, j);
                if (l > 1 && l == data[i][j].length) {
                  data[i][j] = 'Todos';
                } else {
                  let text = [];
                  for (let e of data[i][j]) {
                    text.push(this.CrudTable.getFkData(this.fieldsData, j, e));
                  }
                  data[i][j] = text.join(', ');
                }
              } else {
                data[i][j] = this.CrudTable.getFkData(this.fieldsData, j, data[i][j]);
              }
            } else if (this.Util.toType(data[i][j]) == 'array') {
              data[i][j] = data[i][j][0];
            }
          }
        }
      }
      array.push(this.orderItem(data[i], this.fieldsData, i));
    }
    return array;
  }

  getSorting(params) {
    for (let key in params) {
      if (key.indexOf('sorting') != -1) {
        return (params[key] == 'desc' ? "-" : "") + this.removeCorchete(key, 'sorting');
      }
    }
    return null;
  }

  getFilters(params) {
    let filters = [];
    for (let key in params) {
      if (key.indexOf('filter') != -1) {
        filters.push({[this.removeCorchete(key, 'filter')]: params[key]});
      }
    }
    return filters;
  }

  descargarPdf(ruta, nombre) {
    this.DataService.pdfOfile(ruta, {})
    .then((response) => {
      if (response) {
        nombre = nombre.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_');//todos los caracteres
//        let nombreEmpresa = string = string.replace(/[^a-zA-Z0-9]/g,'_');//Solo numeros o letras
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

  verPdfTabla(certificacion) {
    certificacion;
//    var ruta = `certificaciones/` + certificacion.certificacion.id_certificacion + '/reporte';
//    if (certificacion.certificacion.estado == 'APROBADO') {
//      ruta = `certificaciones/mostrar_reporte/` + certificacion.certificacion.id_certificacion
//    }
//
//    if (this.esEdge()) {
//      this.descargarPdf(ruta, 'formulario_generado');
//    } else {
//      this.DataService.pdfO(ruta, {})
//      .then((response) => {
//        if (response) {
//          var obj = {
//            "urlPdf": response
//          };
//          this.Modal.show({
//            template: modalTemplate,
//            controller: modalController,
//            data: obj,
//            size: 'extra-large'
//          });
//        }
//      });
//    }

  }

  veCertificadoTabla(certificacion) {
    certificacion;
//    var ruta = `certificaciones/generar_certificado/` + certificacion.certificacion.id_certificacion;
//    if (certificacion.certificacion.estado == 'APROBADO') {
//      ruta = `certificaciones/mostrar_certificado/` + certificacion.certificacion.id_certificacion;
//    }
//    if (this.esEdge()) {
//      this.descargarPdf(ruta, 'certificado_generado');
//    } else {
//      this.DataService.pdfO(ruta, {})
//      .then((response) => {
//        if (response) {
//          var obj = {
//            "urlPdf": response
//          };
//          this.Modal.show({
//            template: modalTemplate,
//            controller: modalController,
//            data: obj,
//            size: 'extra-large'
//          });
//        }
//      });
//    }
  }

  esEdge() {
    var userAgent = this.$window.navigator.userAgent;
    var ieEDGE = userAgent.match(/Edge/g);
    var ie = userAgent.match(/.NET/g); // IE 11+
    var oldIE = userAgent.match(/MSIE/g);
    return ie || oldIE || ieEDGE;
  }

  procesar(nombre) {
    return nombre.replace('DECLARACIÓN JURADA PARA EL REGISTRO Y ACREDITACIÓN NACIONAL DE', '');
  }

  getUsuarioReg(item) {

    let usuarioReg = '';
    if (item.unidad_productiva.nit === null || angular.isUndefined(item.unidad_productiva.nit)) {
      usuarioReg = item.unidad_productiva.usuario.usuarios_roles[0].fid_rol === 4 ? `${item.unidad_productiva.razon_social}` : item.unidad_productiva.usuario.email;
    } else {
      usuarioReg = item.unidad_productiva.usuario.usuarios_roles[0].fid_rol === 4 ? `${item.unidad_productiva.nit} - ${item.unidad_productiva.razon_social}` : item.unidad_productiva.usuario.email;
    }
    return usuarioReg;

  }

}

export default CorreccionesController;
