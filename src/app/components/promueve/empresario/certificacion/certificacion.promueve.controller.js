'use strict';
import modalControllerD from './declaracion.emp.modal.controller';
import modalTemplateD from './declaracion.emp.modal.html';

import modalControllerF from './../../../probolivia/empresario/registro/fundempresa.modal.controller';
import modalTemplateF from './../../../probolivia/empresario/registro/fundempresa.modal.html';

import modalControllerS from './../../../sellobolivia/solicitud/sello.modal/sello.modal.controller';
import modalTemplateS from './../../../sellobolivia/solicitud/sello.modal/sello.modal.html';
class FormularioEmpController {
    constructor($scope, DataService, Storage, Sidenav, Modal, Message, apiUrl, baseUrl, Filter, Util, helpLang, errorsLang, $log) {
        'ngInject';

        this.$scope = $scope;
        this.DataService = DataService;
        this.Storage = Storage;
        this.Modal = Modal;
        this.apiUrl = apiUrl;
        this.baseUrl = baseUrl;
        this.Sidenav = Sidenav;
        this.Message = Message;
        this.Util = Util;
        this.Filter = Filter;
        this.errorsLang = errorsLang;
        this.helpLang = helpLang;
        this.$log = $log;

        this.usuario = this.Storage.getUser();

        this.renderInsumos = false;
        this.renderPagos = false;

        this.inputsRequired = ['nombre_producto', 'capacidad_prod_mensual', 'precio_unitario', 'tipo_comercio', 'desc_produccion'];
    }

    $onInit() {
        this.matricula = this.Storage.get('matriculaPromueve');
        if (!this.matricula) {
            this.Sidenav.path('matriculaPromueve');
        }

        this.producto = this.Storage.get('producto');
        if (!this.producto) {
            this.Sidenav.path('producto');
        }

        this.$scope.$on('app_sello_modal_success', () => { this.atras(); });

        this.cargarData();        

        this.urlUpload = `${this.apiUrl}certificacion_promueve/${this.matricula.id_unidad_productiva}/producto/${this.producto.id_producto}/guardar-foto`;

        this.insumos = {
            permission: {
                filter: false
            },
            data: {
                formly: [
                    {
                        key: 'id_insumo',
                        type: 'input',
                        templateOptions: {
                            label: 'ID'
                        }
                    },
                    {
                        key: 'tipo_item',
                        type: 'select',
                        templateOptions: {
                            label: 'Item',
                            placeholder: 'Nombre de item',
                            required: true,
                            options: [
                                {
                                    "value": "MATERIALES",
                                    "name": "Materiales e insumos"
                                },
                                {
                                    "value": "MANO_OBRA",
                                    "name": "Mano de obra"
                                },
                                {
                                    "value": "OTROS_COSTOS",
                                    "name": "Otros costos"
                                }
                            ],
                            onChange: (value, options, _this) => {
                                if (value == 'MANO_OBRA') {
                                    _this.model.nacional = true;
                                    _this.model.unidad = 700;
                                    _this.model.unidad_medida = 'Personas';
                                } else {
                                    _this.model.unidad = null;
                                    _this.model.unidad_medida = '';
                                }
                            },
                        },
                        validation: {
                            messages: {
                                required: 'to.label + " es obligatorio."'
                            }
                        }
                    },
                    {
                        key: 'descripcion',
                        type: 'input',
                        templateOptions: {
                            label: 'Descripción',
                            placeholder: 'Descripción',
                            required: true,
                            maxlength: 255
                        },
                        validation: {
                            messages: {
                                required: 'to.label + " es obligatorio."',
                                maxlength: '"Solo puede tener " + to.maxlength + " caracteres como máximo."'
                            }
                        }
                    },
                    {
                        key: 'cantidad',
                        type: 'input',
                        templateOptions: {
                            label: 'Cantidad',
                            placeholder: 'Cantidad',
                            required: true,
                            onKeydown: (value, options, _this, event) => {
                                this.Filter.decimalFormat(event);
                            },
                            onKeyup: (value, options, _this) => {
                                this.calcularTotalInsumo(_this.model);
                            },
                            maxlength:9
                        },
                        validation: {
                            messages: {
                                required: 'to.label + " es obligatorio."',
                                maxlength: '"Solo puede tener " + to.maxlength + " caracteres como máximo."'
                            }
                        }
                    },
                    {
                        key: 'unidad',
                        type: 'select',
                        templateOptions: {
                            label: 'Unidad de medida',
                            placeholder: 'Unidad de medida',
                            required: true,
                            options: [],
                            // onChange: (value, options, _this, e) => {
                            //     console.log(value, options, _this);
                            // }
                        },
                        validation: {
                            messages: {
                                required: 'to.label + " es obligatorio."'
                            }
                        },
                        hideExpression: "model.unidad == '700' && model.unidad_medida == 'Personas'"
                    },
                    {
                        key: 'unidad_medida',
                        type: 'input',
                        templateOptions: {
                            label: 'Otra unidad',
                            placeholder: 'Escriba la unidad de medida',
                            required: true,
                        },
                        validation: {
                            messages: {
                                required: 'to.label + " es obligatorio."'
                            }
                        },
                        hideExpression: "model.unidad != '700'",
                        expressionProperties: {
                            "templateOptions.disabled": "model.unidad == '700' && model.unidad_medida == 'Personas'"
                        }
                    },
                    {
                        key: 'valor',
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'Valor (bs.)',
                            placeholder: 'Valor (bs.)',
                            required: true,
                            onKeydown: (value, options, _this, event) => {
                                this.Filter.decimalFormat(event);
                            },
                            onKeyup: (value, options, _this) => {
                                this.calcularTotalInsumo(_this.model);
                            },
                            maxlength: 12
                        },
                        validation: {
                            messages: {
                                required: 'to.label + " es obligatorio."',
                                maxlength: '"Solo puede tener " + to.maxlength + " caracteres como máximo."'
                            }
                        }
                    },
                    {
                        key: 'total',
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'Total(bs)',
                            placeholder: 'Total(bs)',
                            required: true,
                            onKeydown: (value, options, _this, event) => {
                                this.Filter.decimalFormat(event);
                            },
                            maxlength: 12,
                            disabled: true
                        },
                        validation: {
                            messages: {
                                required: 'to.label + " es obligatorio."',
                                maxlength: '"Solo puede tener " + to.maxlength + " caracteres como máximo."'
                            }
                        }
                    },
                    {
                        key: 'nacional',
                        type: 'radio',
                        defaultValue: true,
                        templateOptions: {
                            label: 'Producto nacional',
                            options: [
                                { 'value': true, 'name': 'Es nacional' },
                                { 'value': false, 'name': 'Es extranjero' }
                            ]
                        },
                        expressionProperties: {
                            "templateOptions.options": (value, options, _this) => {
                                if (_this.model.tipo_item == 'MANO_OBRA') {
                                    return [{ 'value': true, 'name': 'Es nacional' }];
                                } else {
                                    return [
                                        { 'value': true, 'name': 'Es nacional' },
                                        { 'value': false, 'name': 'Es extranjero' }
                                    ];
                                }
                            }
                        }
                    }
                ],
                list: [],                
                urlUpdate: `certificacion_promueve/${this.matricula.id_unidad_productiva}/producto/${this.producto.id_producto}/insumos`
            },
            fks: ['tipo_item', 'unidad'],
            // fields: ['id_insumo', 'tipo_item', 'descripcion', 'cantidad', 'unidad', 'unidad_medida', 'valor', 'total', 'nacional']
            hiddenFields: ['unidad_medida'],
            mergeFields: {
                unidad: function (item) {
                    if (item.unidad == 'Otros') {
                        return item.unidad_medida;
                    }
                    return item.unidad;
                }
            }
        };

        this.photo = {
            url: this.urlUpload,
            textUpload: this.textUpload,
            onCompleteItem: (fileItem, response, status/*, headers, reset*/) => {
                if (status === 200) {
                    if(response.finalizado && response.datos && response.datos.nombre_archivo) {
                        this.data.imagen_producto = response.datos.nombre_archivo;
                        this.urlImage = `${this.baseUrl}promueve/productos/${this.data.imagen_producto}`;
                    }
                } else {
                    this.Message.error(response.mensaje || this.errorsLang[status] || 'Ocurrió un error desconocido.');
                }
            }
        };

        this.total = {
            save: list => {
                this.$log.log('list update', list);
                let total = 0;
                list.map(e => {
                    total += parseFloat(e.total);
                });
                this.data.total_costo_bruto = total;

                let valor = 0;
                list.map(e => {
                    valor += parseFloat(e.valor);
                });                
                this.data.total_valor_costo_bruto = valor;

                this.guardarForm();
            }
        };
        
    }

    calcularTotalInsumo(model) {
        let cantidad = model.cantidad ? parseFloat(model.cantidad) : 0;
        let valor = model.valor ? parseFloat(model.valor) : 0;
        model.total = (cantidad * valor).toFixed(2);
    }

    cargarData() {
        this.DataService.get(`certificacion_promueve/${this.matricula.id_unidad_productiva}/producto/${this.producto.id_producto}`)
        .then(response => {
            if (response) {
                this.data = response;

                this.data.insumos = this.data.insumos || [];
                this.data.pagos = (this.data.certificacion && this.data.certificacion.pagos) || [];

                this.insumos.data.list = this.data.insumos;

                if (this.data.imagen_producto) {
                    this.urlImage = `${this.baseUrl}promueve/productos/${this.data.imagen_producto}`;
                }

                if (!this.data.shb) {
                   this.inputsRequired.push('color');
                }
              
                this.cargarUbicaciones();
                this.cargarUnidades();
            } else {
                this.Sidenav.path('matriculaPromueve');
            }
        });
        
        this.DataService.get(`certificacion_promueve/producto/unidades_peso`)
        .then(response => {
          this.unidades_peso = response;
        });
    }

    cargarUnidades() {
        this.DataService.get(`parametros/?grupo=UNIDAD_MEDIDA`)
        .then(response => {
            if (response) {
                let items = [];
                for (let el of response) {
                    items.push({ value: el.id_parametro + "", name: el.nombre });
                }
                this.insumos.data.formly[4].templateOptions.options = items;

                this.renderInsumos = true;
                this.renderPagos = true;
            }
        });
    }

    cargarUbicaciones() {
        let list = this.data.unidad_productiva.ubicaciones;
        let ubicaciones = [];
        for (let i in list) {
            ubicaciones.push({
                html: `
                    <p class="${ !list[i].zona ? 'ng-hide' : ''}"><strong>Zona:</strong> ${ list[i].zona }</p>
                    <p class="${ !list[i].avenida_calle ? 'ng-hide' : ''}"><strong>Avenida/calle:</strong> ${ list[i].avenida_calle }</p>
                    <p class="${ !list[i].avenida_calle_referencia ? 'ng-hide' : ''}"><strong>Avenida/calle de referencia:</strong> ${ list[i].avenida_calle_referencia }</p>
                    <p class="${ !list[i].numero ? 'ng-hide' : ''}"><strong>Número:</strong> ${ list[i].numero }</p>
                    <p class="${ !list[i].edificio ? 'ng-hide' : ''}"><strong>Edificio:</strong> ${ list[i].edificio }</p>
                    <p class="${ !list[i].piso ? 'ng-hide' : ''}"><strong>Piso:</strong> ${ list[i].piso }</p>
                    <p class="${ !list[i].telefonos ? 'ng-hide' : ''}"><strong>Teléfonos:</strong> ${ list[i].telefonos }</p>
                    <p class="${ !list[i].correo ? 'ng-hide' : ''}"><strong>Correo:</strong> ${ list[i].correo }</p>
                    <p class="${ !list[i].latitud ? 'ng-hide' : ''}"><strong>Latitud:</strong> ${ list[i].latitud }</p>
                    <p class="${ !list[i].longitud ? 'ng-hide' : ''}"><strong>Longitud:</strong> ${ list[i].longitud }</p>
                `
            });
        }
        this.ubicaciones = ubicaciones;
    }

    cambiarImagen() {
        this.urlImage = null;        
    }

    eliminarImagen() {        
        this.urlImage = null;
        this.data.imagen_producto = null;
    }

    cancelarCambioImagen() {
        if (this.data) {
            this.urlImage = `${this.baseUrl}promueve/productos/${this.data.imagen_producto}`;
        }
    }

    guardarForm() {        
        if (this.data) {
            // if (this.data.nombre_producto && this.data.color && this.data.capacidad_prod_mensual && this.data.precio_unitario) { //jloza
            // if (this.isNotArrayEmpty(this.inputsRequired)) { //oguti
                let data = angular.copy(this.data);
                
                data.total_costo_bruto = data.total_costo_bruto || 0;
                data.total_valor_costo_bruto = data.total_valor_costo_bruto || 0;
                data.total_distribucion_nacional = 0;
                data.total_distribucion_extranjera = 0;

                delete data.pagos;
                delete data.insumos;
                delete data.certificacion;
                delete data.unidad_productiva;

                this.DataService.put(`certificacion_promueve/${this.matricula.id_unidad_productiva}/producto`, data);
            // }
        }
    }

    isNotArrayEmpty(array) {
        for (let i in array) {
            if (this.Filter.empty(this.data[array[i]])) {
                return false;
            }
        }

        return true;
    }

    declarar() {
        if (this.isNotArrayEmpty(this.inputsRequired)) {
            if (!this.data.shb && this.Filter.empty(this.data.talla) && this.Filter.empty(this.data.peso) && this.Filter.empty(this.data.medidas)) {
                this.Message.warning('Debe llenar al menos uno de estos datos: <strong>talla, medida o peso</strong>.');
                this.Util.gotoAnchor('descripcion-producto-otros');
            } else if (!this.data.shb  && this.Filter.empty(this.data.fid_par_unidad_medida)) {
                this.Message.warning('Debe llenar la unidad de medida');
                this.Util.gotoAnchor('descripcion-producto-otros');
            } else if (!this.data.imagen_producto) {
                this.Message.warning('Debe agregar la <strong>imagen</strong> del producto.');
                this.Util.gotoAnchor('imagen-producto');
            } else if (this.insumos.data.list.length === 0 && !this.data.shb) {
                this.Message.warning('Debe tener por lo menos un <strong>insumo</strong> registrado.');
                this.Util.gotoAnchor('lista-insumos');
            } else if (!this.data.shb && this.validarInsumos()) {
                this.Message.error('Debe registrar al menos un insumo de cada tipo: materia prima, mano de obra y otro.');
                this.Util.gotoAnchor('lista-insumos');
            } else {
                if (this.data.shb) {
                    this.Modal.show({
                        template: modalTemplateS,
                        controller: modalControllerS,
                        data: {
                            producto: {
                                id_producto:this.data.id_producto,
                                nombre_producto:this.data.nombre_producto,
                                lugar_sello:this.data.lugar_sello,
                                id_unidad_productiva:this.data.unidad_productiva.id_unidad_productiva,
                                razon_social: this.data.unidad_productiva.razon_social,
                                fid_formulario: this.data.certificacion.formulario.tipo,
                                _fecha_creacion: this.data._fecha_creacion
                            },
                        },
                        size: 'lg'
                    });
                } else {
                    this.Modal.show({
                        template: modalTemplateD,
                        controller: modalControllerD,
                        data: {
                            "data": this.data,
                            "id_unidad_productiva": this.matricula.id_unidad_productiva
                        },
                        size: 'lg'
                    });
                }
            }
        } else {
            if (this.Filter.empty(this.data.nombre_producto)) {
                this.Util.gotoAnchor('nombre-producto');
            } else if (this.Filter.empty(this.data.precio_unitario)||this.Filter.empty(this.data.tipo_comercio)) {
                this.Util.gotoAnchor('descripcion-producto-comercializacion');
            } else if(this.Filter.empty(this.data.capacidad_prod_mensual)||this.Filter.empty(this.data.desc_produccion)) {
                this.Util.gotoAnchor('descripcion-producto');
            } else {
                this.Util.gotoAnchor('descripcion-producto-otros');
            }
        }
    }

    validarInsumos() {
        const arr = this.insumos.data.list;
        let sw, material, mano_obra, otros;
        for (var i = 0; i < arr.length && !sw; i++) {
            material = material || arr[i].tipo_item=='MATERIALES';
            mano_obra = mano_obra || arr[i].tipo_item=='MANO_OBRA';
            otros = otros || arr[i].tipo_item=='OTROS_COSTOS';
            sw = material && mano_obra && otros;
        }
        return !sw;
    }

    masInformacion() {
        this.Modal.show({
            template: modalTemplateF,
            controller: modalControllerF,
            data: {
                empresa: this.data.unidad_productiva
            },
            size: 'lg'
        });
    }

    atras() {
        if (this.data.shb) {
            this.Sidenav.path('bandejaSello');    
        } else {
            this.Sidenav.path('tramite');
        }
    }

}

export default FormularioEmpController;
