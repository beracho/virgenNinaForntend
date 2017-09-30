'use strict';

class TerminosEmpModalController {
    constructor($uibModalInstance, data) {
        'ngInject';
        
        this.items = data;
        this.$uibModalInstance = $uibModalInstance;
    }

    $onInit() {

    }

    ok() {
        this.$uibModalInstance.close(this.selected.item);
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }
}

export default TerminosEmpModalController;