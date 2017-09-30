'use strict';

class CertificadoEmpController {
    constructor(DataService, Storage, Sidenav, Modal, $log) {
        'ngInject';

        this.DataService = DataService;
        this.Storage = Storage;
        this.Modal = Modal;
        this.Sidenav = Sidenav;
        this.$log = $log;

        this.usuario = this.Storage.getUser();
    }

    $onInit() {
        // this.DataService.get('certificados?ambito=PROBOLIVIA')
        // .then(response => {
        //     if (response) {
                this.certificados = [
                    { nombre: 'Certificado 1'},
                    { nombre: 'Certificado 1'},
                ];
        //     }
        // });
    }

    seleccionar(certificado) {
        this.Modal.confirm('¿Realmente desea <strong>crear</strong> este certificado para su matrícula?', () => {            
            this.Storage.set('form', certificado);
            this.Sidenav.path('registro');
        });
    }

    atras() {
        this.Storage.remove('form');
        this.Sidenav.path('matricula');   
    }
}

export default CertificadoEmpController;