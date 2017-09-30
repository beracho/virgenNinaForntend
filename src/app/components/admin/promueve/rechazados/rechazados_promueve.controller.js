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
      'CERTIFICADO': 'success',
      'RECHAZADO': 'danger',
    };
    this.solicitudes = {
      url: `certificacion_promueve/certificaciones/solicitudes`,
      queryExtra: { origenBandeja: 'rechazados' },
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
          // {
          //   key: 'nit',
          //   type: 'input',
          //   templateOptions: {
          //     label: 'Nit',
          //     type: 'text'
          //   }
          // },
          {
            key: 'estado',
            type: 'select',
            templateOptions: {
              label: 'Estado',
              type: 'select',
              options: [
                {
                  "value": "APROBADO",
                  "name": "APROBADO"
                },
                {
                  "value": "CERTIFICADO",
                  "name": "CERTIFICADO"
                },
              ]
            }
          },

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
        {
          icon: 'eye',
          tooltip: 'Ver detalles de producto',
          onclick: (ev, item) => {
            // this.$log.log(ev, item);           
            this.Modal.pdf("certificacion_promueve/" + item.data.fid_unidad_productiva + "/certificacion/" + item.id_producto + "/ddjj_pdf", null, item.data.certificacion.observaciones);
          }
        },
        {
          icon: 'file-pdf-o',
          tooltip: 'Ver certificado',
          onclick: (ev, item) => {
            // this.$log.log(ev, item);
            this.Modal.pdf(`certificaciones/documento/${item.data.certificacion.id_certificacion}`);
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