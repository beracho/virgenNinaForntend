'use strict';
class DdjjPromueveController {
  constructor($log, Modal, Storage, $location, baseUrl) {
    'ngInject';

    this.$log = $log;
    this.Modal = Modal;
    this.Storage = Storage;
    this.$location = $location;
    this.baseUrl = baseUrl;
  }

  $onInit() {
    this.cargarTabla();
  }
  
  cargarTabla(){
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
      url: `certificacion_promueve/certificaciones/solicitudes`,
      queryExtra: { origenBandeja: 'solicitudes' },
      data: {        
        formly: [ //id_sello_bolivia, razon_social, estado
          {
            key: 'id_producto',
            type: 'input',
            templateOptions: {
              label: 'id producto',
              type: 'number'
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
            key: 'data',
            type: 'input',
            templateOptions: {
              label: 'data',
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
            key: 'razon_social',
            type: 'input',
            templateOptions: {
              label: 'Razon social',
              type: 'text'
            }
          },
          {
            key: 'matricula_comercio',
            type: 'input',
            templateOptions: {
              label: 'Matrícula',
              type: 'text'
            }
          },
          {
            key: 'nombre_producto',
            type: 'input',
            templateOptions: {
              label: 'Producto',
              type: 'text'
            }
          },
          {
            key: 'estado',
            type: 'select',
            templateOptions: {
              label: 'Estado',
              type: 'select',
              options: [
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
              ]
            }
          },
          // {
          //   key: 'nit',
          //   type: 'input',
          //   templateOptions: {
          //     label: 'Nit',
          //     type: 'text'
          //   }
          // },
          {
            key: 'fid_formulario',
            type: 'select',
            templateOptions: {
              label: 'Tipo producto',
              type: 'select',
              options: [
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
            key: '_fecha_creacion',
            type: 'datepicker',
            templateOptions: {
              label: 'Fecha de creación',
              type: 'date'
            }
          }
        ]
      },
      fields: ['id_unidad_productiva', 'id_producto', 'data', 'ruta_imagen', 'razon_social', 'matricula_comercio', 'nombre_producto', 'estado', 'fid_formulario', '_fecha_creacion'],
      hiddenFields: ['id_unidad_productiva', 'id_producto', 'data'],
      fks: ['fid_formulario'],
      permission: {
        create: false,
        update: false,
        delete: false,
        filter: false
      },
      buttons: [
        // {
        //   icon: 'file-pdf-o',
        //   tooltip: 'Ver pdf del producto',
        //   onclick: (ev, item) => {
        //     // this.$log.log(ev, item);
        //     this.Modal.pdf("certisficacion_promueve/" + item.id_unidad_productiva + "/certificacion/" + item.id_producto + "/ddjj_pdf", null, item.estado==='RECHAZADO'?item.observaciones:null);
        //   }
        // },
        {
          icon: 'eye',
          tooltip: 'Ver detalles de solicitud',
          if: (ev, item) => {
            return item.estado==='ENVIADO';
          },
          onclick: (ev, item) => {
            // this.$log.log(ev, item);
            item.insumos = item.data.insumos;
            angular.merge(item, item.data);
            delete item.data;
            this.Storage.set('cert_prod', item);
            this.$location.path('decDdjjProductoPromueve');
          }
        }
      ],
      clases: {
        'estado': item => {
          // this.$log.log(item);
          return ['badge', 'badge-'+colors[item.estado]];
        } 
      }
    };
  }

  verDetalleSolicitud(item) {
    this.Storage.set('print_prod', item);
    this.$location.path('impProductoPromueve');
  }
}
export default DdjjPromueveController;