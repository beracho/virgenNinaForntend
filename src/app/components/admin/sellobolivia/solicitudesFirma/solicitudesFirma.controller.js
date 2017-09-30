'use strict';
class SolicitudesFirmaSHBController {
  constructor($scope, $log, Message, Modal, DataService, Storage, $location, baseUrl, Demofi) {
    'ngInject';
    this.$scope = $scope;
    this.$log = $log;
    this.Message = Message;
    this.Modal = Modal;
    this.Storage = Storage;
    this.$location = $location;
    this.baseUrl = baseUrl;
    this.DataService = DataService;
    this.Demofi = Demofi;
  }

  $onInit() {
    this.cargarTabla();
    // this.Demofi.openModal([]);
  }
  
  cargarTabla(){
    var colors = {
      'PENDIENTE': 'primary',
      'FIRMADO': 'success',
    };
    this.solicitudes = {
      url: `cert_sello_bolivia/shb/firma/solicitudes`,
      queryExtra: {estado:'APROBADO'},
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
            key: 'id_certificacion',
            type: 'input',
            templateOptions: {
              label: 'Id certificacion',
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
            key: 'estado_firma',
            type: 'select',
            templateOptions: {
              label: 'Estado',
              type: 'select',
              "options": [
                {
                  "value": "FIRMADO",
                  "name": "FIRMADO"
                },
                {
                  "value": "PENDIENTE",
                  "name": "PENDIENTE"
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
      fields: ['id_sello_bolivia', 'id_certificacion', 'id_unidad_productiva','id_producto', 'razon_social', 'matricula_comercio', 'nombre_producto', 'estado_firma', 'fid_formulario', '_fecha_creacion'],
      hiddenFields: ['id_sello_bolivia', 'id_certificacion', 'id_unidad_productiva','id_producto'],
      fks: ['fid_formulario'],
      permission: {
        create: false,
        update: false,
        delete: false,
        filter: false
      },
      checks: {
        label: 'Firmar solicitudes',
        if: (item) => { return item.estado_firma=='PENDIENTE';},
        // cbCheck: () => {
        //   this.$log.log('Event check');
        // },
        cbButton: rows => {
          const docSolicitudes = [];
          let sol;
          // this.$log.log('Event butoon', rows, this.Demofi);
          rows.forEach( it => {
            if (it.checked) {
              sol = {
                url_source_pdf: this.DataService.getUrl(`cert_sello_bolivia/shb/firma/documento/${it.id_sello_bolivia}`),
                url_upload_pdf: this.DataService.getUrl(`cert_sello_bolivia/shb/firma/actualizar/`),
                nombre_archivo: `Producto ${it.nombre_producto}`, // nombre del producto
                codigo_archivo: `${it.id_sello_bolivia}`, // id de sello bolivia
                authorization: `Bearer ${this.Storage.get('token')}`, // token
              };
              docSolicitudes.push(sol);
            }
          })
            
          if (docSolicitudes.length) {
            // ---------------------------------------  FIRMAR SOLICITUDES ----------------------------------------
            // console.log(docSolicitudes); 
            // console.log(JSON.stringify(docSolicitudes, null, 2))
            this.Demofi.openModal(docSolicitudes).result
            .then( data => {
              this.$log.log('THEN modal', data);
              this.$scope.$broadcast('refresh_crud_table', this.solicitudes.url)
            })
          } else {
            this.Message.warning("Debe seleccionar por lo menos un documento");              
          }
        }
      },
      buttons: [
        {
          icon: 'eye',
          tooltip: 'Ver pdf del producto',
          onclick: (ev, item) => {
            // this.$log.log(ev, item);
            this.Modal.pdf(`cert_sello_bolivia/productos_shb/ddjj_sello_bolivia/${item.id_sello_bolivia}`);
          }
        },
        {
          icon: 'file-pdf-o',
          tooltip: 'Ver certificacion',
          onclick: (ev, item) => {
            // this.$log.log(ev, item); 
            this.Modal.pdf(`certificaciones/documento/${item.id_certificacion}`, 'Certificación');
          }
        }
      ],
      clases: {
        'estado_firma': (item) => {
          // this.$log.log(item);
          return ['badge', 'badge-'+colors[item.estado_firma]];
        } 
      }
    };
  }

  verDetalleSolicitud(item) {
    this.Storage.set('print_prod', item);
    this.$location.path('impProductoPromueve');
  }
}
export default SolicitudesFirmaSHBController;