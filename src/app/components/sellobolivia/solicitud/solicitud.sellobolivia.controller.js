'use strict';
// html y controlador para el caso PB-PM-SHB
import modalControllerS from './sello.modal/sello.modal.controller';
import modalTemplateS from './sello.modal/sello.modal.html';

// html y controlador para los casos PB-SHB y SHB 
import modalControllerC from './certificacion.modal/certificacion.modal.controller';
import modalTemplateC from './certificacion.modal/certificacion.modal.html';

class SolicitudController {
    constructor($scope, Storage, Message, Filter, Util, Sidenav, $state, MatriculaPromueve, DataService, Datetime, $log, Modal) {
        'ngInject';
        this.$scope = $scope;
        this.Storage = Storage;
        this.Message = Message;
        this.Filter = Filter;
        this.Sidenav = Sidenav;
        this.Util = Util;
        this.DataService = DataService;
        this.Datetime = Datetime;
        this.Modal = Modal;
        this.$state = $state;
        this.MatriculaPromueve = MatriculaPromueve;
        this.$log = $log;

        this.mostrarSolicitudes = false;
        this.mostrarMatriculas = null;
        this.error = false;

        this.usuario = this.Storage.getUser();

        /**
         * Casos
         * caso 1: shb
         * caso 2: pb-shb
         * caso 3: pb-pm-shb
         */
        this.productos = [];
    }

    $onInit() {
        this.$scope.$on('app_sello_modal_success', () => {
            this.$scope.$broadcast('refresh_crud_table', `cert_sello_bolivia/productos_sin_shb/${this.usuario.id_usuario}`);
        });

        this.DataService.get(`cert_sello_bolivia/productos_sin_shb/${this.usuario.id_usuario}`)
        .then( response => {
            if (response && response.results) {
                this.cargarConfProductos();
                this.productos = response.results;
            }
        })
    }


    irBandeja() {
        this.Sidenav.path('bandejaSello');
    }

    cargarConfProductos() {
        this.confProd = {
            url: `cert_sello_bolivia/productos_sin_shb/${this.usuario.id_usuario}`,
            queryExtra: {estado:'APROBADO'},
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
            fields: ['id_producto', 'id_unidad_productiva', 'razon_social', 'nombre_producto', 'fid_formulario', '_fecha_creacion', 'observaciones'],
            permission: {
                update: false,
                create: true,
                delete: false,
                filter: false
            },
            eventCreate: (ev, item) => {
                this.Modal.show({
                    template: modalTemplateC,
                    controller: modalControllerC,
                    data: {
                        producto: item,
                    },
                    size: 'lg'
                });
            },
            labels: {
                emptyTable: 'No existen productos de promueve, debe registrar nuevos productos',
                create: 'Solicitar sello para un nuevo producto'
            },
            hiddenFields: ['id_unidad_productiva', 'observaciones'],
            fks: ['fid_formulario'],
            buttons: [
                {
                    icon: 'eye',
                    tooltip: 'Ver detalles de producto',
                    onclick: (ev, item) => {
                        this.Modal.pdf("certificacion_promueve/" + item.id_unidad_productiva + "/certificacion/" + item.id_producto + "/ddjj_pdf", null, item.estado === 'RECHAZADO' ? item.observaciones : null);
                    }
                },
                {
                    icon: 'gg-circle',
                    tooltip: 'Solicitar sello',
                    onclick: (ev, item) => {
                        // this.$log.log(ev, item);
                        this.Modal.show({
                            template: modalTemplateS,
                            controller: modalControllerS,
                            data: {
                                producto: item,
                            },
                            size: 'lg'
                        });
                    }
                }
            ]
        };
    }

}

export default SolicitudController;