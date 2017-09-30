'use strict';

class DemofiModalController {
    constructor($scope, Demofi, Message, $interval, $q, $http, $uibModalInstance, data, DataService, $log) {
        'ngInject';
        this.$scope = $scope;
        this.Demofi = Demofi;
        this.Message = Message;
        this.$interval = $interval;
        this.$q = $q;
        this.$http = $http;
        this.$uibModalInstance = $uibModalInstance;
        this.DataService = DataService;
        this.$log = $log;

        //   COMENZANDO CON LAS PANTALLAS
        this.$scope.pin = undefined;
        this.$scope.tokens = [];
        this.$scope.certificados = [];
        this.$scope.firmados = 0;
        this.$scope.iniciado = false;
        this.$scope.iniciando = false;
        this.$scope.certificado_seleccionado = undefined;
        this.$scope.solicitudes = data.solicitudes;
        this.$scope.autenticado = false;
        this.$scope.autenticando = false;
        this.$scope.firmando = false;
        this.$scope.demofi_ejecutandose = false;
        this.$scope.token_conectado = false;
        this.$scope.boton_autenticar_habilitado = false;
        this.$scope.mostrar_progress = false;

    }

    $onInit() {
        // this.$log.log(this);
        // introduciendo a todas las solicitudes un estado

        this.$scope.solicitudes.forEach( it => { it.estado = 'PENDIENTE'; })

        this.$scope.iniciando = false;
        this.verificarTokenConectado();      
        this.initInterval();
    }

    initInterval() {
        this.idInterval = this.$interval( () => { this.verificarTokenConectado();  } , 2000);   
    }

    cancelInterval() {
        if (this.idInterval) {
            this.$interval.cancel(this.idInterval);
            this.idInterval = undefined;
        }
    }


    verificarTokenConectado() {
        if (this.$scope.iniciando === false) {
            this.$scope.iniciando = true;
            this.Demofi.listTokens()
            .then( response => {
                // this.$log.log('verificarTokenConectado-then', response)
                this.$scope.iniciando = false;
                this.$scope.iniciado = true;
                this.$scope.demofi_ejecutandose = true;
                this.$scope.tokens = response.datos;
                this.$scope.token_conectado = response.datos.length > 0;
            })
            .catch( () => {
                // this.$log.log('verificarTokenConectado-catch', error)
                this.$scope.iniciando = false;
                this.$scope.iniciado = true;
                this.$scope.token_conectado = false;
                this.$scope.demofi_ejecutandose = false;
            });
        }
    }

    autenticar() {
        this.$scope.mostrar_progress = true;
        this.$scope.autenticando = true;
        this.cancelInterval();
        this.Demofi.login(this.$scope.pin)
        .then( (respLogin) => {
            // this.$log.log(respLogin);
            this.$scope.mostrar_progress = false;
            this.$scope.autenticando = false;
            if (respLogin.finalizado === true) {
                this.$scope.boton_autenticar_habilitado = false;

                // Obtener certificados
                this.$scope.autenticado = true;
                // Una ves autenticado actualizamos la lista de certificados
                this.Demofi.listCertificates()
                .then( respCert => {
                    this.$scope.certificados = respCert.datos;
                    if (this.$scope.certificados[0]) {
                        this.$scope.certificado_seleccionado = this.$scope.certificados[0];    
                    }
                });
            }
        })
        .catch( (error) => {
            // this.$log.log(error);
            this.$scope.mostrar_progress = false;
            this.$scope.autenticando = false;
            this.$scope.pin = undefined;
            this.$scope.autenticado = false;
            this.$scope.boton_autenticar_habilitado = true;
            this.Message.warning(error.mensaje);
            this.initInterval();
        });
    }

    cancelar() {
            // Cerrando session con el token
            this.Demofi.logout()
            // .then(function (respLogin){});
            this.cancel();
            if(this.idInterval)this.$interval.cancel(this.idInterval);
    }

    descargarFirmarSubir(solDoc, aliasSeleccionado) {
        this.$scope.mostrar_progress = true;
        var this_ = this ;
        return this.$q( (resolve, reject) => {
            solDoc.estado = "DESCARGANDO";
            this_.Demofi.getFileBase64(solDoc.url_source_pdf)
            .then(function (base64Pdf) {
                // Descargar de pdf en base64 completada. Iniciando solicitud de PDF
                solDoc.pdf_base64 = base64Pdf;
                // solDoc.pdf_base64 = `data:text/html;base64,${base64Pdf}`;
                solDoc.estado = "FIRMANDO";
                this_.Demofi.sign(solDoc, aliasSeleccionado)
                .then(function (respFirma) {
                    // this_.$log.log('respFirma', respFirma)
                    // Verificar si el archivo se pudo firmar
                    if (respFirma.finalizado === false) {
                        solDoc.estado = "ERROR_FIRMA";
                        reject(respFirma);
                        return;
                    }
                    solDoc.estado = "ACTUALIZANDO";
                    // PDF firmado correctamente
                    var dataPost = {
                        codigo_archivo: solDoc.codigo_archivo,
                        pdf_base64_signed: respFirma.datos.pdf_base64,
                        certificado: respFirma.datos.certificado
                    };
                    var config = { headers: { Authorization: solDoc.authorization } };

                    //                                        $http.post(solDoc.url_upload_pdf, dataPost).success(function (dataUploaded, status, headers, config)
                    this_.$http.post(solDoc.url_upload_pdf, dataPost, config)
                    .then(function () {
                        solDoc.estado = "ACTUALIZADO";
                        resolve(respFirma);
                        //                                        }).error(function (errorUpdate, status, header, config)
                    }).catch(function (errorUpdate) {
                        this_.$scope.mostrar_progress = false;
                        solDoc.estado = "ERROR_ACTUALIZACION";
                        reject(errorUpdate);
                    });
                }).catch(function (error) {
                    this_.$scope.mostrar_progress = false;
                    solDoc.estado = "ERROR_FIRMA";
                    reject(error);
                });
            }).catch(function (error) {
                this_.$scope.mostrar_progress = false;
                solDoc.estado = "ERROR_DESCARGA";
                reject(error);
            });
        });
    }

    firmar() {
        // Obtener todos los documentos en blobs
        var aliasSeleccionado = this.$scope.certificado_seleccionado.alias;
        var indice = 0;
        this.$scope.firmando = true;
        this.$scope.firmados = 0;
        var firmadosConError = 0;
        var respActualizaciones = [];
        var ctrl = this;

        var continuarOFinalizarFirma = function (respuestaActualizacion) {
            respActualizaciones.push(respuestaActualizacion);

            ctrl.$scope.firmados++;
            if (indice + 1 >= ctrl.$scope.solicitudes.length) {
                ctrl.Demofi.logout();
                ctrl.$scope.firmando = false;
                ctrl.cancelInterval();
                ctrl.cancel(respActualizaciones);
            } else {
                indice++;
                firmarDocumento();
            }
        };
        var firmarDocumento = function () {
            ctrl.$log.log(ctrl);
            ctrl.descargarFirmarSubir(ctrl.$scope.solicitudes[indice], aliasSeleccionado)
                .then(continuarOFinalizarFirma)
                .catch(function () {
                    firmadosConError++;
                    ctrl.$log.log(firmadosConError);
                    continuarOFinalizarFirma();
                });
        };
        firmarDocumento();
    }

    cancel(data) {
        if (data) {
            this.$uibModalInstance.close(data);
        } else {
            this.$uibModalInstance.dismiss();
        }
    }
}

export default DemofiModalController;