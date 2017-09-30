'use strict';
class BandejaController {
  constructor(NgTableParams, $log, $scope, Modal, Storage, DataService, Sidenav, Util, Message) {
    'ngInject';
    this.NgTableParams = NgTableParams;
    this.$log = $log;
    this.$scope = $scope;
    this.Modal = Modal;
    this.Storage = Storage;
    this.DataService = DataService;
    this.Sidenav = Sidenav;
    this.Util = Util;
    this.Message = Message;

    this.usuario = this.Storage.getUser();
  }

  $onInit() {

    this.Storage.remove('matriculaPromueve');
    this.Storage.remove('producto');
    var colors = {
      'NUEVO': 'default',
      'ENVIADO': 'primary',
      'APROBADO': 'success',
      'PENDIENTE_PAGO': 'warning',
      'OBSERVADO': 'danger',
      'RECHAZADO': 'danger',
      'PAGADO': 'default'
    };

    this.solicitudes = {
      url: `certificacion_promueve/${this.usuario.id_usuario}/productos`,
      data: {        
        formly: [ //id_producto, nombre_producto, estado
          {
            key: 'id_producto',
            type: 'input',
            templateOptions: {
              label: 'ID',
              type: 'number'
            }
          },
          {
            key: 'ruta_imagen',
            type: 'archive',
            templateOptions: {
              label: 'Foto',
              type: 'img'
            }
          },
          {
            key: 'nombre_producto',
            type: 'input',
            templateOptions: {
              label: 'Nombre producto',
              type: 'text'
            }
          },
          {
            key: 'fid_formulario',
            type: 'select',
            templateOptions: {
              label: 'Tipo producto',
              type: 'select',
              "options": [
                {
                  "value": 3,
                  "name": "BIEN PRODUCIDO"
                },
                {
                  "value": 4,
                  "name": "COSTO BRUTO"
                }
              ],
            }
          },
          {
            key: 'estado',
            type: 'select',
            templateOptions: {
              label: 'Estado',
              type: 'select',
              "options": [
                {
                  "value": "NUEVO",
                  "name": "NUEVO"
                },
                {
                  "value": "ENVIADO",
                  "name": "ENVIADO"
                },
                {
                  "value": "APROBADO",
                  "name": "APROBADO"
                },
                {
                  "value": "OBSERVADO",
                  "name": "OBSERVADO"
                },
                {
                  "value": "RECHAZADO",
                  "name": "RECHAZADO"
                }
              ]
            }
          },
          {
            key: 'nit',
            type: 'input',
            templateOptions: {
              label: 'Nit',
              type: 'text'
            }
          },
          {
            key: 'id_unidad_productiva',
            type: 'input',
            templateOptions: {
              label: 'Unidad productiva',
              type: 'number'
            }
          },
          {
            key: 'razon_social',
            type: 'input',
            templateOptions: {
              label: 'Razón social',
              type: 'text'
            }
          },
          {
            key: 'matricula_comercio',
            type: 'input',
            templateOptions: {
              label: 'Matrícula de comercio',
              type: 'text'
            }
          },
          {
            key: '_fecha_creacion',
            type: 'datepicker',
            templateOptions: {
              label: 'Fecha de creación',
              type: 'date'
            }
          },
          {
            key: 'observaciones',
            type: 'input',
            templateOptions: {
              label: 'Observaciones',
              type: 'text'
            }
          }
        ]
      },
      fields: ['id_producto', 'id_unidad_productiva', 'razon_social', 'ruta_imagen', 'nombre_producto', 'fid_formulario', 'estado', '_fecha_creacion', 'observaciones'],
      hiddenFields: ['id_unidad_productiva', 'razon_social', 'observaciones'],
      fks: ['fid_formulario'],
      permission: {
        filter: false
      },
      eventEdit: item => {
        this.Storage.set('matriculaPromueve', { id_unidad_productiva: item.id_unidad_productiva, razon_social: item.razon_social });
        this.Storage.set('producto', { id_producto: item.id_producto });
        this.Sidenav.path('certificacion');
      },
      eventCreate: () => {
        this.Sidenav.path('matriculaPromueve');
      },
      eventDelete: item => {
        this.Modal.confirm('¿Desea eliminar este registro?', () => {
          this.DataService.delete(`certificacion_promueve/producto/${item.id_producto}`)
          .then( response => {
            if (response) {
              this.Message.success();
              this.$scope.$broadcast('refresh_crud_table', `certificacion_promueve/${this.usuario.id_usuario}/productos`);
            } 
          })
        });
      },
      labels: {
        create: 'Nuevo registro'
      },
      update: {
        key: 'estado', // key del registro con el cual se comparará el valor para mostrar/ocultar el botón actualizar
        states: {
          'NUEVO': true,
          'ENVIADO': false,
          'OBSERVADO': true,
          'APROBADO': false
        }
      },
      delete: {
        key: 'estado', // key del registro con el cual se comparará el valor para mostrar/ocultar el botón eliminar
        states: {
          'NUEVO': true,
          'ENVIADO': false,
          'OBSERVADO': false,
          'APROBADO': false
        }
      },     
      buttons: [{
        icon: 'eye',
        tooltip: 'Ver detalles de solicitud',
        if: (ev, item) => {
          return item.estado==='APROBADO'||item.estado==='ENVIADO'||item.estado==='RECHAZADO';
          // return item.id_producto==7;
        },
        onclick: (ev, item) => {
          // this.$log.log(ev, item);
          this.Modal.pdf("certificacion_promueve/" + item.id_unidad_productiva + "/certificacion/" + item.id_producto + "/ddjj_pdf", null, item.estado==='RECHAZADO'?item.observaciones:null);
        }
      }],
      clases: {
        'estado': (row) => {
          // this.$log.log(row);
          return ['badge', 'badge-'+colors[row.estado]];
        } 
      }
    };
  }

}
export default BandejaController;
