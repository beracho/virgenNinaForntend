'use strict';

class MatriculaEmpController {
    constructor(DataService, Storage, Modal, Sidenav, MatriculaPromueve, $log) {
        'ngInject';

        this.DataService = DataService;
        this.Storage = Storage;
        this.Modal = Modal;
        this.Sidenav = Sidenav;
        this.MatriculaPromueve = MatriculaPromueve;
        this.$log = $log;
    }

    $onInit() {
        this.MatriculaPromueve.init()
        .then(success => {
            if (success == 'ONE') {
                this.Sidenav.path('tramite');
            }
            this.matriculas = this.Storage.get('matriculasPromueve');
        })
        .catch(error => {
            if (error == 'LENGTH') {
                this.Sidenav.path('bandeja');
            } else if (error == 'NULL') {
                this.Modal.alert('Debe tener por lo menos una certificación aprobada en ProBolivia para continuar o <br />usted no está habilitado para realizar su registro debido a que no realiza procesos de transformación.', () => {
                    this.Sidenav.path('bandeja');
                });
            }
        });
    }

    seleccionar(matricula) {
        this.$log.log(matricula);
        this.Storage.set('matriculaPromueve', matricula);
        this.Sidenav.path('tramite');
    }
}

export default MatriculaEmpController;