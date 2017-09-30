'use strict';

class SolicitudController {
    constructor(Storage, Message, Filter, Util, Sidenav, $state, MatriculaPromueve, DataService, Datetime, $log, Modal) {
        'ngInject';

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

        this.tipoProducto = {
            'BIEN_PRODUCIDO': 'Bien producido',
            'COSTO_BRUTO': 'Costo bruto'            
        };
    }

    $onInit() {
        this.MatriculaPromueve.init()
        .then(success => {
            if (success == 'ONE') {
                this.initSolicitud();
            } else {                
                this.initMatriculas();
            }
            var xdate = new Date(this.Storage.get('dateNow'));
            this.dateOptions = {
                maxDate: xdate,
                minDate: new Date(xdate.getFullYear() - 1, xdate.getMonth(), xdate.getDate()),
                startingDay: 1,
                // showWeeks: false
            };
        }).catch(() => {
            this.Message.warning('Debe registrar sus productos en Pro Bolivia, luego registrar un producto en Promueve para poder ingresar a esta opción.');
            this.Sidenav.path('bandeja');
        });
    }

    validateFechaDeposito(form) {
        if (this.fecha_deposito) {
            form.fecha_deposito.$setValidity('min_date', !(this.fecha_deposito < this.dateOptions.minDate))
            form.fecha_deposito.$setValidity('max_date', !(this.fecha_deposito > this.dateOptions.maxDate))
        }
    }
    
    initSolicitud() {
        this.mostrarSolicitudes = true;
        this.matricula = this.Storage.get('matriculaPromueve');

        this.DataService.get(`certificacion_promueve/${this.usuario.nit}/productos_aprobados`)
        .then(response => {
            if (response && this.Util.toType(response) == 'array') {
                this.pendientes = response;
            } else {
                this.pendientes = [];
            }
        });
    }

    initMatriculas() {
        this.mostrarMatriculas = true;
        this.matriculas = this.Storage.get('matriculasPromueve');
    }

    selectAll() {
        this.pendientes.map(el => {
            el.select = !!this.checkSelectAll;
            return el;
        });
    }

    isSelectAll() {
        if (this.pendientes) {
            this.checkSelectAll = this.pendientes.length == this.pendientes.filter(el => el.select).length;
        }
    }

    totalPago() {
        let total = 0;
        if (this.pendientes) {
            this.pendientes.map(el => {
                if (el.select) {
                    total += parseFloat(el.certificacion.costo_certificacion);
                }
            });
        }
        return total;
    }

    enviar() {
        if (this.Filter.empty(this.codigo_boleta) || this.Filter.empty(this.fecha_deposito) ) {
            this.Util.gotoAnchor('deposito-tramite');
        } else {            
            let solicitudes = this.pendientes.filter(el => el.select);
            if (solicitudes.length === 0) {
                this.Message.warning('Debe seleccionar por lo menos un producto para solicitar una certificación.');
                this.Util.gotoAnchor('lista-producto');
            } else {
                if (solicitudes.filter(el => this.Filter.empty(el.cuce)).length === 0) {
                    let productos = [];
                    solicitudes.map(el => {
                        productos.push({ id_producto: el.id_producto, cuce: el.cuce });
                    });

                    let data = {
                        deposito: {
                            codigo_boleta: this.codigo_boleta,
                            fecha_deposito: this.Datetime.format(this.fecha_deposito),
                            monto: this.totalPago()
                        },
                        factura: {
                            razon_social: this.matricula.razon_social,
                            nit_ci: this.usuario.nit
                        },
                        productos
                    };
                    
                    this.Modal.confirm("A partir del envío de estos datos, podrá recoger su certificado de las oficinas de Promueve Bolivia en 24 horas", 
                        () => {
                            this.DataService.post(`certificacion_promueve/${this.matricula.id_unidad_productiva}/certificacion/enviar`, data)
                            .then(response => {
                                if (response) {
                                    this.Message.success('¡Solicitud(es) enviada(s)!');
                                    this.$state.reload();
                                }
                            });
                        },
                        null,
                        null,
                        'Enviar',
                        null,
                        'n'
                    );
                }
            }
        }
    }

    seleccionar(matricula) {
        this.mostrarMatriculas = false;
        this.Storage.set('matriculaPromueve', matricula);
        this.initSolicitud();
    }

    atras() {
        this.mostrarSolicitudes = false;
        this.mostrarMatriculas = true;
    }
}

export default SolicitudController;