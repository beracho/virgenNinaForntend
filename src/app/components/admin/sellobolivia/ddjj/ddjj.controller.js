'use strict';
class DdjjSelloboliviaController {
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
      url: `cert_sello_bolivia/solicitudes`,
      data: {        
        formly: [ //id_sello_bolivia, razon_social, estado
          {
            key: 'id_sello_bolivia',
            type: 'input',
            templateOptions: {
              label: 'ID',
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
            key: 'id_producto',
            type: 'input',
            templateOptions: {
              label: 'id producto',
              type: 'number'
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
                },
                {
                  "value": 8,
                  "name": "SHB_PRODUCTO"
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
      fields: ['id_sello_bolivia', 'id_unidad_productiva','id_producto', 'razon_social', 'matricula_comercio', 'nombre_producto', 'estado', 'fid_formulario', '_fecha_creacion'],
      hiddenFields: ['id_sello_bolivia','id_unidad_productiva','id_producto'],
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
          tooltip: 'Ver pdf del producto',
          if: (ev, item) => { return item.estado==='APROBADO'; },
          onclick: (ev, item) => {
            // this.$log.log(ev, item);
            this.Modal.pdf(`cert_sello_bolivia/productos_shb/ddjj_sello_bolivia/${item.id_sello_bolivia}`);
          }
        },
        {
          icon: 'file-pdf-o',
          tooltip: 'Ver certificacion',
          if: (ev, item) => { return item.estado==='APROBADO'; },
          onclick: (ev, item) => {
            // this.$log.log(ev, item); 
            // this.Modal.pdf(`certificaciones/documento/${item.id_certificacion}`, 'Certificación');
            this.Modal.pdf(`cert_sello_bolivia/productos_shb/ddjj_sello_bolivia/${item.id_sello_bolivia}/previsualizar_certificado`);
            
          }
        },
        {
          icon: 'eye',
          tooltip: 'Ver detalles de solicitud',
          if: (ev, item) => {
            return item.estado==='ENVIADO';
          },
          onclick: (ev, item) => {
            // this.$log.log(ev, item);
            this.Storage.set('selloBolivia', item);
            this.$location.path('detalleSolicitudSello');
          }
        }
      ],
      clases: {
        'estado': (item) => {
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
export default DdjjSelloboliviaController;