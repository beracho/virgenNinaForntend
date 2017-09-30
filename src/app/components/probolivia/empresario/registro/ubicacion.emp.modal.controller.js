'use strict';

class UbicacionModalController {
  constructor($uibModalInstance, data, $log, $scope, DataService, Message, Util, Loading) {
    'ngInject';

    this.data = data.data;
    this.conf = data.conf;
    this.onSave = data.onSave;
    this.id_certificacion = data.id_certificacion;
    this.$uibModalInstance = $uibModalInstance;
    this.$log = $log;
    this.$scope = $scope;
    this.DataService = DataService;
    this.Message = Message;
    this.Util = Util;
    this.Loading = Loading;
  }

  $onInit() {
    // this.$log.log(angular.copy(this.data));
    // this.$log.log(this);

    if (this.data.id_ubicacion_unidad_productiva) {
      if (this.data.telefonos) {
        this.data.telefonos = this.data.telefonos.split('|');
      }
      this.data.latitud = parseFloat(this.data.latitud);
      this.data.longitud = parseFloat(this.data.longitud);
    }

    if (this.data.latitud && this.data.longitud) {
      this.center = {
        lat: this.data.latitud,
        lng: this.data.longitud,
        zoom: 17
      };
      this.markers = [{
          lat: this.data.latitud,
          lng: this.data.longitud
        }]
    } else {
      // centrear en bolivia
      this.center = {
        lat: -17.07778960654538,
        lng: -424.00634765625,
        zoom: 6
      }
      this.markers = [];
    }

    this.events_leaflet = {
      map: {
        enable: ['dblclick'],
        logic: 'emit'
      },
      markers: {
        enable: ['dblclick'],
        logic: 'emit'
      }
    };

    this.$scope.$on('leafletDirectiveMap.dblclick', (event, args) => {
      // this.$log.log(event, args);
      var ev = args.leafletEvent;

      if (this.markers.length == 0) {
        this.data.latitud = ev.latlng.wrap().lat;
        this.data.longitud = ev.latlng.wrap().lng;
        this.markers.push({
          lat: ev.latlng.lat,
          lng: ev.latlng.lng
        });
        this.legend = {
          position: 'bottomleft',
          colors: ['#c0c0c0', '#d8d8d8'],
          labels: ['<b>Latitud: </b>'+this.data.latitud, '<b>Longitud: </b>'+this.data.longitud]
        };
      } else {
        this.data.latitud = ev.latlng.wrap().lat;
        this.data.longitud = ev.latlng.wrap().lng;
        this.markers = [];
        this.markers.push({
          lat: ev.latlng.lat,
          lng: ev.latlng.lng
        });
        this.legend = {
          position: 'bottomleft',
          colors: ['#c0c0c0', '#d8d8d8'],
          labels: ['<b>Latitud: </b>'+this.data.latitud, '<b>Longitud: </b>'+this.data.longitud]
        };
      }
    })
    this.$scope.$on('leafletDirectiveMarker.dblclick', (event, args) => {
      // this.$log.log(event, args);
      this.markers.splice(args.modelName, 1);
      this.data.latitud = null;
      this.data.longitud = null;
    })

    this.$scope.$watch('$ctrl.data.fid_departamento', (newValue, oldValue) => {
      if (newValue != oldValue) {
        this.cambiarUbicacion();
      }
    })
    //Datos de mapa legend
//    angular.extend(this.$scope, {
//
//      legend: {
//        position: 'topleft',
//        colors: ['#c0c0c0', '#d8d8d8'],
//        labels: [this.data.longitud, '464564646']
//      },
//      defaults: {
//        tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
//        scrollWheelZoom: false
//      }
//    });

    this.legend = {
      position: 'bottomleft',
      colors: ['#c0c0c0', '#d8d8d8'],
      labels: ['', '']
    };

  }

  beforeAddTel(text) {
    var array = this.data.telefonos;
    if (array.length >= 5) {
      this.Message.warning('Solo puede añadir 5 teléfonos como máximo.');
      return null;
    }
    if (text.length > 15) {
      this.Message.warning("El número telefónico '" + text + "' no debe superar los 15 dígitos");
    } else if (text.length < 5) {
      this.Message.warning("El número telefónico '" + text + "' no debe ser inferior a los 5 caracteres");
    } else if (!/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i.test(text)) {
      this.Message.warning("Introduzca un número de teléfono válido: " + text);
    } else {
      return text;
    }
    return null;
  }

  cambiarUbicacion() {
    if (this.data.fid_departamento === 1) {
      this.center = {
        lat: -19.044594137783026,
        lng: -65.26608467102051,
        zoom: 12
      };
    } else if (this.data.fid_departamento === 2) {
      this.center = {
        lat: -16.50390771403709,
        lng: -68.15780639648432,
        zoom: 9
      };
    } else if (this.data.fid_departamento === 3) {
      this.center = {
        lat: -17.38602663946904,
        lng: -66.16636276245112,
        zoom: 9
      };
    } else if (this.data.fid_departamento === 4) {
      this.center = {
        lat: -17.96273099440687,
        lng: -67.11204528808588,
        zoom: 12
      };
    } else if (this.data.fid_departamento === 5) {
      this.center = {
        lat: -19.57661180504041,
        lng: -65.76004028320312,
        zoom: 12
      };
    } else if (this.data.fid_departamento === 6) {
      this.center = {
        lat: -21.527022546356232,
        lng: -64.73213195800781,
        zoom: 12
      };
    } else if (this.data.fid_departamento === 7) {
      this.center = {
        lat: -17.781381818516973,
        lng: -63.179969787597656,
        zoom: 11
      };
    } else if (this.data.fid_departamento === 8) {
      this.center = {
        lat: -14.833965277394848,
        lng: -64.9020767211914,
        zoom: 13
      };
    } else if (this.data.fid_departamento === 9) {
      this.center = {
        lat: -11.02561877903247,
        lng: -68.76583099365234,
        zoom: 13
      };
    }

  }

  save(form) {
    var data = angular.copy(this.data);
    data.telefonos = data.telefonos.join('|');
    if (data.telefonos=='') {
      data.telefonos = null;
    }
    this.$log.log("Informacion a enviar =  ", data);

    if(data.avenida_calle ==='' ){
      data.avenida_calle = null;
    }
    if(data.avenida_calle_referencia ==='' ){
      data.avenida_calle_referencia = null;
    }
    if(data.numero==='' ){
      data.numero = null;
    }
    if(data.piso=== '' ){
      data.piso = null;
    }
    if(data.edificio==='' ){
      data.edificio = null;
    }


    // this.$log.log(form);

    if (data.id_ubicacion_unidad_productiva)
      data.id = data.id_ubicacion_unidad_productiva;
    if (form.$valid) {
      this.Loading.show('Cargando', true);
      this.DataService.save(`certificaciones/${this.id_certificacion}/ubicaciones/`, data)
      .then(response => {
        if (response) {
          // this.$log.log(this);
          this.Message.success();
          this.onSave();
          this.cancel();
          this.Loading.show('Cargando', false);
        }
      });
    } else {
      this.Util.setTouchedForm(form);
    }
  }

  cancel() {
    this.$uibModalInstance.close();
    // this.$uibModalInstance.dismiss('cancel');
  }
}

export default UbicacionModalController;
