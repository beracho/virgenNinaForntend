'use strict';

class VerificacionCertificacionController {
  constructor($scope, $log, $rootScope, Storage, DataService, $location, $sce, baseUrl, $window) {
    'ngInject';
    this.$scope = $scope;
    this.$log = $log;
    this.$rootScope = $rootScope;
    this.Storage = Storage;
    this.DataService = DataService;
    this.$location = $location;
    this.$sce = $sce;
    this.baseUrl = baseUrl;
    this.$window = $window;
  }

  $onInit() {
    // this.$log.log(this);
    // this.$log.log(this.$state.params);
    // this.titulo = 'Nombre de página';
    this.codigo = this.$location.search().codigo;


    // para no mostrar los sidenav en esta pantalla
    this.auth_backup = angular.copy(this.$rootScope.auth);
    this.$rootScope.auth = null;
    this.$scope.$on('$destroy', () => {
      this.$rootScope.auth = angular.copy(this.auth_backup);
    })
    
    this.cargarDatos();

    // const sideNav = angular.element('#app-sidenav');
    // // sideNav.addClass('ng-hide');
    // this.$log.log(sideNav);

    // this.isCorrecto = false;
    // //get para identificar datos del certificado

  }

  cargarDatos() {
    this.DataService.post(`${this.baseUrl}certificacion/datos?codigo=${this.codigo}`)
    .then( response => {
      if (response) {
        let direccion_total = [], cod_cert;   
        const unidad_productiva = response.producto.unidad_productiva;
        // para unir la direccion total
        direccion_total.push(unidad_productiva.hist_sucursales["0"].zona);
        direccion_total.push(unidad_productiva.hist_sucursales["0"].avenida_calle);
        if (unidad_productiva.hist_sucursales["0"].numero) {
          direccion_total.push('Nro. ' + unidad_productiva.hist_sucursales["0"].numero);
        }
        unidad_productiva.hist_sucursales["0"].direccion_total = direccion_total.join(' ');
        // variable para mostrar los datos
        this.$scope.data = {
          razon_social: unidad_productiva.razon_social,
          nombre_completo: unidad_productiva.hist_representantes.nombre_completo,
          // documento_identidad: unidad_productiva.hist_representantes.documento_identidad,
          // departamento: unidad_productiva.hist_sucursales["0"].departamento,
          // municipio: unidad_productiva.hist_sucursales["0"].municipio,
          // direccion_total: unidad_productiva.hist_sucursales["0"].direccion_total,
          nombre_producto: response.producto.nombre_producto,
          img64: response.producto.ver_imagen_producto,
        };

        // agarra la fecha del certificado PM o del sello en el caso de que lo tenga
        this.$scope.data._fecha_aprobacion = response._fecha_aprobacion;
        this.$scope.data._fecha_fin = response._fecha_fin;
        if (response && response.producto.sello_bolivia) {
          this.$scope.data._fecha_aprobacion = response.producto.sello_bolivia.certificacion._fecha_aprobacion;
          this.$scope.data._fecha_fin = response.producto.sello_bolivia.certificacion._fecha_fin;
        }

        //jalaremos el certificado SHB si es que ese es el caso
        cod_cert = this.codigo;
        if (response && response.producto.sello_bolivia) {
          cod_cert = response.producto.sello_bolivia.certificacion.codigo_certificado;
        }
        
        this.DataService.pdfO(`${this.baseUrl}certificacion/verificar?codigo=${cod_cert}`)
        .then( pdf => {
          if (pdf) {
            this.urlPdf = pdf;
          }
        })
      }
    })
  }

  descargarCertificado() {
    var ruta = this.baseUrl + 'certificaciones/generar_certificado' + '?codigo=' + this.codigo;
    this.DataService.pdfOfile(ruta, {})
    .then( response => {
      if (response) {
        var fileName = "certificado_generado.pdf";
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = response;
        a.download = fileName;
        a.click();
      }
    });
  }

  esEdge() {
    var userAgent = this.$window.navigator.userAgent;
    var ieEDGE = userAgent.match(/Edge/g);
    var ie = userAgent.match(/.NET/g); // IE 11+
    var oldIE = userAgent.match(/MSIE/g);
    return ie || oldIE || ieEDGE;
  }

}
export default VerificacionCertificacionController;
