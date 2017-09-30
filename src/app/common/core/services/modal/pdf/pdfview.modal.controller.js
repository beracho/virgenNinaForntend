'use strict';
class PdfViewModalController {
  constructor($uibModalInstance, data, $sce, DataService, $log) {
    'ngInject';
    this.item = data;
    this.$uibModalInstance = $uibModalInstance;
    this.$sce = $sce;
    this.DataService = DataService;
    this.$log = $log;
  }

  $onInit() {
//var pdf = 'CONTENIDO_PDF_B64';
//this.urlPdf = this.$sce.trustAsResourceUrl('data:application/pdf;base64,' + pdf);
//    var pdf = 'http://www.probolivia.gob.bo/Docs/proinfo/ConvenioInterinstitucional.pdf';

    this.DataService.pdfO(this.item.urlPdf, {}).then((response) => {
      this.$log.log('Documento XXX = ', response);
      if (response) {
        this.$log.log('Documento = ', response);
        this.urlPdf = response;
      }
    });


//    var pdf = 'http://mindesarrollo.demo.agetic.gob.bo/api/archivoPROBOLIVIA.pdf';
//    this.urlPdf = this.$sce.trustAsResourceUrl(pdf);


//    this.urlPdf = this.$sce.trustAsResourceUrl(this.fileURL);
  }

  ok() {
    this.$uibModalInstance.close(/*Algun valor*/);
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default PdfViewModalController;