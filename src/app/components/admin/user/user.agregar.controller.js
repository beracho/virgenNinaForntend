'use strict';

class UserAgregarController {
  constructor($uibModalInstance, data, $log, DataService, Message, $state) {
    'ngInject';
    this.items = data;
    this.$uibModalInstance = $uibModalInstance;
    this.$log = $log;
    this.DataService = DataService;
    this.Message = Message;
    this.$state = $state;
  }

  $onInit() {
    this.selected = {
      item: this.items[0]
    };

    this.$log.log('Datos obtenidos enviados = ', this.items);
    this.tituloPagina = 'Agregando Usuario';
    if (this.items.esEdicion) {
      this.tituloPagina = 'Editando Usuario';
      this.usuario = this.items.usuario;
      this.usuario.fid_rol = this.usuario.usuarios_roles.fid_rol;
    }
    //Roles
    this.cargarRoles();
  }
  ok() {
    if (angular.isUndefined(this.usuario)) {
      var type = "warning";
      this.Message[type]("Debe llenar la información del formulario.");
      return;
    }
    this.usuario.fid_persona = this.data.usuario.id_persona;
    this.$log.log('ID de persona seleccionada = ', this.usuario.fid_persona);
    //validacion de campos vacios
    //objeto a enviar
    var obj = {
      "usuario": this.usuario
    };
    if (this.items.esEdicion) {
      this.$log.log('Editamos  usuario ->' + 'usuarios/' + this.usuario.id_usuario);
      this.DataService.put('usuarios/' + this.usuario.id_usuario, obj)
      .then(response => {
        if (response) {
          this.$log.log('Respuesta***= ', response);
          this.items.refresh;
          this.$state.reload();
          this.$uibModalInstance.close(this.selected.item);
        }
      });
    } else {
      this.$log.log('Agregamos  usuario');
      this.DataService.post('usuarios/', obj)
      .then(response => {
        if (response) {
          this.$log.log('Respuesta a***= ', response);
          this.items.refresh;
          this.$state.reload();
          this.$uibModalInstance.close(this.selected.item);
        }
      });
    }
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  validar() {
    this.$log.log('*VALIDANDO DATOS CONTRA SEGIP---', this.usuario);
  }

  cargarRoles() {
    this.DataService.get('roles')
    .then(response => {
      if (response) {
        this.roles = response;
      }
    });
  }
}
export default UserAgregarController;
