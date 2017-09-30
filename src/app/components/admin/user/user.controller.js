'use strict';
import modalController from './user.agregar.controller.js';
import modalTemplate from './user.agregar.html';

class UserController {
  constructor(NgTableParams, $log, Modal, Storage, DataService, Util, Message) {
    'ngInject';
    this.NgTableParams = NgTableParams;
    this.$log = $log;
    this.Modal = Modal;
    this.Storage = Storage;
    this.DataService = DataService;
    this.Util = Util;
    this.Message = Message;
  }

  $onInit() {
    this.titulo = 'Nombre de página';
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.tableParams = new this.NgTableParams({count: 5},
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

        this.$log.log('data:', data);
        return this.DataService.list("usuarios", query)
        .then(response => {

          this.$log.log('***Respuesta: ', response);

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
//      }
//    });
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

  reenviarCorreo(usuario) {
    this.Modal.confirm('¿Está seguro de enviar el correo?', () => {
      let url = "usuarios/reenviar";
      let obj = {
        usuario: {id_usuario: usuario.id_usuario}
      };
      this.DataService.post(url, obj)
      .then(response => {
        if (response) {
          this.Message.success("Se envío el correo correctamente.");
        }
      });
    });
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

  refresh() {
    this.cargarUsuarios();
  }

  cleanSearch() {
    this.searchTerm = '';
    this.refresh();
  }

  add() {
    this.Modal.show({
      template: modalTemplate,
      controller: modalController,
      data: '',
      size: 'lg'
    });
  }

  verEditar(usuario) {
    this.$log.log('*vemos antes de editar: ', usuario);
    var items = {
      "usuario": angular.copy(usuario),
      "esEdicion": true,
      "refresh": this.refresh()
    };
    this.Modal.show({
      template: modalTemplate,
      controller: modalController,
      data: items,
      size: 'lg'
    });
  }
 
}

export default UserController;
