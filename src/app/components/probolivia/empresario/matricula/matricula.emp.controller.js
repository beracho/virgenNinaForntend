'use strict';

class MatriculaEmpController {
    constructor(DataService, Storage, Sidenav, $log, Modal) {
        'ngInject';

        this.DataService = DataService;
        this.Storage = Storage;
        this.Sidenav = Sidenav;
        this.$log = $log;
        this.Modal = Modal;

        this.usuario = this.Storage.getUser();
    }

    $onInit() {
        // this.$log.log(this);
        if (this.usuario.nit==null) {
          // si no tiene nit se ira directo a formularios
          this.Sidenav.path('formulario');
          this.Storage.remove('not_found_matricula');
        } else {
          this.Modal.confirm('',
            () => {
              this.DataService.get(`servicios/matriculas/${this.usuario.nit}`)
              .then(response => {
                if (response) {
                  if (angular.isArray(response.matriculas) && response.matriculas.length>0) {
                    this.matriculas = response.matriculas;
                    this.Storage.remove('not_found_matricula');
                  } else {
                    this.Storage.set('not_found_matricula', true);
                    this.seleccionar();
                  }
                }
              });
            },
            () => {
              this.Storage.remove('not_found_matricula');
              this.seleccionar();
            },
            '¿Cuenta usted con matrícula de comercio?',
            'SI',
            'NO',
            ' '
          )
        }
    }

    seleccionar(matricula) {
        // this.$log.log(matricula);
        this.Storage.set('matricula', matricula);
        this.Sidenav.path('formulario');
    }
}

export default MatriculaEmpController;
