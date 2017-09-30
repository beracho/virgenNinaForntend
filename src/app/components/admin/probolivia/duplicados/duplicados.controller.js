'use strict';
//import modalController from '../../../admin/probolivia/ddjj/ddjjdetalle.modal.controller.js';
//import modalTemplate from '../../../admin/probolivia/ddjj/ddjjdetalle.modal.html';
//
import modalduController from './duplicados.modal.controller.js';
import modalduTemplate from './duplicados.modal.html';

class DuplicadosController {
  constructor(NgTableParams, $log, Modal, Storage, DataService, $location, Util, Message, $window, Sidenav) {
    'ngInject';
    this.NgTableParams = NgTableParams;
    this.$log = $log;
    this.Modal = Modal;
    this.Storage = Storage;
    this.DataService = DataService;
    this.$location = $location;
    this.Util = Util;
    this.Message = Message;
    this.$window = $window;
    this.Sidenav = Sidenav;
  }

  $onInit() {
    this.titulo = 'Nombre de página';
//    cargamos tabla
    this.tim = {};
    this.cargarTabla();
    //Revisamo si hay nit para el user logueado
    this.usuario = this.Storage.getUser();
    if (angular.isDefined(this.usuario.nit) && this.usuario.nit !== null && this.usuario.nit !== 'null') {
      this.isTieneNit = true;
    } else {
      this.isTieneNit = false;
    }
  }

  changeFilter() {
    if (this.tableParams) {
      this.Util.funcDelay(this.tim, 1000, () => {
        this.tableParams.reload();
      })
    }
  }

  esEdge() {
    var userAgent = this.$window.navigator.userAgent;
    var ieEDGE = userAgent.match(/Edge/g);
    var ie = userAgent.match(/.NET/g); // IE 11+
    var oldIE = userAgent.match(/MSIE/g);
    return ie || oldIE || ieEDGE;
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
        query.creadas = 'TECNICO';
        query.filter = this.filtro_bandeja || '';
        return this.DataService.list('certificaciones?duplicados=true', query)
        .then(response => {

          this.$log.log('lista de duplicados = ', response);

          if (response) {
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

  duplicar(item) {
    this.$log.log('duplicar = ', item);
    this.Modal.show({
      template: modalduTemplate,
      controller: modalduController,
      data: {id_certificacion: item.certificacion.id_certificacion},
      size: 'lg'
    });
  }

  eliminar(item) {

    this.Modal.confirm('Al eliminar esta declaración, no podrá recuperar la información ingresada. ¿Desea eliminar el registro?', () => {
      this.$log.log('Eliminamos = ', item);
      this.DataService.delete('certificaciones/' + item.certificacion.id_certificacion)
      .then(() => {
        this.Message.success('Su registro fue eliminado correctamente.');
        this.refresh();
      });
    });
  }

  procesar(nombre) {
    return nombre.replace('DECLARACIÓN JURADA PARA EL REGISTRO Y ACREDITACIÓN NACIONAL DE', '');
  }

  refresh() {
    this.cargarTabla();
  }

  cleanSearch() {
    this.searchTerm = '';
    this.refresh();
  }

  irDetalle() {
    this.Sidenav.path('declaracionDetalle');
  }

  //filtrado en grid

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

  aprobarDuplicado(item) {
    this.$log.log('Aprobar duplicados = ', item);
    this.DataService.get("certificaciones/" + item.certificacion.fid_certificacion_origen + "/duplicados/" + item.certificacion.lote_duplicado)
    .then(response => {
      if (response) {
        this.$log.log('Vamos a ruta de  acreditacion de duplis = ', response);
        this.Storage.set('certificacion', response.certificacion);
        this.Storage.set('unidad_productiva', response.unidad_productiva);
        this.Storage.set('datos_factura', response.datos_factura);
        this.Storage.set('pagos', response.pagos);
        this.Storage.set('duplicados', response.duplicados);
        this.Storage.set('lote_duplicado', item.certificacion.lote_duplicado);
        this.Sidenav.path("duplicarAcreditar");
      }
    });
  }

}
export default DuplicadosController;
