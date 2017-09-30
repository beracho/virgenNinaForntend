'use strict';

import templateModal from './demofi.modal.html';
import controllerModal from './demofi.modal.controller';

class DemofiService {
    constructor($log, $q, $http, $compile, Modal) {
        "ngInject";
        this.$log = $log;
        this.$q = $q;
        this.$http = $http;
        this.$compile = $compile;
        this.Modal = Modal;
        //variables
        this.url_demofi = 'https://localhost:3200';
        this.req = {}; // variable para hacer las peticiones get
    }

    $onInit() {}

    /**
     * Muestra un dialogo para realizar la firma de documentos pdf y posteriormente 
     * puede subir el documento firmado.
     * solicitudes debe tener la siguiente forma:
     * [
     *      {
     *              url_pdf:"http://localhost:5600/documentos/certificado.pdf",
     *              nombre_archivo:"solicitudes_roe.pdf",
     *              codigo_archivo:"asada-adas-a-fwq-rfqw-rqasa-wrqw"
     *      }
     * ] 
     * @param {List Json} solicitudes Lista de documentos a firmar
     */
    openModal(solicitudes, config) {
        return this.Modal.show({
            template: templateModal,
            controller: controllerModal,
            data: { solicitudes, config },
            size: 'lg'
        });
    }

    verificarServidor() {
        var w = 800;
        var h = 400;
        var y = window.outerHeight / 2 + window.screenY - (h / 2);
        var x = window.outerWidth / 2 + window.screenX - (w / 2);
//            window.open("https://localhost:3200",'_blank', 'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left='+x+', top='+y+', width='+w+', height='+h+', visible=none', ''); 
        window.open(this.url_demofi,'_blank', 'toolbar=no,status=no,menubar=no,scrollbars=yes,left='+x+', top='+y+', width='+w+', height='+h+', visible=none', ''); 
    }

    listTokens() {
        this.req = {
            method: 'GET',
            url: `${this.url_demofi}/tokens`,
            isDemofi: true,
        };

        return this.initRequest(this.req);

    }

    login(pinToken) {
        this.req = {
            method: 'GET',
            // method: 'POST',
            url: `${this.url_demofi}/start?pin=${pinToken}`,
            isDemofi: true,
            // data: { pin: pinToken },
        };

        return this.initRequest(this.req);
    }

    listCertificates() {
        this.req = {
            method: 'GET',
            url: `${this.url_demofi}/certs`,
            isDemofi: true,
        };
        return this.initRequest(this.req);
    }

    sign(solicitudFirma, aliasParaFirmar) {
        const dataSend = {
            nombre_archivo: solicitudFirma.codigo_archivo,
            pdf_base64: solicitudFirma.pdf_base64,
            alias: aliasParaFirmar
        }

        this.req = {
            method: 'POST',
            url: `${this.url_demofi}/sign`,
            isDemofi: true,
            isDemofiSign: true,
            data: dataSend,
        };

        return this.$q((resolve, reject) => {
            this.$http(this.req)
                .then(result => {
                    resolve(result.data);
                })
                .catch(error => {
                    reject({ finalizado: false, mensaje: "Demofi no se esta ejecutando en su equipo" + error });
                })
        })
    }

    logout() {
        this.req = {
            method: 'GET',
            url: `${this.url_demofi}/finish`,
            isDemofi: true,
        };

        return this.initRequest(this.req);
    }


    initRequest(req) {
        return this.$q((resolve, reject) => {
            this.$http(req)
                .then(data => {
                    // this.$log.log('exito initRequest', data)
                    if (data.data.finalizado === false) {
                        reject(data.data);
                        return;
                    }
                    resolve(data.data);
                })
                .catch(error => {
                    // this.$log.log('catch initRequest', error)
                    if (error) {
                        //Message.error("Demofi no se esta ejecutando en su equipo");
                        reject({ finalizado: false, mensaje: "Demofi no se esta ejecutando en su equipo" });
                    }
                    else {
                        //Message.error("No se puede conectar con Demofi. Verifique que el programa se este ejecutando en su maquina.");
                        reject({ finalizado: false, mensaje: "No se puede conectar con Demofi. Verifique que el programa se este ejecutando en su maquina." });
                    }
                })
        });
    }

    getFileBase64(urlFile) {
      var this_ = this;
      return this.$q(function (resolve, reject) {
        this_.$http.post(urlFile).then(function(respuesta)
        {
          resolve(respuesta.data.datos);
        }).catch(function(error)
        {
          reject(error);
        });
      });
    }

}

export default DemofiService;