'use strict';

class MatriculaPromueve {
    constructor(Storage, Sidenav, DataService, $q) {
        'ngInject';
        
        this.Storage = Storage;
        this.Sidenav = Sidenav;
        this.$q = $q;
        this.DataService = DataService;

        this.usuario = this.Storage.getUser();
    }

    $onInit() {

    }

    init() {

        let defered = this.$q.defer();
        let promise = defered.promise;

        this.Storage.remove('matriculaPromueve');

        this.DataService.get(`certificacion_promueve/up_certificadas/${this.usuario.id_usuario}`)
        .then(response => {
            if (response) {
                if (response.length === 0) {
                    defered.reject('LENGTH');
                } else {
                    if (response.length == 1) {
                        this.Storage.set('matriculaPromueve', response[0]);
                        defered.resolve('ONE');
                    }
                }
                this.matriculas = response;
                this.Storage.set('matriculasPromueve', this.matriculas);
                defered.resolve(true);
            } else {
                defered.reject('NULL');
            }
        });

        return promise;
    }

}

export default MatriculaPromueve;