'use strict';

// html y controlador para el caso PB-PM-SHB
import modalControllerS from './../solicitud/sello.modal/sello.modal.controller';
import modalTemplateS from './../solicitud/sello.modal/sello.modal.html';

class BandejaController {
  constructor($scope, NgTableParams, $log, Modal, Storage, DataService, Sidenav, Util, Message, baseUrl) {
    'ngInject';
    this.$scope = $scope;
    this.NgTableParams = NgTableParams;
    this.$log = $log;
    this.Modal = Modal;
    this.Storage = Storage;
    this.DataService = DataService;
    this.Sidenav = Sidenav;
    this.Util = Util;
    this.Message = Message;
    this.baseUrl = baseUrl;

    this.usuario = this.Storage.getUser();
  }

  $onInit() {
    // this.Storage.remove('matriculaPromueve');
    // this.Storage.remove('producto');
    var colors = {
      'NUEVO': 'default',
      'ENVIADO': 'primary',
      'APROBADO': 'success',
      'PENDIENTE_PAGO': 'warning',
      'OBSERVADO': 'danger',
      'RECHAZADO': 'danger',
      'PAGADO': 'default'
    };

    this.$scope.$on('app_sello_modal_success', () => { this.$scope.$broadcast('refresh_crud_table', 'cert_sello_bolivia/sellos'); });

    this.solicitudes = {
      url: `cert_sello_bolivia/sellos`,
      data: {        
        formly: [ //id_certificacion, nombre_producto, estado
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
              label: 'id certificacion',
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
            key: 'ambito',
            type: 'input',
            templateOptions: {
              label: 'ambito sello',
              type: 'text'
            }
          },
          {
            key: 'formulario_tipo',
            type: 'input',
            templateOptions: {
              label: 'tipo form sello',
              type: 'text'
            }
          },
          {
            key: 'fid_formulario',
            type: 'input',
            templateOptions: {
              label: 'Id form. sello',
              type: 'text'
            }
          },
          {
            key: '_fecha_inicio',
            type: 'datepicker',
            templateOptions: {
              label: 'Fecha de creación',
              type: 'date'
            }
          },

          {
            key: 'id_producto',
            type: 'input',
            templateOptions: {
              label: 'Producto',
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
            key: 'codigo_archivo',
            type: 'input',
            templateOptions: {
              label: 'Estado de firma',
              type: 'text'
            }
          },
          {
            key: 'estado_firma',
            type: 'input',
            templateOptions: {
              label: 'Estado de firma',
              type: 'text'
            }
          },
          {
            key: 'shb_producto',
            type: 'input',
            templateOptions: {
              label: 'es sello',
              type: 'text'
            }
          },
          {
            key: 'lugar_sello_producto',
            type: 'input',
            templateOptions: {
              label: 'Lugar de sello',
              type: 'text'
            }
          },
          {
            key: 'observaciones_certificacion',
            type: 'input',
            templateOptions: {
              label: 'Observaciones de certificación',
              type: 'text'
            }
          },
          // {
          //   key: 'razon_social',
          //   type: 'input',
          //   templateOptions: {
          //     label: 'Razón social',
          //     type: 'text'
          //   }
          // },
          // {
          //   key: 'matricula_comercio',
          //   type: 'input',
          //   templateOptions: {
          //     label: 'Matrícula de comercio',
          //     type: 'text'
          //   }
          // },
          {
            key: 'id_certificacion_unidad',
            type: 'input',
            templateOptions: {
              label: 'Id cert. uni. prod.',
              type: 'text'
            }
          },
          {
            key: 'fid_formulario_unidad',
            type: 'input',
            templateOptions: {
              label: 'Id form. uni. prod.',
              type: 'text'
            }
          },
          {
            key: 'certificado_unidad_estado',
            type: 'input',
            templateOptions: {
              label: 'estado cert. uni. prod.',
              type: 'text'
            }
          },
        ]
      },
      fields: ['id_sello_bolivia','id_certificacion', 'id_unidad_productiva', 'id_producto', 'codigo_archivo', 'estado_firma', 'ruta_imagen', 'nombre_producto', 'shb_producto', 'lugar_sello_producto', 'observaciones_certificacion', 'estado', 'ambito', 'formulario_tipo', 'fid_formulario', '_fecha_inicio', 'id_certificacion_unidad', 'fid_formulario_unidad', 'certificado_unidad_estado'],
      hiddenFields: ['id_sello_bolivia','id_certificacion','id_unidad_productiva', 'id_producto', 'codigo_archivo', 'estado_firma', 'shb_producto', 'lugar_sello_producto', 'observaciones_certificacion', 'ambito', 'formulario_tipo', 'fid_formulario', 'id_certificacion_unidad', 'fid_formulario_unidad', 'certificado_unidad_estado'],
      permission: {
        delete: false,
        filter: false
      },
      eventEdit: item => {
        if (item.fid_formulario_unidad==7 && (item.certificado_unidad_estado=='NUEVO'||item.certificado_unidad_estado=='OBSERVADO')) {
          this.Storage.setSession('certificacion', item.id_certificacion_unidad);
          this.Sidenav.path('registro');
        } else if (item.shb_producto=='boolean_true') {
          this.Storage.set('matriculaPromueve', { id_unidad_productiva: item.id_unidad_productiva });
          this.Storage.set('producto', { id_producto: item.id_producto });
          this.Sidenav.path('certificacion');
        } else {
          item.lugar_sello = item.lugar_sello_producto;
          this.Modal.show({
              template: modalTemplateS,
              controller: modalControllerS,
              data: {
                  producto: item,
              },
              size: 'lg'
          });
        }
      },
      eventCreate: () => {
        this.Sidenav.path('nuevoRegistroSello');
      },
      eventDelete: item => {
        this.Modal.confirm('¿Desea eliminar este registro?', () => {
          this.DataService.delete(`cert_sello_bolivia/shb/${item.id_producto}`)
          .then( response => {
            if (response) {
              this.Message.success();
              this.$scope.$broadcast('refresh_crud_table', 'cert_sello_bolivia/sellos');
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
      buttonsTop: [
        {
          icon: 'download',
          label: 'Manual de sello',
          tooltip: 'Descargar manual de uso de sello',
          onclick: () => {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.href = `${this.baseUrl}manual/uso/shb`;
            a.download = 'Manual de uso de sello Hecho en Bolivia.pdf';
            a.click();
            this.Message.success('Su documento esta siendo descargado.');
            a.parentNode.removeChild(a);
          }
        }
      ],
      buttons: [
        {
          icon: 'eye',
          tooltip: 'Ver detalles de solicitud',
          if: (ev, item) => {
            return item.estado==='APROBADO'||item.estado==='ENVIADO'||(item.estado==='OBSERVADO'&&item.shb_producto=='boolean_false');
          },
          onclick: (ev, item) => {
            // this.$log.log(ev, item);
            this.Modal.pdf(`cert_sello_bolivia/productos_shb/ddjj_sello_bolivia/${item.id_sello_bolivia}`);
          }
        },
        {
          icon: 'file-pdf-o',
          tooltip: 'Ver certficacion',
          if: (ev, item) => { return item.estado_firma=='FIRMADO' },
          onclick: (ev, item) => {
            // this.$log.log(ev, item);
            this.DataService.get(`certificaciones/firma/${item.id_certificacion}`)
            .then( response => {
              // this.$log.log(response);
              const firmadores = response.map( it => { return {
                  nombre: it.nombreComunSubject,
                  organizacion: it.organizacionSubject,
                  emisor: `${it.nombreComunIssuer} - ${it.nombreComunIssuer}`,
              }})
              // this.$log.log(firmadores);
              return this.Modal.pdf(`${this.baseUrl}certificacion/verificar?codigo=${item.codigo_archivo}`, null, null, firmadores[0]);
            })
          }
        },
      ],
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
