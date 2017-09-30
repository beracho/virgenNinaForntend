'use strict';
import modalControllerF from './fundempresa.modal.controller';
import modalTemplateF from './fundempresa.modal.html';
import modalControllerD from './declaracion.emp.modal.controller';
import modalTemplateD from './declaracion.emp.modal.html';
import modalControllerI from './importar.emp.modal.controller';
import modalTemplateI from './importar.emp.modal.html';
import modalControllerU from './ubicacion.emp.modal.controller';
import modalTemplateU from './ubicacion.emp.modal.html';

class RegistroController {
  constructor(DataService, Message, Storage, Sidenav, Modal, $log, $scope, Util, $timeout, numToWord, Loading) {
    'ngInject';
    this.year_now = (new Date()).getFullYear();
    this.Message = Message;
    this.Storage = Storage;
    this.Modal = Modal;
    this.DataService = DataService;
    this.$log = $log;
    this.$timeout = $timeout;
    this.$scope = $scope;
    this.Sidenav = Sidenav;
    this.Util = Util;
    this.numToWord = numToWord;
    this.nombre = 'PAGINA INICIAL *** ';
    this.Loading = Loading;
  }

  $onInit() {
    this.Loading.show('Cargando', false);
    // this.$log.log("******Datos del certificado");
    // this.$log.log(this);
    this.certificacion = this.Storage.getSession('certificacion');
    this.user = this.Storage.getUser();
    this.isCorreoOk = true;
    if (angular.isUndefined(this.certificacion)) {
      this.Sidenav.path('formulario');
    }
    this.get = {}; // variable que guarda respuestas de gets
    this.time_autoguardado = 1500;
    this.axs = {
      change_propietario: true, // evitara que se autoguarde por primera vez el representante y las veces q se asigne true
      init_productos: false, // evitara que se autoguarde al cargar por primera vez
      item_activo: {},
      activos: {// para paginacion de activos
        page: 1,
        limit: 10,
        limit_options: [10, 15, 25],
        order: '-_fecha_modificacion'
      },
      item_deposito: {},
      conf: {}
    };
    // alerts del formulario
    this.msjs = {
      requireds: `Los campos que tienen <span class="ap-req">(</span> ) son obligatorios.`,
      ubi_add: `Clic en el botón más para registrar una nueva ubicación.`,
      ubi_req: `Tiene que registrar al menos una ubicación.`,
      act_eco2_op: `La actividad económica secundaria es opcional`,
      cob_zero: `Debe seleccionar al menos un departamento.`,
      act_pro_add: `Haga Click en el botón "+" si desea guardar el registro actual. Si desea importar un archivo CSV, haga Click en el botón "Importar CSV"`,
      rec_personal: `Debe llenar la sección de Recursos Humanos.`
    };
    // variable para guardar los timer_delay
    this.tim = {
      emp: {},
      rep: {},
      act_eco: {1: {}, 2: {}},
      activos_load: {},
      rec: {},
      cob: {},
      ser1: {},
      ser2: {}
    };

    this.DataService.get(`certificaciones/${this.certificacion}`)
    .then(response => {
      if (response) {
        this.year_now = (new Date(this.Storage.get('dateNow'))).getFullYear();
        this.tiene_matricula = response.unidad_productiva.hist_empresa != null;
        this.data = response.unidad_productiva;
        this.form = angular.copy(response.certificacion.formulario);
        this.certificacion = response.certificacion;
        this.usuario_ddjj_con_nit = response.unidad_productiva.usuario.nit != null;
        delete response.certificacion.formulario;
        this.initJsonData();
        this.initJsonConf();
        if (this.tiene_matricula) {
          this.representantesLoad();
        }
        this.ubicacionesLoad();
        if (!this.isForm('ICAP')) {
          this.productosLoad();
        }
        if (this.isForm('UNIDAD_PRODUCTIVA') || this.isForm('ARTESANO')) {
          this.activosLoad();
        }
        if (this.isForm('ICAP')) {
          this.coberturasLoad();
          this.serviciosLoad();
          this.serviciosPadresLoad();
          this.serviciosInit();
        }
        this.$scope.$watch('$ctrl.data.hist_representantes', (newValue, oldValue) => {
          if (angular.toJson(newValue) != angular.toJson(oldValue)) {
            this.representanteUpd();
          }
        }, true);
      } else {
        this.atras();
      }
    })

  }

  initJsonData() {
    this.data.ubicaciones = [];
    if (this.data.propietario_representante == 'PROPIETARIO' || (this.data.propietario_representante == 'REPRESENTANTE' && !this.tiene_matricula)) {
      this.axs.change_propietario = false;
    }
    if (this.isForm('UNIDAD_PRODUCTIVA') || this.isForm('ARTESANO')) {
//      this.initDefault(this.data, 'tipo_actividad_economica', 'TRANSFORMACION');
    }
    this.initDefault(this.data, 'propietario_representante', 'PROPIETARIO');
    if (this.data.propietario_representante == 'PROPIETARIO') {
      this.axs.sw_propietario = true;
    }
    if (this.data.propietario_representante == 'REPRESENTANTE' && !this.tiene_matricula) {
      this.axs.sw_propietario = true;
    }
    this.axs.rep_backup = {
      propietario_representante: angular.copy(this.data.propietario_representante),
      hist_representantes: angular.copy(this.data.hist_representantes)
    };

    if (this.certificacion.estado == 'NUEVO') {
      if (this.data.ingresos_anuales_venta == 0) {
        delete this.data.ingresos_anuales_venta;
      }
      if (this.data.importaciones_anuales == 0) {
        delete this.data.importaciones_anuales;
      }
      if (this.data.exportaciones_anuales_venta == 0) {
        delete this.data.exportaciones_anuales_venta;
      }
      if (this.data.patrimonio_creacion == 0) {
        delete this.data.patrimonio_creacion;
      }
    }

    this.data.activos_productivos = [];
  }

  initDefault(obj, key, val) {
    if (!obj[key])
      obj[key] = val;
  }

  initJsonConf() {
    var keys, k, sec;

    keys = {
      'empresa': 'emp',
      'representante': 'rep',
      'ubicacion': 'ubi',
      'actividad': 'act_eco',
      'recursos_humanos': 'rec',
      'activos_productivos': 'act_pro',
      'informacion_financiera': 'inf',
      'servicios': 'ser',
      'cobertura_servicios': 'cob'
    };

    this.conf = {};
    this.alert = {};

    for (k in this.form.secciones[0]) {
      this.conf[keys[k]] = this.form.secciones[0][k];
    }
    delete this.form.secciones;

    if (!/NUEVO|OBSERVADO/.test(this.certificacion.estado)) {
      for (sec in this.conf) {
        for (k in this.conf[sec]) {
          if (angular.isObject(this.conf[sec][k]))
            this.conf[sec][k].disabled = true;
        }
      }
    }
    if (!this.tiene_matricula) {
      if (this.conf.emp.nit)
        delete this.conf.emp.nit.disabled;
      if (this.conf.emp.razon_social)
        delete this.conf.emp.razon_social.disabled;
      if (this.conf.emp.matricula_comercio)
        delete this.conf.emp.matricula_comercio.disabled;
      if (this.conf.emp.fid_par_tipo_societario)
        delete this.conf.emp.fid_par_tipo_societario.disabled;
    } else {
      if (this.conf.emp.nit)
        this.conf.emp.nit.disabled = true;
      if (this.conf.emp.razon_social)
        this.conf.emp.razon_social.disabled = true;
      if (this.conf.emp.matricula_comercio)
        this.conf.emp.matricula_comercio.disabled = true;
      if (this.conf.emp.fid_par_tipo_societario)
        this.conf.emp.fid_par_tipo_societario.disabled = true;
    }
    if (this.data.tipo_actividad_economica_secundaria) {
      this.axs.conf.prod_2 = true;
    }

    if (!this.usuario_ddjj_con_nit && this.user.id_rol != 2) {
      // si el usuario no tiene nit y no es un tecnico_probolivia, ocultaremos nit y matricula
//      if (this.conf.emp.nit)
//        this.conf.emp.nit.visible = false;
//      if (this.conf.emp.matricula_comercio)
//        this.conf.emp.matricula_comercio.visible = false;
    }
    if (this.usuario_ddjj_con_nit && this.user.id_rol != 2 && !this.tiene_matricula) {
      // si el usuario tiene nit y no es un tecnico_probolivia, y no tiene matricula, ocultaremos matricula
//      if (this.conf.emp.matricula_comercio)
//        this.conf.emp.matricula_comercio.visible = false;
    }
    
    // visibilidad del area de la actividad economica 2
    this.conf.act_eco.visible2 = true;
    let sw = false;
    if (this.conf.act_eco) {      
      if (this.conf.act_eco.anio_inicio2) sw = sw || this.conf.act_eco.anio_inicio2.visible;
      if (this.conf.act_eco.cantidad_promedio2) sw = sw || this.conf.act_eco.cantidad_promedio2.visible;
      if (this.conf.act_eco.descripcion_actividad2) sw = sw || this.conf.act_eco.descripcion_actividad2.visible;
      if (this.conf.act_eco.fid_par_unidad_medida2) sw = sw || this.conf.act_eco.fid_par_unidad_medida2.visible;
      if (this.conf.act_eco.nombre_producto2) sw = sw || this.conf.act_eco.nombre_producto2.visible;
      if (this.conf.act_eco.unidad_medida2) sw = sw || this.conf.act_eco.unidad_medida2.visible;
      if (this.conf.emp.tipo_actividad_economica_secundaria) sw = sw || this.conf.emp.tipo_actividad_economica_secundaria.visible;
    }
    this.conf.act_eco.visible2 = sw;
      
    // this.$log.log(this.conf);
    // this.$log.log(JSON.stringify(this.conf, null, 2));
  }

  masInformacion() {
    this.Modal.show({
      template: modalTemplateF,
      controller: modalControllerF,
      data: {
        empresa: this.data
      },
      size: 'lg'
    });
  }

  empresaUpd() {
    //escucahra el watch de fid_par_tipo_organizacion y fid_par_tipo_societario
    // en caso de sin matricula escucha nombre de la empresa matricula y nit
    this.Util.funcDelay(this.tim.emp, this.time_autoguardado, () => {
      this.empresaSave(this.$scope.registro_form.empresa_form, true);
    })
  }

  empresaSave(form, apply) {
    // this.$log.log(form);
    if (form.$valid) {
      var data = {};

      //Validando que se envie siempre email-sitioweb
      if (this.data.sitio_web === '') {
        this.data.sitio_web = null;
      }
      if (this.data.correo_electronico === '') {
        this.data.correo_electronico = null;
      }
      this.objCopy(data, this.data, 'sitio_web');
      this.objCopy(data, this.data, 'correo_electronico');

      //Si el tipo de ORG es 195, entonces enviamos el texto de la descripcion OTROS
      if (this.data.fid_par_tipo_organizacion === 195) {
        this.objCopy(data, this.data, 'tipo_organizacion_otro');
      }

      if (!this.tiene_matricula) {
        this.objCopy(data, this.data, 'razon_social, matricula_comercio, nit');
      }

      if (!this.isForm('ARTESANO')) {
        this.objCopy(data, this.data, 'fid_par_tipo_societario');
      }
      if (this.isForm('UNIDAD_PRODUCTIVA') || this.isForm('ARTESANO')) {
        this.objCopy(data, this.data, 'fid_par_tipo_organizacion, personeria_juridica, tipo_actividad_economica, tipo_actividad_economica_secundaria');
        this.axs.conf.prod_2 = this.data.tipo_actividad_economica_secundaria != null || this.data.producto2.id_producto;
      }
      if (this.isForm('ICAP')) {
        this.objCopy(data, this.data, 'anios_experiencia');
      }

      if (this.isForm('SHB_UNIDAD')) {
        this.objCopy(data, this.data, 'fid_par_tipo_organizacion, personeria_juridica, tipo_actividad_economica');
      }

      this.DataService.put(`certificaciones/${this.certificacion.id_certificacion}`, {unidad_productiva: data})
    } else {
      this.Util.setTouchedForm(form);
      if (apply) {
        this.$scope.$apply();
      }
    }
  }

  representantesLoad() {
    this.DataService.get(`servicios/representantes/${this.data.matricula_comercio}`)
    .then(response => {
      if (response) {
        response.forEach( it => { it.ci_nombre = it.nro_documento+' - '+it.nombre_completo; })
        this.get.representantes = response;
        if (this.axs.rep_backup.hist_representantes) {
          var representante = {
            codigo_tipo_documento: this.axs.rep_backup.hist_representantes.complemento_documento,
            nro_documento: this.axs.rep_backup.hist_representantes.documento_identidad,
            nombre_completo: this.axs.rep_backup.hist_representantes.nombre_completo,
            ci_nombre: this.axs.rep_backup.hist_representantes.documento_identidad+' - '+this.axs.rep_backup.hist_representantes.nombre_completo
            // tipo_vinculo: this.axs.rep_backup.hist_representantes.tipo_vinculo
          };
          for (var i = 0; i < this.get.representantes.length; i++) {
            var copy = angular.copy(this.get.representantes[i]);
            delete copy.tipo_vinculo;
            // this.$log.log(copy, representante);
            if (angular.equals(copy, representante)) {
              this.data.hist_representantes.representante = this.get.representantes[i];
              this.axs.rep_backup.hist_representantes.representante = this.get.representantes[i];
            }
          }
        }
      }
    });
  }

  representantesRestore() {

    if (this.axs.rep_backup.propietario_representante == 'REPRESENTANTE' && this.data.propietario_representante == 'REPRESENTANTE') {
      angular.extend(this.data.hist_representantes, this.axs.rep_backup.hist_representantes);
      // this.$log.log('entra rep')
    } else if (this.axs.rep_backup.propietario_representante == 'PROPIETARIO' && this.data.propietario_representante == 'PROPIETARIO') {
      // this.$log.log('entra pro')
      angular.extend(this.data.hist_representantes, this.axs.rep_backup.hist_representantes);
    }
  }

  representanteChange(form) {
    // this.$log.log(this.tiene_matricula);
    if (this.tiene_matricula) {
      for (var k in this.data.hist_representantes) {
        if (k != 'tipo_documento') {
          delete this.data.hist_representantes[k];
        }
      }
      this.data.hist_representantes.tipo_documento = this.data.propietario_representante == 'PROPIETARIO' ? 'CARNET_IDENTIDAD' : 'FUNDEMPRESA';
      this.axs.change_propietario = true;
      this.Util.setTouchedForm(form, false);
      this.axs.sw_propietario = this.data.propietario_representante == 'PROPIETARIO';
      this.representantesRestore();
    } else {
      this.axs.change_propietario = false;
      this.representanteUpd();
    }
    // this.$log.log(this.axs, this.data.propietario_representante);
    // this.$log.log(this.data.hist_representantes);
  }

  representanteUpd() {
    //escucahra el watch de hist_representantes
    // this.$log.log('representanteUpd');
    if (!this.axs.change_propietario) {
      this.Util.funcDelay(this.tim.rep, this.time_autoguardado, () => {
        this.representanteSave(this.$scope.registro_form.representante_form);
      })
    }
    delete this.axs.change_propietario;
  }

  representanteSave(form) {
    var data = {}, sw = false;
    this.objCopy(data, this.data, [
      'propietario_representante',
      'hist_representantes'
    ]);
    if (data.hist_representantes.representante) {
      angular.extend(data.hist_representantes, data.hist_representantes.representante);
      data.hist_representantes.documento_identidad = data.hist_representantes.representante.nro_documento;
    }
    // this.$log.log(form);
    var ignorar;
    if (data.hist_representantes.tipo_documento == 'FUNDEMPRESA') {
      ignorar = 'doc_identidad_form';
    } else {
      ignorar = 'rep_legal_form';
    }

    if (this.Util.isValidForm(form, ignorar)) {
      if (data.hist_representantes.representante) {
        delete data.hist_representantes.id_persona;
        delete data.hist_representantes.representante;
        delete data.hist_representantes.documento_identidad;
      }
      if (data.hist_representantes.tipo_documento == 'CARNET_IDENTIDAD' && !data.hist_representantes.id_persona) {
        sw = 'L';
      }
      if (typeof sw != 'string') {
        this.DataService.put(`certificaciones/${this.certificacion.id_certificacion}`, {unidad_productiva: data})
        .then(response => {
          if (response) {
            // this.Message.success('Se guardó el registro correctamente.');
            // this.axs.change_propietario = true;   //se comento porque no autoguardaa despues de autoguardar
            angular.extend(this.data.hist_representantes, response.unidad_productiva.hist_representantes);
            this.axs.rep_backup = {
              propietario_representante: angular.copy(this.data.propietario_representante),
              hist_representantes: angular.copy(this.data.hist_representantes)
            };
            this.axs.rep_backup.hist_representantes.representante = this.data.hist_representantes.representante;
          }
        })
      }
    } else {
      this.Util.setTouchedForm(form, true, ignorar);
      this.$scope.$apply();
    }

  }

  ubicacionesLoad() {
    this.DataService.get(`certificaciones/${this.certificacion.id_certificacion}/ubicaciones`)
    .then(response => {
      if (angular.isArray(response) && response.length > 0) {
        this.data.ubicaciones = response;
      }
    })
  }

  ubicacionesAddUpd(i, item) {
    this.Modal.show({
      template: modalTemplateU,
      controller: modalControllerU,
      data: {data: angular.copy(item) || {}, conf: this.conf.ubi, id_certificacion: this.certificacion.id_certificacion, onSave: () => {
          this.ubicacionesLoad();
        }},
      size: 'extra-large'
    });
  }

  ubicacionesDel(i, item) {
    this.Modal.confirm('¿Desea eliminar este registro?', () => {
      this.DataService.delete(`certificaciones/${this.certificacion.id_certificacion}/ubicaciones/${item.id_ubicacion_unidad_productiva}`)
      .then(response => {
        if (response) {
          this.data.ubicaciones.splice(i, 1);
          this.Message.success();
        }
      })
    });
  }

  productosLoad() {
    this.DataService.get(`certificaciones/${this.certificacion.id_certificacion}/actividades_economicas`)
    .then(response => {
      if (angular.isArray(response)) {
        if (response.length == 0)
          response.push({});
        if (response.length == 1)
          response.push({});

        if (response[0].principal) {
          this.data.producto1 = response[0];
          this.data.producto2 = response[1];
        } else {
          this.data.producto1 = response[1];
          this.data.producto2 = response[0];
        }

        if (this.data.producto2.id_producto) {
          this.axs.conf.prod_2 = true;
        }
      }
      this.axs.init_productos = true;
    })
  }

  productosUpd(form, i, it) {
    this.Util.funcDelay(this.tim.act_eco[i], this.time_autoguardado, () => {
      this.productosSave(form, i, it);
    })
  }

  productosSave(form, i) {
    var required, save, it;
    it = this.data[`producto${i}`];
    // this.$log.log(form);
    if (angular.isUndefined(it.id_producto)) {
      it.principal = i == 1;
    }
    required = it.descripcion_actividad || it.nombre_producto || it.anio_inicio || it.cantidad_promedio || it.fid_par_unidad_medida;
    save = it.descripcion_actividad && it.nombre_producto && it.anio_inicio && it.cantidad_promedio && it.fid_par_unidad_medida;
    if (this.isForm('ARTESANO')) {
      required = required || it.fid_par_clasificacion_artesanal;
      save = save && it.fid_par_clasificacion_artesanal;
    }
    this.axs.conf.prod_2 = required && !it.principal;
    form.anio_inicio.$setValidity('min_year', it.anio_inicio ? !(parseInt(it.anio_inicio) < 1825) : true);
    form.anio_inicio.$setValidity('max_year', it.anio_inicio ? !(parseInt(it.anio_inicio) > this.year_now) : true);

    if (form.$valid && save) {
      if (it.id_producto)
        it.id = it.id_producto;
      this.DataService.save(`certificaciones/${this.certificacion.id_certificacion}/actividades_economicas/`, it)
      .then(response => {
        if (response) {
          // this.Message.success('Se guardó el registro correctamente.');
          angular.extend(it, response);
          this.empresaUpd();
        }
      })
    } else {
      this.Util.setTouchedForm(form);
      this.$scope.$apply();
    }
  }

  productosDel(i) {
    var it = this.data[`producto${i}`];
    // this.$log.log(from, it);
    this.Modal.confirm('¿Desea eliminar este registro?', () => {
      if (it && it.id_producto) {
        this.DataService.delete(`certificaciones/${this.certificacion.id_certificacion}/actividades_economicas/${it.id_producto}`)
        .then(response => {
          if (response) {
            this.productosLoad();
            this.data.tipo_actividad_economica_secundaria = null;
            this.empresaSave(this.$scope.registro_form.empresa_form);
            this.Message.success('Su registro fue eliminado correctamente.');
          }
        })
      } else {
        this.productosLoad();
        this.data.tipo_actividad_economica_secundaria = null;
        this.empresaSave(this.$scope.registro_form.empresa_form);
      }
    });
  }

  personalUpd() {
    this.Util.funcDelay(this.tim.rec, this.time_autoguardado, () => {
      this.personalSave(this.$scope.registro_form.personal_form);
    })
  }

  personalSave(form) {
    var data = {};
    // this.$log.log(form)
    if (form.$valid) {
      data.personal_hombres_permanente = parseInt(this.data.personal_hombres_permanente);
      data.personal_hombres_eventual = parseInt(this.data.personal_hombres_eventual);
      data.personal_hombres_familiar = parseInt(this.data.personal_hombres_familiar);
      data.personal_hombres_discapacitados = parseInt(this.data.personal_hombres_discapacitados);
      data.personal_mujeres_permanente = parseInt(this.data.personal_mujeres_permanente);
      data.personal_mujeres_eventual = parseInt(this.data.personal_mujeres_eventual);
      data.personal_mujeres_familiar = parseInt(this.data.personal_mujeres_familiar);
      data.personal_mujeres_discapacitados = parseInt(this.data.personal_mujeres_discapacitados);
      //validaciones front

      if (data.personal_hombres_permanente === 0 && data.personal_mujeres_permanente === 0
      && data.personal_hombres_discapacitados === 0 && data.personal_mujeres_discapacitados === 0) {
        this.Message.error('Tiene que ingresar personal permanente o personal con discapacidad.');
        return;
      }

      //enviamos a backend
      this.DataService.put(`certificaciones/${this.certificacion.id_certificacion}`, {unidad_productiva: data})
      .then(response => {
        if (response) {
          // this.Message.success('Se guardó el registro correctamente.');

          this.objCopy(this.data, response.unidad_productiva, [
            `personal_hombres_total`,
            `personal_mujeres_total`,
            `personal_hombres_permanente`,
            `personal_hombres_eventual`,
            `personal_hombres_familiar`,
            `personal_hombres_discapacitados`,
            `personal_mujeres_permanente`,
            `personal_mujeres_eventual`,
            `personal_mujeres_familiar`,
            `personal_mujeres_discapacitados`
          ]);

        }
      })
    } else {
      this.Util.setTouchedForm(form);
      this.$scope.$apply();
    }
  }

  activosLoad() {
    if (this.axs.activos.page < 1) {
      1
      this.axs.activos.page = 1;
    }
    if (this.axs.activos.total_pages < this.axs.activos.page) {
      this.axs.activos.page = this.axs.activos.total_pages;
    }
    this.DataService.get(`certificaciones/${this.certificacion.id_certificacion}/activos_productivos?limit=${this.axs.activos.limit}&page=${this.axs.activos.page}&order=${this.axs.activos.order}&filter=${this.axs.activos.filter || ''}`)
    .then(response => {
      if (response) {
        this.data.activos_productivos = response.rows;
        this.axs.activos.count = response.count;
        this.axs.activos.total_pages = parseInt(response.count / this.axs.activos.limit);
        this.axs.activos.max_length_pages = ('' + this.axs.activos.total_pages).length;
        if (response.count == 0 || response.count % this.axs.activos.limit > 0) {
          this.axs.activos.total_pages++;
        }
        this.axs.activos.total = response.total;
      }
    })
  }

  activosPageSelect(ev) {
    // this.$log.log(ev);
    if (ev.target) {
      ev.target.select();
    }
  }

  activosPagUpd(op) {
    // this.$log.log('activosPagUpd', op)
    if (op == 'page') {
      this.Util.funcDelay(this.tim.activos_load, 1000, () => {
        this.activosLoad();
      })
    } else {
      switch (op) {
        case 'aa':
          this.axs.activos.page = 1;
          break;
        case 'a':
          this.axs.activos.page--;
          break;
        case 's':
          this.axs.activos.page++;
          break;
        case 'ss':
          this.axs.activos.page = this.axs.activos.total_pages;
          break;
        case 'l':
          this.axs.activos.page = 1;
          break;
      }
      this.activosLoad();
    }
  }

  activosImportar() {
    this.Modal.show({
      template: modalTemplateI,
      controller: modalControllerI,
      data: this,
      size: 'lg'
    });
  }

  activosUpd(i, it) {
    this.axs.item_activo = angular.copy(it);
  }

  activosUpdCancel(form) {
    this.axs.item_activo = {};
    this.Util.setTouchedForm(form, false);
  }

  activosTotalUpd() {
    var it = this.axs.item_activo;
    it.total = (it.cantidad && it.precio_unitario) ? this.round(it.cantidad * angular.copy(it.precio_unitario)) : null;
  }

  activosSave(form) {

    angular.element(document.querySelector("#cantidad-message")).removeClass("hidden-message");
    angular.element(document.querySelector("#descripcion-message")).removeClass("hidden-message");
    angular.element(document.querySelector("#marca-message")).removeClass("hidden-message");
    angular.element(document.querySelector("#precio_unitario-message")).removeClass("hidden-message");
    angular.element(document.querySelector("#total-message")).removeClass("hidden-message");

    var it = this.axs.item_activo;
    if (form.$valid) {
      if (it.id_activo_productivo)
        it.id = it.id_activo_productivo;
      this.DataService.save(`certificaciones/${this.certificacion.id_certificacion}/activos_productivos/`, it)
      .then(response => {
        if (response) {
          // this.Message.success('Se guardó el registro correctamente.');
          this.activosLoad();
          this.axs.item_activo = {};
          this.Util.setTouchedForm(form, false);

        }
      })
    } else {
      this.Util.setTouchedForm(form);
    }
  }

  activosBlur(name, form) {
    this.$log.log(name);
    // this.$log.log(angular.element(document.querySelector(`#${name}`)).addClass("hidden-message"));
    angular.element(document.querySelector("#cantidad-message")).addClass("hidden-message");
    angular.element(document.querySelector("#descripcion-message")).addClass("hidden-message");
    angular.element(document.querySelector("#marca-message")).addClass("hidden-message");
    angular.element(document.querySelector("#precio_unitario-message")).addClass("hidden-message");
    angular.element(document.querySelector("#total-message")).addClass("hidden-message");


    //Si se ingreso los campos, la lista esta vacia y el cliente se olvido presionar + , vamos a agregarlo a la lista
    if(angular.isDefined(this.data.activos_productivos)){
      if( angular.isDefined(this.axs) && angular.isDefined(this.axs.item_activo)){
        if(  angular.isDefined(this.axs.item_activo.cantidad) && angular.isDefined(this.axs.item_activo.descripcion) && angular.isDefined(this.axs.item_activo.marca) && angular.isDefined(this.axs.item_activo.precio_unitario) && angular.isDefined(this.axs.item_activo.total)
        && this.axs.item_activo.cantidad !== null && this.axs.item_activo.descripcion!==null && this.axs.item_activo.marca !==null && this.axs.item_activo.precio_unitario !==null && this.axs.item_activo.total !==null
        ){
          if(this.data.activos_productivos.length<=0){
            this.activosSave(form);
          }
        }
      }
    }
  }

  round(num) {
    return parseFloat(num).toFixed(2);
  }

  activosDel(i, it) {
    if (it.id_activo_productivo) {
      this.Modal.confirm('¿Desea eliminar este registro?', () => {
        this.DataService.delete(`certificaciones/${this.certificacion.id_certificacion}/activos_productivos/${it.id_activo_productivo}`)
        .then(response => {
          if (response) {
            if (this.data.activos_productivos.length == 1 && this.axs.activos.total_pages > 1) {
              this.axs.activos.total_pages--;
            }
            this.activosLoad();
            this.Message.success('Su registro fue eliminado correctamente.');
          }
        })
      });
    }
  }

  informacionValidityMax(field) {
    var num = this.data[field];
    this.$scope.registro_form.informacion_form[field].$setValidity('max_num', true);
    if (num) {
      this.$scope.registro_form.informacion_form[field].$setValidity('max_num', !(parseFloat(num) > 9999999999.99));
    }
  }
// Mod form reg setValidity maxnum a informacion
  informacionSave(form, openModalDeclaracion) {
    var dataUni = {
      ingresos_anuales_venta: this.data.ingresos_anuales_venta || '0',
    };
    if (this.isForm('UNIDAD_PRODUCTIVA')) {
      dataUni.exportaciones_anuales_venta = this.data.exportaciones_anuales_venta || '0';
      dataUni.patrimonio_creacion = this.data.patrimonio_creacion || '0';
    } else if (this.isForm('ARTESANO')) {
      dataUni.exportaciones_anuales_venta = this.data.exportaciones_anuales_venta || '0';
    } else if (this.isForm('PROVEEDOR')) {
      dataUni.importaciones_anuales = this.data.importaciones_anuales || '0';
    }

    if (form.$valid) {
      this.DataService.put(`certificaciones/${this.certificacion.id_certificacion}`, {unidad_productiva: dataUni})
      .then(response => {
        if (response) {
          // this.Message.success('Se guardó los datos correctamente.');
          this.data.ingresos_anuales_venta = response.unidad_productiva.ingresos_anuales_venta;
          this.data.exportaciones_anuales_venta = response.unidad_productiva.exportaciones_anuales_venta;
          this.data.patrimonio_creacion = response.unidad_productiva.patrimonio_creacion;
          if (openModalDeclaracion) {
            this.abrirModalDeclaracion();
          }
        }
      })
    }
  }

  coberturasLoad() {
    this.DataService.get(`departamento`)
    .then(response => {
      if (response) {
        var obj = {}, xobj = {};
        (this.data.cobertura_departamento || []).forEach(it => {
          obj[it] = true;
        })
        response.forEach(it => {
          if (obj[it.id])
            it.selected = true;
          if (!xobj[it.abreviacion])
            xobj[it.abreviacion] = it;
        })
        response = [];
        // ordenamos para que sea mas facil pickear
        ['LP', 'CBBA', 'SC', 'OR', 'PT', 'CH', 'BN', 'PD', 'TJ'].forEach(abr => {
          response.push(xobj[abr]);
        })
        this.get.departamentos = response;
      }
    })
  }

  coberturasUpd() {
    this.Util.funcDelay(this.tim.cob, this.time_autoguardado, () => {
      this.coberturasSave();
    })
  }

  coberturasSave() {
    // this.$log.log('oh tomamos')
    var data = [];
    this.get.departamentos.forEach(it => {
      if (it.selected)
        data.push(it.id);
    });
    // this.$log.log(data)
    this.DataService.put(`certificaciones/${this.certificacion.id_certificacion}`, {unidad_productiva: {cobertura_departamento: data}})
    .then(response => {
      if (response) {
        this.data.cobertura_departamento = response.unidad_productiva.cobertura_departamento
//         this.Message.success('Se guardó el registro correctamente.');
      }
    })
  }

  serviciosInit() {
    this.$scope.$watch('$ctrl.data.servicio1.fid_par_servicio_p', (newValue, oldValue) => {
      if (this.axs.init_servicios1 && newValue && newValue != oldValue) {
        this.serviciosHijosLoad(newValue, 1, true);
      }
    })
    this.$scope.$watch('$ctrl.data.servicio2.fid_par_servicio_p', (newValue, oldValue) => {
      if (this.axs.init_servicios2 && newValue && newValue != oldValue) {
        this.serviciosHijosLoad(newValue, 2, true);
      }
    })
    this.$scope.$watch('$ctrl.data.servicio1.fid_par_servicio', (newValue, oldValue) => {
      if (this.axs.init_servicios1 && newValue && newValue != oldValue) {
        this.serviciosUpd(1);
      }
    })
    this.$scope.$watch('$ctrl.data.servicio2.fid_par_servicio', (newValue, oldValue) => {
      if (this.axs.init_servicios2 && newValue && newValue != oldValue) {
        this.serviciosUpd(2);
      }
    })
  }

  serviciosLoad() {
    this.axs.init_servicios1 = false;
    this.axs.init_servicios2 = false;
    this.DataService.get(`certificaciones/${this.certificacion.id_certificacion}/ddjj_servicios`)
    .then(response => {
      if (angular.isArray(response)) {
        if (response.length == 0)
          response.push({});
        if (response.length == 1)
          response.push({});

        if (response[0].principal) {
          this.data.servicio1 = response[0];
          this.data.servicio2 = response[1];
        } else {
          this.data.servicio1 = response[1];
          this.data.servicio2 = response[0];
        }
        if (this.data.servicio1.id_ddjj_servicio) {
          this.serviciosInitServ(1);
        } else {
          this.axs.init_servicios1 = true;
        }

        if (this.data.servicio2.id_ddjj_servicio) {
          this.axs.conf.serv_2 = true;
          this.serviciosInitServ(2);
        } else {
          this.axs.conf.serv_2 = false;
          this.axs.init_servicios2 = true;
        }
      }
    })
  }

  serviciosInitServ(i) {
    var it = this.data[`servicio${i}`];
    it.fid_par_servicio_p = it.servicio.fid_parametro_padre;
    delete it.servicio;
    this.serviciosHijosLoad(it.fid_par_servicio_p, i);
  }

  serviciosPadresLoad() {
    this.DataService.get(`parametros/?grupo=SERVICIO`)
    .then(response => {
      if (response) {
        response.forEach(it => {
          it.parent_nom_formated = `${it.parametro_padre.orden}. ${it.parametro_padre.nombre}`;
          it.nom_formated = `${it.parametro_padre.orden}.${it.orden}. ${it.nombre}`;
        })
        this.get.servicios = response;
      }
    })
  }

  serviciosHijosLoad(id, i, upd) {
    var form = this.$scope.registro_form[`servicios_form${i}`];
    this.get['servicios' + i] = [];
    // form.servicio1p.$setValidity('repetido', !(this.data.servicio1.id_p==this.data.servicio2.id_p));
    if (this.axs[`init_servicios${i}`]) {
      form.fid_par_servicio_p.$setValidity('repetido', this.data.servicio1.fid_par_servicio_p != this.data.servicio2.fid_par_servicio_p);
    }
    this.DataService.get(`parametros/?grupo=SERVICIO&fid_parametro_padre=${id}`)
    .then(response => {
      if (response) {
        this.get['servicios' + i] = response;
        if (upd) {
          this.data['servicio' + i].fid_par_servicio = null;
          this.serviciosUpd(i);
        } else {
          this.axs[`init_servicios${i}`] = true;
        }
      }
    })
  }

  serviciosUpd(i) {
    this.Util.funcDelay(this.tim['ser' + i], this.time_autoguardado, () => {
      this.serviciosSave(this.$scope.registro_form[`servicios_form${i}`], i);
    })
  }

  serviciosSave(form, i) {
    var required, save, it;
    it = this.data[`servicio${i}`];
    // this.$log.log(form);
    if (angular.isUndefined(it.id_ddjj_servicio)) {
      it.principal = i == 1;
    }
    if (i == 2) {
      required = it.fid_par_servicio_p || it.fid_par_servicio || it.descripcion;
      this.axs.conf.serv_2 = required && !it.principal;
    }
    save = it.fid_par_servicio_p && it.fid_par_servicio && it.descripcion;

    if (form.$valid && save) {
      if (it.id_ddjj_servicio)
        it.id = it.id_ddjj_servicio;
      this.DataService.save(`certificaciones/${this.certificacion.id_certificacion}/ddjj_servicios/`, it)
      .then(response => {
        if (response) {
          // this.Message.success('Se guardó el registro correctamente.');
          angular.extend(it, response);
        }
      })
    } else {
      this.Util.setTouchedForm(form);
      this.$scope.$apply();
    }
  }

  serviciosSwap() {
    this.Modal.confirm('¿Desea convertir el servicio secundario a servicio principal?', () => {
      var it = this.data.servicio1;
      it.principal = false;
      if (it.id_ddjj_servicio)
        it.id = it.id_ddjj_servicio;
      this.DataService.save(`certificaciones/${this.certificacion.id_certificacion}/ddjj_servicios/`, it)
      .then(response => {
        if (response) {
          it = this.data.servicio2;
          it.principal = true;
          if (it.id_ddjj_servicio)
            it.id = it.id_ddjj_servicio;
          return this.DataService.save(`certificaciones/${this.certificacion.id_certificacion}/ddjj_servicios/`, it)
        }
      })
      .then(response => {
        if (response) {
          this.serviciosRefresh();
        }
      })
    });
  }

  serviciosRefresh() {
    this.$scope.registro_form.servicios_form1.fid_par_servicio_p.$setValidity('repetido', true);
    this.$scope.registro_form.servicios_form2.fid_par_servicio_p.$setValidity('repetido', true);
    this.serviciosLoad();
  }

  serviciosDel(i) {
    var it = this.data[`servicio${i}`];
    this.Modal.confirm('¿Desea eliminar este registro?', () => {
      if (it && it.id_ddjj_servicio) {
        this.DataService.delete(`certificaciones/${this.certificacion.id_certificacion}/ddjj_servicios/${it.id_ddjj_servicio}`)
        .then(response => {
          if (response) {
            this.Message.success('Su registro fue eliminado correctamente.');
            this.serviciosRefresh();
          }
        })
      } else {
        this.Message.success('Su registro fue eliminado correctamente.');
        this.serviciosRefresh();
      }
    });
  }

  isForm(x) {
    // ['UNIDAD_PRODUCTIVA','PROVEEDOR','ICAP','ARTESANO'][x-1]
    if (this.form) {
      return this.form.tipo == x;  
    }
    return ;
  }

  objCopy(obj, obj2, keys) {
    if (typeof keys == 'string')
      keys = keys.split(', ');
    keys.forEach(k => {
      obj[k] = angular.copy(obj2[k]);
    })
  }

  abrirModalDeclaracion() {
    this.DataService.post(`certificaciones/${this.certificacion.id_certificacion}/validar`)
    .then(response => {
      if (response) {
        this.Modal.show({
          template: modalTemplateD,
          controller: modalControllerD,
          data: {"numero_dias": this.form.plazo_dias,
            "cuenta_banco": this.form.nro_cuenta,
            "id_certificacion": this.certificacion.id_certificacion
          },
          size: 'lg'
        });
      }
    })
  }

  declarar(form) {
    //validacion de tipo de actividad economica
    //validar que haya activos productivos
    if(angular.isUndefined(this.data.activos_productivos) && !this.isForm('PROVEEDOR') && !this.isForm('ICAP')  ){
      this.Message.error('Debe llenar información en Activos Productivos');
      return ;
    }
    if( (this.data.activos_productivos.length<=0) && !this.isForm('PROVEEDOR') && !this.isForm('ICAP')  ){
      this.Message.error('Debe llenar información en Activos Productivos.');
      return;
    }
    //Proceso de declarar
    if ((this.data.tipo_actividad_economica === null || angular.isUndefined(this.data.tipo_actividad_economica))
    && this.isForm('UNIDAD_PRODUCTIVA') ) {
      this.Message.error('Debe seleccionar el tipo de actividad económica: \'Transformación\' o \'Servicios\' ');
    }
    // this.$log.log("**id_certificacion: "+this.certificacion.id_certificacion);
    var ignorar = 'depositos_form, activos_form';
    if (this.data.hist_representantes.tipo_documento == 'FUNDEMPRESA') {
      ignorar += ', doc_identidad_form';
    } else {
      ignorar += ', rep_legal_form';
    }
    // this.$log.log(form)
    if (this.Util.isValidForm(form, ignorar)) {
      if (this.isForm('SHB_UNIDAD')) {
        this.DataService.post(`certificaciones/${this.certificacion.id_certificacion}/validar`)
        .then(response => {
          if (response) {
            return this.DataService.get(`cert_sello_bolivia/productos_shb/${this.data.id_unidad_productiva}`);    
          }
          return;
        })
        .then( response => {
          if (response && response.results) {
            this.Storage.set('matriculaPromueve', { id_unidad_productiva: this.data.id_unidad_productiva });
            this.Storage.set('producto', { id_producto: response.results[0].id_producto });
            this.Sidenav.path('certificacion');  
          }        
        })
      } else {
        if (this.isForm('ICAP')) {
          this.abrirModalDeclaracion();
        } else {
          this.informacionSave(form.informacion_form, true);
        }
      }
    } else {
      this.Util.setTouchedForm(form, true, ignorar, '.ap-form');
      if (form.tipo_actividad_economica_secundaria && form.tipo_actividad_economica_secundaria.$error.required) {
        this.Message.error(`${this.conf.emp.tipo_actividad_economica_secundaria.label} es requerido.`);
      }
    }
  }

  atras() {
    if (this.isForm('SHB_UNIDAD')) {
      this.Sidenav.path('bandejaSello');
    } else {
      this.Sidenav.path('bandeja');
    }
  }

  validateMailKeyup() {

    this.$log.log("MAIL = ", this.data.correo_electronico);

    if (angular.isUndefined(this.data.correo_electronico) || this.data.correo_electronico === '') {
//    if (angular.isUndefined(this.data.correo_electronico) ) {
      this.isCorreoOk = true;
      return;
    }
    if (this.isValidEmail(this.data.correo_electronico)) {
      this.isCorreoOk = true;

    } else {
      this.isCorreoOk = false;
    }
  }
  isValidEmail(mail) {
    return     /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail);
  }

}

export default RegistroController;
