'use strict';

class FormularioEmpController {
    constructor(DataService, Storage, Sidenav, Modal, $log, Loading) {
        'ngInject';

        this.DataService = DataService;
        this.Storage = Storage;
        this.Modal = Modal;
        this.Sidenav = Sidenav;
        this.Loading = Loading;
        this.$log = $log;

        this.usuario = this.Storage.getUser();
    }

    $onInit() {
        this.Storage.remove('producto');
        this.matricula = this.Storage.get('matriculaPromueve');
        if (!this.matricula) {
            this.Sidenav.path('matriculaPromueve');
        }

        this.tramites = [
            {
                'id_tramite': 'BIEN_PRODUCIDO',
                'nombre': 'BIEN PRODUCIDO'
            },
            {
                'id_tramite': 'COSTO_BRUTO',
                'nombre': 'COSTO BRUTO'
            },
        ];
    }

    seleccionar(tramite) {
        this.Modal.confirm('¿Realmente desea crear este trámite?', () => {
            this.Loading.show('Creando nuevo trámite', true);
            this.DataService.post(`certificacion_promueve/${this.matricula.id_unidad_productiva}/producto`, { 
                tipo_producto : tramite.id_tramite,
                nombre_producto: tramite.nombre 
            }).then(response => {
                if (response) {                    
                    this.Loading.show(null, false);
                    this.Storage.set('producto', response);
                    this.Sidenav.path('certificacion');
                }
            });
        });
    }
}

export default FormularioEmpController;
